import {
  slideCreatedAt as bootCreatedAt,
  slideIds as bootIds,
  slideThemes as bootThemes,
} from 'virtual:open-slide/slides';
import { useCallback, useEffect, useState } from 'react';

export type SlideRegistry = {
  slideIds: string[];
  slideThemes: Record<string, string>;
  slideCreatedAt: Record<string, number>;
};

async function loadRegistryFromVite(): Promise<SlideRegistry> {
  const mod = await import('virtual:open-slide/slides');
  return {
    slideIds: [...mod.slideIds],
    slideThemes: { ...mod.slideThemes },
    slideCreatedAt: { ...mod.slideCreatedAt },
  };
}

const bootRegistry: SlideRegistry = {
  slideIds: [...bootIds],
  slideThemes: { ...bootThemes },
  slideCreatedAt: { ...bootCreatedAt },
};

export function useSlideRegistry(): SlideRegistry {
  const [registry, setRegistry] = useState<SlideRegistry>(bootRegistry);

  const refresh = useCallback(() => {
    loadRegistryFromVite()
      .then(setRegistry)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!import.meta.hot) return;
    let cancelled = false;
    const handler = () => {
      queueMicrotask(() => {
        if (!cancelled) refresh();
      });
    };
    import.meta.hot.on('open-slide:registry-changed', handler);
    import.meta.hot.on('open-slide:slide-changed', handler);
    return () => {
      cancelled = true;
      import.meta.hot?.off('open-slide:registry-changed', handler);
      import.meta.hot?.off('open-slide:slide-changed', handler);
    };
  }, [refresh]);

  return registry;
}

export function slidesByThemeFromRegistry(registry: SlideRegistry, themeId: string): string[] {
  return registry.slideIds.filter((id) => registry.slideThemes[id] === themeId);
}
