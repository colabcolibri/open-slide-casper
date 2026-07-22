import path from 'node:path';
import chalk from 'chalk';
import { listThemeCatalog, type ThemeCatalogEntry } from '../themes/catalog.ts';
import { loadUserConfig } from '../vite/open-slide-plugin.ts';

export type ThemesListFormat = 'json' | 'table';

export type ThemesListOptions = {
  cwd?: string;
  format?: ThemesListFormat;
};

function formatTable(entries: ThemeCatalogEntry[]): string {
  if (entries.length === 0) {
    return 'No themes found. Add themes/<id>.md or check open-slide.config.ts themesDir.';
  }
  const lines = ['id\tname\tdescription\tmode\thasDemo'];
  for (const e of entries) {
    lines.push([e.id, e.name, e.description, e.mode ?? '', e.hasDemo ? 'yes' : 'no'].join('\t'));
  }
  return `${lines.join('\n')}\n`;
}

export async function themesList(opts: ThemesListOptions = {}): Promise<void> {
  const cwd = path.resolve(opts.cwd ?? process.cwd());
  const config = await loadUserConfig(cwd);
  const themesDir = config.themesDir ?? 'themes';
  const entries = await listThemeCatalog(cwd, themesDir);
  const format = opts.format ?? 'table';

  if (format === 'json') {
    process.stdout.write(`${JSON.stringify(entries, null, 2)}\n`);
    return;
  }

  if (entries.length === 0) {
    process.stdout.write(chalk.dim(formatTable(entries)));
    return;
  }

  process.stdout.write(formatTable(entries));
}
