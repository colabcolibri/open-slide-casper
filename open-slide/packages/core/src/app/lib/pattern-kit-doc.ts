import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export const KIT_DOC_PATTERN = 'pattern' as const;

export const PATTERN_FORMATS = ['both', 'both-star', 'slide-first', '4x5-first'] as const;
export type PatternFormat = (typeof PATTERN_FORMATS)[number];

export const PATTERN_KINDS = ['layout', 'motion'] as const;
export type PatternKind = (typeof PATTERN_KINDS)[number];

export type PatternKitDoc = {
  'kit-doc': typeof KIT_DOC_PATTERN;
  id: string;
  kind: PatternKind;
  summary: string;
  formats: PatternFormat;
  'content-keys': string[];
  'page-types'?: string[];
};

const FM_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

/** Minimal YAML subset for pattern frontmatter (no new dependency). */
export function parsePatternFrontmatterYaml(yaml: string): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  let listKey: string | null = null;

  for (const rawLine of yaml.split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && listKey) {
      const items = (out[listKey] as string[]) ?? [];
      items.push(stripQuotes(listItem[1].trim()));
      out[listKey] = items;
      continue;
    }

    listKey = null;
    const kv = line.match(/^([a-z0-9-]+):\s*(.*)$/i);
    if (!kv) continue;
    const key = kv[1];
    const value = kv[2].trim();
    if (value === '') {
      listKey = key;
      out[key] = [];
      continue;
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      out[key] = inner
        ? inner.split(',').map((s) => stripQuotes(s.trim()))
        : [];
      continue;
    }
    out[key] = stripQuotes(value);
  }

  return out;
}

function stripQuotes(s: string): string {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

export function splitKitDocMarkdown(source: string): { yaml: string; body: string } | null {
  const m = source.match(FM_BLOCK);
  if (!m) return null;
  return { yaml: m[1], body: m[2] };
}

export function parsePatternKitDoc(source: string): PatternKitDoc | { error: string } {
  const split = splitKitDocMarkdown(source);
  if (!split) return { error: 'missing frontmatter block' };

  const raw = parsePatternFrontmatterYaml(split.yaml);
  if (raw['kit-doc'] !== KIT_DOC_PATTERN) {
    return { error: `kit-doc must be "${KIT_DOC_PATTERN}"` };
  }

  const id = raw.id;
  const kind = raw.kind;
  const summary = raw.summary;
  const formats = raw.formats;
  const contentKeys = raw['content-keys'];

  if (typeof id !== 'string' || !id) return { error: 'id required' };
  if (typeof kind !== 'string' || !PATTERN_KINDS.includes(kind as PatternKind)) {
    return { error: 'kind must be layout or motion' };
  }
  if (typeof summary !== 'string' || !summary.trim()) return { error: 'summary required' };
  if (typeof formats !== 'string' || !PATTERN_FORMATS.includes(formats as PatternFormat)) {
    return { error: `formats must be one of ${PATTERN_FORMATS.join(', ')}` };
  }
  if (!Array.isArray(contentKeys) || contentKeys.length === 0) {
    return { error: 'content-keys must be a non-empty list' };
  }

  const pageTypes = raw['page-types'];
  const doc: PatternKitDoc = {
    'kit-doc': KIT_DOC_PATTERN,
    id,
    kind: kind as PatternKind,
    summary,
    formats: formats as PatternFormat,
    'content-keys': contentKeys as string[],
  };
  if (Array.isArray(pageTypes) && pageTypes.length > 0) {
    doc['page-types'] = pageTypes as string[];
  }
  return doc;
}

/** INDEX.md table rows: first column is `id` in backticks */
export function extractIndexPatternIds(indexMarkdown: string): string[] {
  const ids: string[] = [];
  const rowRe = /^\|\s*`([^`]+)`\s*\|/gm;
  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(indexMarkdown)) !== null) {
    ids.push(m[1]);
  }
  return ids;
}

export async function listPatternCatalogFiles(patternRoot: string): Promise<string[]> {
  const out: string[] = [];
  for (const sub of ['layouts', 'motion']) {
    const dir = join(patternRoot, sub);
    const names = await readdir(dir);
    for (const name of names) {
      if (name.endsWith('.md')) out.push(join(dir, name));
    }
  }
  return out.sort();
}
