import { readFile } from 'node:fs/promises';
import path from 'node:path';
import * as readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command, Option } from 'commander';
import { detectAgentDrift, detectSkillsDrift, detectWorkflowDrift, syncKit } from './sync.ts';

async function readVersion(): Promise<string> {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // dist/cli/bin.js → ../../package.json
  const pkgPath = path.resolve(here, '..', '..', 'package.json');
  const raw = await readFile(pkgPath, 'utf8');
  return (JSON.parse(raw) as { version: string }).version;
}

export function parsePort(value: string): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 65535) {
    throw new Error(`Invalid port: ${value}`);
  }
  return n;
}

interface ServerFlags {
  port?: number;
  host?: string | boolean;
  open?: boolean;
}

interface DevFlags extends ServerFlags {
  skillsCheck?: boolean;
}

async function runSkillsDriftCheck(
  skillsDir: string,
  workflowsDir: string,
  agentsDir: string,
): Promise<void> {
  if (process.env.OPEN_SLIDE_SKIP_SKILLS_CHECK === '1') return;

  let skillDrift: Awaited<ReturnType<typeof detectSkillsDrift>>;
  let workflowDrift: Awaited<ReturnType<typeof detectWorkflowDrift>>;
  let agentDrift: Awaited<ReturnType<typeof detectAgentDrift>>;
  try {
    skillDrift = await detectSkillsDrift(skillsDir);
    workflowDrift = await detectWorkflowDrift(workflowsDir);
    agentDrift = await detectAgentDrift(agentsDir);
  } catch {
    return;
  }
  const stale = [
    ...skillDrift.filter((d) => d.status !== 'unchanged'),
    ...workflowDrift.filter((d) => d.status !== 'unchanged'),
    ...agentDrift.filter((d) => d.status !== 'unchanged'),
  ];
  if (stale.length === 0) return;

  const names = stale.map((d) => d.name).join(', ');
  const interactive = Boolean(process.stdin.isTTY && process.stdout.isTTY);

  if (!interactive) {
    process.stderr.write(
      `${chalk.yellow('!')} Slide kit out of date (${names}). Run \`open-slide sync:kit\` to update.\n`,
    );
    return;
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = (
      await rl.question(
        `${chalk.yellow('!')} Slide kit out of date: ${chalk.bold(names)}. Sync now? ${chalk.dim('(Y/n) ')}`,
      )
    )
      .trim()
      .toLowerCase();
    if (answer === '' || answer === 'y' || answer === 'yes') {
      await syncKit({ skillsDir, workflowsDir, agentsDir });
    } else {
      process.stdout.write(chalk.dim('Skipped. Run `open-slide sync:kit` later to update.\n'));
    }
  } finally {
    rl.close();
  }
}

interface BuildFlags {
  outDir?: string;
}

interface SyncFlags {
  dryRun?: boolean;
}

function resolveBuiltinAgentKitDir(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, '..', '..', '.agent');
}

function resolveBuiltinSkillsDir(): string {
  return path.join(resolveBuiltinAgentKitDir(), 'skills');
}

function resolveBuiltinWorkflowsDir(): string {
  return path.join(resolveBuiltinAgentKitDir(), 'workflows');
}

function resolveBuiltinAgentsDir(): string {
  return path.join(resolveBuiltinAgentKitDir(), 'agents');
}

export async function run(argv: string[]): Promise<void> {
  const version = await readVersion();

  const program = new Command();
  program
    .name('open-slide')
    .description('Author slides — we handle the Vite/React stack.')
    .version(version, '-v, --version', 'print version')
    .helpOption('-h, --help', 'show help')
    .showHelpAfterError(chalk.dim('(run `open-slide --help` for usage)'));

  program
    .command('dev')
    .description('Start the dev server')
    .addOption(new Option('-p, --port <port>', 'port to listen on').argParser(parsePort))
    .addOption(new Option('--host [host]', 'expose on the network (optional host)'))
    .option('--open', 'open the browser on start')
    .option('--no-skills-check', 'skip the built-in skills drift check')
    .action(async (flags: DevFlags) => {
      if (flags.skillsCheck !== false) {
        await runSkillsDriftCheck(
          resolveBuiltinSkillsDir(),
          resolveBuiltinWorkflowsDir(),
          resolveBuiltinAgentsDir(),
        );
      }
      const { dev } = await import('./dev.ts');
      await dev(flags);
    });

  program
    .command('build')
    .description('Build a static site')
    .option('--out-dir <dir>', 'output directory (defaults to `dist`)')
    .action(async (flags: BuildFlags) => {
      const { build } = await import('./build.ts');
      await build(flags);
    });

  program
    .command('preview')
    .description('Preview the production build')
    .addOption(new Option('-p, --port <port>', 'port to listen on').argParser(parsePort))
    .addOption(new Option('--host [host]', 'expose on the network (optional host)'))
    .option('--open', 'open the browser on start')
    .action(async (flags: ServerFlags) => {
      const { preview } = await import('./preview.ts');
      await preview(flags);
    });

  program
    .command('sync:skills')
    .description('Sync slide kit into this workspace (alias for sync:kit)')
    .option('--dry-run', 'show what would change without writing')
    .action(async (flags: SyncFlags) => {
      const { syncKit } = await import('./sync.ts');
      await syncKit(
        {
          skillsDir: resolveBuiltinSkillsDir(),
          workflowsDir: resolveBuiltinWorkflowsDir(),
          agentsDir: resolveBuiltinAgentsDir(),
        },
        flags,
      );
    });

  program
    .command('sync:kit')
    .description('Sync built-in slide kit (skills, workflow commands, agents) into this workspace')
    .option('--dry-run', 'show what would change without writing')
    .action(async (flags: SyncFlags) => {
      const { syncKit } = await import('./sync.ts');
      await syncKit(
        {
          skillsDir: resolveBuiltinSkillsDir(),
          workflowsDir: resolveBuiltinWorkflowsDir(),
          agentsDir: resolveBuiltinAgentsDir(),
        },
        flags,
      );
    });

  const themes = program.command('themes').description('Theme catalog (filesystem registry)');

  themes
    .command('list')
    .description('Print theme ids and frontmatter (name, description, mode) — for agents and pickers')
    .option('--json', 'JSON array (recommended for agents)')
    .action(async (flags: { json?: boolean }) => {
      const { themesList } = await import('./themes-list.ts');
      await themesList({ format: flags.json ? 'json' : 'table' });
    });

  await program.parseAsync(argv, { from: 'user' });
}
