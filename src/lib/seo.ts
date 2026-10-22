import { SITE_NAME, OG_DEFAULT_PATH, OG_HEIGHT, OG_WIDTH } from '../config/site';
import type { Lang } from '../data/types';
import { absoluteUrl } from './url';
import type { Alternate } from './pages';
import { truncate } from './text';

export interface SeoInput {
  site: string | URL;
  base: string;
  lang: Lang;
  /** Page-specific title without the site suffix. */
  title: string;
  description: string;
  /** Site-relative canonical path. */
  path: string;
  alternates?: Alternate[];
  image?: { path: string; alt: string };
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  /** Use the title as-is (home pages carry the brand already). */
  rawTitle?: boolean;
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  robots: string | null;
  htmlLang: string;
  alternates: { hreflang: string; href: string }[];
  meta: MetaTag[];
  imageUrl: string;
}

export function composeTitle(title: string, rawTitle = false): string {
  if (rawTitle || title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
}

const OG_LOCALE: Record<Lang, string> = { vi: 'vi_VN', en: 'en_US' };

export function buildHead(input: SeoInput): HeadData {
  const { site, base, lang } = input;
  const title = composeTitle(input.title, input.rawTitle);
  const description = truncate(input.description.replace(/\s+/g, ' ').trim(), 200);
  const canonical = absoluteUrl(site, base, input.path);
  const image = input.image ?? { path: OG_DEFAULT_PATH, alt: `${SITE_NAME} — flower time-lapse explorer` };
  const imageUrl = absoluteUrl(site, base, image.path);
  const type = input.type ?? 'website';

  const meta: MetaTag[] = [
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: OG_LOCALE[lang] },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: String(OG_WIDTH) },
    { property: 'og:image:height', content: String(OG_HEIGHT) },
    { property: 'og:image:alt', content: image.alt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:image:alt', content: image.alt },
  ];
  for (const alt of input.alternates ?? []) {
    if (alt.hreflang === 'x-default') continue;
    const other = alt.hreflang as Lang;
    if (other !== lang) meta.push({ property: 'og:locale:alternate', content: OG_LOCALE[other] ?? other });
  }
  if (type === 'article') {
    if (input.publishedTime) meta.push({ property: 'article:published_time', content: input.publishedTime });
    if (input.modifiedTime) meta.push({ property: 'article:modified_time', content: input.modifiedTime });
  }

  return {
    title,
    description,
    canonical,
    robots: input.noindex ? 'noindex, follow' : null,
    htmlLang: lang,
    alternates: (input.alternates ?? []).map((a) => ({ hreflang: a.hreflang, href: absoluteUrl(site, base, a.path) })),
    meta,
    imageUrl,
  };
}
