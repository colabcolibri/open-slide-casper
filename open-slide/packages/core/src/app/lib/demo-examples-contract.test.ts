import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { describe, expect, it } from 'vitest';
import { evaluateAuthoringContract } from './authoring-contract.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const BUNDLED_EXAMPLES = path.join(PKG_ROOT, 'examples');

describe('bundled design examples authoring contract', () => {
  it('every @open-slide/core/examples deck is full contract', async () => {
    const entries = await fg('*/index.tsx', {
      cwd: BUNDLED_EXAMPLES,
      absolute: true,
      onlyFiles: true,
    });
    expect(entries.length).toBeGreaterThan(0);
    const failures: string[] = [];
    for (const file of entries) {
      const source = await fs.readFile(file, 'utf8');
      const result = evaluateAuthoringContract(source);
      if (result.level !== 'full') {
        failures.push(`${path.basename(path.dirname(file))}: ${result.reasons.join('; ')}`);
      }
    }
    expect(failures, failures.join('\n')).toEqual([]);
  });
});
