import { SITE_NAME } from '../config/site';
import type { Lang } from '../data/types';
import { absoluteUrl } from './url';

export type JsonLd = Record<string, unknown>;

interface Ctx {
  site: string | URL;
  base: string;
}

export interface Crumb {
  name: string;
  /** Site-relative path. */
  path: string;
}

export function websiteLd(ctx: Ctx, lang: Lang, description: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(ctx.site, ctx.base, `/${lang}/`),
    inLanguage: lang,
    description,
  };
}

export function breadcrumbLd(ctx: Ctx, crumbs: readonly Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(ctx.site, ctx.base, c.path),
    })),
  };
}

export interface ArticleLdInput {
  headline: string;
  description: string;
  path: string;
  imagePath: string;
  lang: Lang;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
}

/**
 * Article markup. We deliberately omit `author`/`publisher` Organization nodes:
 * Bloomora has no registered organisation, and we do not invent one.
 */
export function articleLd(ctx: Ctx, input: ArticleLdInput): JsonLd {
  const url = absoluteUrl(ctx.site, ctx.base, input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline.slice(0, 110),
    description: input.description,
    inLanguage: input.lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: [absoluteUrl(ctx.site, ctx.base, input.imagePath)],
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    ...(input.keywords?.length ? { keywords: input.keywords.join(', ') } : {}),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl(ctx.site, ctx.base, `/${input.lang}/`) },
  };
}

/** Safe to embed inside <script type="application/ld+json">. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}
