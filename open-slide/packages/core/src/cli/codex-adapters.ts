import { existsSync } from 'node:fs';
import { lstat, mkdir, readdir, readFile, readlink, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { linkWorkflowFile, listAgentFiles } from './sync.ts';

const GENERATED_MARKER = '# open-slide-kit-generated';

export interface CodexSyncOptions {
  dryRun?: boolean;
}

function parseFrontmatterField(content: string, field: string): string {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return '';
  const block = match[1];
  const line = block
    .split('\n')
    .find((l) => l.startsWith(`${field}:`) || l.startsWith(`${field} `));
  if (!line) return '';
  let value = line.replace(new RegExp(`^${field}\\s*:\\s*`), '').trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return value;
}

function tomlEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function writeCodexAgentToml(agentFile: string, outFile: string, dryRun: boolean): Promise<void> {
  const raw = await readFile(agentFile, 'utf8');
  const name = parseFrontmatterField(raw, 'name') || path.basename(agentFile, '.md');
  const description =
    parseFrontmatterField(raw, 'description') || `open-slide agent ${name}`;

  if (dryRun) return;

  await mkdir(path.dirname(outFile), { recursive: true });
  const body = `${GENERATED_MARKER}
name = "${tomlEscape(name)}"
description = "${tomlEscape(description)}"
developer_instructions = """
Follow the slide kit agent at .agent/agents/${name}.md.
Read that file fully before acting. Skills in its frontmatter apply.
Protocol: .agent/SLIDE-KIT.md
"""
`;
  await writeFile(outFile, body, 'utf8');
}

async function isKitGeneratedToml(file: string): Promise<boolean> {
  try {
    const head = (await readFile(file, 'utf8')).split('\n', 1)[0];
    return head === GENERATED_MARKER;
  } catch {
    return false;
  }
}

async function linkAgentsMdIfSafe(src: string, dest: string, dryRun: boolean): Promise<void> {
  if (existsSync(dest)) {
    try {
      const stat = await lstat(dest);
      if (stat.isSymbolicLink()) {
        const current = await readlink(dest);
        const resolved = path.resolve(path.dirname(dest), current);
        if (resolved === src) return;
        if (!dryRun) await rm(dest, { force: true });
      } else {
        return;
      }
    } catch {
      return;
    }
  }
  if (dryRun) return;
  await linkWorkflowFile(src, dest);
}

export async function syncCodexAdapters(
  agentsDir: string,
  opts: CodexSyncOptions = {},
): Promise<void> {
  const { dryRun = false } = opts;
  const cwd = process.cwd();
  const localAgents = path.join(cwd, '.agent', 'agents');
  const codexRoot = path.join(cwd, '.codex');
  const codexAgents = path.join(codexRoot, 'agents');
  const slideKit = path.join(cwd, '.agent', 'SLIDE-KIT.md');
  const agentsMdSrc = path.join(cwd, '.agent', 'rules', 'AGENTS.md');

  const names = await listAgentFiles(agentsDir);
  if (names.length === 0) return;

  for (const name of names) {
    const agentFile = path.join(localAgents, name);
    const toml = path.join(codexAgents, `${name.replace(/\.md$/, '')}.toml`);
    if (!existsSync(agentFile)) continue;
    await writeCodexAgentToml(agentFile, toml, dryRun);
  }

  if (!dryRun) {
    await mkdir(codexRoot, { recursive: true });
    if (existsSync(slideKit)) {
      await linkWorkflowFile(slideKit, path.join(codexRoot, 'README.md'));
    }
    if (existsSync(agentsMdSrc)) {
      await linkAgentsMdIfSafe(agentsMdSrc, path.join(cwd, 'AGENTS.md'), dryRun);
    }

    const entries = await readdir(codexAgents).catch(() => [] as string[]);
    for (const file of entries) {
      if (!file.endsWith('.toml')) continue;
      const full = path.join(codexAgents, file);
      if (!(await isKitGeneratedToml(full))) continue;
      const base = file.replace(/\.toml$/, '.md');
      if (!names.includes(base)) await rm(full, { force: true });
    }
  }
}
