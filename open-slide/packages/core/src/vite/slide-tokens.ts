import { parse as babelParse } from '@babel/parser';
import type { AstNode } from '../editing/babel-walk.ts';

function jsString(s: string): string {
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
}

const COLORish_RE =
  /^#[0-9a-fA-F]{3,8}$|^rgba?\(\s*[\d.%]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(,\s*[\d.]+\s*)?\)$/;

const SKIP_NAMES = new Set(['design', 'meta', 'transition', 'fill']);

export type SlideToken = {
  name: string;
  value: string;
};

function parseSource(source: string): AstNode | null {
  try {
    return babelParse(source, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true,
    }) as unknown as AstNode;
  } catch {
    return null;
  }
}

function stringFromInit(init: AstNode | null | undefined): string | null {
  if (!init) return null;
  let inner: AstNode = init;
  if (inner.type === 'TSSatisfiesExpression' || inner.type === 'TSAsExpression') {
    const expr = (inner as unknown as { expression?: AstNode }).expression;
    if (expr) inner = expr;
  }
  if (inner.type === 'StringLiteral') {
    return (inner as unknown as { value: string }).value;
  }
  return null;
}

export function parseSlideTokens(source: string): SlideToken[] {
  const ast = parseSource(source);
  if (!ast) return [];
  const body = (ast as unknown as { program?: { body?: AstNode[] } }).program?.body ?? [];
  const out: SlideToken[] = [];

  for (const node of body) {
    if (node.type !== 'VariableDeclaration') continue;
    const kind = (node as unknown as { kind?: string }).kind;
    if (kind !== 'const') continue;
    const declarations = (node as unknown as { declarations?: AstNode[] }).declarations ?? [];
    for (const d of declarations) {
      const id = (d as unknown as { id?: { type?: string; name?: string } }).id;
      if (!id || id.type !== 'Identifier' || !id.name) continue;
      const name = id.name;
      if (SKIP_NAMES.has(name)) continue;
      const init = (d as unknown as { init?: AstNode | null }).init;
      const value = stringFromInit(init);
      if (value === null) continue;
      if (!COLORish_RE.test(value.trim())) continue;
      out.push({ name, value });
    }
  }
  return out;
}

export function applySlideTokenPatches(
  source: string,
  patches: Record<string, string>,
): { ok: true; source: string } | { ok: false; error: string } {
  if (Object.keys(patches).length === 0) return { ok: true, source };
  const ast = parseSource(source);
  if (!ast) return { ok: false, error: 'could not parse slide source' };

  type Hit = { start: number; end: number; name: string };
  const hits: Hit[] = [];
  const body = (ast as unknown as { program?: { body?: AstNode[] } }).program?.body ?? [];

  for (const node of body) {
    if (node.type !== 'VariableDeclaration') continue;
    const declarations = (node as unknown as { declarations?: AstNode[] }).declarations ?? [];
    for (const d of declarations) {
      const id = (d as unknown as { id?: { type?: string; name?: string } }).id;
      if (!id || id.type !== 'Identifier' || !id.name) continue;
      const patch = patches[id.name];
      if (patch === undefined) continue;
      const init = (d as unknown as { init?: AstNode | null }).init;
      if (!init || init.type !== 'StringLiteral') {
        return { ok: false, error: `token ${id.name} is not a string literal` };
      }
      hits.push({
        name: id.name,
        start: init.start ?? 0,
        end: init.end ?? 0,
      });
    }
  }

  const missing = Object.keys(patches).filter((k) => !hits.some((h) => h.name === k));
  if (missing.length > 0) {
    return { ok: false, error: `unknown or non-editable tokens: ${missing.join(', ')}` };
  }

  hits.sort((a, b) => b.start - a.start);
  let next = source;
  for (const h of hits) {
    next = next.slice(0, h.start) + jsString(patches[h.name]) + next.slice(h.end);
  }
  return { ok: true, source: next };
}
