import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { buildHead, composeTitle } from '../../src/lib/seo';
import { articleLd, breadcrumbLd, serializeJsonLd, websiteLd } from '../../src/lib/jsonld';
import { GATEWAY_KEY, alternatesFor, buildPageRegistry, indexablePages, type ArticleRef } from '../../src/lib/pages';
import { buildRobotsTxt, buildSitemapXml } from '../../src/lib/sitemap';
import { routes } from '../../src/lib/routes';
import { isAbsoluteHttps } from '../../src/lib/url';

const custom = { site: 'https://flowers.example.com', base: '/' };
const project = { site: 'https://owner.github.io', base: '/bloomora/' };

const articles: ArticleRef[] = [
  { translationKey: 'life-cycle', lang: 'vi', slug: 'vong-doi-cua-hoa', lastmod: '2026-10-22' },
  { translationKey: 'life-cycle', lang: 'en', slug: 'flower-life-cycle', lastmod: '2026-10-22' },
];
const registry = buildPageRegistry(FLOWERS, articles);

describe('buildHead', () => {
  const rose = FLOWERS.find((f) => f.id === 'rose')!;
  const head = (ctx = custom, lang: 'vi' | 'en' = 'en') =>
    buildHead({
      ...ctx,
      lang,
      title: rose.text[lang].name,
      description: rose.text[lang].metaDescription,
      path: routes.flower(lang, rose.slugs[lang]),
      alternates: alternatesFor(registry, `flower:${rose.id}`),
      image: { path: routes.ogFlower(rose.id), alt: 'Rose' },
      type: 'article',
    });
  const meta = (h: ReturnType<typeof head>, key: string) => h.meta.find((m) => m.name === key || m.property === key)?.content;

  it('builds an absolute https canonical and per-route title', () => {
    const h = head();
    expect(h.canonical).toBe('https://flowers.example.com/en/flowers/rose/');
    expect(h.title).toBe('Rose | Bloomora');
    expect(head(custom, 'vi').canonical).toBe('https://flowers.example.com/vi/flowers/hoa-hong/');
  });

  it('keeps the base path in canonical, og:url and og:image for a project site', () => {
    const h = head(project);
    expect(h.canonical).toBe('https://owner.github.io/bloomora/en/flowers/rose/');
    expect(meta(h, 'og:url')).toBe(h.canonical);
    expect(meta(h, 'og:image')).toBe('https://owner.github.io/bloomora/og/flowers/rose.png');
    expect(meta(h, 'twitter:image')).toBe('https://owner.github.io/bloomora/og/flowers/rose.png');
  });

  it('emits the full set of og:* and twitter:* tags with absolute https images', () => {
    const h = head();
    for (const key of ['og:type', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:locale', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      expect(meta(h, key), key).toBeTruthy();
    }
    expect(meta(h, 'twitter:card')).toBe('summary_large_image');
    expect(meta(h, 'og:image:width')).toBe('1200');
    expect(meta(h, 'og:image:height')).toBe('630');
    expect(isAbsoluteHttps(meta(h, 'og:image')!)).toBe(true);
    expect(isAbsoluteHttps(h.imageUrl)).toBe(true);
  });

  it('falls back to the default OG image', () => {
    const h = buildHead({ ...custom, lang: 'en', title: 'Home', description: 'x'.repeat(80), path: '/en/' });
    expect(h.imageUrl).toBe('https://flowers.example.com/og-image.png');
  });

  it('gives different pages different titles, descriptions and canonicals', () => {
    const heads = FLOWERS.flatMap((f) =>
      (['vi', 'en'] as const).map((lang) =>
        buildHead({ ...custom, lang, title: f.text[lang].name, description: f.text[lang].metaDescription, path: routes.flower(lang, f.slugs[lang]) }),
      ),
    );
    expect(new Set(heads.map((h) => h.canonical)).size).toBe(heads.length);
    expect(new Set(heads.map((h) => h.title)).size).toBe(heads.length);
    expect(new Set(heads.map((h) => h.description)).size).toBe(heads.length);
  });

  it('lists hreflang alternates including x-default as absolute URLs', () => {
    const h = head(project);
    expect(h.alternates.map((a) => a.hreflang)).toEqual(['vi', 'en', 'x-default']);
    expect(h.alternates.every((a) => a.href.startsWith('https://owner.github.io/bloomora/'))).toBe(true);
    expect(h.alternates.find((a) => a.hreflang === 'x-default')!.href).toContain('/vi/flowers/hoa-hong/');
  });

  it('supports noindex and article times', () => {
    const h = buildHead({ ...custom, lang: 'en', title: 'Not found', description: 'x'.repeat(60), path: '/404.html', noindex: true });
    expect(h.robots).toBe('noindex, follow');
    expect(head().robots).toBeNull();
    const a = buildHead({ ...custom, lang: 'en', title: 'T', description: 'x'.repeat(60), path: '/en/learn/a/', type: 'article', publishedTime: '2026-10-22' });
    expect(a.meta.find((m) => m.property === 'article:published_time')?.content).toBe('2026-10-22');
  });

  it('does not duplicate the brand in the title', () => {
    expect(composeTitle('Bloomora — home')).toBe('Bloomora — home');
    expect(composeTitle('Rose')).toBe('Rose | Bloomora');
    expect(composeTitle('Rose', true)).toBe('Rose');
  });
});

describe('JSON-LD', () => {
  it('builds a breadcrumb list with absolute URLs', () => {
    const ld = breadcrumbLd(project, [
      { name: 'Home', path: '/en/' },
      { name: 'Flowers', path: '/en/flowers/' },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(ld.itemListElement[1]!.item).toBe('https://owner.github.io/bloomora/en/flowers/');
  });

  it('builds WebSite and Article nodes without invented Organization, rating or video', () => {
    const site = websiteLd(custom, 'vi', 'mô tả');
    expect(site['@type']).toBe('WebSite');
    const article = articleLd(custom, {
      headline: 'x'.repeat(200),
      description: 'd',
      path: '/en/learn/a/',
      imagePath: '/og-image.png',
      lang: 'en',
      datePublished: '2026-10-22',
      dateModified: '2026-10-22',
    });
    expect(article['@type']).toBe('Article');
    expect((article.headline as string).length).toBeLessThanOrEqual(110);
    const json = JSON.stringify([site, article]);
    expect(json).not.toMatch(/VideoObject|aggregateRating|"Review"|"Organization"|"author"|"publisher"/);
  });

  it('escapes characters that could break out of a script tag', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script> & co' });
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script> & co');
  });
});

describe('page registry, sitemap and robots', () => {
  it('registers every flower and article in both languages exactly once', () => {
    const keys = registry.map((p) => `${p.key}|${p.lang}`);
    expect(new Set(keys).size).toBe(keys.length);
    expect(registry.filter((p) => p.key.startsWith('flower:'))).toHaveLength(FLOWERS.length * 2);
    expect(registry.some((p) => p.path === '/')).toBe(true);
  });

  it('gives translated pages reciprocal hreflang alternates and a gateway x-default', () => {
    const alts = alternatesFor(registry, 'article:life-cycle');
    expect(alts.map((a) => a.hreflang)).toEqual(['vi', 'en', 'x-default']);
    expect(alternatesFor(registry, GATEWAY_KEY).map((a) => a.hreflang)).toEqual(['vi', 'en', 'x-default']);
  });

  it('does not invent alternates for an untranslated page', () => {
    const only = buildPageRegistry(FLOWERS, [articles[0]!]);
    expect(alternatesFor(only, 'article:life-cycle')).toEqual([]);
  });

  it('writes a valid sitemap with absolute https URLs and the base path', () => {
    const xml = buildSitemapXml(registry, project.site, project.base);
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
    expect(locs).toHaveLength(indexablePages(registry).length);
    expect(new Set(locs).size).toBe(locs.length);
    expect(locs.every((l) => l.startsWith('https://owner.github.io/bloomora/'))).toBe(true);
    expect(locs).toContain('https://owner.github.io/bloomora/vi/flowers/hoa-huong-duong/');
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).not.toContain('404');
  });

  it('keeps share, embed and printable pages out of the sitemap but gives them hreflang partners', () => {
    const quiet = registry.filter((p) => p.indexable === false);
    expect(quiet.length).toBeGreaterThan(100);
    const xml = buildSitemapXml(registry, project.site, project.base);
    for (const page of quiet) expect(xml).not.toContain(`/bloomora${page.path}<`);
    expect(xml).not.toContain('/moment/');
    expect(xml).not.toContain('/embed/');
    expect(xml).not.toContain('/quiz/result/');
    const lotus = registry.filter((p) => p.key === 'moment:lotus:blooming');
    expect(lotus.map((p) => p.path)).toEqual(['/vi/flowers/hoa-sen/moment/blooming/', '/en/flowers/lotus/moment/blooming/']);
    expect(alternatesFor(registry, 'moment:lotus:blooming').map((a) => a.hreflang)).toEqual(['vi', 'en', 'x-default']);
    // The three tool pages are real, indexable pages in both languages.
    for (const key of ['quiz', 'planner', 'classroom']) expect(registry.filter((p) => p.key === key && p.indexable !== false)).toHaveLength(2);
  });

  it('points robots.txt at the sitemap and does not block the site', () => {
    const robots = buildRobotsTxt(project.site, project.base);
    expect(robots).toContain('Sitemap: https://owner.github.io/bloomora/vi/sitemap.xml');
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m);
  });
});
