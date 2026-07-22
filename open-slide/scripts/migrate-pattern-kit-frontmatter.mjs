#!/usr/bin/env node
/**
 * One-shot migration: legacy metadata tables → kit-doc frontmatter.
 * Safe to re-run only on files without frontmatter.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../packages/core/.agent/skills/slide-authoring/references/pattern-library',
);

const FORMAT_MAP = {
  both: 'both',
  'both*': 'both-star',
  'both-star': 'both-star',
  'slide-first': 'slide-first',
  '4x5-first': '4x5-first',
};

function parseFormats(cell) {
  const m = cell.match(/\*\*([^*]+)\*\*/);
  const raw = (m ? m[1] : cell).toLowerCase().replace(/\s/g, '');
  if (raw.includes('4x5-first')) return '4x5-first';
  if (raw.includes('slide-first')) return 'slide-first';
  if (raw.includes('both*') || raw.includes('both-star')) return 'both-star';
  return 'both';
}

function parseLegacyTable(text) {
  const get = (label) => {
    const re = new RegExp(`\\| \\*\\*${label}\\*\\* \\| ([^|]+) \\|`, 'i');
    const m = text.match(re);
    return m ? m[1].trim() : '';
  };
  const id = get('id').replace(/`/g, '');
  const kind = get('kind').replace(/`/g, '');
  const pageTypesRef = get('page-types ref').replace(/`/g, '');
  const contentKeys = get('CONTENT keys')
    .split(',')
    .map((s) => s.trim().replace(/`/g, ''))
    .filter(Boolean);
  const formats = parseFormats(get('Canvas formats') || get('formats'));
  return { id, kind, pageTypesRef, contentKeys, formats };
}

function whenToUseSummary(text) {
  const m = text.match(/## When to use\s*\n+([^\n#]+)/);
  return (m ? m[1] : 'Pattern catalog entry.').trim().replace(/"/g, "'");
}

function buildFrontmatter({ id, kind, summary, formats, contentKeys, pageTypesRef }) {
  const lines = [
    '---',
    'kit-doc: pattern',
    `id: ${id}`,
    `kind: ${kind}`,
    `summary: "${summary}"`,
    `formats: ${formats}`,
    'content-keys:',
    ...contentKeys.map((k) => `  - ${k}`),
  ];
  if (pageTypesRef) {
    lines.push('page-types:', `  - ${pageTypesRef}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function stripLegacyHeader(body) {
  const lines = body.split('\n');
  let i = 0;
  if (lines[i]?.startsWith('# Pattern')) i++;
  while (i < lines.length && lines[i].trim() === '') i++;
  if (lines[i]?.startsWith('| Field |')) {
    while (i < lines.length && lines[i].trim() !== '') i++;
    while (i < lines.length && lines[i].trim() === '') i++;
  }
  return lines.slice(i).join('\n');
}

async function migrateFile(abs) {
  let text = await fs.readFile(abs, 'utf8');
  if (text.startsWith('---\nkit-doc:')) return 'skip';
  const meta = parseLegacyTable(text);
  if (!meta.id) return 'fail';
  const summary = whenToUseSummary(text);
  const fm = buildFrontmatter({ ...meta, summary });
  const body = stripLegacyHeader(text);
  const title = `# Pattern — ${meta.id}\n\n`;
  await fs.writeFile(abs, fm + title + body.replace(/^# Pattern[^\n]*\n+/, ''), 'utf8');
  return 'ok';
}

async function main() {
  for (const sub of ['layouts', 'motion']) {
    const dir = path.join(ROOT, sub);
    const names = await fs.readdir(dir);
    for (const name of names.filter((n) => n.endsWith('.md'))) {
      const r = await migrateFile(path.join(dir, name));
      console.log(`${sub}/${name}: ${r}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
