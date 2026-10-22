/**
 * URL helpers shared by Astro pages, build scripts and tests.
 * They are pure functions so base-path handling (GitHub Pages project site vs.
 * custom domain) can be unit-tested without running a build.
 */

/** Normalises a base path to "/" or "/segment/" (leading + trailing slash). */
export function normalizeBase(input?: string | null): string {
  let base = (input ?? '').trim();
  if (!base || base === '/' || base === '.' || base === './') return '/';
  base = base.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

/** Normalises a site origin to a string without trailing slash. */
export function normalizeSite(input?: string | null, fallback = 'https://bloomora.example'): string {
  const raw = (input ?? '').trim() || fallback;
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
}

/** Joins the base path and a site-relative path ("/vi/flowers/") into a root-relative href. */
export function withBase(base: string, path = '/'): string {
  const b = normalizeBase(base);
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${b}${p}`;
}

/**
 * Builds an absolute https URL for a site-relative path.
 * `site` may include a path (e.g. https://user.github.io), `base` is the Astro base.
 */
export function absoluteUrl(site: string | URL, base: string, path = '/'): string {
  const origin = new URL(typeof site === 'string' ? site : site.href).origin;
  return `${origin}${withBase(base, path)}`;
}

/** True when the URL is an absolute https URL (what OG/Twitter crawlers require). */
export function isAbsoluteHttps(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

/** Ensures a path ends with a slash unless it points to a file. */
export function withTrailingSlash(path: string): string {
  if (path.endsWith('/') || /\.[a-z0-9]{2,5}$/i.test(path)) return path;
  return `${path}/`;
}
