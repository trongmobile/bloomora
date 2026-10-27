import { expect, test, type APIRequestContext } from '@playwright/test';
import { FLOWERS } from '../../src/data';
import { BASE, url } from './helpers';

/** The sitemap lists absolute URLs on the configured SITE_URL; map them onto the test server. */
async function sitemapPaths(request: APIRequestContext): Promise<{ loc: string; path: string }[]> {
  const res = await request.get(url('/vi/sitemap.xml'));
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const loc = m[1]!;
    const u = new URL(loc);
    return { loc, path: u.pathname };
  });
}

test.describe('metadata per route', () => {
  test('every sitemap URL resolves and carries its own canonical, title, description and social tags', async ({ request, page }) => {
    test.setTimeout(120_000);
    const pages = await sitemapPaths(request);
    expect(pages.length).toBeGreaterThanOrEqual(30);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const { loc, path } of pages) {
      if (path === BASE) {
        // The language gateway redirects browsers by language, so check its served HTML directly.
        const html = await (await request.get(path)).text();
        expect(html, 'gateway canonical').toContain(`<link rel="canonical" href="${loc}">`);
        expect(html).toContain('hreflang="x-default"');
        continue;
      }
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, path).toBe(loc);
      expect(canonical, path).toMatch(/^https:\/\//);
      expect(new URL(canonical!).pathname.startsWith(BASE), path).toBe(true);

      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(title.length, path).toBeGreaterThan(10);
      expect(description?.length ?? 0, path).toBeGreaterThan(50);
      expect(titles.has(title), `duplicate title on ${path}: ${title}`).toBe(false);
      expect(descriptions.has(description!), `duplicate description on ${path}`).toBe(false);
      titles.add(title);
      descriptions.add(description!);

      for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name', 'og:locale']) {
        await expect(page.locator(`meta[property="${key}"]`), `${path} ${key}`).toHaveCount(1);
      }
      for (const key of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
        await expect(page.locator(`meta[name="${key}"]`), `${path} ${key}`).toHaveCount(1);
      }
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', loc);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/.+\.png$/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
      await expect(page.locator('h1')).toHaveCount(1);
    }
  });

  test('the per-species OG image of each flower page exists, is a 1200×630 PNG and is unique', async ({ request, page }) => {
    const seen = new Set<string>();
    for (const { id: slug } of FLOWERS) {
      await page.goto(url(`/en/flowers/${slug}/`), { waitUntil: 'domcontentloaded' });
      const og = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(og, slug).toBe(new URL(og!).href);
      expect(og, slug).toContain(`/og/flowers/${slug}.png`);
      const res = await request.get(new URL(og!).pathname);
      expect(res.status(), slug).toBe(200);
      expect(res.headers()['content-type']).toContain('image/png');
      const body = await res.body();
      expect(body.readUInt32BE(16), `${slug} width`).toBe(1200);
      expect(body.readUInt32BE(20), `${slug} height`).toBe(630);
      expect(seen.has(body.toString('base64')), `${slug} image is identical to another`).toBe(false);
      seen.add(body.toString('base64'));
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
      await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
      await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /.{20,}/);
    }
  });

  test('default OG image and icons exist', async ({ request }) => {
    for (const p of ['/og-image.png', '/apple-touch-icon.png', '/favicon.svg']) {
      const res = await request.get(url(p));
      expect(res.status(), p).toBe(200);
    }
    const body = await (await request.get(url('/og-image.png'))).body();
    expect([body.readUInt32BE(16), body.readUInt32BE(20)]).toEqual([1200, 630]);
  });
});

test.describe('hreflang', () => {
  test('translated pages reference each other reciprocally with absolute URLs and x-default', async ({ page }) => {
    const pairs: [string, string][] = [
      ['/en/flowers/sunflower/', '/vi/flowers/hoa-huong-duong/'],
      ['/en/learn/flower-life-cycle/', '/vi/learn/vong-doi-cua-hoa/'],
      ['/en/', '/vi/'],
      ['/en/flowers/', '/vi/flowers/'],
    ];
    const alternates = async (path: string) => {
      await page.goto(url(path), { waitUntil: 'domcontentloaded' });
      return page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) => Object.fromEntries(els.map((e) => [e.getAttribute('hreflang')!, e.getAttribute('href')!])));
    };
    for (const [en, vi] of pairs) {
      const a = await alternates(en);
      const b = await alternates(vi);
      expect(a, en).toEqual(b);
      expect(new URL(a.en!).pathname).toBe(url(en));
      expect(new URL(a.vi!).pathname).toBe(url(vi));
      expect(a['x-default']).toBeTruthy();
      for (const href of Object.values(a)) expect(href).toMatch(/^https:\/\//);
    }
  });

  test('the content is really translated (not the same text twice)', async ({ page }) => {
    await page.goto(url('/en/flowers/rose/'));
    const en = await page.locator('main').innerText();
    await page.goto(url('/vi/flowers/hoa-hong/'));
    const vi = await page.locator('main').innerText();
    expect(vi).not.toBe(en);
    expect(vi).toMatch(/[ăâđêôơư]/i);
    expect(en).not.toMatch(/[ăđơư]/i);
  });
});

test.describe('structured data', () => {
  const ld = async (page: import('@playwright/test').Page) =>
    (await page.locator('script[type="application/ld+json"]').allTextContents()).map((t) => JSON.parse(t) as Record<string, unknown>);

  test('flower pages have BreadcrumbList and Article only — never VideoObject, ratings or an invented Organization', async ({ page }) => {
    await page.goto(url('/en/flowers/lotus/'));
    const nodes = await ld(page);
    expect(nodes.map((n) => n['@type']).sort()).toEqual(['Article', 'BreadcrumbList']);
    expect(JSON.stringify(nodes)).not.toMatch(/VideoObject|aggregateRating|Review|Organization/);
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList') as { itemListElement: { item: string }[] };
    for (const c of crumbs.itemListElement) expect(c.item).toMatch(/^https:\/\//);
  });

  test('home pages carry WebSite markup and article pages carry Article markup', async ({ page }) => {
    await page.goto(url('/vi/'));
    expect((await ld(page)).map((n) => n['@type'])).toContain('WebSite');
    await page.goto(url('/vi/learn/khi-nao-hoa-no/'));
    const types = (await ld(page)).map((n) => n['@type']);
    expect(types).toContain('Article');
    expect(types).toContain('BreadcrumbList');
  });
});

test.describe('crawl files', () => {
  test('robots.txt allows crawling and points to the sitemap', async ({ request }) => {
    const res = await request.get(url('/robots.txt'));
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toMatch(/User-agent: \*/);
    expect(text).toMatch(/Sitemap: https:\/\/.+\/vi\/sitemap\.xml/);
    expect(text).not.toMatch(/Disallow:\s*\/\s*$/m);
  });

  test('sitemap has hreflang alternates and no 404 or duplicate URLs', async ({ request }) => {
    const xml = await (await request.get(url('/vi/sitemap.xml'))).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(new Set(locs).size).toBe(locs.length);
    expect(xml).toContain('xmlns:xhtml');
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).not.toContain('404');
  });

  test('the 404 page is excluded from search results', async ({ request }) => {
    const res = await request.get(url('/en/nope/'));
    expect(res.status()).toBe(404);
    expect(await res.text()).toMatch(/<meta name="robots" content="noindex/);
  });
});

test.describe('images and links', () => {
  test('all images have alt text (decorative ones an empty alt) and internal links work', async ({ page, request }) => {
    for (const path of ['/vi/', '/en/flowers/', '/en/flowers/sunflower/', '/vi/learn/']) {
      await page.goto(url(path));
      await page.waitForLoadState('networkidle');
      const missing = await page.locator('img:not([alt])').count();
      expect(missing, `${path} images without alt`).toBe(0);
      const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href')!))]);
      for (const href of hrefs) {
        if (href.startsWith('//')) continue;
        expect(href.startsWith(BASE), `${path}: ${href} ignores the base path`).toBe(true);
        const res = await request.get(href.split('#')[0]!);
        expect(res.status(), `${path} → ${href}`).toBe(200);
      }
    }
  });
});
