import { describe, expect, it } from 'vitest';
import { evaluateAuthoringContract } from './authoring-contract.ts';

const FULL_SLIDE = `import type { DesignSystem, Page } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f7f5f0', text: '#1a1814', accent: '#6d4cff' },
  fonts: { display: 'Georgia, serif', body: 'system-ui, sans-serif' },
  typeScale: { hero: 140, body: 36 },
  radius: 12,
};

const CONTENT = { title: 'Lorem' } as const;

const Cover: Page = () => <div>Hi</div>;

export default [Cover] satisfies Page[];
`;

const LEGACY_NO_EXPORT_DESIGN = `import type { DesignSystem, Page } from '@open-slide/core';

const design: DesignSystem = {
  palette: { bg: '#000', text: '#fff', accent: '#f0f' },
  fonts: { display: 'sans', body: 'sans' },
  typeScale: { hero: 100, body: 24 },
  radius: 8,
};

const Cover: Page = () => <div>Hi</div>;
export default [Cover];
`;

const LEGACY_NO_PAGES = `export const design = {
  palette: { bg: '#f7f5f0', text: '#1a1814', accent: '#6d4cff' },
  fonts: { display: 'serif', body: 'sans' },
  typeScale: { hero: 100, body: 24 },
  radius: 12,
};
`;

describe('evaluateAuthoringContract', () => {
  it('classifies deck-template-shaped source as full', () => {
    expect(evaluateAuthoringContract(FULL_SLIDE).level).toBe('full');
  });

  it('classifies non-exported design as legacy', () => {
    const r = evaluateAuthoringContract(LEGACY_NO_EXPORT_DESIGN);
    expect(r.level).toBe('legacy');
    expect(r.reasons.some((x) => x.includes('export const design'))).toBe(true);
  });

  it('classifies missing page export as legacy', () => {
    const r = evaluateAuthoringContract(LEGACY_NO_PAGES);
    expect(r.level).toBe('legacy');
    expect(r.reasons.some((x) => x.includes('export default'))).toBe(true);
  });
});
