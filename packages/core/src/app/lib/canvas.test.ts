import { describe, expect, it } from 'vitest';
import { canvasSizeToPptxEmu, resolveCanvasSize } from './canvas.ts';

describe('resolveCanvasSize', () => {
  it('defaults to 1920x1080 slide format', () => {
    expect(resolveCanvasSize()).toEqual({ width: 1920, height: 1080 });
    expect(resolveCanvasSize('slide')).toEqual({ width: 1920, height: 1080 });
  });

  it('supports 4x5 portrait canvas', () => {
    const size = resolveCanvasSize('4x5');
    expect(size.width / size.height).toBeCloseTo(4 / 5);
    expect(size).toEqual({ width: 1080, height: 1350 });
  });
});

describe('canvasSizeToPptxEmu', () => {
  it('matches legacy slide emu at 144 dpi', () => {
    expect(canvasSizeToPptxEmu({ width: 1920, height: 1080 })).toEqual({
      emuW: 12192000,
      emuH: 6858000,
    });
  });
});
