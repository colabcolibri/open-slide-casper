import type { ComponentType } from 'react';
import type { SlideCanvasFormat } from './canvas.ts';
import { type CanvasSize, resolveCanvasSize } from './canvas.ts';
import type { DesignSystem } from './design.ts';
import type { SlideTransition } from './transition.ts';

export type { CanvasSize, SlideCanvasFormat } from './canvas.ts';
export {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  canvasSizeCss,
  canvasSizeToPptxEmu,
  resolveCanvasSize,
} from './canvas.ts';

export type Page = ComponentType & { transition?: SlideTransition };

export type SlideMeta = {
  title?: string;
  theme?: string;
  /** `slide` (1920×1080) or `4x5` (1080×1350). Defaults to `slide`. */
  format?: SlideCanvasFormat;
  /** ISO 8601 timestamp. Set once at scaffold time; used to sort the slide list. */
  createdAt?: string;
};

export type SlideModule = {
  default: Page[];
  meta?: SlideMeta;
  design?: DesignSystem;
  // Index-aligned with `default`.
  notes?: (string | undefined)[];
  transition?: SlideTransition;
};

export type FolderIcon = { type: 'emoji'; value: string } | { type: 'color'; value: string };

export type Folder = {
  id: string;
  name: string;
  icon: FolderIcon;
};

export type FoldersManifest = {
  folders: Folder[];
  assignments: Record<string, string>;
};

export function canvasSizeForModule(slide: Pick<SlideModule, 'meta'>): CanvasSize {
  return resolveCanvasSize(slide.meta?.format);
}
