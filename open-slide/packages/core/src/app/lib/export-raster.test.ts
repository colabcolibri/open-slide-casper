import { describe, expect, it } from 'vitest';
import { rasterDownloadFileName, rasterPageFileName } from './export-raster';

describe('rasterPageFileName', () => {
  it('pads page index in zip entries', () => {
    expect(rasterPageFileName('intro', 0, 'png')).toBe('intro-01.png');
    expect(rasterPageFileName('intro', 9, 'jpg')).toBe('intro-10.jpg');
  });
});

describe('rasterDownloadFileName', () => {
  it('uses slide id for single-page download', () => {
    expect(rasterDownloadFileName('cover', 'png')).toBe('cover.png');
    expect(rasterDownloadFileName('cover', 'jpg')).toBe('cover.jpg');
  });
});
