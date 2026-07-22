export type SlideCollection = 'slides' | 'examples';

export function isExampleSlide(
  slideId: string,
  collections: Record<string, SlideCollection>,
): boolean {
  return collections[slideId] === 'examples';
}
