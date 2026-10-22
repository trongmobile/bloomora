import { getCollection, type CollectionEntry } from 'astro:content';
import { FLOWERS } from '../data';
import type { Lang } from '../data/types';
import { buildPageRegistry, type ArticleRef, type SitePage } from './pages';

export type Article = CollectionEntry<'articles'>;

/** URL slug of an article = file name without extension (entry ids look like "vi/vong-doi-cua-hoa"). */
export function articleSlug(entry: Article): string {
  return entry.id.split('/').pop()!.replace(/\.md$/, '');
}

export async function getArticles(lang?: Lang): Promise<Article[]> {
  const all = await getCollection('articles');
  return all
    .filter((a) => !lang || a.data.lang === lang)
    .sort((a, b) => a.data.datePublished.getTime() - b.data.datePublished.getTime() || a.id.localeCompare(b.id));
}

export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);

export async function getRegistry(): Promise<SitePage[]> {
  const articles = await getArticles();
  const refs: ArticleRef[] = articles.map((a) => ({
    translationKey: a.data.translationKey,
    lang: a.data.lang,
    slug: articleSlug(a),
    lastmod: isoDate(a.data.dateModified ?? a.data.datePublished),
  }));
  return buildPageRegistry(FLOWERS, refs);
}
