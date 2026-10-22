import { absoluteUrl } from './url';
import { alternatesFor, type SitePage } from './pages';

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Builds sitemap.xml including xhtml:link hreflang alternates for translated pages. */
export function buildSitemapXml(pages: readonly SitePage[], site: string | URL, base: string): string {
  const urls = pages.map((page) => {
    const loc = absoluteUrl(site, base, page.path);
    const alts = alternatesFor(pages, page.key)
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(absoluteUrl(site, base, a.path))}"/>`)
      .join('\n');
    return [
      '  <url>',
      `    <loc>${esc(loc)}</loc>`,
      `    <lastmod>${esc(page.lastmod)}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority.toFixed(1)}</priority>`,
      alts,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildRobotsTxt(site: string | URL, base: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(site, base, '/sitemap.xml')}\n`;
}
