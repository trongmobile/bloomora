/**
 * Weekly job: ask Gemini for new flowers grown in Vietnam, research each one with Google Search,
 * write a full `FlowerData` (vi + en), validate it, and register it in the site.
 *
 *   GEMINI_API_KEY=… npx tsx scripts/add-flowers.ts [--count 4] [--spare 4] [--summary out/x.md]
 *
 * Environment:
 *   GEMINI_API_KEY        required
 *   GEMINI_MODEL          default gemini-4-carbon
 *   GEMINI_BASE_URL       default https://generativelanguage.googleapis.com/v1beta (only to point at a stub in tests)
 *   GEMINI_API_REVISION   optional Api-Revision header
 *
 * What it guarantees (see docs/AUTOMATION.md):
 *  - every source was cited by Google Search, opens over https, and its title is read from the page;
 *  - everything derivable (stage order, daysToBloom, speedBand, confidence "low") is computed, not trusted;
 *  - the entry passes the same checks as tests/unit/data.test.ts before anything is written;
 *  - nothing is published: the workflow opens a pull request for a human to review.
 */
import { appendFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { FLOWERS } from '../src/data';
import type { FlowerData } from '../src/data/types';
import { DEFAULT_MODEL, createGeminiClient, type Citation, type GeminiClient } from './lib/gemini';
import {
  buildFlower,
  flowerDraftSchema,
  flowerSource,
  normalizeLatin,
  registerInIndex,
  stripIsNew,
  updateContentUpdated,
  updateReadmeCount,
  validateFlower,
  type FlowerDraft,
  type VerifiedSource,
} from './lib/flower-gen';
import {
  PROPOSE_SCHEMA,
  PROPOSE_SYSTEM,
  RESEARCH_SYSTEM,
  RESEARCH_TOPICS,
  WRITE_SYSTEM,
  proposePrompt,
  repairPrompt,
  researchPrompt,
  writePrompt,
  type Candidate,
} from './lib/flower-prompts';
import { checkUrl, normalizeUrl } from './lib/verify-url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export interface RunOptions {
  /** Project root to read and write (tests point this at a temp copy). */
  root: string;
  /** How many flowers to add. */
  count: number;
  /** Extra candidates to try when some fail research or validation. */
  spare: number;
  /** ISO date written to CONTENT_UPDATED. */
  date: string;
  /** Fetch every cited URL. Turn off only in tests. */
  verifyUrls: boolean;
  summaryFile?: string;
}

export interface RunDeps {
  gemini: GeminiClient;
  fetchImpl?: typeof fetch;
  /** Flowers already on the site; defaults to the real list. */
  existing?: readonly FlowerData[];
  log?: (message: string) => void;
}

export interface Generated {
  flower: FlowerData;
  /** Sources that answered 401/403/429, so their title could not be read. */
  blockedUrls: string[];
}

export interface Skipped {
  name: string;
  reason: string;
}

export interface RunResult {
  added: Generated[];
  skipped: Skipped[];
  summary: string;
}

/* ------------------------------------------------------------------ helpers */

/** JSON from a model reply; tolerates a ```json fence. */
export function parseJson(text: string): unknown {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    throw new Error(`reply is not valid JSON (${e instanceof Error ? e.message : String(e)}): ${cleaned.slice(0, 160)}`, { cause: e });
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** "archetype: Rose (shrub-tree), Dahlia (perennial)" for each illustration style in use. */
export function archetypeMenu(existing: readonly FlowerData[]): string[] {
  const by = new Map<string, string[]>();
  for (const f of existing) {
    const list = by.get(f.visual.archetype) ?? [];
    list.push(`${f.text.en.name} (${f.group})`);
    by.set(f.visual.archetype, list);
  }
  return [...by.entries()].map(([a, names]) => `${a}: ${names.slice(0, 3).join(', ')}`);
}

/** Candidates the model proposed that are well-formed and not already on the site. */
export function filterCandidates(raw: unknown, existing: readonly FlowerData[], seen: ReadonlySet<string>): Candidate[] {
  if (!isRecord(raw) || !Array.isArray(raw.candidates)) return [];
  const known = new Set(existing.flatMap((f) => [f.scientificName, ...(f.scientificAliases ?? [])].map(normalizeLatin)));
  const out: Candidate[] = [];
  const taken = new Set(seen);
  for (const c of raw.candidates) {
    if (!isRecord(c)) continue;
    const { scientificName, vietnameseName, englishName } = c;
    if (typeof scientificName !== 'string' || typeof vietnameseName !== 'string' || typeof englishName !== 'string') continue;
    const key = normalizeLatin(scientificName);
    if (!/^[a-z-]+ [a-z-]+/.test(key) || known.has(key) || taken.has(key)) continue;
    taken.add(key);
    out.push({ scientificName: scientificName.trim(), vietnameseName: vietnameseName.trim(), englishName: englishName.trim() });
  }
  return out;
}

/* ------------------------------------------------------------------ pipeline */

async function proposeCandidates(deps: RunDeps, existing: readonly FlowerData[], n: number, seen: Set<string>): Promise<Candidate[]> {
  const res = await deps.gemini.generate({
    input: proposePrompt(existing, n, [...seen]),
    systemInstruction: PROPOSE_SYSTEM,
    schema: PROPOSE_SCHEMA,
    thinkingLevel: 'low',
    maxOutputTokens: 8000,
  });
  return filterCandidates(parseJson(res.text), existing, seen);
}

interface Research {
  notes: string;
  citations: Citation[];
}

async function research(deps: RunDeps, c: Candidate): Promise<Research> {
  const notes: string[] = [];
  const citations = new Map<string, Citation>();
  for (const topic of RESEARCH_TOPICS) {
    const res = await deps.gemini.generate({
      input: researchPrompt(c, topic.ask),
      systemInstruction: RESEARCH_SYSTEM,
      search: true,
      thinkingLevel: 'low',
      maxOutputTokens: 8000,
    });
    notes.push(`## ${topic.key}\n${res.text.trim()}`);
    for (const cit of res.citations) if (!citations.has(cit.url)) citations.set(cit.url, cit);
  }
  return { notes: notes.join('\n\n'), citations: [...citations.values()] };
}

interface VerifiedSet {
  sources: (VerifiedSource & { blocked: boolean })[];
}

const MAX_SOURCES_IN_PROMPT = 12;

/** Resolve redirects, drop dead links, read real page titles; one source per distinct URL, distinct hosts first. */
async function verifyCitations(deps: RunDeps, citations: readonly Citation[], verifyUrls: boolean): Promise<VerifiedSet> {
  const checked = await Promise.all(
    citations.map(async (c) => {
      if (!verifyUrls) return { c, check: { ok: true as const, finalUrl: c.url, title: null, blocked: false } };
      return { c, check: await checkUrl(c.url, deps.fetchImpl) };
    }),
  );
  const seenUrl = new Set<string>();
  const all: (VerifiedSource & { blocked: boolean })[] = [];
  for (const { c, check } of checked) {
    if (!check.ok) {
      deps.log?.(`  dropped source ${c.url}: ${check.reason}`);
      continue;
    }
    const key = normalizeUrl(check.finalUrl);
    if (seenUrl.has(key)) continue;
    seenUrl.add(key);
    all.push({ url: check.finalUrl, title: check.title ?? (c.title.trim() || null), blocked: check.blocked });
  }
  const hosts = new Set<string>();
  const first: typeof all = [];
  const rest: typeof all = [];
  for (const s of all) {
    const h = hostOf(s.url);
    if (hosts.has(h)) rest.push(s);
    else {
      hosts.add(h);
      first.push(s);
    }
  }
  return { sources: [...first, ...rest].slice(0, MAX_SOURCES_IN_PROMPT) };
}

const MAX_ATTEMPTS = 3;

async function createFlower(
  deps: RunDeps,
  c: Candidate,
  existing: readonly FlowerData[],
  archetypes: ReadonlySet<string>,
  menu: string[],
  verifyUrls: boolean,
): Promise<Generated> {
  const { notes, citations } = await research(deps, c);
  const { sources } = await verifyCitations(deps, citations, verifyUrls);
  deps.log?.(`  ${citations.length} cited, ${sources.length} verified source(s)`);
  if (sources.length < 3) throw new Error(`only ${sources.length} verified source(s) (need 3)`);

  const schema = flowerDraftSchema({ archetypes: [...archetypes] });
  const base = writePrompt({
    candidate: c,
    notes,
    sources: sources.map((s) => ({ url: s.url, title: s.title, host: hostOf(s.url) })),
    existing,
    archetypeMenu: menu,
  });

  let input = base;
  let errors: string[] = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await deps.gemini.generate({
      input,
      systemInstruction: WRITE_SYSTEM,
      schema,
      thinkingLevel: 'medium',
      maxOutputTokens: 32000,
    });
    try {
      const draft = parseJson(res.text) as FlowerDraft;
      const flower = buildFlower(draft, sources);
      errors = validateFlower(flower, { existing, archetypes });
      if (errors.length === 0) {
        const usedUrls = new Set(flower.sources.map((s) => s.url));
        return { flower, blockedUrls: sources.filter((s) => s.blocked && usedUrls.has(s.url)).map((s) => s.url) };
      }
    } catch (e) {
      errors = [`the draft is malformed: ${e instanceof Error ? e.message : String(e)}`];
    }
    deps.log?.(`  attempt ${attempt}/${MAX_ATTEMPTS} rejected: ${errors.slice(0, 3).join(' | ')}${errors.length > 3 ? ` (+${errors.length - 3} more)` : ''}`);
    input = `${base}\n\n---\n\n${repairPrompt(res.text, errors)}`;
  }
  throw new Error(`validation failed: ${errors.slice(0, 4).join('; ')}`);
}

/* ------------------------------------------------------------------ summary */

export function buildSummary(model: string, date: string, requested: number, added: Generated[], skipped: Skipped[]): string {
  const lines: string[] = [];
  lines.push(`## Loài hoa mới mỗi tuần — ${date}`, '');
  lines.push(`Model: \`${model}\` · thêm **${added.length}/${requested}** loài. Đây là nội dung do AI viết, cần người xem lại trước khi merge.`, '');
  if (added.length > 0) {
    lines.push('| Loài | Tên khoa học | Hình minh họa | Nở sau (ngày) | Nhóm |', '| --- | --- | --- | --- | --- |');
    for (const { flower: f } of added) {
      lines.push(
        `| ${f.text.vi.name} / ${f.text.en.name} | _${f.scientificName}_ | \`${f.visual.archetype}\` | ${f.daysToBloom[0]}–${f.daysToBloom[1]} | ${f.group} |`,
      );
    }
    for (const { flower: f, blockedUrls } of added) {
      lines.push('', `### ${f.text.vi.name} (\`${f.id}\`)`, '');
      for (const s of f.sources) {
        const note = blockedUrls.includes(s.url) ? ' — _trang chặn bot, chưa đọc được tiêu đề thật_' : '';
        lines.push(`- [${s.title}](${s.url}) (${s.publisher}): ${s.supports}${note}`);
      }
    }
  }
  if (skipped.length > 0) {
    lines.push('', '### Không thêm được', '');
    for (const s of skipped) lines.push(`- ${s.name}: ${s.reason}`);
  }
  lines.push(
    '',
    '### Cần kiểm tra khi review',
    '',
    '- [ ] Số liệu và khẳng định trong từng loài khớp với nguồn được ghi (nguồn đã được kiểm tra là mở được, nhưng phần "supports" do AI tóm tắt).',
    '- [ ] Thời gian chỉ là ước tính, `confidence` là `low`, `timeNote` nói đúng điều nguồn có và không có.',
    '- [ ] Hình minh họa (`archetype`) đủ giống loài thật; loài mới dùng lại kiểu vẽ có sẵn với bảng màu riêng.',
    '- [ ] Tên tiếng Việt, tiếng Anh và slug hợp lý.',
    '',
    'Lưu ý: PR do `GITHUB_TOKEN` tạo nên `deploy.yml` không tự chạy trên PR này. Workflow tuần đã chạy lint, typecheck, unit test, build (kèm verify) và e2e trước khi mở PR; khi merge vào `main`, `deploy.yml` chạy lại toàn bộ rồi mới deploy.',
  );
  return `${lines.join('\n')}\n`;
}

/* ------------------------------------------------------------------ run */

export async function run(opts: RunOptions, deps: RunDeps): Promise<RunResult> {
  const log = deps.log ?? (() => {});
  const base = deps.existing ?? FLOWERS;
  const archetypes = new Set(base.map((f) => f.visual.archetype));
  const menu = archetypeMenu(base);
  const added: Generated[] = [];
  const skipped: Skipped[] = [];
  const seen = new Set<string>();

  for (let round = 1; round <= 3 && added.length < opts.count; round++) {
    const need = opts.count - added.length;
    log(`Round ${round}: asking ${deps.gemini.model} for ${need + opts.spare} candidate(s)`);
    const taken = [...base, ...added.map((a) => a.flower)];
    const candidates = await proposeCandidates(deps, taken, need + opts.spare, seen);
    if (candidates.length === 0) log('  no usable candidates returned');
    for (const c of candidates) {
      seen.add(normalizeLatin(c.scientificName));
      if (added.length >= opts.count) break;
      log(`Researching ${c.scientificName} (${c.vietnameseName})`);
      try {
        const g = await createFlower(deps, c, [...base, ...added.map((a) => a.flower)], archetypes, menu, opts.verifyUrls);
        added.push(g);
        log(`  added ${g.flower.id} (${added.length}/${opts.count})`);
      } catch (e) {
        const reason = e instanceof Error ? e.message : String(e);
        skipped.push({ name: `${c.vietnameseName} (${c.scientificName})`, reason });
        log(`  skipped: ${reason}`);
      }
    }
  }

  if (added.length === 0) {
    throw new Error(`No flower could be added. ${skipped.map((s) => `${s.name}: ${s.reason}`).join(' | ')}`.trim());
  }

  const flowersDir = join(opts.root, 'src', 'data', 'flowers');
  // Only the newest batch carries the "new" badge and is listed first.
  for (const name of readdirSync(flowersDir).filter((n) => n.endsWith('.ts'))) {
    const file = join(flowersDir, name);
    const before = readFileSync(file, 'utf8');
    const after = stripIsNew(before);
    if (after !== before) writeFileSync(file, after);
  }
  const indexFile = join(opts.root, 'src', 'data', 'index.ts');
  let index = readFileSync(indexFile, 'utf8');
  for (const { flower } of added) {
    writeFileSync(join(flowersDir, `${flower.id}.ts`), flowerSource(flower));
    index = registerInIndex(index, flower.id);
  }
  writeFileSync(indexFile, index);

  const readmeFile = join(opts.root, 'README.md');
  writeFileSync(readmeFile, updateReadmeCount(readFileSync(readmeFile, 'utf8'), base.length + added.length));
  const siteFile = join(opts.root, 'src', 'config', 'site.ts');
  writeFileSync(siteFile, updateContentUpdated(readFileSync(siteFile, 'utf8'), opts.date));

  const summary = buildSummary(deps.gemini.model, opts.date, opts.count, added, skipped);
  if (opts.summaryFile) {
    mkdirSync(dirname(opts.summaryFile), { recursive: true });
    writeFileSync(opts.summaryFile, summary);
  }
  return { added, skipped, summary };
}

/* ------------------------------------------------------------------ CLI */

interface Cli {
  count: number;
  spare: number;
  summary: string;
  date: string;
  verifyUrls: boolean;
  root: string;
}

export function parseArgs(argv: string[], today = new Date().toISOString().slice(0, 10)): Cli {
  const cli: Cli = {
    count: 4,
    spare: 4,
    summary: join(ROOT, 'out', 'weekly-flowers-summary.md'),
    date: today,
    verifyUrls: true,
    root: ROOT,
  };
  const positiveInt = (flag: string, v: string | undefined): number => {
    const n = Number(v);
    if (!Number.isInteger(n) || n < 0 || n > 20) throw new Error(`${flag} needs a whole number from 0 to 20`);
    return n;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--count') cli.count = positiveInt(a, next());
    else if (a === '--spare') cli.spare = positiveInt(a, next());
    else if (a === '--summary') cli.summary = resolve(next() ?? '');
    else if (a === '--date') cli.date = next() ?? '';
    else if (a === '--root') cli.root = resolve(next() ?? '');
    else if (a === '--no-verify-urls') cli.verifyUrls = false; // tests only
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (cli.count < 1) throw new Error('--count must be at least 1');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cli.date)) throw new Error('--date must look like 2026-11-17');
  return cli;
}

async function main(): Promise<void> {
  const cli = parseArgs(process.argv.slice(2));
  const apiKey = process.env.GEMINI_API_KEY ?? '';
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set. Add it as a repository secret (see docs/AUTOMATION.md).');
  const log = (m: string) => console.log(m);
  const gemini = createGeminiClient({
    apiKey,
    model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
    baseUrl: process.env.GEMINI_BASE_URL,
    apiRevision: process.env.GEMINI_API_REVISION,
    log,
  });
  const result = await run(
    { root: cli.root, count: cli.count, spare: cli.spare, date: cli.date, verifyUrls: cli.verifyUrls, summaryFile: cli.summary },
    { gemini, log },
  );
  const ids = result.added.map((a) => a.flower.id);
  console.log(`\nAdded ${ids.length}/${cli.count}: ${ids.join(', ')}`);
  if (result.skipped.length > 0) console.log(`Skipped ${result.skipped.length}: ${result.skipped.map((s) => s.name).join('; ')}`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `added=${ids.length}\nids=${ids.join(',')}\nsummary=${cli.summary}\n`);
  }
  if (ids.length < cli.count) console.log(`::warning::Only ${ids.length} of ${cli.count} flowers could be added this week.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((e: unknown) => {
    console.error(`::error::${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  });
}
