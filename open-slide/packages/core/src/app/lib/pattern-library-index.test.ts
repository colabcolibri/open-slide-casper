import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

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

  it('entry template and catalog folders exist', async () => {
    await fs.access(path.join(PATTERN_ROOT, '_entry-template.md'));
    await fs.access(path.join(PATTERN_ROOT, 'layouts'));
    await fs.access(path.join(PATTERN_ROOT, 'motion'));
  });

  it('FORMAT-GUIDANCE documents slide and 4x5', async () => {
    const guide = await fs.readFile(path.join(PATTERN_ROOT, 'FORMAT-GUIDANCE.md'), 'utf8');
    expect(guide).toContain('4x5');
    expect(guide).toContain('1920');
  });
});
