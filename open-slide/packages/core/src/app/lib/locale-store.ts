import config from 'virtual:open-slide/config';
import { useSyncExternalStore } from 'react';
import { en } from '../../locale/en';
import type { Locale } from '../../locale/types';

export type LocaleId = Locale['id'];

const LOCALES: Record<LocaleId, Locale> = {
  en,
};

export const LOCALE_OPTIONS: ReadonlyArray<{ id: LocaleId; label: string }> = [
  { id: 'en', label: 'English' },
];

const STORAGE_KEY = 'open-slide:locale';
const configLocale = config.locale as Locale | undefined;

function readStored(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en') return en;
    if (stored) localStorage.setItem(STORAGE_KEY, 'en');
  } catch {}
  if (configLocale?.id === 'en') return configLocale;
  return en;
}

// A module-level store (rather than React context) so every React root the
// runtime mounts — the app shell plus the standalone roots used for HTML/PDF
// export — shares one locale without needing a provider above each of them.
let current: Locale = readStored();
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  return current;
}

export function setLocale(id: LocaleId): void {
  current = LOCALES[id];
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {}
  for (const listener of listeners) listener();
}

export function useLocaleValue(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
