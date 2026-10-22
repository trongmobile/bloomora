import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { FLOWERS, getFlower, getFlowerBySlug, relatedFlowers } from '../../src/data';
import { COLORS, GROUPS, SEASONS, SPEEDS, SPEED_LIMITS } from '../../src/data/taxonomy';
import { LANGS, STAGE_IDS } from '../../src/data/types';
import { en } from '../../src/i18n/en';
import { vi } from '../../src/i18n/vi';

describe('flower data', () => {
  it('has at least 8 distinct species', () => {
    expect(FLOWERS.length).toBeGreaterThanOrEqual(8);
    expect(new Set(FLOWERS.map((f) => f.id)).size).toBe(FLOWERS.length);
    expect(new Set(FLOWERS.map((f) => f.scientificName)).size).toBe(FLOWERS.length);
    for (const lang of LANGS) {
      expect(new Set(FLOWERS.map((f) => f.slugs[lang])).size).toBe(FLOWERS.length);
      expect(new Set(FLOWERS.map((f) => f.text[lang].name)).size).toBe(FLOWERS.length);
    }
  });

  it.each(FLOWERS.map((f) => [f.id, f] as const))('%s: stages, text and taxonomy are complete', (_id, f) => {
    expect(GROUPS).toContain(f.group);
    expect(f.colors.length).toBeGreaterThan(0);
    f.colors.forEach((c) => expect(COLORS).toContain(c));
    expect(f.bloomSeasons.length).toBeGreaterThan(0);
    f.bloomSeasons.forEach((s) => expect(SEASONS).toContain(s));
    expect(SPEEDS).toContain(f.speedBand);
    expect(['moderate', 'low']).toContain(f.confidence);

    const ids = f.stages.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBeGreaterThanOrEqual(7);
    ids.forEach((id) => expect(STAGE_IDS).toContain(id));
    for (const s of f.stages) {
      expect(s.days[0]).toBeGreaterThan(0);
      expect(s.days[1]).toBeGreaterThanOrEqual(s.days[0]);
    }

    for (const lang of LANGS) {
      const t = f.text[lang];
      expect(t.name.length).toBeGreaterThan(1);
      expect(t.tagline.length).toBeGreaterThan(10);
      expect(t.intro.length).toBeGreaterThanOrEqual(2);
      expect(t.facts.length).toBeGreaterThanOrEqual(3);
      // Species-specific stage text is optional; the dictionary supplies the generic fallback.
      const dict = lang === 'vi' ? vi : en;
      for (const id of ids) {
        expect(t.stages[id]?.description ?? dict.stageBlurbs[id], `${lang}/${id} description`).toBeTruthy();
        expect(t.stages[id]?.name ?? dict.stageNames[id], `${lang}/${id} name`).toBeTruthy();
      }
      for (const [id, st] of Object.entries(t.stages)) {
        expect(ids, `${lang}: text for a stage this species does not have (${id})`).toContain(id);
        expect(st.description.length).toBeGreaterThan(20);
      }
      for (const key of ['light', 'water', 'soil', 'temperature'] as const) expect(t.care[key], `${lang} care.${key}`).toBeTruthy();
      expect(JSON.stringify(t)).not.toMatch(/lorem ipsum|TODO|TBD|FIXME/i);
    }
  });

  it('keeps the speed band consistent with the upper bound of days-to-bloom', () => {
    for (const f of FLOWERS) {
      const max = f.daysToBloom[1];
      const expected = max <= SPEED_LIMITS.fast ? 'fast' : max <= SPEED_LIMITS.medium ? 'medium' : 'slow';
      expect(f.speedBand, f.id).toBe(expected);
      expect(f.daysToBloom[0]).toBeLessThanOrEqual(max);
    }
  });

  it('only cites https sources that name their publisher, with no duplicates', () => {
    for (const f of FLOWERS) {
      expect(f.sources.length, f.id).toBeGreaterThanOrEqual(3);
      const urls = f.sources.map((s) => s.url);
      expect(new Set(urls).size, `${f.id} duplicate sources`).toBe(urls.length);
      for (const s of f.sources) {
        expect(s.url).toMatch(/^https:\/\/[^\s]+$/);
        expect(s.title.length).toBeGreaterThan(3);
        expect(s.publisher.length).toBeGreaterThan(1);
        expect(s.supports.length).toBeGreaterThan(3);
      }
    }
  });

  it('keeps meta descriptions within search-snippet length', () => {
    for (const f of FLOWERS) {
      for (const lang of LANGS) {
        const d = f.text[lang].metaDescription;
        expect(d.length, `${f.id}/${lang}`).toBeGreaterThanOrEqual(70);
        expect(d.length, `${f.id}/${lang}`).toBeLessThanOrEqual(160);
      }
    }
  });

  it('relates flowers to flowers that exist', () => {
    for (const f of FLOWERS) {
      expect(f.related.length).toBeGreaterThan(0);
      f.related.forEach((id) => expect(getFlower(id), `${f.id} → ${id}`).toBeDefined());
      expect(f.related).not.toContain(f.id);
      expect(relatedFlowers(f).length).toBeGreaterThan(0);
    }
  });

  it('looks flowers up by id and slug', () => {
    expect(getFlower('rose')?.id).toBe('rose');
    expect(getFlowerBySlug('vi', 'hoa-sen')?.id).toBe('lotus');
    expect(getFlowerBySlug('en', 'hoa-sen')).toBeUndefined();
  });

  it('features a handful of flowers for the home page', () => {
    const featured = FLOWERS.filter((f) => f.featured);
    expect(featured.length).toBeGreaterThanOrEqual(3);
  });

  it('does not claim a real video or photo exists', () => {
    for (const f of FLOWERS) expect(f.media?.type ?? 'svg').toBe('svg');
  });
});

describe('articles', () => {
  const root = join(__dirname, '..', '..', 'src', 'content', 'articles');
  const files = LANGS.flatMap((lang) =>
    readdirSync(join(root, lang))
      .filter((n) => n.endsWith('.md'))
      .map((n) => ({ lang, slug: n.replace(/\.md$/, ''), raw: readFileSync(join(root, lang, n), 'utf8') })),
  );
  const parsed = files.map((f) => {
    const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(f.raw);
    expect(m, `${f.lang}/${f.slug} frontmatter`).not.toBeNull();
    return { ...f, fm: parseYaml(m![1]!) as Record<string, unknown>, body: m![2]! };
  });

  it('pairs every article in both languages', () => {
    expect(parsed.length).toBeGreaterThanOrEqual(8);
    const byKey = new Map<string, string[]>();
    for (const p of parsed) byKey.set(String(p.fm.translationKey), [...(byKey.get(String(p.fm.translationKey)) ?? []), p.lang]);
    for (const [key, langs] of byKey) expect(langs.sort(), key).toEqual(['en', 'vi']);
  });

  it.each(parsed.map((p) => [`${p.lang}/${p.slug}`, p] as const))('%s: frontmatter and body are sound', (_name, p) => {
    expect(p.fm.lang).toBe(p.lang);
    expect(String(p.fm.title).length).toBeLessThanOrEqual(110);
    expect(String(p.fm.description).length).toBeGreaterThanOrEqual(60);
    expect(String(p.fm.description).length).toBeLessThanOrEqual(200);
    expect(p.body.split(/\s+/).length).toBeGreaterThan(300);
    expect(p.body).toMatch(/^## /m);
    const sources = p.fm.sources as { url: string; title: string; publisher: string }[];
    expect(sources.length).toBeGreaterThanOrEqual(3);
    sources.forEach((s) => expect(s.url).toMatch(/^https:\/\//));
    ((p.fm.relatedFlowers ?? []) as string[]).forEach((id) => expect(getFlower(id), id).toBeDefined());
    expect(`${p.raw}`).not.toMatch(/lorem ipsum|TODO|TBD/i);
  });

  it('uses distinct slugs inside a language', () => {
    for (const lang of LANGS) {
      const slugs = parsed.filter((p) => p.lang === lang).map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe('i18n dictionaries', () => {
  const keys = (o: unknown, prefix = ''): string[] =>
    typeof o === 'object' && o !== null
      ? Object.entries(o).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
      : [prefix];

  it('have the same keys in Vietnamese and English', () => {
    expect(keys(en).sort()).toEqual(keys(vi).sort());
  });

  it('have no empty strings', () => {
    const empty = (o: unknown, path = ''): string[] =>
      typeof o === 'string' ? (o.trim() ? [] : [path]) : typeof o === 'object' && o ? Object.entries(o).flatMap(([k, v]) => empty(v, `${path}.${k}`)) : [];
    expect(empty(vi)).toEqual([]);
    expect(empty(en)).toEqual([]);
  });
});
