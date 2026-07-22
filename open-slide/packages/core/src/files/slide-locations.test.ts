import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  getBundledExamplesDir,
  resolveExamplesAbsoluteRoot,
} from './slide-locations.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

describe('resolveExamplesAbsoluteRoot', () => {
  it('uses bundled examples when config omits examplesDir', () => {
    const root = resolveExamplesAbsoluteRoot('/tmp/workspace', undefined);
    expect(root).toBe(getBundledExamplesDir());
    expect(root).toBe(path.join(PKG_ROOT, 'examples'));
  });

  it('returns null when examples are disabled', () => {
    expect(resolveExamplesAbsoluteRoot('/tmp/workspace', false)).toBeNull();
  });

  it('resolves a project-relative override under userCwd', () => {
    expect(resolveExamplesAbsoluteRoot('/tmp/workspace', 'my-examples')).toBe(
      path.resolve('/tmp/workspace', 'my-examples'),
    );
  });
});
