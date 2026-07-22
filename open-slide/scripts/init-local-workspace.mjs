#!/usr/bin/env node
/**
 * Scaffold a slide workspace from the monorepo — no npx / npm registry.
 * Uses packages/cli template + links @open-slide/core from packages/core.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CORE_PKG = join(REPO_ROOT, 'packages', 'core');
const CLI_BIN = join(REPO_ROOT, 'packages', 'cli', 'dist', 'cli.js');

function run(cmd, args, cwd = REPO_ROOT) {
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function usage() {
  process.stderr.write(`Usage: pnpm init:slides [--force] [dir]

  dir   Target path (default: apps/slides). Bare names become apps/<name>.

Examples:
  pnpm init:slides              → apps/slides (workspace:*)
  pnpm init:slides pitch        → apps/pitch
  pnpm init:slides -- ../meus-slides   → outside repo (file:…/packages/core)

No npx. Builds @open-slide/cli from source, then open-slide init.
`);
}

const argv = process.argv.slice(2);
if (argv.includes('-h') || argv.includes('--help')) {
  usage();
  process.exit(0);
}

const force = argv.includes('--force');
const positional = argv.filter((a) => a !== '--force');
const dirArg = positional[0] ?? 'apps/slides';

let targetRel = dirArg;
if (!dirArg.includes('/') && !dirArg.startsWith('.')) {
  targetRel = `apps/${dirArg}`;
}

const normalizedRel = targetRel.replace(/\\/g, '/');
const inMonorepoApps = normalizedRel.startsWith('apps/') && !normalizedRel.includes('..');
const targetAbs = resolve(REPO_ROOT, targetRel);

if (!existsSync(CLI_BIN)) {
  process.stderr.write('CLI not built yet; building @open-slide/cli…\n');
}
run('pnpm', ['--filter', '@open-slide/cli', 'build']);

const initArgs = ['init', targetRel, '--use-pnpm', '--no-install', '--no-git'];
if (force) initArgs.push('--force');
run('node', [CLI_BIN, ...initArgs]);

const pkgPath = join(targetAbs, 'package.json');
if (!existsSync(pkgPath)) {
  process.stderr.write(`error: expected ${pkgPath} after init\n`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = pkg.name ?? basename(targetAbs);
pkg.private = true;
pkg.dependencies ??= {};
if (inMonorepoApps) {
  pkg.dependencies['@open-slide/core'] = 'workspace:*';
} else {
  let relToCore = relative(dirname(pkgPath), CORE_PKG).replace(/\\/g, '/');
  if (!relToCore.startsWith('.')) relToCore = `./${relToCore}`;
  pkg.dependencies['@open-slide/core'] = `file:${relToCore}`;
}

pkg.scripts ??= {};
pkg.scripts.dev =
  'pnpm -w build:core && bash ../../scripts/sync-slide-kit-adapters.sh . && open-slide dev';
pkg.scripts['sync:kit'] = 'bash ../../scripts/sync-slide-kit-adapters.sh .';
pkg.scripts.build = pkg.scripts.build ?? 'open-slide build';
pkg.scripts.preview = pkg.scripts.preview ?? 'open-slide preview';

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

const filterName = pkg.name;
process.stdout.write(`
✔ Local workspace: ${targetAbs}
✔ @open-slide/core → ${pkg.dependencies['@open-slide/core']} (not from npm registry)

Next:
  pnpm install
  pnpm --filter ${filterName} exec open-slide sync:kit
  pnpm --filter ${filterName} dev

Open this folder (or the monorepo root) in Cursor; kit lives in .agent/ after sync:kit.
`);