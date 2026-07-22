import path from 'node:path';
import { SLIDE_ID_RE } from '../editing/slide-ops.ts';

export type SlideCollection = 'slides' | 'examples';

export const DEFAULT_EXAMPLES_DIR = 'examples';

export function resolveExamplesDir(configExamplesDir: string | false | undefined): string | null {
  if (configExamplesDir === false) return null;
  const dir = configExamplesDir ?? DEFAULT_EXAMPLES_DIR;
  if (!dir.trim()) return null;
  return dir;
}

export function slideEntryRelativePath(slideId: string): string {
  return path.join(slideId, 'index.tsx');
}

export function resolveSlidePathInDir(
  rootDir: string,
  slideId: string,
): string | null {
  if (!SLIDE_ID_RE.test(slideId)) return null;
  const root = path.resolve(rootDir);
  const full = path.resolve(root, slideId, 'index.tsx');
  if (!full.startsWith(root + path.sep)) return null;
  return full;
}

export type SlidePathResolution = {
  collection: SlideCollection;
  absolutePath: string;
  relativeDir: string;
};

export function resolveSlidePathFromRoots(
  userCwd: string,
  slidesDir: string,
  examplesDir: string | false | undefined,
  slideId: string,
): SlidePathResolution | null {
  if (!SLIDE_ID_RE.test(slideId)) return null;
  const slidesRoot = path.resolve(userCwd, slidesDir);
  const inSlides = resolveSlidePathInDir(slidesRoot, slideId);
  if (inSlides) {
    return { collection: 'slides', absolutePath: inSlides, relativeDir: slidesDir };
  }
  const exDir = resolveExamplesDir(examplesDir);
  if (!exDir) return null;
  const examplesRoot = path.resolve(userCwd, exDir);
  const inExamples = resolveSlidePathInDir(examplesRoot, slideId);
  if (inExamples) {
    return { collection: 'examples', absolutePath: inExamples, relativeDir: exDir };
  }
  return null;
}

export function isExampleSlideId(
  slideId: string,
  exampleSlideIds: readonly string[],
): boolean {
  return exampleSlideIds.includes(slideId);
}
