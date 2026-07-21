export type SlideCanvasFormat = 'slide' | '4x5';

export type CanvasSize = { width: number; height: number };

const FORMATS: Record<SlideCanvasFormat, CanvasSize> = {
  slide: { width: 1920, height: 1080 },
  '4x5': { width: 1080, height: 1350 },
};

export function resolveCanvasSize(format?: SlideCanvasFormat): CanvasSize {
  return FORMATS[format ?? 'slide'];
}

export const CANVAS_WIDTH = FORMATS.slide.width;
export const CANVAS_HEIGHT = FORMATS.slide.height;

const PPTX_DPI = 144;

export function canvasSizeToPptxEmu(size: CanvasSize): { emuW: number; emuH: number } {
  return {
    emuW: Math.round((size.width / PPTX_DPI) * 914400),
    emuH: Math.round((size.height / PPTX_DPI) * 914400),
  };
}

export function canvasSizeCss(size: CanvasSize): { width: string; height: string } {
  return { width: `${size.width}px`, height: `${size.height}px` };
}
