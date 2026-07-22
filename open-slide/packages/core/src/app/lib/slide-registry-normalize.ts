import type { SlideCollection } from '@/lib/slide-collection';

/** Shape of `virtual:open-slide/slides` — extra fields optional for older generated snapshots. */
export type SlidesVirtualModule = {
  slideIds: string[];
  exampleSlideIds?: string[];
  slideCollections?: Record<string, SlideCollection>;
  slideThemes: Record<string, string>;
  slideCreatedAt: Record<string, number>;
};

export function normalizeSlideRegistry(mod: SlidesVirtualModule) {
  const slideIds = [...mod.slideIds];
  const exampleSlideIds = mod.exampleSlideIds ? [...mod.exampleSlideIds] : [];
  const slideThemes = { ...mod.slideThemes };
  const slideCreatedAt = { ...mod.slideCreatedAt };

  let slideCollections: Record<string, SlideCollection> = mod.slideCollections
    ? { ...mod.slideCollections }
    : {};
  if (
    Object.keys(slideCollections).length === 0 &&
    (slideIds.length > 0 || exampleSlideIds.length > 0)
  ) {
    slideCollections = {};
    for (const id of slideIds) slideCollections[id] = 'slides';
    for (const id of exampleSlideIds) slideCollections[id] = 'examples';
  }

  return {
    slideIds,
    exampleSlideIds,
    slideCollections,
    slideThemes,
    slideCreatedAt,
  };
}
