#!/usr/bin/env node
/**
 * Post-build verification of `dist/`. Fails (exit 1) when something that would hurt SEO,
 * sharing, analytics or deployment is wrong; prints warnings for things the owner still has to
 * configure (placeholder domain, missing GoatCounter code).
 *
 *   SITE_URL / BASE_PATH are read from the environment exactly like astro.config.ts.
 *   Set VERIFY_STRICT=1 to turn warnings into failures (use once the real domain is known).
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const DIST = resolve(process.argv[2] ?? 'dist');
const PLACEHOLDER_HOST = 'bloomora.example';
const STRICT = process.env.VERIFY_STRICT === '1';

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (msg) => warnings.push(msg);

if (!existsSync(DIST)) {
  console.error(`verify: ${DIST} does not exist — run the build first.`);
  process.exit(1);
}

// ------------------------------------------------------------------ settings (same rules as src/lib/url.ts)
const site = (process.env.SITE_URL?.trim() || `https://${PLACEHOLDER_HOST}`).replace(/\/+$/, '');
let base = (process.env.BASE_PATH?.trim() || '/').replace(/\/+$/, '');
if (base && !base.startsWith('/')) base = `/${base}`;
// `base` is '' for the root, else '/repo'.

// ------------------------------------------------------------------ helpers
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
const rel = (p) => relative(DIST, p).split(sep).join('/');
const read = (p) => readFileSync(p, 'utf8');
const attr = (tag, name) => {
  const m = new RegExp(`\\s${name}="([^"]*)"`, 'i').exec(tag);
  return m ? m[1] : undefined;
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

/** URL path of an html file in dist (as it is served, without the base). */
function routeOf(file) {
  const r = rel(file);
  if (r === 'index.html') return '/';
  if (r === '404.html') return '/404.html';
  return `/${r.replace(/index\.html$/, '')}`;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// ------------------------------------------------------------------ key files
const flowerIds = files
  .filter((f) => /^art\/[^/]+\.svg$/.test(rel(f)))
  .map((f) => rel(f).replace(/^art\//, '').replace(/\.svg$/, ''));

const must = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'apple-touch-icon.png', 'og-image.png'];
for (const f of must) if (!existsSync(join(DIST, f))) fail(f, 'missing from dist');
if (flowerIds.length < 8) fail('art/', `expected at least 8 species, found ${flowerIds.length}`);
for (const id of flowerIds) {
  const f = join(DIST, 'og', 'flowers', `${id}.png`);
  if (!existsSync(f)) fail(`og/flowers/${id}.png`, 'missing OG image for species');
  else if (statSync(f).size < 5000) fail(`og/flowers/${id}.png`, 'suspiciously small');
}
for (const lang of ['vi', 'en']) {
  for (const p of [
    `${lang}/index.html`,
    `${lang}/flowers/index.html`,
    `${lang}/learn/index.html`,
    `${lang}/about/index.html`,
    `${lang}/quiz/index.html`,
    `${lang}/planner/index.html`,
    `${lang}/classroom/index.html`,
  ]) {
    if (!existsSync(join(DIST, p))) fail(p, 'missing page');
  }
  // Every quiz result has a page and its own share image.
  const stages = ['seed', 'germination', 'seedling', 'vegetative', 'bud-formation', 'bud-development', 'blooming', 'full-bloom', 'wilting'];
  for (const stage of stages) {
    if (!existsSync(join(DIST, lang, 'quiz', 'result', stage, 'index.html'))) fail(`${lang}/quiz/result/${stage}/`, 'missing quiz result page');
    if (!existsSync(join(DIST, 'og', 'quiz', lang, `${stage}.png`))) fail(`og/quiz/${lang}/${stage}.png`, 'missing quiz result image');
  }
}

// PNG dimensions (IHDR) for the default OG image.
function pngSize(file) {
  const b = readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
for (const f of ['og-image.png', ...files.map(rel).filter((r) => /^og\/.+\.png$/.test(r))]) {
  const p = join(DIST, f);
  if (!existsSync(p)) continue;
  const { w, h } = pngSize(p);
  if (w !== 1200 || h !== 630) fail(f, `expected 1200×630, got ${w}×${h}`);
}

// Every share landing page ("moment") has its image, and the static art it opens with.
for (const lang of ['vi', 'en']) {
  const images = files.map(rel).filter((r) => r.startsWith(`og/moments/${lang}/`));
  const pages = htmlFiles.map(rel).filter((r) => new RegExp(`^${lang}/flowers/[^/]+/moment/[^/]+/index\\.html$`).test(r));
  if (pages.length === 0) fail(`${lang}/flowers/*/moment/`, 'no share landing pages were built');
  if (images.length !== pages.length) fail(`og/moments/${lang}/`, `${images.length} images for ${pages.length} moment pages`);
}
if (files.map(rel).filter((r) => /^art\/moments\/[^/]+\/[^/]+\.svg$/.test(r)).length < flowerIds.length * 9) {
  fail('art/moments/', 'expected one illustration per species and stage');
}

// ------------------------------------------------------------------ per-page checks
const canonicalSeen = new Map();
let goatPages = 0;
const indexable = [];
const quiet = [];

for (const file of htmlFiles) {
  const html = read(file);
  const route = routeOf(file);
  const where = rel(file);
  const head = html.slice(0, html.indexOf('</head>'));
  const noindex = /<meta[^>]+name="robots"[^>]+noindex/i.test(head);

  const titles = head.match(/<title>[\s\S]*?<\/title>/g) ?? [];
  if (titles.length !== 1) fail(where, `expected exactly one <title>, found ${titles.length}`);
  else if (titles[0].replace(/<\/?title>/g, '').trim().length < 10) fail(where, 'title too short');

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (route !== '/404.html' && h1s.length !== 1) fail(where, `expected exactly one <h1>, found ${h1s.length}`);

  const lang = /<html[^>]*\slang="([^"]+)"/.exec(html)?.[1];
  if (!lang) fail(where, '<html lang> missing');

  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]);
  const meta = (key) => {
    const tag = metas.find((t) => attr(t, 'name') === key || attr(t, 'property') === key);
    return tag ? decode(attr(tag, 'content') ?? '') : undefined;
  };

  const desc = meta('description');
  if (!desc) fail(where, 'meta description missing');
  else if (desc.length < 50 || desc.length > 200) fail(where, `meta description length ${desc.length} outside 50–200`);

  const canonicalTag = /<link\b[^>]*rel="canonical"[^>]*>/.exec(head)?.[0];
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : undefined;
  if (!canonical) fail(where, 'canonical missing');
  else {
    if (!canonical.startsWith('https://')) fail(where, `canonical is not absolute https: ${canonical}`);
    if (!canonical.startsWith(site)) fail(where, `canonical ${canonical} does not start with SITE_URL ${site}`);
    const expected = `${site}${base}${route === '/404.html' ? '/404.html' : route}`.replace(/(?<!:)\/{2,}/g, '/');
    if (route !== '/404.html' && canonical !== expected) fail(where, `canonical ${canonical} !== expected ${expected}`);
    if (!noindex) {
      if (canonicalSeen.has(canonical)) fail(where, `canonical duplicates ${canonicalSeen.get(canonical)}`);
      canonicalSeen.set(canonical, where);
    }
  }

  // Landing pages, embeds and printables are noindex by design; each one must say so and stay out of the sitemap.
  const mustBeQuiet = /\/(moment|quiz\/result|embed|classroom\/cards)\//.test(route);
  if (mustBeQuiet && !noindex) fail(where, 'share/embed/printable page must be noindex');
  if (noindex && route !== '/404.html') {
    quiet.push({ route, canonical, where });
    const ogImage = meta('og:image');
    if (ogImage?.startsWith(site)) {
      const local = ogImage.slice(site.length + base.length);
      if (!existsSync(join(DIST, local))) fail(where, `og:image points to a file that is not in dist: ${local}`);
    }
  }

  if (route !== '/404.html' && !noindex) {
    indexable.push({ route, canonical, where });
    for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name', 'twitter:card', 'twitter:title', 'twitter:image']) {
      if (!meta(key)) fail(where, `${key} missing`);
    }
    const ogImage = meta('og:image');
    if (ogImage && !/^https:\/\//.test(ogImage)) fail(where, `og:image must be absolute https: ${ogImage}`);
    if (ogImage && ogImage.startsWith(site)) {
      const local = ogImage.slice(site.length + base.length);
      if (!existsSync(join(DIST, local))) fail(where, `og:image points to a file that is not in dist: ${local}`);
    }
    if (meta('og:url') !== canonical) fail(where, 'og:url differs from canonical');
    if (meta('twitter:card') !== 'summary_large_image') fail(where, 'twitter:card should be summary_large_image');

    const alts = [...head.matchAll(/<link\b[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*>/g)];
    const codes = alts.map((m) => m[1]);
    for (const code of ['vi', 'en', 'x-default']) if (!codes.includes(code)) fail(where, `hreflang ${code} missing`);
    for (const m of alts) {
      const href = attr(m[0], 'href');
      if (!href?.startsWith('https://')) fail(where, `hreflang href not absolute https: ${href}`);
    }
  }

  // JSON-LD must parse, and we never claim things we do not have.
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const text = JSON.stringify(data);
      if (/"VideoObject"/.test(text)) fail(where, 'VideoObject is declared but the site has no real video');
      if (/"(aggregateRating|Review|Organization)"/.test(text)) fail(where, 'unexpected rating/review/Organization structured data');
    } catch (err) {
      fail(where, `invalid JSON-LD: ${err.message}`);
    }
  }

  // Analytics: at most one GoatCounter script per page, never inlined twice.
  const gc = html.match(/gc\.zgo\.at\/count\.js/g) ?? [];
  const gcTags = html.match(/<script[^>]*data-goatcounter=/g) ?? [];
  if (gc.length > 1 || gcTags.length > 1) fail(where, `GoatCounter script present ${Math.max(gc.length, gcTags.length)}× (expected ≤1)`);
  if (gcTags.length === 1) goatPages += 1;

  // Base path: root-relative links must carry the base when the site lives under a sub-path.
  if (base) {
    const bare = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    for (const m of bare.matchAll(/\s(?:href|src|poster|action)="(\/[^"]*)"/g)) {
      const u = m[1];
      if (u.startsWith('//')) continue;
      if (!(u === base || u.startsWith(`${base}/`))) {
        fail(where, `root-relative URL ignores BASE_PATH ${base}: ${u}`);
        break;
      }
    }
  }
}

if (goatPages > 0 && goatPages !== htmlFiles.length) {
  fail('analytics', `GoatCounter is on ${goatPages} of ${htmlFiles.length} pages — it should be on all or none`);
}

// ------------------------------------------------------------------ sitemap
const sitemapPath = join(DIST, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  const xml = read(sitemapPath);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  if (new Set(locs).size !== locs.length) fail('sitemap.xml', 'duplicate <loc> entries');
  for (const loc of locs) {
    if (!loc.startsWith('https://')) fail('sitemap.xml', `not absolute https: ${loc}`);
    if (!loc.startsWith(`${site}${base}`)) fail('sitemap.xml', `${loc} is outside ${site}${base}`);
    const path = loc.slice(`${site}${base}`.length) || '/';
    const file = path.endsWith('/') ? join(DIST, path, 'index.html') : join(DIST, path);
    if (!existsSync(file)) fail('sitemap.xml', `${loc} has no matching file in dist`);
  }
  for (const page of indexable) {
    if (!page.canonical || !locs.includes(page.canonical)) fail('sitemap.xml', `indexable page missing from sitemap: ${page.where}`);
  }
  if (locs.some((l) => l.endsWith('/404.html') || l.includes('/404'))) fail('sitemap.xml', 'contains the 404 page');
  for (const page of quiet) {
    if (page.canonical && locs.includes(page.canonical)) fail('sitemap.xml', `noindex page is listed: ${page.where}`);
  }
  const alternates = (xml.match(/hreflang="/g) ?? []).length;
  if (alternates < locs.length * 2) fail('sitemap.xml', `hreflang alternates look incomplete (${alternates} for ${locs.length} URLs)`);
}

// ------------------------------------------------------------------ robots
const robotsPath = join(DIST, 'robots.txt');
if (existsSync(robotsPath)) {
  const robots = read(robotsPath);
  const line = /^Sitemap:\s*(\S+)/im.exec(robots)?.[1];
  if (line !== `${site}${base}/sitemap.xml`) fail('robots.txt', `Sitemap line is "${line}", expected "${site}${base}/sitemap.xml"`);
  if (/^Disallow:\s*\/\s*$/im.test(robots)) fail('robots.txt', 'disallows the whole site');
}

// ------------------------------------------------------------------ warnings about owner configuration
if (new URL(site).hostname === PLACEHOLDER_HOST) {
  warn(`SITE_URL is the placeholder ${site}. Canonical, sitemap and og:image URLs will be wrong until SITE_URL is set (docs/DEPLOYMENT.md).`);
}
if (goatPages === 0) {
  warn('GoatCounter is not included in this build (PUBLIC_GOATCOUNTER_CODE is empty or analytics is disabled).');
}
if (existsSync(join(DIST, 'CNAME'))) {
  warn('dist/CNAME exists — fine for a custom domain; remove it for a github.io project site.');
}

// ------------------------------------------------------------------ report
console.log(`verify: checked ${htmlFiles.length} pages, ${flowerIds.length} species, base "${base || '/'}", site ${site}`);
for (const w of warnings) console.warn(`  warning: ${w}`);
if (STRICT && warnings.length) errors.push(...warnings.map((w) => `strict mode: ${w}`));
if (errors.length) {
  console.error(`verify: ${errors.length} problem(s)`);
  for (const e of errors.slice(0, 60)) console.error(`  ✗ ${e}`);
  if (errors.length > 60) console.error(`  … and ${errors.length - 60} more`);
  process.exit(1);
}
console.log('verify: OK');
