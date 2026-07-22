import { useCallback, useEffect, useState } from 'react';
import { themes as bootThemes, type Theme } from './themes';

async function loadThemesFromVite(): Promise<Theme[]> {
  const mod = await import('virtual:open-slide/themes');
  return mod.themes;
}

export function useThemeRegistry(): Theme[] {
  const [themes, setThemes] = useState<Theme[]>(bootThemes);

  const refresh = useCallback(() => {
    loadThemesFromVite()
      .then(setThemes)
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
    import.meta.hot.on('open-slide:themes-changed', handler);
    return () => {
      cancelled = true;
      import.meta.hot?.off('open-slide:themes-changed', handler);
    };
  }, [refresh]);

  return themes;
}
