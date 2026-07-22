import type { ServerResponse } from 'node:http';
import path from 'node:path';
import type { Connect } from 'vite';
import {
  resolveExamplesAbsoluteRoot,
  resolveExamplesDir,
  resolveSlidePathFromRoots,
  type SlideCollection,
} from '../../files/slide-locations.ts';

export type ApiContext = {
  userCwd: string;
  slidesDir: string;
  slidesRoot: string;
  examplesDir: string | null;
  examplesRoot: string | null;
  globalAssetsRoot: string;
  manifestPath: string;
  coreVersion: string;
  resolveSlideEntry: (slideId: string) => string | null;
  slideCollection: (slideId: string) => SlideCollection | null;
};

export type ApiPluginOptions = {
  userCwd: string;
  slidesDir?: string;
  examplesDir?: string | false;
  assetsDir?: string;
  coreVersion: string;
};

export function makeContext(opts: ApiPluginOptions): ApiContext {
  const userCwd = opts.userCwd;
  const slidesDir = opts.slidesDir ?? 'slides';
  const assetsDir = opts.assetsDir ?? 'assets';
  const examplesDir = resolveExamplesDir(opts.examplesDir);
  const slidesRoot = path.resolve(userCwd, slidesDir);
  const examplesRoot = resolveExamplesAbsoluteRoot(userCwd, opts.examplesDir);
  const globalAssetsRoot = path.resolve(userCwd, assetsDir);
  const manifestPath = path.join(slidesRoot, '.folders.json');
  const resolveSlideEntry = (slideId: string) =>
    resolveSlidePathFromRoots(userCwd, slidesDir, opts.examplesDir, slideId)?.absolutePath ??
    null;
  const slideCollection = (slideId: string) =>
    resolveSlidePathFromRoots(userCwd, slidesDir, opts.examplesDir, slideId)?.collection ?? null;
  return {
    userCwd,
    slidesDir,
    slidesRoot,
    examplesDir,
    examplesRoot,
    globalAssetsRoot,
    manifestPath,
    coreVersion: opts.coreVersion,
    resolveSlideEntry,
    slideCollection,
  };
}

export async function readBody(req: Connect.IncomingMessage): Promise<unknown> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(body));
}

export function resolveSlidePath(
  userCwd: string,
  slidesDir: string,
  slideId: string,
  examplesDir?: string | false,
): string | null {
  return (
    resolveSlidePathFromRoots(userCwd, slidesDir, examplesDir, slideId)?.absolutePath ?? null
  );
}

export function resolveSlideEntryPath(ctx: ApiContext, slideId: string): string | null {
  return ctx.resolveSlideEntry(slideId);
}

export function exampleSlideMutationBlocked(
  ctx: ApiContext,
  slideId: string,
): { blocked: true; error: string } | { blocked: false } {
  if (ctx.slideCollection(slideId) === 'examples') {
    return { blocked: true, error: 'example decks are read-only in the dev UI' };
  }
  return { blocked: false };
}
