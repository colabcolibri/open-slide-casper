import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';
import { loadConfigFromFile, normalizePath, type Plugin, type ViteDevServer } from 'vite';
import type { OpenSlideConfig } from '../config.ts';
import {
  resolveExamplesDir,
  type SlideCollection,
} from '../files/slide-locations.ts';
import { SLIDE_ID_RE } from '../editing/slide-ops.ts';
import {
  createDebouncedAction,
  DEV_HMR_EVENTS,
  FOLDERS_VMOD,
  invalidateVirtualModule,
  SLIDES_REGISTRY_SCHEMA_VERSION,
  SLIDES_VMOD,
  sendCustomHmrEvent,
  vmodResolved,
} from './dev-sync.ts';
import { hasRecentWrite } from './recent-writes.ts';

export type { OpenSlideConfig };

export type OpenSlidePluginOptions = {
  userCwd: string;
  config: OpenSlideConfig;
  coreVersion: string;
};

const CONFIG_FILE = 'open-slide.config.ts';

const CONFIG_VMOD = 'virtual:open-slide/config';

type FoldersManifest = {
  folders: unknown[];
  assignments: Record<string, string>;
};

async function readFoldersManifest(file: string): Promise<FoldersManifest> {
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = JSON.parse(raw) as Partial<FoldersManifest>;
    return {
      folders: Array.isArray(parsed.folders) ? parsed.folders : [],
      assignments:
        parsed.assignments && typeof parsed.assignments === 'object'
          ? (parsed.assignments as Record<string, string>)
          : {},
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return { folders: [], assignments: {} };
    }
    throw err;
  }
}

function resolved(id: string): string {
  return vmodResolved(id);
}

async function findSlides(userCwd: string, slidesDir: string): Promise<string[]> {
  const abs = path.resolve(userCwd, slidesDir);
  if (!existsSync(abs)) return [];
  const hits = await fg('*/index.{tsx,jsx,ts,js}', {
    cwd: abs,
    absolute: true,
    onlyFiles: true,
  });
  return hits.sort();
}

function toId(absFile: string, slidesRoot: string): string {
  const rel = path.relative(slidesRoot, absFile);
  return rel.split(path.sep)[0];
}

const META_THEME_RE = /(?:^|[\s,{])theme\s*:\s*['"]([^'"]+)['"]/;
const META_CREATED_AT_RE = /(?:^|[\s,{])createdAt\s*:\s*['"]([^'"]+)['"]/;

type ExtractedMeta = { theme: string | null; createdAt: string | null };

function extractMeta(src: string): ExtractedMeta {
  const empty: ExtractedMeta = { theme: null, createdAt: null };
  const metaStart = src.search(/export\s+const\s+meta\b/);
  if (metaStart === -1) return empty;
  const eqIdx = src.indexOf('=', metaStart);
  if (eqIdx === -1) return empty;
  const openBrace = src.indexOf('{', eqIdx);
  if (openBrace === -1) return empty;
  let depth = 0;
  let closeBrace = -1;
  for (let i = openBrace; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        closeBrace = i;
        break;
      }
    }
  }
  if (closeBrace === -1) return empty;
  const body = src.slice(openBrace + 1, closeBrace);
  const themeMatch = body.match(META_THEME_RE);
  const createdAtMatch = body.match(META_CREATED_AT_RE);
  return {
    theme: themeMatch ? themeMatch[1] : null,
    createdAt: createdAtMatch ? createdAtMatch[1] : null,
  };
}

async function readSlideMeta(abs: string): Promise<ExtractedMeta> {
  try {
    const src = await fs.readFile(abs, 'utf8');
    return extractMeta(src);
  } catch {
    return { theme: null, createdAt: null };
  }
}

function parseCreatedAtMs(iso: string | null): number | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? ms : null;
}

// Deduped across repeated virtual-module regenerations so dev HMR doesn't
// re-log the same ignored folder on every slide change.
const warnedInvalidSlideIds = new Set<string>();

export async function generateSlidesModule(
  scans: { files: string[]; root: string; collection: SlideCollection }[],
  isDev: boolean,
): Promise<{ code: string; ignored: string[] }> {
  const scanned = (
    await Promise.all(
      scans.flatMap(({ files, root, collection }) =>
        files.map(async (abs) => {
          const id = toId(abs, root);
          const importPath = isDev ? `@fs/${normalizePath(abs).replace(/^\/+/, '')}` : abs;
          const meta = await readSlideMeta(abs);
          return {
            id,
            importPath,
            theme: meta.theme,
            createdAt: parseCreatedAtMs(meta.createdAt),
            collection,
          };
        }),
      ),
    )
  ).flat();

  const byId = new Map<string, (typeof scanned)[number]>();
  const ignored: string[] = [];
  for (const entry of scanned) {
    if (!SLIDE_ID_RE.test(entry.id)) {
      ignored.push(entry.id);
      continue;
    }
    const prev = byId.get(entry.id);
    if (!prev) {
      byId.set(entry.id, entry);
      continue;
    }
    if (prev.collection === 'examples' && entry.collection === 'slides') {
      byId.set(entry.id, entry);
    }
  }

  const entries = Array.from(byId.values()).sort((a, b) => a.id.localeCompare(b.id));
  const slideIds = entries.filter((e) => e.collection === 'slides').map((e) => e.id);
  const exampleSlideIds = entries.filter((e) => e.collection === 'examples').map((e) => e.id);
  const slideCollections = Object.fromEntries(entries.map((e) => [e.id, e.collection]));

  const themesMap: Record<string, string> = {};
  const createdAtMap: Record<string, number> = {};
  for (const e of entries) {
    if (e.theme) themesMap[e.id] = e.theme;
    if (e.createdAt !== null) createdAtMap[e.id] = e.createdAt;
  }
  const themesJson = JSON.stringify(themesMap);
  const createdAtJson = JSON.stringify(createdAtMap);
  const slideCollectionsJson = JSON.stringify(slideCollections);
  const importTokens = JSON.stringify(Object.fromEntries(entries.map((e) => [e.id, 0])));
  const devRuntime = isDev
    ? `
const slideImportTokens = ${importTokens};
if (import.meta.hot) {
  import.meta.hot.on('open-slide:slide-changed', (data) => {
    const ids = Array.isArray(data?.slideIds) ? data.slideIds : data?.slideId ? [data.slideId] : [];
    const token = Date.now();
    for (const id of ids) {
      if (Object.prototype.hasOwnProperty.call(slideImportTokens, id)) slideImportTokens[id] = token;
    }
  });
}
`
    : '';
  const cases = entries
    .map((e) => {
      const importExpr = isDev
        ? `import(/* @vite-ignore */ import.meta.env.BASE_URL + ${JSON.stringify(`${e.importPath}?t=`)} + slideImportTokens[${JSON.stringify(e.id)}])`
        : `import(${JSON.stringify(e.importPath)})`;
      return `    case ${JSON.stringify(e.id)}: return ${importExpr};`;
    })
    .join('\n');

  const code = `// virtual:open-slide/slides — generated
export const slideRegistrySchemaVersion = ${SLIDES_REGISTRY_SCHEMA_VERSION};
export const slideIds = ${JSON.stringify(slideIds)};
export const exampleSlideIds = ${JSON.stringify(exampleSlideIds)};
export const slideCollections = ${slideCollectionsJson};
export const slideThemes = ${themesJson};
export const slideCreatedAt = ${createdAtJson};
${devRuntime}

export async function loadSlide(id) {
  switch (id) {
${cases}
    default: throw new Error('Slide not found: ' + id);
  }
}
`;
  return { code, ignored: [...new Set(ignored)] };
}

export function openSlidePlugin(opts: OpenSlidePluginOptions): Plugin {
  const { userCwd, config, coreVersion } = opts;
  const slidesDir = config.slidesDir ?? 'slides';
  const examplesDirConfig = config.examplesDir;
  const examplesDir = resolveExamplesDir(examplesDirConfig);
  const slidesRoot = path.resolve(userCwd, slidesDir);
  const examplesRoot = examplesDir ? path.resolve(userCwd, examplesDir) : null;
  const foldersManifestPath = path.join(slidesRoot, '.folders.json');

  const watchedRoots = [{ root: slidesRoot, collection: 'slides' as SlideCollection }];
  if (examplesRoot) watchedRoots.push({ root: examplesRoot, collection: 'examples' });

  let isDev = false;
  const slideIdForEntry = (p: string): string | null => {
    for (const { root } of watchedRoots) {
      const rel = path.relative(root, p);
      if (rel.startsWith('..') || path.isAbsolute(rel)) continue;
      const parts = rel.split(path.sep);
      if (parts.length !== 2) continue;
      if (!/^index\.(tsx|jsx|ts|js)$/.test(parts[1])) continue;
      return parts[0];
    }
    return null;
  };
  const pendingSlideChanges = new Set<string>();
  const slideChangedFlushers = new WeakMap<ViteDevServer, () => void>();
  const queueSlideChanged = (server: ViteDevServer, id: string) => {
    pendingSlideChanges.add(id);
    let flush = slideChangedFlushers.get(server);
    if (!flush) {
      flush = createDebouncedAction(100, () => {
        invalidateVirtualModule(server, resolved(SLIDES_VMOD));
        const slideIds = Array.from(pendingSlideChanges);
        pendingSlideChanges.clear();
        sendCustomHmrEvent(server, DEV_HMR_EVENTS.slideChanged, { slideIds });
      });
      slideChangedFlushers.set(server, flush);
    }
    flush();
  };

  return {
    name: 'open-slide',
    config(_c, env) {
      isDev = env.command === 'serve';
      return {
        server: { fs: { allow: [userCwd] } },
      };
    },
    resolveId(id) {
      if (id === SLIDES_VMOD) return resolved(SLIDES_VMOD);
      if (id === CONFIG_VMOD) return resolved(CONFIG_VMOD);
      if (id === FOLDERS_VMOD) return resolved(FOLDERS_VMOD);
      return null;
    },
    async load(id) {
      if (id === resolved(SLIDES_VMOD)) {
        const scans: { files: string[]; root: string; collection: SlideCollection }[] = [
          {
            files: await findSlides(userCwd, slidesDir),
            root: slidesRoot,
            collection: 'slides',
          },
        ];
        if (examplesDir && examplesRoot) {
          scans.push({
            files: await findSlides(userCwd, examplesDir),
            root: examplesRoot,
            collection: 'examples',
          });
        }
        const { code, ignored } = await generateSlidesModule(scans, isDev);
        for (const slideId of ignored) {
          if (warnedInvalidSlideIds.has(slideId)) continue;
          warnedInvalidSlideIds.add(slideId);
          this.warn(
            `Ignoring slide folder "${slideId}": slide ids must match ${SLIDE_ID_RE} (lowercase/uppercase letters, digits, "-", "_"). Rename the folder under "${slidesDir}/" to a kebab-case id so it appears in the browser and can be moved into folders.`,
          );
        }
        return code;
      }
      if (id === resolved(CONFIG_VMOD)) {
        const userBuild = config.build ?? {};
        const buildResolved = isDev
          ? { showSlideBrowser: true, showSlideUi: true, allowHtmlDownload: true }
          : {
              showSlideBrowser: userBuild.showSlideBrowser ?? true,
              showSlideUi: userBuild.showSlideUi ?? true,
              allowHtmlDownload: userBuild.allowHtmlDownload ?? true,
            };
        const resolvedConfig = {
          ...config,
          examplesDir: examplesDir ?? false,
          build: buildResolved,
          version: coreVersion,
        };
        return `export default ${JSON.stringify(resolvedConfig)};\n`;
      }
      if (id === resolved(FOLDERS_VMOD)) {
        const manifest = await readFoldersManifest(foldersManifestPath);
        return `export default ${JSON.stringify(manifest)};\n`;
      }
      return null;
    },
    handleHotUpdate(ctx) {
      const slideId = slideIdForEntry(ctx.file);
      if (!slideId) return;
      // A speaker-note save writes the slide file itself. The notes plugin
      // records that write so we can recognise it here and skip the
      // `slide-changed` broadcast, which would otherwise bump the dev
      // cache-bust token and remount the slide canvas. Genuine source edits
      // are never recorded, so they keep full HMR behaviour.
      if (hasRecentWrite(ctx.file)) return [];
      queueSlideChanged(ctx.server, slideId);
      return [];
    },
    configureServer(server) {
      invalidateVirtualModule(server, resolved(SLIDES_VMOD));

      const isSlideEntry = (p: string) => slideIdForEntry(p) !== null;

      let registryFlush: (() => void) | undefined;
      const reloadRegistry = () => {
        if (!registryFlush) {
          registryFlush = createDebouncedAction(150, () => {
            invalidateVirtualModule(server, resolved(SLIDES_VMOD));
            sendCustomHmrEvent(server, DEV_HMR_EVENTS.registryChanged);
          });
        }
        registryFlush();
      };
      // Vite's `root` is the core app dir, so chokidar doesn't watch the
      // user's slides folder by default. Add it explicitly — and pass the
      // directory itself, since Vite sets `disableGlobbing: true` and would
      // otherwise treat a glob pattern as a literal path.
      if (existsSync(slidesRoot)) server.watcher.add(slidesRoot);
      if (examplesRoot && existsSync(examplesRoot)) server.watcher.add(examplesRoot);
      server.watcher.on('add', (p) => {
        if (isSlideEntry(p)) reloadRegistry();
      });
      server.watcher.on('unlink', (p) => {
        if (isSlideEntry(p)) reloadRegistry();
      });

      let foldersFlush: (() => void) | undefined;
      const invalidateFolders = () => {
        if (!foldersFlush) {
          foldersFlush = createDebouncedAction(100, () => {
            invalidateVirtualModule(server, resolved(FOLDERS_VMOD));
          });
        }
        foldersFlush();
      };
      server.watcher.add(foldersManifestPath);
      server.watcher.on('change', (p) => {
        if (p === foldersManifestPath) invalidateFolders();
      });
      server.watcher.on('add', (p) => {
        if (p === foldersManifestPath) invalidateFolders();
      });
      server.watcher.on('unlink', (p) => {
        if (p === foldersManifestPath) invalidateFolders();
      });
    },
  };
}

export async function loadUserConfig(userCwd: string): Promise<OpenSlideConfig> {
  const file = path.join(userCwd, CONFIG_FILE);
  if (!existsSync(file)) return {};
  const loaded = await loadConfigFromFile(
    { command: 'serve', mode: 'development' },
    file,
    userCwd,
    'silent',
  );
  return (loaded?.config ?? {}) as OpenSlideConfig;
}
