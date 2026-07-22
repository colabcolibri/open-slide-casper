import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const SKIP_BASENAMES = new Set(['readme.md']);

export type ThemeFrontmatter = {
  name: string;
  description: string;
  mode?: string;
};

export type ThemeCatalogEntry = {
  id: string;
  name: string;
  description: string;
  mode?: string;
  hasDemo: boolean;
};

export type ParsedThemeFile = {
  id: string;
  frontmatter: ThemeFrontmatter;
  body: string;
  demoAbs: string | null;
};

function parseFrontmatterLines(fmText: string, themeId: string): ThemeFrontmatter {
  const data: Record<string, string> = {};
  for (const line of fmText.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }

  const mode = data.mode?.trim();
  return {
    name: data.name || themeId,
    description: data.description || '',
    ...(mode ? { mode } : {}),
  };
}

export function parseThemeMarkdown(
  raw: string,
  themeId: string,
): { frontmatter: ThemeFrontmatter; body: string } {
  const match = raw.match(FM_RE);
  const fmText = match ? match[1] : '';
  const body = match ? match[2] : raw;
  return {
    frontmatter: parseFrontmatterLines(fmText, themeId),
    body: body.trim(),
  };
}

export function resolveThemesRoot(userCwd: string, themesDir = 'themes'): string {
  return path.resolve(userCwd, themesDir);
}

export async function findThemeMarkdownFiles(
  userCwd: string,
  themesDir = 'themes',
): Promise<string[]> {
  const abs = resolveThemesRoot(userCwd, themesDir);
  if (!existsSync(abs)) return [];
  const hits = await fg('*.md', { cwd: abs, absolute: true, onlyFiles: true });
  return hits.filter((p) => !SKIP_BASENAMES.has(path.basename(p).toLowerCase())).sort();
}

export function resolveThemeDemoAbs(themesRoot: string, id: string): string | null {
  const demoCandidates = [`${id}.demo.tsx`, `${id}.demo.jsx`, `${id}.demo.ts`, `${id}.demo.js`];
  for (const cand of demoCandidates) {
    const p = path.join(themesRoot, cand);
    if (existsSync(p)) return p;
  }
  return null;
}

export async function readThemeFile(mdAbs: string, themesRoot: string): Promise<ParsedThemeFile> {
  const id = path.basename(mdAbs, '.md');
  const raw = await fs.readFile(mdAbs, 'utf8');
  const { frontmatter, body } = parseThemeMarkdown(raw, id);
  const demoAbs = resolveThemeDemoAbs(themesRoot, id);
  return { id, frontmatter, body, demoAbs };
}

export async function listThemeCatalog(
  userCwd: string,
  themesDir = 'themes',
): Promise<ThemeCatalogEntry[]> {
  const themesRoot = resolveThemesRoot(userCwd, themesDir);
  const files = await findThemeMarkdownFiles(userCwd, themesDir);
  const entries: ThemeCatalogEntry[] = [];
  for (const mdAbs of files) {
    const parsed = await readThemeFile(mdAbs, themesRoot);
    entries.push({
      id: parsed.id,
      name: parsed.frontmatter.name,
      description: parsed.frontmatter.description,
      ...(parsed.frontmatter.mode ? { mode: parsed.frontmatter.mode } : {}),
      hasDemo: parsed.demoAbs !== null,
    });
  }
  return entries;
}
