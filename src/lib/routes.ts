import type { Lang, StageId } from '../data/types';

/** Site-relative paths (no base). Pair with `withBase` / `absoluteUrl` from url.ts. */
export const routes = {
  gateway: () => '/',
  home: (lang: Lang) => `/${lang}/`,
  flowers: (lang: Lang) => `/${lang}/flowers/`,
  flower: (lang: Lang, slug: string) => `/${lang}/flowers/${slug}/`,
  /** Share landing page for one stage of one species (noindex, own OG image). */
  momentBase: (lang: Lang, slug: string) => `/${lang}/flowers/${slug}/moment/`,
  moment: (lang: Lang, slug: string, stage: StageId) => `/${lang}/flowers/${slug}/moment/${stage}/`,
  learn: (lang: Lang) => `/${lang}/learn/`,
  article: (lang: Lang, slug: string) => `/${lang}/learn/${slug}/`,
  quiz: (lang: Lang) => `/${lang}/quiz/`,
  quizResult: (lang: Lang, stage: StageId) => `/${lang}/quiz/result/${stage}/`,
  planner: (lang: Lang) => `/${lang}/planner/`,
  classroom: (lang: Lang) => `/${lang}/classroom/`,
  cards: (lang: Lang, slug: string) => `/${lang}/classroom/cards/${slug}/`,
  embed: (lang: Lang, slug: string) => `/${lang}/embed/${slug}/`,
  about: (lang: Lang) => `/${lang}/about/`,
  art: (flowerId: string) => `/art/${flowerId}.svg`,
  artMoment: (flowerId: string, stage: StageId) => `/art/moments/${flowerId}/${stage}.svg`,
  ogFlower: (flowerId: string) => `/og/flowers/${flowerId}.png`,
  ogMoment: (lang: Lang, flowerId: string, stage: StageId) => `/og/moments/${lang}/${flowerId}-${stage}.png`,
  ogQuiz: (lang: Lang, stage: StageId) => `/og/quiz/${lang}/${stage}.png`,
  ogDefault: () => '/og-image.png',
} as const;
