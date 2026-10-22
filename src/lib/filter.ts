import { normalizeText } from './text';

/** The data the list page exposes on each card as data-* attributes. */
export interface FilterableItem {
  /** Pre-normalised searchable text (names in all languages + scientific names). */
  haystack: string;
  group: string;
  colors: string[];
  seasons: string[];
  speed: string;
}

export interface FilterState {
  q: string;
  group: string;
  color: string;
  season: string;
  speed: string;
}

export const EMPTY_FILTERS: FilterState = { q: '', group: '', color: '', season: '', speed: '' };

const KEYS = ['q', 'group', 'color', 'season', 'speed'] as const;

export function matchesFilters(item: FilterableItem, state: FilterState): boolean {
  const q = normalizeText(state.q);
  if (q) {
    // Every word must appear somewhere in the haystack, in any order.
    for (const word of q.split(' ')) {
      if (!item.haystack.includes(word)) return false;
    }
  }
  if (state.group && item.group !== state.group) return false;
  if (state.color && !item.colors.includes(state.color)) return false;
  if (state.season && !item.seasons.includes(state.season)) return false;
  if (state.speed && item.speed !== state.speed) return false;
  return true;
}

export function filterItems<T extends FilterableItem>(items: readonly T[], state: FilterState): T[] {
  return items.filter((item) => matchesFilters(item, state));
}

export function parseFilterQuery(search: string): FilterState {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const state = { ...EMPTY_FILTERS };
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) state[key] = value.slice(0, 80);
  }
  return state;
}

export function serializeFilterQuery(state: FilterState): string {
  const params = new URLSearchParams();
  for (const key of KEYS) {
    if (state[key]) params.set(key, state[key]);
  }
  const s = params.toString();
  return s ? `?${s}` : '';
}

export function hasActiveFilters(state: FilterState): boolean {
  return KEYS.some((k) => Boolean(state[k]));
}

/** Parses "red pink" style data-attribute lists. */
export function splitList(value: string | null | undefined): string[] {
  return (value ?? '').split(/\s+/).filter(Boolean);
}
