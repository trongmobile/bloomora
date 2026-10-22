import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { buildHaystack } from '../../src/lib/search-index';
import {
  EMPTY_FILTERS,
  filterItems,
  hasActiveFilters,
  matchesFilters,
  parseFilterQuery,
  serializeFilterQuery,
  splitList,
  type FilterableItem,
} from '../../src/lib/filter';

const items = FLOWERS.map((f) => ({
  id: f.id,
  haystack: buildHaystack(f),
  group: f.group,
  colors: [...f.colors] as string[],
  seasons: [...f.bloomSeasons] as string[],
  speed: f.speedBand as string,
}));
const ids = (list: { id: string }[]) => list.map((i) => i.id);
const find = (patch: Partial<typeof EMPTY_FILTERS>) => ids(filterItems(items, { ...EMPTY_FILTERS, ...patch }));

describe('search', () => {
  it('finds a flower by its Vietnamese name, with or without diacritics', () => {
    expect(find({ q: 'hướng dương' })).toEqual(['sunflower']);
    expect(find({ q: 'huong duong' })).toEqual(['sunflower']);
  });
  it('finds a flower by English and scientific name', () => {
    expect(find({ q: 'sunflower' })).toContain('sunflower');
    expect(find({ q: 'helianthus' })).toEqual(['sunflower']);
    expect(find({ q: 'Nelumbo' })).toContain('lotus');
  });
  it('matches words in any order and is case-insensitive', () => {
    expect(find({ q: 'BLOSSOM cherry' })).toContain('cherry-blossom');
  });
  it('returns nothing for gibberish', () => {
    expect(find({ q: 'zzzzqqq' })).toEqual([]);
  });
  it('returns everything for an empty query', () => {
    expect(find({})).toHaveLength(FLOWERS.length);
  });
});

describe('filters', () => {
  it('filters by group, colour, season and speed', () => {
    expect(find({ group: 'bulb' })).toContain('tulip');
    expect(find({ group: 'bulb' }).every((id) => FLOWERS.find((f) => f.id === id)!.group === 'bulb')).toBe(true);
    expect(find({ color: 'yellow' })).toContain('sunflower');
    expect(find({ season: 'spring' })).toContain('tulip');
    expect(find({ speed: 'fast' })).toContain('sunflower');
    expect(find({ speed: 'slow' })).not.toContain('sunflower');
  });
  it('combines filters with AND', () => {
    const both = find({ color: 'yellow', speed: 'fast' });
    expect(both).toContain('sunflower');
    expect(both.every((id) => find({ color: 'yellow' }).includes(id) && find({ speed: 'fast' }).includes(id))).toBe(true);
  });
  it('can yield an empty result', () => {
    expect(find({ group: 'aquatic', color: 'yellow', speed: 'slow', q: 'rose' })).toEqual([]);
  });
  it('matchesFilters works on a bare item', () => {
    const item: FilterableItem = { haystack: 'hoa hong rose', group: 'shrub-tree', colors: ['red', 'pink'], seasons: ['spring'], speed: 'slow' };
    expect(matchesFilters(item, { ...EMPTY_FILTERS, q: 'hồng', color: 'pink' })).toBe(true);
    expect(matchesFilters(item, { ...EMPTY_FILTERS, color: 'blue' })).toBe(false);
  });
});

describe('query string', () => {
  it('round-trips', () => {
    const state = { q: 'hoa sen', group: 'aquatic', color: '', season: 'summer', speed: '' };
    const qs = serializeFilterQuery(state);
    expect(qs).toBe('?q=hoa+sen&group=aquatic&season=summer');
    expect(parseFilterQuery(qs)).toEqual(state);
  });
  it('is empty when no filter is active', () => {
    expect(serializeFilterQuery(EMPTY_FILTERS)).toBe('');
    expect(hasActiveFilters(EMPTY_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, q: 'a' })).toBe(true);
  });
  it('ignores unknown keys and caps long values', () => {
    expect(parseFilterQuery('?evil=1&q=' + 'x'.repeat(500)).q).toHaveLength(80);
    expect(parseFilterQuery('?evil=1')).toEqual(EMPTY_FILTERS);
  });
  it('splits data-attribute lists', () => {
    expect(splitList(' red  pink ')).toEqual(['red', 'pink']);
    expect(splitList(undefined)).toEqual([]);
  });
});
