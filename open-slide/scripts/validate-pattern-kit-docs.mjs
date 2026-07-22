#!/usr/bin/env node
/** Validates pattern-library kit-doc frontmatter (runs Vitest). */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OPEN_SLIDE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const result = spawnSync(
  'pnpm',
  ['exec', 'vitest', 'run', 'packages/core/src/app/lib/pattern-library-index.test.ts'],
  { cwd: OPEN_SLIDE_ROOT, stdio: 'inherit' },
);

process.exit(result.status === 0 ? 0 : 1);
