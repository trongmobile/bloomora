import type { APIRoute } from 'astro';
import { buildRobotsTxt } from '../lib/sitemap';

export const GET: APIRoute = ({ site }) =>
  new Response(buildRobotsTxt(site ?? 'https://bloomora.example', import.meta.env.BASE_URL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
