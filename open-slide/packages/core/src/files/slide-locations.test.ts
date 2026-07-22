import { describe, expect, it } from 'vitest';
import {
  getBundledExamplesDir,
  resolveExamplesAbsoluteRoot,
} from './slide-locations.ts';
import { existsSync } from 'node:fs';
import path from 'node:path';

describe('resolveExamplesAbsoluteRoot', () => {
  it('uses bundled examples when config omits examplesDir', () => {
    const root = resolveExamplesAbsoluteRoot('/tmp/workspace', undefined);
    expect(root).toBe(getBundledExamplesDir());
    expect(existsSync(root!)).toBe(true);
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
