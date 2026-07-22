import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { designToCssVars } from './design';
import { SlidePageProvider } from './page-context';
import { isFrameAnimationSettled, waitForDataWaitfor, waitForFonts } from './print-ready';
import { canvasSizeCss, canvasSizeForModule, type SlideModule } from './sdk';

export const CAPTURE_PIXEL_RATIO = 2;

const ANIMATION_TIMEOUT_MS = 15_000;
const POLL_INTERVAL_MS = 100;

const CAPTURE_CLASS = 'os-slide-capture';
const CAPTURE_STYLE_ID = 'os-slide-capture-style';
const FROZEN_PROPS = ['opacity', 'transform', 'filter', 'clip-path'] as const;

export async function captureSlidePagesAsPngBlobs(
  slide: SlideModule,
  onPageCaptured?: (current: number, total: number) => void,
): Promise<Blob[]> {
  const pages = slide.default ?? [];
  if (pages.length === 0) return [];

  const total = pages.length;
  const canvas = canvasSizeForModule(slide);
  const frameSize = canvasSizeCss(canvas);

  const container = document.createElement('div');
  container.className = CAPTURE_CLASS;
  container.setAttribute('aria-hidden', 'true');
  Object.assign(container.style, {
    position: 'fixed',
    left: '-99999px',
    top: '0',
    pointerEvents: 'none',
  });
  document.body.appendChild(container);

  const captureStyle = document.createElement('style');
  captureStyle.id = CAPTURE_STYLE_ID;
  captureStyle.textContent = `.${CAPTURE_CLASS} *, .${CAPTURE_CLASS} *::before, .${CAPTURE_CLASS} *::after {
    animation-delay: -1s !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    animation-fill-mode: forwards !important;
    transition: none !important;
  }`;
  document.head.appendChild(captureStyle);

  const designVars = slide.design ? designToCssVars(slide.design) : null;

  const reactRoots: Root[] = [];
  const frames: HTMLElement[] = [];
  for (let i = 0; i < pages.length; i++) {
    const Page = pages[i];
    if (!Page) continue;
    const host = document.createElement('div');
    host.setAttribute('data-osd-canvas', '');
    host.style.width = frameSize.width;
    host.style.height = frameSize.height;
    host.style.overflow = 'hidden';
    host.style.background = '#fff';
    if (designVars) {
      for (const [k, v] of Object.entries(designVars)) host.style.setProperty(k, v);
    }
    container.appendChild(host);
    frames.push(host);
    const r = createRoot(host);
    r.render(
      createElement(SlidePageProvider, { index: i, total: pages.length }, createElement(Page)),
    );
    reactRoots.push(r);
  }

  await nextPaint();

  try {
    await waitForFonts();

    const deadline = performance.now() + ANIMATION_TIMEOUT_MS;
    while (performance.now() < deadline) {
      const settled = frames.every((frame) => isFrameAnimationSettled(frame));
      if (settled) break;
      await sleep(POLL_INTERVAL_MS);
    }
    await waitForDataWaitfor(container);

    const { toBlob } = await import('html-to-image');
    const blobs: Blob[] = [];
    for (let i = 0; i < frames.length; i++) {
      freezeForCapture(frames[i]);
      const blob = await toBlob(frames[i], {
        width: canvas.width,
        height: canvas.height,
        pixelRatio: CAPTURE_PIXEL_RATIO,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });
      if (!blob) throw new Error(`failed to capture page ${i + 1}`);
      blobs.push(blob);
      onPageCaptured?.(i + 1, total);
    }
    return blobs;
  } finally {
    for (const r of reactRoots) r.unmount();
    container.remove();
    captureStyle.remove();
  }
}

function freezeForCapture(root: HTMLElement): void {
  for (const el of root.querySelectorAll<HTMLElement>('*')) {
    const cs = getComputedStyle(el);
    for (const prop of FROZEN_PROPS) {
      el.style.setProperty(prop, cs.getPropertyValue(prop), 'important');
    }
    el.style.setProperty('animation', 'none', 'important');
    el.style.setProperty('transition', 'none', 'important');
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nextPaint(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    requestAnimationFrame(settle);
    setTimeout(settle, 50);
  });
}
