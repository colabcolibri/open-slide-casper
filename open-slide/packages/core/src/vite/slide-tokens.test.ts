import { describe, expect, it } from 'vitest';
import { applySlideTokenPatches, parseSlideTokens } from './slide-tokens.ts';

const SLIDE = `const design = { palette: { bg: '#000' } };
const green = '#9AE6B4';
const padding = '100px 120px';

const Cover = () => <div />;
export default [Cover];
`;

describe('parseSlideTokens', () => {
  it('finds top-level color string constants', () => {
    expect(parseSlideTokens(SLIDE)).toEqual([{ name: 'green', value: '#9AE6B4' }]);
  });
});

describe('applySlideTokenPatches', () => {
  it('rewrites string literal values', () => {
    const r = applySlideTokenPatches(SLIDE, { green: '#00ff00' });
    if (!r.ok) throw new Error(r.error);
    expect(r.source).toContain("const green = '#00ff00'");
    expect(parseSlideTokens(r.source)[0]?.value).toBe('#00ff00');
  });
});
