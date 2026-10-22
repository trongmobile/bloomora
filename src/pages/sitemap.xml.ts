import type { APIRoute } from 'astro';
import { getRegistry } from '../lib/content';
import { buildSitemapXml } from '../lib/sitemap';

export const GET: APIRoute = async ({ site }) => {
  const registry = await getRegistry();
  return new Response(buildSitemapXml(registry, site ?? 'https://bloomora.example', import.meta.env.BASE_URL), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
