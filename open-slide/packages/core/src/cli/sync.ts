import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { cp, lstat, mkdir, readdir, readFile, readlink, rm, symlink } from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

export interface SyncSkillsOptions {
  dryRun?: boolean;
}

export interface SyncKitOptions extends SyncSkillsOptions {
  skillsDir?: string;
  workflowsDir?: string;
}

export type Status = 'added' | 'updated' | 'unchanged';

export interface DriftEntry {
  name: string;
  status: Status;
}

export async function detectSkillsDrift(skillsDir: string): Promise<DriftEntry[]> {
  if (!existsSync(skillsDir)) return [];

  const cwd = process.cwd();
  const agentsSkillsDir = path.join(cwd, '.agents', 'skills');

  const skillNames = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const results: DriftEntry[] = [];
  for (const name of skillNames) {
    const src = path.join(skillsDir, name);
    const dst = path.join(agentsSkillsDir, name);

    const srcHash = await hashDir(src);
    const dstHash = existsSync(dst) ? await hashDir(dst) : null;

    let status: Status;
    if (dstHash === null) status = 'added';
    else if (dstHash !== srcHash) status = 'updated';
    else status = 'unchanged';

    results.push({ name, status });
  }
  return results;
}

export async function syncSkills(skillsDir: string, opts: SyncSkillsOptions = {}): Promise<void> {
  const { dryRun = false } = opts;

  if (!existsSync(skillsDir)) {
    throw new Error(
      `Built-in skills directory missing at ${skillsDir}. The @open-slide/core package may be corrupt — try reinstalling.`,
    );
  }

  const cwd = process.cwd();
  const agentsSkillsDir = path.join(cwd, '.agents', 'skills');
  const claudeSkillsDir = path.join(cwd, '.claude', 'skills');

  const results = await detectSkillsDrift(skillsDir);

  if (results.length === 0) {
    process.stdout.write(chalk.yellow('No skills found to sync.\n'));
    return;
  }

  for (const { name, status } of results) {
    const src = path.join(skillsDir, name);
    const dst = path.join(agentsSkillsDir, name);

    if (dryRun) continue;
    if (status === 'unchanged') {
      await ensureClaudeSymlink(claudeSkillsDir, name);
      continue;
    }

    await mkdir(path.dirname(dst), { recursive: true });
    if (existsSync(dst)) await rm(dst, { recursive: true, force: true });
    await cp(src, dst, { recursive: true });
    await ensureClaudeSymlink(claudeSkillsDir, name);
  }

  printSummary(results, dryRun);
}

export async function listWorkflowFiles(workflowsDir: string): Promise<string[]> {
  if (!existsSync(workflowsDir)) return [];
  return (await readdir(workflowsDir)).filter((name) => name.endsWith('.md')).sort();
}

export async function detectWorkflowDrift(workflowsDir: string): Promise<DriftEntry[]> {
  const names = await listWorkflowFiles(workflowsDir);
  if (names.length === 0) return [];

  const cwd = process.cwd();
  const cursorCommands = path.join(cwd, '.cursor', 'commands');
  const results: DriftEntry[] = [];

  for (const name of names) {
    const src = path.join(workflowsDir, name);
    const dst = path.join(cursorCommands, name);
    const srcHash = await hashFile(src);
    let status: Status;
    if (!existsSync(dst)) status = 'added';
    else {
      try {
        const stat = await lstat(dst);
        if (stat.isSymbolicLink()) {
          const target = await readlink(dst);
          const resolved = path.resolve(path.dirname(dst), target);
          if (resolved === src) {
            status = 'unchanged';
          } else {
            status = 'updated';
          }
        } else {
          const dstHash = await hashFile(dst);
          status = dstHash === srcHash ? 'unchanged' : 'updated';
        }
      } catch {
        status = 'updated';
      }
    }
    results.push({ name: name.replace(/\.md$/, ''), status });
  }
  return results;
}

export async function listAgentFiles(agentsDir: string): Promise<string[]> {
  if (!existsSync(agentsDir)) return [];
  return (await readdir(agentsDir)).filter((name) => name.endsWith('.md')).sort();
}

export async function detectAgentDrift(agentsDir: string): Promise<DriftEntry[]> {
  const names = await listAgentFiles(agentsDir);
  if (names.length === 0) return [];

  const cwd = process.cwd();
  const cursorAgents = path.join(cwd, '.cursor', 'agents');
  const results: DriftEntry[] = [];

  for (const name of names) {
    const src = path.join(agentsDir, name);
    const dst = path.join(cursorAgents, name);
    const srcHash = await hashFile(src);
    let status: Status;
    if (!existsSync(dst)) status = 'added';
    else {
      try {
        const stat = await lstat(dst);
        if (stat.isSymbolicLink()) {
          const target = await readlink(dst);
          const resolved = path.resolve(path.dirname(dst), target);
          status = resolved === src ? 'unchanged' : 'updated';
        } else {
          const dstHash = await hashFile(dst);
          status = dstHash === srcHash ? 'unchanged' : 'updated';
        }
      } catch {
        status = 'updated';
      }
    }
    results.push({ name: name.replace(/\.md$/, ''), status });
  }
  return results;
}

export async function syncAgentAdapters(
  agentsDir: string,
  opts: SyncSkillsOptions = {},
): Promise<void> {
  const { dryRun = false } = opts;
  const names = await listAgentFiles(agentsDir);
  if (names.length === 0) {
    process.stdout.write(chalk.yellow('No agents found to sync.\n'));
    return;
  }

  const cwd = process.cwd();
  const cursorAgents = path.join(cwd, '.cursor', 'agents');
  const claudeAgents = path.join(cwd, '.claude', 'agents');

  for (const name of names) {
    const src = path.join(agentsDir, name);
    if (dryRun) continue;
    await linkWorkflowFile(src, path.join(cursorAgents, name));
    await linkWorkflowFile(src, path.join(claudeAgents, name));
  }

  if (dryRun) {
    process.stdout.write(chalk.bold('Dry run — agents would sync:\n'));
    for (const name of names) {
      process.stdout.write(`  ${chalk.green('+')} ${name}\n`);
    }
    return;
  }

  process.stdout.write(chalk.bold('Synced agent adapters:\n'));
  for (const name of names) {
    process.stdout.write(
      `  ${chalk.green('+')} ${name} ${chalk.dim('(cursor + claude agents)')}\n`,
    );
  }
}

export async function syncWorkflowAdapters(
  workflowsDir: string,
  opts: SyncSkillsOptions = {},
): Promise<void> {
  const { dryRun = false } = opts;
  const names = await listWorkflowFiles(workflowsDir);
  if (names.length === 0) {
    process.stdout.write(chalk.yellow('No workflows found to sync.\n'));
    return;
  }

  const cwd = process.cwd();
  const cursorCommands = path.join(cwd, '.cursor', 'commands');
  const claudeCommands = path.join(cwd, '.claude', 'commands');
  const agentsSkills = path.join(cwd, '.agents', 'skills');

  for (const name of names) {
    const src = path.join(workflowsDir, name);
    const base = name.replace(/\.md$/, '');
    const workflowSkill = `workflow-${base}`;

    if (dryRun) continue;

    await linkWorkflowFile(src, path.join(cursorCommands, name));
    await linkWorkflowFile(src, path.join(claudeCommands, name));

    const skillDir = path.join(agentsSkills, workflowSkill);
    await mkdir(skillDir, { recursive: true });
    const skillLink = path.join(skillDir, 'SKILL.md');
    await linkWorkflowFile(src, skillLink);
  }

  if (dryRun) {
    process.stdout.write(chalk.bold('Dry run — workflows would sync:\n'));
    for (const name of names) {
      process.stdout.write(`  ${chalk.green('+')} ${name}\n`);
    }
    return;
  }

  process.stdout.write(chalk.bold('Synced workflow adapters:\n'));
  for (const name of names) {
    process.stdout.write(
      `  ${chalk.green('+')} ${name} ${chalk.dim('(cursor + claude commands, workflow skill)')}\n`,
    );
  }
}

async function linkWorkflowFile(targetFile: string, linkPath: string): Promise<void> {
  await mkdir(path.dirname(linkPath), { recursive: true });
  const relativeTarget = path.relative(path.dirname(linkPath), targetFile);
  if (existsSync(linkPath)) {
    try {
      const stat = await lstat(linkPath);
      if (stat.isSymbolicLink()) {
        const current = await readlink(linkPath);
        if (path.resolve(path.dirname(linkPath), current) === targetFile) return;
      }
      await rm(linkPath, { recursive: true, force: true });
    } catch {
      await rm(linkPath, { recursive: true, force: true });
    }
  }
  try {
    await symlink(relativeTarget, linkPath, 'file');
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'EPERM' || code === 'EEXIST') {
      await cp(targetFile, linkPath);
    } else {
      throw err;
    }
  }
}

async function hashFile(file: string): Promise<string> {
  const data = await readFile(file);
  return createHash('sha256').update(data).digest('hex');
}

export async function syncKit(
  dirs: { skillsDir: string; workflowsDir: string; agentsDir: string },
  opts: SyncKitOptions = {},
): Promise<void> {
  await syncSkills(dirs.skillsDir, opts);
  await syncWorkflowAdapters(dirs.workflowsDir, opts);
  await syncAgentAdapters(dirs.agentsDir, opts);
}

async function ensureClaudeSymlink(claudeSkillsDir: string, name: string): Promise<void> {
  await mkdir(claudeSkillsDir, { recursive: true });
  const linkPath = path.join(claudeSkillsDir, name);
  const target = path.join('..', '..', '.agents', 'skills', name);

  if (existsSync(linkPath)) {
    try {
      const stat = await lstat(linkPath);
      if (stat.isSymbolicLink()) {
        const current = await readlink(linkPath);
        if (current === target) return;
      }
      await rm(linkPath, { recursive: true, force: true });
    } catch {
      await rm(linkPath, { recursive: true, force: true });
    }
  }

  try {
    await symlink(target, linkPath, 'dir');
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'EPERM' || code === 'EEXIST') {
      const absoluteTarget = path.resolve(claudeSkillsDir, target);
      await cp(absoluteTarget, linkPath, { recursive: true });
    } else {
      throw err;
    }
  }
}

async function hashDir(dir: string): Promise<string> {
  const hash = createHash('sha256');
  const files = await collectFiles(dir);
  files.sort();
  for (const rel of files) {
    const abs = path.join(dir, rel);
    const data = await readFile(abs);
    hash.update(rel);
    hash.update('\0');
    hash.update(data);
    hash.update('\0');
  }
  return hash.digest('hex');
}

async function collectFiles(dir: string, prefix = ''): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      out.push(...(await collectFiles(path.join(dir, entry.name), rel)));
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
  return out;
}

function printSummary(results: Array<{ name: string; status: Status }>, dryRun: boolean): void {
  const symbols: Record<Status, string> = {
    added: chalk.green('+'),
    updated: chalk.yellow('~'),
    unchanged: chalk.dim('='),
  };
  const labels: Record<Status, string> = {
    added: chalk.green('added'),
    updated: chalk.yellow('updated'),
    unchanged: chalk.dim('unchanged'),
  };

  const header = dryRun
    ? chalk.bold('Dry run — no files written:')
    : chalk.bold('Synced built-in skills:');
  process.stdout.write(`${header}\n`);
  for (const { name, status } of results) {
    process.stdout.write(`  ${symbols[status]} ${name} ${chalk.dim(`(${labels[status]})`)}\n`);
  }
  const counts = results.reduce<Record<Status, number>>(
    (acc, { status }) => {
      acc[status] += 1;
      return acc;
    },
    { added: 0, updated: 0, unchanged: 0 },
  );
  process.stdout.write(
    chalk.dim(
      `\n${counts.added} added, ${counts.updated} updated, ${counts.unchanged} unchanged.\n`,
    ),
  );
}
