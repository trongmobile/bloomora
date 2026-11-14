/**
 * Checks that a cited source really exists, and reads its real page title.
 * The weekly job only accepts sources that Google Search actually cited AND that answer when fetched,
 * because docs/CONTENT.md forbids invented sources.
 */

export type UrlCheck =
  | { ok: true; finalUrl: string; title: string | null; blocked: boolean }
  | { ok: false; reason: string };

/** Statuses that mean "the page exists but refuses automated clients". Accepted, but flagged. */
const BLOCKED_STATUS = new Set([401, 403, 429, 999]);

const USER_AGENT = 'Mozilla/5.0 (compatible; BloomoraContentBot/1.0)';

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

export function extractTitle(html: string): string | null {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!m) return null;
  const title = decodeEntities(m[1]!).replace(/\s+/g, ' ').trim();
  return title.length > 0 ? title.slice(0, 200) : null;
}

async function readHead(res: Response, limit: number): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (total < limit) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      total += value.byteLength;
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  const buf = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    buf.set(c, off);
    off += c.byteLength;
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(buf);
}

export async function checkUrl(url: string, fetchImpl: typeof fetch = fetch, timeoutMs = 20_000): Promise<UrlCheck> {
  try {
    const res = await fetchImpl(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml,application/pdf;q=0.8,*/*;q=0.5' },
      signal: AbortSignal.timeout(timeoutMs),
    });
    // Grounding links can be redirect wrappers; the final URL is the real source.
    const finalUrl = res.url || url;
    if (!finalUrl.startsWith('https://')) {
      await res.body?.cancel().catch(() => {});
      return { ok: false, reason: `not an https URL after redirects (${finalUrl})` };
    }
    if (BLOCKED_STATUS.has(res.status)) {
      await res.body?.cancel().catch(() => {});
      return { ok: true, finalUrl, title: null, blocked: true };
    }
    if (res.status < 200 || res.status >= 300) {
      await res.body?.cancel().catch(() => {});
      return { ok: false, reason: `HTTP ${res.status}` };
    }
    const type = res.headers.get('content-type') ?? '';
    const title = /html/i.test(type) ? extractTitle(await readHead(res, 65_536)) : null;
    if (!/html/i.test(type)) await res.body?.cancel().catch(() => {});
    return { ok: true, finalUrl, title, blocked: false };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}

/** Canonical form used to compare URLs: no fragment, no trailing slash. */
export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    return u.toString().replace(/\/+$/, '');
  } catch {
    return url;
  }
}
