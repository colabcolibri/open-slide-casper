import { describe, expect, it } from 'vitest';
import { defaultDesign, designToCssVars } from './design.ts';

describe('designToCssVars', () => {
  it('fills missing spacing and palette from defaults', () => {
    const partial = {
      palette: { bg: '#000', text: '#fff', accent: '#f0f' },
      fonts: { display: 'serif', body: 'sans' },
      typeScale: { hero: 100, body: 24 },
      radius: 8,
    };
    const vars = designToCssVars(partial);
    expect(vars['--osd-padding']).toBe(defaultDesign.spacing.padding);
    expect(vars['--osd-size-heading']).toBe(`${defaultDesign.typeScale.heading}px`);
    expect(vars['--osd-muted']).toBe(defaultDesign.palette.muted);
    expect(vars['--osd-bg']).toBe('#000');
  });
});
