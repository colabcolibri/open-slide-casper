#!/usr/bin/env node
/**
 * Build catalog.json + layouts/*.md + styles/*.md from vendored snapshot/ in the slide kit.
 * Inputs live only under packages/core/.agent/skills/infographic-catalog/references/snapshot/
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONO = path.resolve(__dirname, '..');
const OUT = path.join(
  MONO,
  'packages/core/.agent/skills/infographic-catalog/references',
);
const SNAP = path.join(OUT, 'snapshot');

function extractPromptBlocks(section, promptField) {
  const idRe = /id:\s*'([^']+)'/g;
  const hits = [];
  let m = idRe.exec(section);
  while (m) {
    hits.push({ id: m[1], index: m.index });
    m = idRe.exec(section);
  }
  const blocks = [];
  for (let i = 0; i < hits.length; i++) {
    const chunk = section.slice(hits[i].index, hits[i + 1]?.index ?? section.length);
    const promptRe = new RegExp(`${promptField}:\\s*\`([\\s\\S]*?)\`\\s*,?`);
    const pm = chunk.match(promptRe);
    if (!pm) continue;
    blocks.push({ id: hits[i].id, prompt: pm[1].trim(), chunk });
  }
  return blocks;
}

function parseTagList(chunk, key) {
  const re = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, 's');
  const m = chunk.match(re);
  if (!m) return [];
  const items = [];
  const itemRe = /'([^']+)'/g;
  let hit = itemRe.exec(m[1]);
  while (hit) {
    items.push(hit[1]);
    hit = itemRe.exec(m[1]);
  }
  return items;
}

function fm(fields) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fields)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

async function main() {
  const layoutsTs = await fs.readFile(path.join(SNAP, 'layout-archetypes.ts'), 'utf8');
  const visualsTs = await fs.readFile(path.join(SNAP, 'visual-styles.ts'), 'utf8');
  const taxonomyTs = await fs.readFile(path.join(SNAP, 'layout-categories.ts'), 'utf8');
  const options = JSON.parse(await fs.readFile(path.join(SNAP, 'labels.en.json'), 'utf8'));

  const layouts = extractPromptBlocks(
    layoutsTs.slice(layoutsTs.indexOf('INFOGRAPHIC_LAYOUTS')),
    'promptInstruction',
  );
  const styles = extractPromptBlocks(
    visualsTs.slice(visualsTs.indexOf('VISUAL_STYLES')),
    'promptModifier',
  ).map((b) => ({
    ...b,
    vibe: parseTagList(b.chunk, 'vibe'),
    format: parseTagList(b.chunk, 'format'),
  }));

  const catMap = {};
  for (const line of taxonomyTs.split('\n')) {
    const m = line.match(/^\s+([a-z0-9_]+):\s*\[(.+)\],?\s*$/);
    if (!m) continue;
    catMap[m[1]] = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  }

  await fs.mkdir(path.join(OUT, 'layouts'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'styles'), { recursive: true });

  const catalogLayouts = [];
  for (const l of layouts) {
    const meta = options.layouts?.[l.id] ?? {};
    const preview = `previews/layouts/${l.id}.webp`;
    const mdPath = `layouts/${l.id}.md`;
    await fs.writeFile(
      path.join(OUT, mdPath),
      `${fm({
        id: l.id,
        kind: 'layout',
        categories: catMap[l.id] ?? [],
        name: meta.name ?? l.id,
        description: meta.description ?? '',
        preview,
      })}${l.prompt}\n`,
    );
    catalogLayouts.push({
      id: l.id,
      kind: 'layout',
      name: meta.name ?? l.id,
      description: meta.description ?? '',
      categories: catMap[l.id] ?? [],
      promptMarkdown: mdPath,
      preview,
    });
  }

  const catalogStyles = [];
  for (const s of styles) {
    const meta = options.styles?.[s.id] ?? {};
    const preview = `previews/styles/${s.id}.webp`;
    const mdPath = `styles/${s.id}.md`;
    await fs.writeFile(
      path.join(OUT, mdPath),
      `${fm({
        id: s.id,
        kind: 'style',
        vibe: s.vibe,
        format: s.format,
        name: meta.name ?? s.id,
        description: meta.description ?? '',
        preview,
      })}${s.prompt}\n`,
    );
    catalogStyles.push({
      id: s.id,
      kind: 'style',
      name: meta.name ?? s.id,
      description: meta.description ?? '',
      vibe: s.vibe,
      format: s.format,
      promptMarkdown: mdPath,
      preview,
    });
  }

  catalogLayouts.sort((a, b) => a.id.localeCompare(b.id));
  catalogStyles.sort((a, b) => a.id.localeCompare(b.id));

  await fs.writeFile(
    path.join(OUT, 'catalog.json'),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        counts: { layouts: catalogLayouts.length, styles: catalogStyles.length },
        layouts: catalogLayouts,
        styles: catalogStyles,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`built ${catalogLayouts.length} layouts, ${catalogStyles.length} styles`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
