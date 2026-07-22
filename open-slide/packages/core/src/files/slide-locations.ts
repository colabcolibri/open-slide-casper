import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLIDE_ID_RE } from '../editing/slide-ops.ts';

export type SlideCollection = 'slides' | 'examples';

export const DEFAULT_EXAMPLES_DIR = 'examples';

let cachedCorePackageRoot: string | null = null;

function findPackageRoot(fromFile: string): string {
  let dir = path.dirname(fromFile);
  while (dir !== path.dirname(dir)) {
    if (existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  throw new Error(`Could not find package.json walking up from ${fromFile}`);
}

/** Package root of `@open-slide/core` (src, dist chunks, and published tarball). */
export function getCorePackageRoot(): string {
  if (cachedCorePackageRoot) return cachedCorePackageRoot;
  cachedCorePackageRoot = findPackageRoot(fileURLToPath(import.meta.url));
  return cachedCorePackageRoot;
}

export function getBundledExamplesDir(): string {
  return path.join(getCorePackageRoot(), DEFAULT_EXAMPLES_DIR);
}

export function resolveExamplesDir(configExamplesDir: string | false | undefined): string | null {
  if (configExamplesDir === false) return null;
  const dir = configExamplesDir ?? DEFAULT_EXAMPLES_DIR;
  if (!dir.trim()) return null;
  return dir;
}

/** Absolute path to the examples tree (bundled in core when config omits `examplesDir`). */
export function resolveExamplesAbsoluteRoot(
  userCwd: string,
  configExamplesDir: string | false | undefined,
): string | null {
  if (configExamplesDir === false) return null;
  if (configExamplesDir === undefined) {
    const bundled = getBundledExamplesDir();
    return existsSync(bundled) ? bundled : null;
  }
  const dir = configExamplesDir.trim();
  if (!dir) return null;
  if (path.isAbsolute(dir)) return dir;
  return path.resolve(userCwd, dir);
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
  const examplesRoot = resolveExamplesAbsoluteRoot(userCwd, examplesDir);
  if (!examplesRoot) return null;
  const inExamples = resolveSlidePathInDir(examplesRoot, slideId);
  if (inExamples) {
    const relativeDir =
      typeof examplesDir === 'string' && examplesDir.trim()
        ? examplesDir
        : DEFAULT_EXAMPLES_DIR;
    return { collection: 'examples', absolutePath: inExamples, relativeDir };
  }
  return null;
}

export function isExampleSlideId(
  slideId: string,
  exampleSlideIds: readonly string[],
): boolean {
  return exampleSlideIds.includes(slideId);
}
