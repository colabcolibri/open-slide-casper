import { downloadBlob } from './export-download';
import { captureSlidePagesAsPngBlobs } from './export-slide-capture';
import type { SlideModule } from './sdk';

const JPG_QUALITY = 0.92;

export type RasterExportProgress = {
  phase: 'processing' | 'generating' | 'done';
  current: number;
  total: number;
  percent: number;
};

export type RasterImageFormat = 'png' | 'jpg';

export function rasterPageFileName(
  slideId: string,
  pageIndex: number,
  format: RasterImageFormat,
): string {
  return `${slideId}-${String(pageIndex + 1).padStart(2, '0')}.${format}`;
}

export function rasterDownloadFileName(slideId: string, format: RasterImageFormat): string {
  return `${slideId}.${format}`;
}

export async function exportSlideAsPng(
  slide: SlideModule,
  slideId: string,
  onProgress?: (progress: RasterExportProgress) => void,
): Promise<void> {
  await exportSlideAsRaster(slide, slideId, 'png', onProgress);
}

export async function exportSlideAsJpg(
  slide: SlideModule,
  slideId: string,
  onProgress?: (progress: RasterExportProgress) => void,
): Promise<void> {
  await exportSlideAsRaster(slide, slideId, 'jpg', onProgress);
}

async function exportSlideAsRaster(
  slide: SlideModule,
  slideId: string,
  format: RasterImageFormat,
  onProgress?: (progress: RasterExportProgress) => void,
): Promise<void> {
  const pages = slide.default ?? [];
  if (pages.length === 0) return;

  const total = pages.length;
  onProgress?.({ phase: 'processing', current: 0, total, percent: 0 });

  const pngBlobs = await captureSlidePagesAsPngBlobs(slide, (current, pageTotal) => {
    onProgress?.({
      phase: 'processing',
      current,
      total: pageTotal,
      percent: Math.min(90, (current / pageTotal) * 90),
    });
  });

  const blobs =
    format === 'png'
      ? pngBlobs
      : await Promise.all(pngBlobs.map((blob) => pngBlobToJpeg(blob, JPG_QUALITY)));

  if (blobs.length === 1) {
    const only = blobs[0];
    if (!only) return;
    downloadBlob(only, rasterDownloadFileName(slideId, format));
    onProgress?.({ phase: 'done', current: total, total, percent: 100 });
    return;
  }

  onProgress?.({ phase: 'generating', current: total, total, percent: 95 });
  const { zipSync } = await import('fflate');
  const zipTree: Record<string, Uint8Array> = {};
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    if (!blob) continue;
    const name = rasterPageFileName(slideId, i, format);
    zipTree[name] = new Uint8Array(await blob.arrayBuffer());
  }
  const zipped = zipSync(zipTree);
  downloadBlob(new Blob([zipped as BlobPart], { type: 'application/zip' }), `${slideId}.zip`);
  onProgress?.({ phase: 'done', current: total, total, percent: 100 });
}

async function pngBlobToJpeg(blob: Blob, quality: number): Promise<Blob> {
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('failed to create canvas context for JPEG export');
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (jpeg) => {
        if (jpeg) resolve(jpeg);
        else reject(new Error('failed to encode JPEG'));
      },
      'image/jpeg',
      quality,
    );
  });
}
