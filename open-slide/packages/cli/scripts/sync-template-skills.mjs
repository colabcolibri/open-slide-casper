import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CORE_ROOT = path.resolve(HERE, '..', '..', 'core');
const CORE_AGENT = path.join(CORE_ROOT, '.agent');
const CORE_SKILLS = path.join(CORE_AGENT, 'skills');
const CORE_WORKFLOWS = path.join(CORE_AGENT, 'workflows');
const TEMPLATE_AGENTS = path.resolve(HERE, '..', 'template', '.agents');
const TEMPLATE_SKILLS = path.join(TEMPLATE_AGENTS, 'skills');
const TEMPLATE_WORKFLOWS = path.join(TEMPLATE_AGENTS, 'workflows');

async function mirrorDir(srcDir, dstDir, label) {
  if (!existsSync(srcDir)) {
    throw new Error(`Canonical ${label} not found at ${srcDir}.`);
  }

  const names = (await readdir(srcDir, { withFileTypes: true }))
    .filter(
      (e) => e.isDirectory() || (label === 'workflows' && e.isFile() && e.name.endsWith('.md')),
    )
    .map((e) => e.name)
    .sort();

  await mkdir(dstDir, { recursive: true });
  for (const entry of await readdir(dstDir)) {
    await rm(path.join(dstDir, entry), { recursive: true, force: true });
  }

  if (label === 'workflows') {
    const files = (await readdir(srcDir)).filter((n) => n.endsWith('.md')).sort();
    for (const name of files) {
      await cp(path.join(srcDir, name), path.join(dstDir, name));
    }
    process.stdout.write(`Mirrored ${files.length} workflows into template/.agents/workflows/.\n`);
    return;
  }

  for (const name of names) {
    await cp(path.join(srcDir, name), path.join(dstDir, name), { recursive: true });
  }
  process.stdout.write(`Mirrored ${names.length} skills into template/.agents/skills/.\n`);
}

async function main() {
  await mirrorDir(CORE_SKILLS, TEMPLATE_SKILLS, 'skills');
  await mirrorDir(CORE_WORKFLOWS, TEMPLATE_WORKFLOWS, 'workflows');
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`error: ${message}\n`);
  process.exit(1);
});
