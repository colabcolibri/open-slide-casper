import { describe, expect, it } from 'vitest';
import {
  defaultDesign,
  deriveGap,
  deriveHeadingSize,
  deriveLine,
  deriveMuted,
  designToCssVars,
} from './design.ts';

describe('designToCssVars', () => {
  it('derives muted, line, padding, and heading from a light palette', () => {
    const vars = designToCssVars(defaultDesign);
    expect(vars['--osd-padding']).toBe('100px 120px');
    expect(vars['--osd-gap']).toBe(`${deriveGap(defaultDesign.typeScale.body)}px`);
    expect(vars['--osd-size-heading']).toBe(`${deriveHeadingSize(defaultDesign.typeScale.hero)}px`);
    expect(vars['--osd-muted']).toBe(
      deriveMuted(defaultDesign.palette.text, defaultDesign.palette.bg),
    );
    expect(vars['--osd-line']).toBe(
      deriveLine(defaultDesign.palette.text, defaultDesign.palette.bg),
    );
    expect(vars['--osd-bg']).toBe('#f7f5f0');
  });

  it('derives muted and line from a dark palette', () => {
    const dark: typeof defaultDesign = {
      palette: { bg: '#0E0E0E', text: '#F5F5F5', accent: '#A78BFA' },
      fonts: defaultDesign.fonts,
      typeScale: { hero: 116, body: 26 },
      radius: 16,
    };
    const vars = designToCssVars(dark);
    expect(vars['--osd-muted']).toBe(deriveMuted('#F5F5F5', '#0E0E0E'));
    expect(vars['--osd-line']).toBe(deriveLine('#F5F5F5', '#0E0E0E'));
    expect(vars['--osd-size-heading']).toBe(`${deriveHeadingSize(116)}px`);
    expect(vars['--osd-padding']).toBe('100px 120px');
  });
});
