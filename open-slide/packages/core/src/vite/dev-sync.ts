import type { ViteDevServer } from 'vite';

export const SLIDES_VMOD = 'virtual:open-slide/slides';
export const THEMES_VMOD = 'virtual:open-slide/themes';
export const FOLDERS_VMOD = 'virtual:open-slide/folders';

export const DEV_HMR_EVENTS = {
  registryChanged: 'open-slide:registry-changed',
  themesChanged: 'open-slide:themes-changed',
  slideChanged: 'open-slide:slide-changed',
  slideMetaChanged: 'open-slide:slide-meta-changed',
} as const;

export function vmodResolved(virtualId: string): string {
  return `\0${virtualId}`;
}

export function invalidateVirtualModule(server: ViteDevServer, resolvedModuleId: string): void {
  const mod = server.moduleGraph.getModuleById(resolvedModuleId);
  if (mod) server.moduleGraph.invalidateModule(mod);
}

export function sendCustomHmrEvent(server: ViteDevServer, event: string, data?: unknown): void {
  server.ws.send({ type: 'custom', event, ...(data !== undefined ? { data } : {}) });
}

export function createDebouncedAction(delayMs: number, action: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      action();
    }, delayMs);
  };
}
