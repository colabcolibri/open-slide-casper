import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const CATALOG_ROOT = path.resolve(
  PKG_ROOT,
  '.agent/skills/infographic-catalog/references',
);

describe('slide-authoring infographic catalog', () => {
  it('catalog.json lists 39 layouts and 56 styles with resolvable md and preview', async () => {
    const catalogPath = path.join(CATALOG_ROOT, 'catalog.json');
    const raw = await fs.readFile(catalogPath, 'utf8');
    const catalog = JSON.parse(raw) as {
      layouts: Array<{
        id: string;
        promptMarkdown: string;
        preview: string | null;
      }>;
      styles: Array<{
        id: string;
        promptMarkdown: string;
        preview: string | null;
      }>;
    };

    expect(catalog.layouts).toHaveLength(39);
    expect(catalog.styles).toHaveLength(56);

    const missing: string[] = [];
    for (const entry of [...catalog.layouts, ...catalog.styles]) {
      const md = path.join(CATALOG_ROOT, entry.promptMarkdown);
      try {
        await fs.access(md);
      } catch {
        missing.push(`md:${entry.promptMarkdown}`);
      }
      if (!entry.preview) {
        missing.push(`preview:${entry.id}`);
        continue;
      }
      const img = path.join(CATALOG_ROOT, entry.preview);
      try {
        await fs.access(img);
      } catch {
        missing.push(`img:${entry.preview}`);
      }
    }
    expect(missing, missing.join('\n')).toEqual([]);
  });

  it('aspect-ratios.json lists 14 canvas ratios', async () => {
    const raw = await fs.readFile(path.join(CATALOG_ROOT, 'aspect-ratios.json'), 'utf8');
    const data = JSON.parse(raw) as { ratios: unknown[] };
    expect(data.ratios).toHaveLength(14);
    await fs.access(path.join(CATALOG_ROOT, 'aspect-ratios.md'));
  });

  it('INDEX and prompt-assembly docs exist', async () => {
    await fs.access(path.join(CATALOG_ROOT, 'INDEX.md'));
    await fs.access(path.join(CATALOG_ROOT, 'prompt-assembly.md'));
    await fs.access(path.join(CATALOG_ROOT, 'README.md'));
  });
});
