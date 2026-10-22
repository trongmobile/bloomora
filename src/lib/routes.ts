import type { Lang } from '../data/types';

/** Site-relative paths (no base). Pair with `withBase` / `absoluteUrl` from url.ts. */
export const routes = {
  gateway: () => '/',
  home: (lang: Lang) => `/${lang}/`,
  flowers: (lang: Lang) => `/${lang}/flowers/`,
  flower: (lang: Lang, slug: string) => `/${lang}/flowers/${slug}/`,
  learn: (lang: Lang) => `/${lang}/learn/`,
  article: (lang: Lang, slug: string) => `/${lang}/learn/${slug}/`,
  about: (lang: Lang) => `/${lang}/about/`,
  art: (flowerId: string) => `/art/${flowerId}.svg`,
  ogFlower: (flowerId: string) => `/og/flowers/${flowerId}.png`,
  ogDefault: () => '/og-image.png',
} as const;
