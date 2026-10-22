import type { Lang } from '../data/types';
import { vi, type Dict } from './vi';
import { en } from './en';

export type { Dict };

const dictionaries: Record<Lang, Dict> = { vi, en };

export function getDict(lang: Lang): Dict {
  return dictionaries[lang];
}

/** Fills "{name}" placeholders. Unknown placeholders are left untouched. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'vi' || value === 'en';
}
