import { describe, expect, it } from 'vitest';
import { normalizeSlideRegistry } from './slide-registry-normalize.ts';

describe('normalizeSlideRegistry', () => {
  it('derives collections when only legacy exports exist', () => {
    const out = normalizeSlideRegistry({
      slideIds: ['a'],
      slideThemes: {},
      slideCreatedAt: {},
    });
    expect(out.exampleSlideIds).toEqual([]);
    expect(out.slideCollections).toEqual({ a: 'slides' });
  });

  it('keeps explicit example ids and collections', () => {
    const out = normalizeSlideRegistry({
      slideIds: ['mine'],
      exampleSlideIds: ['demo'],
      slideCollections: { mine: 'slides', demo: 'examples' },
      slideThemes: {},
      slideCreatedAt: {},
    });
    expect(out.exampleSlideIds).toEqual(['demo']);
    expect(out.slideCollections.demo).toBe('examples');
  });
});
