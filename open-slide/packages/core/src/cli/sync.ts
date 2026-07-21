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
  const localSkillsRoot = path.join(cwd, '.agent', 'skills');

  const skillNames = (await readdir(skillsDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const results: DriftEntry[] = [];
  for (const name of skillNames) {
    const src = path.join(skillsDir, name);
    const localCopy = path.join(localSkillsRoot, name);

    const srcHash = await hashDir(src);
    const localHash = existsSync(localCopy) ? await hashDir(localCopy) : null;

    let status: Status;
    if (localHash === null) status = 'added';
    else if (localHash !== srcHash) status = 'updated';
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
  const localSkillsRoot = path.join(cwd, '.agent', 'skills');
  if (!existsSync(localSkillsRoot)) {
    throw new Error(
      'Missing .agent/skills in this workspace. Run `open-slide sync:kit` first (copies .agent from the package).',
    );
  }

  const agentsSkillsDir = path.join(cwd, '.agents', 'skills');
  const claudeSkillsDir = path.join(cwd, '.claude', 'skills');

  const results = await detectSkillsDrift(skillsDir);

  if (results.length === 0) {
    process.stdout.write(chalk.yellow('No skills found to sync.\n'));
    return;
  }

  const skillNames = results.map((r) => r.name);
  for (const name of skillNames) {
    const kitSkill = path.join(localSkillsRoot, name);
    const dst = path.join(agentsSkillsDir, name);

    if (dryRun) continue;
    await linkDirectory(kitSkill, dst);
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
    const localCopy = path.join(cwd, '.agent', 'workflows', name);
    const dst = path.join(cursorCommands, name);
    const srcHash = await hashFile(src);
    let status: Status;
    if (!existsSync(localCopy)) status = 'added';
    else if ((await hashFile(localCopy)) !== srcHash) status = 'updated';
    else if (!existsSync(dst)) status = 'added';
    else {
      try {
        const stat = await lstat(dst);
        if (stat.isSymbolicLink()) {
          const target = await readlink(dst);
          const resolved = path.resolve(path.dirname(dst), target);
          status = resolved === localCopy ? 'unchanged' : 'updated';
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
    const localCopy = path.join(cwd, '.agent', 'agents', name);
    const dst = path.join(cursorAgents, name);
    const srcHash = await hashFile(src);
    let status: Status;
    if (!existsSync(localCopy)) status = 'added';
    else if ((await hashFile(localCopy)) !== srcHash) status = 'updated';
    else if (!existsSync(dst)) status = 'added';
    else {
      try {
        const stat = await lstat(dst);
        if (stat.isSymbolicLink()) {
          const target = await readlink(dst);
          const resolved = path.resolve(path.dirname(dst), target);
          status = resolved === localCopy ? 'unchanged' : 'updated';
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
  const localAgents = path.join(cwd, '.agent', 'agents');

  for (const name of names) {
    const src = path.join(localAgents, name);
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
  const localWorkflows = path.join(cwd, '.agent', 'workflows');

  for (const name of names) {
    const src = path.join(localWorkflows, name);
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

async function syncAgentKitRoot(agentKitDir: string, opts: SyncSkillsOptions = {}): Promise<void> {
  const { dryRun = false } = opts;
  if (!existsSync(agentKitDir)) {
    throw new Error(`Slide kit root missing at ${agentKitDir}. Reinstall @open-slide/core.`);
  }
  const cwd = process.cwd();
  const dst = path.join(cwd, '.agent');
  const srcHash = await hashDir(agentKitDir);
  const dstHash = existsSync(dst) ? await hashDir(dst) : null;
  const status: Status =
    dstHash === null ? 'added' : dstHash !== srcHash ? 'updated' : 'unchanged';

  if (dryRun) {
    process.stdout.write(
      chalk.dim(`Dry run — .agent would be ${status === 'unchanged' ? 'unchanged' : status}\n`),
    );
    return;
  }
  if (status === 'unchanged') return;

  await rm(dst, { recursive: true, force: true });
  await cp(agentKitDir, dst, { recursive: true });
  process.stdout.write(chalk.bold('Synced kit root:\n'));
  process.stdout.write(
    `  ${chalk.green('+')} .agent/ ${chalk.dim('(copy from @open-slide/core/.agent)')}\n`,
  );
}

async function linkDirectory(targetDir: string, linkPath: string): Promise<void> {
  await mkdir(path.dirname(linkPath), { recursive: true });
  const relativeTarget = path.relative(path.dirname(linkPath), targetDir);
  if (existsSync(linkPath)) {
    try {
      const stat = await lstat(linkPath);
      if (stat.isSymbolicLink()) {
        const current = await readlink(linkPath);
        if (path.resolve(path.dirname(linkPath), current) === targetDir) return;
      }
      await rm(linkPath, { recursive: true, force: true });
    } catch {
      await rm(linkPath, { recursive: true, force: true });
    }
  }
  try {
    await symlink(relativeTarget, linkPath, 'dir');
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'EPERM' || code === 'EEXIST') {
      await cp(targetDir, linkPath, { recursive: true });
    } else {
      throw err;
    }
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
  const agentKitDir = path.dirname(dirs.skillsDir);
  await syncAgentKitRoot(agentKitDir, opts);
  await removeLegacyAdapterPaths(opts);
  await syncSkills(dirs.skillsDir, opts);
  await syncWorkflowAdapters(dirs.workflowsDir, opts);
  await syncAgentAdapters(dirs.agentsDir, opts);
  if (!opts.dryRun) {
    process.stdout.write(
      chalk.dim('IDE adapters symlink into workspace .agent/ (not the npm package path).\n'),
    );
  }
}

async function removeLegacyAdapterPaths(opts: SyncSkillsOptions = {}): Promise<void> {
  if (opts.dryRun) return;
  const cwd = process.cwd();
  for (const rel of ['.agents/workflows', '.claude/workflows']) {
    const p = path.join(cwd, rel);
    if (existsSync(p)) await rm(p, { recursive: true, force: true });
  }
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
