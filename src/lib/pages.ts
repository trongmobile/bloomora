import { DEFAULT_LANG, LANGS, STAGE_IDS, type FlowerData, type Lang } from '../data/types';
import { CONTENT_UPDATED } from '../config/site';
import { routes } from './routes';

export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

/** One URL. `key` groups the translations of the same page. */
export interface SitePage {
  key: string;
  /** null for the language gateway at "/". */
  lang: Lang | null;
  /** Site-relative path (no base), always with a trailing slash. */
  path: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
  /**
   * False for share landing pages, embeds and printables: they are real pages with their own
   * canonical and hreflang, but they are `noindex` and stay out of the sitemap.
   */
  indexable?: boolean;
}

export interface ArticleRef {
  translationKey: string;
  lang: Lang;
  slug: string;
  lastmod: string;
}

export interface Alternate {
  /** "vi", "en" or "x-default" */
  hreflang: string;
  path: string;
}

export const GATEWAY_KEY = 'gateway';

/** A page that exists (and has hreflang partners) but is not offered to search engines. */
function quiet(key: string, lang: Lang, path: string): SitePage {
  return { key, lang, path, lastmod: CONTENT_UPDATED, changefreq: 'yearly', priority: 0.1, indexable: false };
}

/** The pages that belong in sitemap.xml. */
export function indexablePages(pages: readonly SitePage[]): SitePage[] {
  return pages.filter((p) => p.indexable !== false);
}

export function buildPageRegistry(flowers: readonly FlowerData[], articles: readonly ArticleRef[]): SitePage[] {
  const pages: SitePage[] = [
    { key: GATEWAY_KEY, lang: null, path: routes.gateway(), lastmod: CONTENT_UPDATED, changefreq: 'monthly', priority: 0.5 },
  ];
  for (const lang of LANGS) {
    pages.push(
      { key: 'home', lang, path: routes.home(lang), lastmod: CONTENT_UPDATED, changefreq: 'weekly', priority: 1 },
      { key: 'flowers', lang, path: routes.flowers(lang), lastmod: CONTENT_UPDATED, changefreq: 'weekly', priority: 0.9 },
      { key: 'learn', lang, path: routes.learn(lang), lastmod: CONTENT_UPDATED, changefreq: 'weekly', priority: 0.8 },
      { key: 'about', lang, path: routes.about(lang), lastmod: CONTENT_UPDATED, changefreq: 'yearly', priority: 0.3 },
    );
    pages.push(
      { key: 'quiz', lang, path: routes.quiz(lang), lastmod: CONTENT_UPDATED, changefreq: 'monthly', priority: 0.8 },
      { key: 'planner', lang, path: routes.planner(lang), lastmod: CONTENT_UPDATED, changefreq: 'monthly', priority: 0.8 },
      { key: 'classroom', lang, path: routes.classroom(lang), lastmod: CONTENT_UPDATED, changefreq: 'monthly', priority: 0.6 },
    );
    for (const stage of STAGE_IDS) {
      pages.push(quiet(`quiz-result:${stage}`, lang, routes.quizResult(lang, stage)));
    }
    for (const flower of flowers) {
      const slug = flower.slugs[lang];
      pages.push({
        key: `flower:${flower.id}`,
        lang,
        path: routes.flower(lang, slug),
        lastmod: CONTENT_UPDATED,
        changefreq: 'monthly',
        priority: 0.9,
      });
      pages.push(quiet(`embed:${flower.id}`, lang, routes.embed(lang, slug)));
      pages.push(quiet(`cards:${flower.id}`, lang, routes.cards(lang, slug)));
      for (const stage of flower.stages) {
        pages.push(quiet(`moment:${flower.id}:${stage.id}`, lang, routes.moment(lang, slug, stage.id)));
      }
    }
  }
  for (const a of articles) {
    pages.push({
      key: `article:${a.translationKey}`,
      lang: a.lang,
      path: routes.article(a.lang, a.slug),
      lastmod: a.lastmod,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }
  return pages;
}

/** hreflang alternates for one page group, including x-default. */
export function alternatesFor(registry: readonly SitePage[], key: string): Alternate[] {
  if (key === GATEWAY_KEY) {
    return [
      ...LANGS.map((lang) => ({ hreflang: lang as string, path: routes.home(lang) })),
      { hreflang: 'x-default', path: routes.gateway() },
    ];
  }
  const group = registry.filter((p) => p.key === key && p.lang);
  const out: Alternate[] = [];
  for (const lang of LANGS) {
    const page = group.find((p) => p.lang === lang);
    if (page) out.push({ hreflang: lang, path: page.path });
  }
  const def = group.find((p) => p.lang === DEFAULT_LANG) ?? group[0];
  // Only declare alternates when more than one language really exists for this page.
  if (out.length < 2 || !def) return [];
  out.push({ hreflang: 'x-default', path: def.path });
  return out;
}
