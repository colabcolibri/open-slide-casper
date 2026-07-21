import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { listThemeCatalog, parseThemeMarkdown } from './catalog.ts';

describe('parseThemeMarkdown', () => {
  it('reads name, description, mode from frontmatter', () => {
    const raw = `---
name: Ocean Glass
description: Frosted blues
mode: dark
---
# Palette
`;
    const { frontmatter, body } = parseThemeMarkdown(raw, 'ocean-glass');
    expect(frontmatter).toEqual({
      name: 'Ocean Glass',
      description: 'Frosted blues',
      mode: 'dark',
    });
    expect(body).toContain('# Palette');
  });

  it('falls back to theme id when name is missing', () => {
    const { frontmatter } = parseThemeMarkdown('no frontmatter', 'fallback-id');
    expect(frontmatter.name).toBe('fallback-id');
    expect(frontmatter.description).toBe('');
  });
});

describe('listThemeCatalog', () => {
  it('lists demo themes with frontmatter fields', async () => {
    const demoRoot = fileURLToPath(new URL('../../../../apps/demo', import.meta.url));
    const catalog = await listThemeCatalog(demoRoot, 'themes');
    expect(catalog.length).toBeGreaterThanOrEqual(6);
    const ocean = catalog.find((t) => t.id === 'ocean-glass');
    expect(ocean?.name).toBeTruthy();
    expect(ocean?.description).toBeTruthy();
  });
});
