import { en, Strings } from './en';

/**
 * Minimal i18n. English-only for now, but every label already flows through t(),
 * so adding hi.ts and a language toggle later is a drop-in.
 */
const dictionaries: Record<string, Strings> = { en };

let current = 'en';

export function setLanguage(lang: string) {
  if (dictionaries[lang]) current = lang;
}

/** Dot-path lookup, e.g. t('home.yourToilets'). Falls back to the key if missing. */
export function t(path: string): string {
  const parts = path.split('.');
  let node: any = dictionaries[current];
  for (const p of parts) {
    node = node?.[p];
    if (node == null) return path;
  }
  return typeof node === 'string' ? node : path;
}

export { en };
