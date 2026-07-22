import { existsSync } from 'node:fs';
import path from 'node:path';
import { normalizePath, type Plugin } from 'vite';
import type { OpenSlideConfig } from '../config.ts';
import { findThemeMarkdownFiles, type ParsedThemeFile, readThemeFile } from '../themes/catalog.ts';
import {
  createDebouncedAction,
  DEV_HMR_EVENTS,
  invalidateVirtualModule,
  sendCustomHmrEvent,
  THEMES_VMOD,
  vmodResolved,
} from './dev-sync.ts';

export type ThemesPluginOptions = {
  userCwd: string;
  config: OpenSlideConfig;
};

const THEMES_VMOD_ID = THEMES_VMOD;

function resolved(id: string): string {
  return vmodResolved(id);
}

function generateThemesModule(themes: ParsedThemeFile[], isDev: boolean): string {
  const meta = themes.map((t) => ({
    id: t.id,
    name: t.frontmatter.name,
    description: t.frontmatter.description,
    body: t.body,
    hasDemo: t.demoAbs !== null,
  }));

  const cases = themes
    .flatMap((t) => {
      const abs = t.demoAbs;
      if (!abs) return [];
      const importPath = isDev ? `@fs/${normalizePath(abs).replace(/^\/+/, '')}` : abs;
      const importExpr = isDev
        ? `import(/* @vite-ignore */ import.meta.env.BASE_URL + ${JSON.stringify(importPath)})`
        : `import(${JSON.stringify(importPath)})`;
      return [`    case ${JSON.stringify(t.id)}: return ${importExpr};`];
    })
    .join('\n');

  return `// virtual:open-slide/themes — generated
export const themes = ${JSON.stringify(meta)};

export async function loadThemeDemo(id) {
  switch (id) {
${cases}
    default: throw new Error('Theme demo not found: ' + id);
  }
}
`;
}

export function themesPlugin(opts: ThemesPluginOptions): Plugin {
  const { userCwd, config } = opts;
  const themesDir = config.themesDir ?? 'themes';
  const themesRoot = path.resolve(userCwd, themesDir);

  let isDev = false;

  return {
    name: 'open-slide:themes',
    config(_c, env) {
      isDev = env.command === 'serve';
    },
    resolveId(id) {
      if (id === THEMES_VMOD_ID) return resolved(THEMES_VMOD_ID);
      return null;
    },
    async load(id) {
      if (id !== resolved(THEMES_VMOD_ID)) return null;
      const files = await findThemeMarkdownFiles(userCwd, themesDir);
      const themes = await Promise.all(files.map((f) => readThemeFile(f, themesRoot)));
      return generateThemesModule(themes, isDev);
    },
    configureServer(server) {
      const isThemeFile = (p: string) => {
        const rel = path.relative(themesRoot, p);
        if (rel.startsWith('..') || path.isAbsolute(rel)) return false;
        if (rel.includes(path.sep)) return false;
        return /\.(md|demo\.(tsx|jsx|ts|js))$/.test(rel);
      };

      let themesFlush: (() => void) | undefined;
      const reloadThemes = () => {
        if (!themesFlush) {
          themesFlush = createDebouncedAction(150, () => {
            invalidateVirtualModule(server, resolved(THEMES_VMOD_ID));
            sendCustomHmrEvent(server, DEV_HMR_EVENTS.themesChanged);
          });
        }
        themesFlush();
      };

      if (existsSync(themesRoot)) server.watcher.add(themesRoot);
      server.watcher.on('add', (p) => {
        if (isThemeFile(p)) reloadThemes();
      });
      server.watcher.on('unlink', (p) => {
        if (isThemeFile(p)) reloadThemes();
      });
      server.watcher.on('change', (p) => {
        if (isThemeFile(p)) reloadThemes();
      });
    },
  };
}
