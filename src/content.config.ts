import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(110),
    description: z.string().min(60).max(200),
    lang: z.enum(['vi', 'en']),
    /** Shared by the vi and en versions of the same article (drives hreflang). */
    translationKey: z.string().regex(/^[a-z0-9-]+$/),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    readingMinutes: z.number().int().positive().optional(),
    relatedFlowers: z.array(z.string()).default([]),
    sources: z
      .array(z.object({ title: z.string(), publisher: z.string(), url: z.url() }))
      .min(1),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
