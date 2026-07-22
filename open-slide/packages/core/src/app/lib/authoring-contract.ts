import { parse as babelParse } from '@babel/parser';
import type { AstNode } from '../../editing/babel-walk.ts';

export type AuthoringContractLevel = 'full' | 'legacy';

export type AuthoringContract = {
  level: AuthoringContractLevel;
  reasons: string[];
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

function unwrapInit(init: AstNode | null | undefined): AstNode | null {
  if (!init) return null;
  let inner: AstNode = init;
  if (inner.type === 'TSSatisfiesExpression' || inner.type === 'TSAsExpression') {
    const expr = (inner as unknown as { expression?: AstNode }).expression;
    if (expr) inner = expr;
  }
  return inner;
}

function isDesignObjectLiteral(init: AstNode | null | undefined): boolean {
  const inner = unwrapInit(init);
  return inner?.type === 'ObjectExpression';
}

function hasExportedDesignLiteral(ast: AstNode): boolean {
  const body = (ast as unknown as { program?: { body?: AstNode[] } }).program?.body ?? [];
  for (const node of body) {
    if (node.type !== 'ExportNamedDeclaration') continue;
    const decl = (node as unknown as { declaration?: AstNode | null }).declaration;
    if (!decl || decl.type !== 'VariableDeclaration') continue;
    const declarations = (decl as unknown as { declarations?: AstNode[] }).declarations ?? [];
    for (const d of declarations) {
      const id = (d as unknown as { id?: { type?: string; name?: string } }).id;
      if (!id || id.type !== 'Identifier' || id.name !== 'design') continue;
      const init = (d as unknown as { init?: AstNode | null }).init;
      return isDesignObjectLiteral(init);
    }
  }
  return false;
}

function hasExportDefaultPageArray(ast: AstNode): boolean {
  const body = (ast as unknown as { program?: { body?: AstNode[] } }).program?.body ?? [];
  for (const node of body) {
    if (node.type !== 'ExportDefaultDeclaration') continue;
    const decl = (node as unknown as { declaration?: AstNode | null }).declaration;
    const inner = unwrapInit(decl);
    if (inner?.type === 'ArrayExpression') {
      const elements = (inner as unknown as { elements: unknown[] }).elements;
      return elements.length > 0;
    }
  }
  return false;
}

export function evaluateAuthoringContract(source: string): AuthoringContract {
  const reasons: string[] = [];
  const ast = parseSource(source);
  if (!ast) {
    return { level: 'legacy', reasons: ['could not parse slide source'] };
  }
  if (!hasExportedDesignLiteral(ast)) {
    reasons.push('missing export const design with a literal DesignSystem object');
  }
  if (!hasExportDefaultPageArray(ast)) {
    reasons.push('missing export default [ … ] page array');
  }
  if (reasons.length > 0) return { level: 'legacy', reasons };
  return { level: 'full', reasons: [] };
}
