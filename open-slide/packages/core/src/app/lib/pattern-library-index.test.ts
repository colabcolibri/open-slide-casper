import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  extractIndexPatternIds,
  listPatternCatalogFiles,
  parsePatternKitDoc,
} from './pattern-kit-doc.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const PATTERN_ROOT = path.resolve(
  PKG_ROOT,
  '.agent/skills/slide-authoring/references/pattern-library',
);

const LINK_RE = /\]\((layouts\/[^)]+\.md|motion\/[^)]+\.md)\)/g;

describe('slide-authoring pattern library INDEX', () => {
  it('every INDEX link to layouts/ or motion/ resolves to a file', async () => {
    const indexPath = path.join(PATTERN_ROOT, 'INDEX.md');
    const index = await fs.readFile(indexPath, 'utf8');
    const links = [...index.matchAll(LINK_RE)].map((m) => m[1]);
    expect(links.length).toBeGreaterThanOrEqual(22);
    const missing: string[] = [];
    for (const rel of links) {
      const abs = path.join(PATTERN_ROOT, rel);
      try {
        await fs.access(abs);
      } catch {
        missing.push(rel);
      }
    }
    expect(missing, missing.join('\n')).toEqual([]);
  });

  it('INDEX ids match kit-doc frontmatter ids in catalog files', async () => {
    const index = await fs.readFile(path.join(PATTERN_ROOT, 'INDEX.md'), 'utf8');
    const indexIds = new Set(extractIndexPatternIds(index));
    const files = await listPatternCatalogFiles(PATTERN_ROOT);
    const fileIds = new Set<string>();
    for (const abs of files) {
      const source = await fs.readFile(abs, 'utf8');
      const parsed = parsePatternKitDoc(source);
      expect('error' in parsed ? parsed.error : parsed.id, abs).toBeTruthy();
      if (!('error' in parsed)) fileIds.add(parsed.id);
    }
    expect(indexIds.size).toBe(fileIds.size);
    for (const id of indexIds) {
      expect(fileIds.has(id), `INDEX id missing in catalog: ${id}`).toBe(true);
    }
  });

  it('every catalog file has valid kit-doc: pattern frontmatter', async () => {
    const files = await listPatternCatalogFiles(PATTERN_ROOT);
    const errors: string[] = [];
    const seen = new Set<string>();
    for (const abs of files) {
      const source = await fs.readFile(abs, 'utf8');
      const parsed = parsePatternKitDoc(source);
      if ('error' in parsed) {
        errors.push(`${path.basename(abs)}: ${parsed.error}`);
        continue;
      }
      if (seen.has(parsed.id)) errors.push(`duplicate id: ${parsed.id}`);
      seen.add(parsed.id);
      const stem = path.basename(abs, '.md');
      if (stem !== parsed.id) {
        errors.push(`${stem}.md: id ${parsed.id} must match filename`);
      }
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  it('entry template, schema, and catalog folders exist', async () => {
    await fs.access(path.join(PATTERN_ROOT, '_entry-template.md'));
    await fs.access(path.join(PATTERN_ROOT, 'SCHEMA.md'));
    await fs.access(path.join(PATTERN_ROOT, 'layouts'));
    await fs.access(path.join(PATTERN_ROOT, 'motion'));
  });

  it('FORMAT-GUIDANCE documents slide and 4x5', async () => {
    const guide = await fs.readFile(path.join(PATTERN_ROOT, 'FORMAT-GUIDANCE.md'), 'utf8');
    expect(guide).toContain('4x5');
    expect(guide).toContain('1920');
  });
});

describe('pattern-kit-doc parser', () => {
  it('parses list-style content-keys', () => {
    const doc = parsePatternKitDoc(`---
kit-doc: pattern
id: sample
kind: layout
summary: "Test"
formats: both
content-keys:
  - a.b
  - footerLabel
---
# body`);
    expect('error' in doc).toBe(false);
    if (!('error' in doc)) expect(doc['content-keys']).toEqual(['a.b', 'footerLabel']);
  });
});
