import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { archetypeMenu, buildSummary, filterCandidates, parseArgs, parseJson, run } from '../../scripts/add-flowers';
import {
  buildFlower,
  daysToBloomOf,
  flowerDraftSchema,
  flowerSource,
  normalizeLatin,
  registerInIndex,
  speedBandFor,
  stripIsNew,
  toTs,
  updateContentUpdated,
  updateReadmeCount,
  validateFlower,
  varNameFor,
  type FlowerDraft,
  type VerifiedSource,
} from '../../scripts/lib/flower-gen';
import { PROPOSE_SYSTEM, RESEARCH_SYSTEM, WRITE_SYSTEM } from '../../scripts/lib/flower-prompts';
import {
  GeminiError,
  buildRequestBody,
  createGeminiClient,
  parseInteraction,
  supportsThinkingLevel,
  type GenerateRequest,
  type GeminiClient,
  type GeminiResponse,
} from '../../scripts/lib/gemini';
import { checkUrl, decodeEntities, extractTitle, normalizeUrl } from '../../scripts/lib/verify-url';
import { FLOWERS } from '../../src/data';
import type { FlowerData, StageId } from '../../src/data/types';

const ROOT = join(__dirname, '..', '..');
const ARCHETYPES = new Set(FLOWERS.map((f) => f.visual.archetype));

/* ------------------------------------------------------------------ fixtures */

const VI_META = 'Xem hoa thử nghiệm lớn lên từ hạt đến lúc nở rộ qua time-lapse tương tác: các giai đoạn, thời gian ước tính, cách chăm sóc và vài điều thú vị.';
const EN_META = 'Watch a test bloom grow from seed to full bloom in an interactive time-lapse: growth stages, estimated timing, care tips and a few fun facts.';

const text = (lang: 'vi' | 'en') => {
  const vi = lang === 'vi';
  return {
    name: vi ? 'Hoa thử nghiệm' : 'Test bloom',
    aliases: vi ? ['thử nghiệm', 'hoa mẫu'] : ['sample flower'],
    tagline: vi ? 'Loài hoa nhỏ chỉ có trong dữ liệu thử nghiệm.' : 'A small flower that exists only in test data.',
    metaDescription: vi ? VI_META : EN_META,
    intro: vi
      ? ['Hoa thử nghiệm là loài hư cấu dùng để kiểm tra quy trình thêm hoa tự động, không tồn tại ngoài đời.', 'Các mốc thời gian chỉ là ước tính vì nguồn không nêu số liệu cụ thể.']
      : ['The test bloom is an invented species used to check the automatic flower pipeline; it does not exist in nature.', 'The timings are rough estimates because the sources give no exact figures.'],
    stageNotes: [
      { id: 'seed' as StageId, description: vi ? 'Hạt rất nhỏ, màu đen, gieo nông trên mặt đất.' : 'The seeds are tiny and black and are sown shallowly on the soil.' },
      { id: 'full-bloom' as StageId, name: '', description: vi ? 'Hoa xòe rộng khi nắng gắt và khép lại vào chiều.' : 'The flower opens wide in strong sun and closes in the afternoon.' },
    ],
    care: {
      light: vi ? 'Nắng đầy đủ.' : 'Full sun.',
      water: vi ? 'Tưới ít, để đất khô giữa hai lần.' : 'Water sparingly and let the soil dry out between waterings.',
      soil: vi ? 'Đất cát, thoát nước tốt.' : 'Sandy, well-drained soil.',
      temperature: vi ? 'Ưa nóng, không chịu lạnh.' : 'Loves heat and dislikes cold.',
    },
    facts: vi ? ['Hoa chỉ nở khi có nắng.', 'Thân mọng nước.', 'Dễ trồng từ hạt.'] : ['The flower opens only in sun.', 'The stems are succulent.', 'Easy to grow from seed.'],
    keywords: vi ? ['hoa thử nghiệm', 'cách trồng hoa thử nghiệm', 'time-lapse hoa thử nghiệm'] : ['test bloom', 'test bloom growth stages', 'time-lapse test bloom'],
    altText: vi ? 'Minh họa cây thử nghiệm với hoa hồng tươi.' : 'Illustration of a test plant with bright pink flowers.',
    timeNote: vi ? 'Thời gian là ước tính thô; nguồn không nêu số ngày cho từng giai đoạn.' : 'Timings are rough estimates; the sources give no day counts per stage.',
    startNote: vi ? 'Mô phỏng bắt đầu từ một hạt thử nghiệm.' : 'The simulation starts from a single test seed.',
  };
};

const makeDraft = (over: Partial<FlowerDraft> = {}): FlowerDraft => ({
  id: 'test-bloom',
  slugVi: 'hoa-thu-nghiem',
  slugEn: 'test-bloom',
  scientificName: 'Floribus exempli',
  scientificAliases: ['test bloom', 'hoa thử nghiệm'],
  family: 'Exemplaceae',
  group: 'annual',
  colors: ['pink', 'red', 'yellow'],
  bloomSeasons: ['spring', 'summer'],
  startMaterial: 'seed',
  stages: [
    // Deliberately shuffled: buildFlower must put them back in biological order.
    { id: 'wilting', minDays: 10, maxDays: 20 },
    { id: 'seed', minDays: 1, maxDays: 3 },
    { id: 'germination', minDays: 5, maxDays: 10 },
    { id: 'seedling', minDays: 14, maxDays: 21 },
    { id: 'vegetative', minDays: 20, maxDays: 40 },
    { id: 'bud-formation', minDays: 7, maxDays: 14 },
    { id: 'bud-development', minDays: 5, maxDays: 10 },
    { id: 'blooming', minDays: 1, maxDays: 2 },
    { id: 'full-bloom', minDays: 60, maxDays: 120 },
  ],
  archetype: 'daisy',
  palette: { petal: '#e8458b', petalDeep: '#a31f5a', petalTip: '#f58cb8', center: '#f2c230', centerDeep: '#a87a10', leaf: '#4c9a4a', leafDeep: '#245a2c', stem: '#7a8f3a' },
  related: ['rose', 'daisy'],
  sources: [
    { ref: 1, title: 'ignored: real page title wins', publisher: 'Example University Extension', supports: 'Succulent annual that opens in full sun.' },
    { ref: 2, title: 'Floribus exempli', publisher: 'Example Botanic Garden', supports: 'Flower colours and family.' },
    { ref: 3, title: 'Test bloom', publisher: 'Example Society', supports: 'Propagation from seed.' },
  ],
  vi: text('vi'),
  en: text('en'),
  ...over,
});

const verified: VerifiedSource[] = [
  { url: 'https://extension.example.edu/test-bloom', title: 'Test Bloom — Extension' },
  { url: 'https://garden.example.org/portulaca', title: 'Floribus exempli' },
  { url: 'https://society.example.net/test-bloom', title: null },
];

const flower = (over: Partial<FlowerDraft> = {}): FlowerData => buildFlower(makeDraft(over), verified);
const ctx = { existing: FLOWERS, archetypes: ARCHETYPES };

/* ------------------------------------------------------------------ gemini client */

describe('gemini request and response', () => {
  it('builds an Interactions request with search, a JSON schema and a thinking level', () => {
    const body = buildRequestBody('gemini-4-carbon', {
      input: 'hi',
      systemInstruction: 'be brief',
      search: true,
      schema: { type: 'object' },
      maxOutputTokens: 1000,
      thinkingLevel: 'low',
    });
    expect(body).toEqual({
      model: 'gemini-4-carbon',
      input: 'hi',
      store: false,
      system_instruction: 'be brief',
      tools: [{ type: 'google_search' }],
      response_format: { type: 'text', mime_type: 'application/json', schema: { type: 'object' } },
      generation_config: { max_output_tokens: 1000, thinking_level: 'low' },
    });
  });

  it('omits optional parts and never sends thinking_level to models that reject it', () => {
    expect(buildRequestBody('gemini-4-carbon', { input: 'x' })).toEqual({ model: 'gemini-4-carbon', input: 'x', store: false });
    expect(supportsThinkingLevel('gemini-3.8-flash')).toBe(true);
    expect(supportsThinkingLevel('gemini-2.5-flash')).toBe(false);
    const body = buildRequestBody('gemini-2.5-flash', { input: 'x', thinkingLevel: 'high' });
    expect(body.generation_config).toBeUndefined();
  });

  const completed = {
    status: 'completed',
    steps: [
      { type: 'thought', summary: [] },
      { type: 'google_search_call', arguments: { queries: ['moss rose', 'portulaca'] } },
      { type: 'google_search_result', call_id: 'a', result: [] },
      {
        type: 'model_output',
        content: [
          {
            type: 'text',
            text: 'Hello ',
            annotations: [
              { type: 'url_citation', url: 'https://a.example/x', title: 'a.example', start_index: 0, end_index: 3 },
              { type: 'url_citation', url: 'https://a.example/x', title: 'dup', start_index: 3, end_index: 5 },
            ],
          },
          { type: 'text', text: 'world', annotations: [{ type: 'url_citation', url: 'https://b.example/y', title: 'b.example' }] },
        ],
      },
    ],
  };

  it('reads text, de-duplicated citations and search queries', () => {
    const r = parseInteraction(completed);
    expect(r.text).toBe('Hello world');
    expect(r.citations).toEqual([
      { url: 'https://a.example/x', title: 'a.example' },
      { url: 'https://b.example/y', title: 'b.example' },
    ]);
    expect(r.searchQueries).toEqual(['moss rose', 'portulaca']);
  });

  it('rejects interactions that did not complete or have no text', () => {
    expect(() => parseInteraction({ status: 'incomplete', steps: [] })).toThrow(/cut off/);
    expect(() => parseInteraction({ status: 'failed', steps: [], errors: [{ message: 'boom' }] })).toThrow(/boom/);
    expect(() => parseInteraction({ status: 'completed', steps: [{ type: 'model_output', content: [] }] })).toThrow(/no text/);
    expect(() => parseInteraction('nope')).toThrow(GeminiError);
  });

  const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

  it('posts to /interactions with the key in a header, and retries 429/503 with backoff', async () => {
    const calls: { url: string; init: RequestInit }[] = [];
    const waits: number[] = [];
    const replies = [json(503, { error: { message: 'overloaded' } }), json(429, { error: { message: 'slow down' } }, { 'retry-after': '2' }), json(200, completed)];
    const client = createGeminiClient({
      apiKey: 'k-123',
      model: 'gemini-4-carbon',
      baseUrl: 'https://example.test/v1beta/',
      fetchImpl: (async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        return replies.shift()!;
      }) as unknown as typeof fetch,
      sleep: async (ms) => void waits.push(ms),
    });
    const r = await client.generate({ input: 'hi', search: true });
    expect(r.text).toBe('Hello world');
    expect(calls).toHaveLength(3);
    expect(calls[0]!.url).toBe('https://example.test/v1beta/interactions');
    expect((calls[0]!.init.headers as Record<string, string>)['x-goog-api-key']).toBe('k-123');
    expect(calls[0]!.url).not.toContain('k-123');
    expect(waits).toHaveLength(2);
    expect(waits[1]).toBe(2000); // honours Retry-After
  });

  it('does not retry client errors, and gives up after maxRetries on transient ones', async () => {
    let n = 0;
    const bad = createGeminiClient({
      apiKey: 'k',
      fetchImpl: (async () => (n++, json(400, { error: { message: 'API key not valid' } }))) as unknown as typeof fetch,
      sleep: async () => {},
    });
    await expect(bad.generate({ input: 'x' })).rejects.toThrow(/HTTP 400: API key not valid/);
    expect(n).toBe(1);

    let m = 0;
    const flaky = createGeminiClient({
      apiKey: 'k',
      maxRetries: 2,
      fetchImpl: (async () => (m++, json(500, { error: { message: 'oops' } }))) as unknown as typeof fetch,
      sleep: async () => {},
    });
    await expect(flaky.generate({ input: 'x' })).rejects.toThrow(/HTTP 500/);
    expect(m).toBe(3);
  });

  it('retries network failures', async () => {
    let n = 0;
    const client = createGeminiClient({
      apiKey: 'k',
      fetchImpl: (async () => {
        if (n++ === 0) throw new TypeError('fetch failed');
        return json(200, completed);
      }) as unknown as typeof fetch,
      sleep: async () => {},
    });
    expect((await client.generate({ input: 'x' })).text).toBe('Hello world');
    expect(n).toBe(2);
  });

  it('refuses an empty API key', () => {
    expect(() => createGeminiClient({ apiKey: '' })).toThrow(/GEMINI_API_KEY/);
  });
});

/* ------------------------------------------------------------------ url checks */

describe('source verification', () => {
  const page = (status: number, body = '', headers: Record<string, string> = { 'content-type': 'text/html; charset=utf-8' }) =>
    (async () => new Response(body, { status, headers })) as unknown as typeof fetch;

  it('reads the real page title and decodes entities', async () => {
    const r = await checkUrl('https://x.example/p', page(200, '<html><head><title>\n Rose &amp; Lily — Guide &#8211; RHS </title></head>'));
    expect(r).toEqual({ ok: true, finalUrl: 'https://x.example/p', title: 'Rose & Lily — Guide – RHS', blocked: false });
    expect(extractTitle('<p>no title</p>')).toBeNull();
    expect(decodeEntities('a&nbsp;b &lt;c&gt; &#x41; &unknown;')).toBe('a b <c> A &unknown;');
  });

  it('rejects dead links, accepts bot-blocked ones with a flag, and rejects non-https', async () => {
    expect(await checkUrl('https://x.example/gone', page(404))).toEqual({ ok: false, reason: 'HTTP 404' });
    expect(await checkUrl('https://x.example/boom', page(500))).toEqual({ ok: false, reason: 'HTTP 500' });
    expect(await checkUrl('https://x.example/walled', page(403))).toEqual({ ok: true, finalUrl: 'https://x.example/walled', title: null, blocked: true });
    const insecure = (async () => {
      const res = new Response('', { status: 200, headers: { 'content-type': 'text/html' } });
      Object.defineProperty(res, 'url', { value: 'http://x.example/plain' });
      return res;
    }) as unknown as typeof fetch;
    expect(await checkUrl('https://x.example/p', insecure)).toMatchObject({ ok: false });
  });

  it('follows redirect wrappers to the real URL and reports network errors', async () => {
    const wrapped = (async () => {
      const res = new Response('<title>Real</title>', { status: 200, headers: { 'content-type': 'text/html' } });
      Object.defineProperty(res, 'url', { value: 'https://real.example/page' });
      return res;
    }) as unknown as typeof fetch;
    expect(await checkUrl('https://wrapper.example/r/abc', wrapped)).toMatchObject({ ok: true, finalUrl: 'https://real.example/page', title: 'Real' });
    const down = (async () => {
      throw new TypeError('getaddrinfo ENOTFOUND');
    }) as unknown as typeof fetch;
    expect(await checkUrl('https://nowhere.invalid/', down)).toEqual({ ok: false, reason: 'getaddrinfo ENOTFOUND' });
  });

  it('normalises URLs for comparison', () => {
    expect(normalizeUrl('https://a.example/x/#top')).toBe('https://a.example/x');
    expect(normalizeUrl('https://a.example/')).toBe('https://a.example');
  });
});

/* ------------------------------------------------------------------ flower logic */

describe('building a flower from a draft', () => {
  it('derives order, days to bloom, speed band and honest defaults instead of trusting the model', () => {
    const f = flower();
    expect(f.stages.map((s) => s.id)).toEqual(['seed', 'germination', 'seedling', 'vegetative', 'bud-formation', 'bud-development', 'blooming', 'full-bloom', 'wilting']);
    expect(f.daysToBloom).toEqual([53, 100]);
    expect(f.speedBand).toBe('fast');
    expect(f.confidence).toBe('low');
    expect(f.featured).toBe(false);
    expect(f.isNew).toBe(true);
    expect(f.media).toBeUndefined();
    expect(f.visual.palette.accent).toBeUndefined();
  });

  it('uses the verified URL and the real page title, falling back to the model title', () => {
    const f = flower();
    expect(f.sources.map((s) => [s.url, s.title])).toEqual([
      ['https://extension.example.edu/test-bloom', 'Test Bloom — Extension'],
      ['https://garden.example.org/portulaca', 'Floribus exempli'],
      ['https://society.example.net/test-bloom', 'Test bloom'],
    ]);
  });

  it('drops a source that points outside the verified list', () => {
    const f = flower({ sources: [...makeDraft().sources, { ref: 9, title: 'Invented', publisher: 'Nobody', supports: 'Nothing real' }] });
    expect(f.sources).toHaveLength(3);
    expect(f.sources.some((s) => s.title === 'Invented')).toBe(false);
  });

  it('keeps an empty stage name out of the data', () => {
    expect(flower().text.en.stages['full-bloom']).toEqual({ description: 'The flower opens wide in strong sun and closes in the afternoon.' });
  });

  it('maps days to the same speed bands as the data tests', () => {
    expect(speedBandFor(120)).toBe('fast');
    expect(speedBandFor(121)).toBe('medium');
    expect(speedBandFor(365)).toBe('medium');
    expect(speedBandFor(366)).toBe('slow');
    expect(daysToBloomOf([{ id: 'seed', days: [1, 2] }, { id: 'full-bloom', days: [50, 60] }])).toEqual([1, 2]);
  });

  it('reproduces daysToBloom for the most recent real batch (the rule the data follows)', () => {
    for (const id of ['celosia', 'gladiolus', 'lily', 'pansy', 'bougainvillea', 'flame-tree', 'plumeria', 'hibiscus']) {
      const f = FLOWERS.find((x) => x.id === id)!;
      expect(daysToBloomOf(f.stages), id).toEqual(f.daysToBloom);
    }
  });
});

describe('validating a flower', () => {
  it('accepts a complete, well-formed entry', () => {
    expect(validateFlower(flower(), ctx)).toEqual([]);
    expect(VI_META.length).toBeGreaterThanOrEqual(70);
    expect(VI_META.length).toBeLessThanOrEqual(160);
    expect(EN_META.length).toBeGreaterThanOrEqual(70);
    expect(EN_META.length).toBeLessThanOrEqual(160);
  });

  const problems = (over: Partial<FlowerDraft>, mutate?: (f: FlowerData) => void): string => {
    const f = flower(over);
    mutate?.(f);
    return validateFlower(f, ctx).join(' | ');
  };

  it('rejects ids, slugs, names and species that already exist', () => {
    expect(problems({ id: 'rose' })).toMatch(/id "rose" already exists/);
    expect(problems({ slugEn: 'sunflower' })).toMatch(/slugs\.en "sunflower" is already used/);
    expect(problems({ slugVi: 'hoa-sen' })).toMatch(/slugs\.vi "hoa-sen" is already used/);
    expect(problems({ scientificName: 'Hibiscus × rosa-sinensis' })).toMatch(/already on the site \(hibiscus\)/);
    expect(problems({}, (f) => (f.text.en.name = 'Sunflower'))).toMatch(/text\.en\.name/);
  });

  it('rejects malformed identifiers, palettes and enums', () => {
    expect(problems({ id: 'Moss Rose' })).toMatch(/lowercase ASCII/);
    expect(problems({ slugVi: 'hoa-mười-giờ' })).toMatch(/slugs\.vi/);
    expect(problems({ palette: { ...makeDraft().palette, petal: 'pink' } })).toMatch(/palette\.petal/);
    expect(problems({ scientificName: 'Portulaca' })).toMatch(/not a binomial/);
    expect(problems({ archetype: 'unicorn' as never })).toMatch(/no illustration renderer/);
    expect(problems({ colors: [] })).toMatch(/colors is empty/);
    expect(problems({ related: ['no-such-flower'] })).toMatch(/not a flower on the site/);
    expect(problems({ related: [] })).toMatch(/related is empty/);
  });

  it('rejects bad stages', () => {
    expect(problems({ stages: makeDraft().stages.slice(0, 5) })).toMatch(/only 5 stages/);
    expect(problems({ stages: [...makeDraft().stages, { id: 'seed', minDays: 1, maxDays: 2 }] })).toMatch(/duplicate id/);
    expect(problems({ stages: makeDraft().stages.map((s) => (s.id === 'seedling' ? { ...s, minDays: 30, maxDays: 10 } : s)) })).toMatch(/invalid days/);
  });

  it('rejects too few sources, non-https and duplicate URLs', () => {
    expect(problems({ sources: makeDraft().sources.slice(0, 2) })).toMatch(/only 2 usable source/);
    expect(problems({}, (f) => (f.sources[0]!.url = 'http://insecure.example/x'))).toMatch(/not https/);
    expect(problems({}, (f) => (f.sources[1]!.url = f.sources[0]!.url))).toMatch(/duplicate URL/);
  });

  it('rejects text problems the data tests also catch', () => {
    const d = makeDraft();
    expect(problems({ vi: { ...d.vi, metaDescription: 'ngắn' } })).toMatch(/text\.vi\.metaDescription is 4 characters/);
    expect(problems({ en: { ...d.en, metaDescription: 'x'.repeat(170) } })).toMatch(/text\.en\.metaDescription is 170/);
    expect(problems({ en: { ...d.en, facts: ['one', 'two'] } })).toMatch(/text\.en\.facts needs at least 3/);
    expect(problems({ vi: { ...d.vi, care: { ...d.vi.care, soil: '' } } })).toMatch(/care\.soil is empty/);
    expect(problems({ en: { ...d.en, timeNote: 'TODO fill in' } })).toMatch(/placeholder/);
    expect(problems({ en: { ...d.en, facts: ['see https://example.com', 'b', 'c'] } })).toMatch(/raw URL/);
    expect(problems({ en: { ...d.en, stageNotes: [{ id: 'seed', description: 'short' }] } })).toMatch(/stages\.seed description is too short/);
  });

  it('rejects Vietnamese that is not Vietnamese, and vi/en copies', () => {
    const d = makeDraft();
    expect(problems({ vi: { ...d.vi, tagline: 'A low sun loving flower', intro: ['English only paragraph one.', 'English only paragraph two.'] } })).toMatch(/does not look like Vietnamese/);
    expect(problems({ vi: { ...d.vi, tagline: d.en.tagline, intro: [...d.en.intro] } })).toMatch(/taglines are identical/);
    expect(problems({ vi: { ...d.vi, intro: [d.en.intro[0]!, d.vi.intro[1]!] } })).toMatch(/first paragraphs are identical/);
  });

  it('normalises scientific names so a hybrid sign cannot hide a duplicate', () => {
    expect(normalizeLatin('Hibiscus × rosa-sinensis')).toBe('hibiscus rosa-sinensis');
    expect(normalizeLatin(' Plumeria   rubra ')).toBe('plumeria rubra');
  });
});

describe('the schema sent to Gemini', () => {
  const ALLOWED = new Set(['type', 'properties', 'required', 'items', 'enum', 'minItems', 'maxItems', 'minimum', 'description']);
  const walk = (node: unknown, path: string, bad: string[]) => {
    if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`, bad));
    if (typeof node !== 'object' || node === null) return;
    const rec = node as Record<string, unknown>;
    for (const [k, v] of Object.entries(rec)) {
      // Inside "properties" the keys are field names, not schema keywords.
      if (path.endsWith('.properties')) walk(v, `${path}.${k}`, bad);
      else {
        if (!ALLOWED.has(k)) bad.push(`${path}.${k}`);
        walk(v, `${path}.${k}`, bad);
      }
    }
  };

  it('uses only keywords the API enforces, and requires what the data model requires', () => {
    const schema = flowerDraftSchema({ archetypes: [...ARCHETYPES] });
    const bad: string[] = [];
    walk(schema, '$', bad);
    expect(bad).toEqual([]);
    const required = schema.required as string[];
    for (const k of ['id', 'slugVi', 'slugEn', 'scientificName', 'stages', 'archetype', 'palette', 'sources', 'vi', 'en']) expect(required).toContain(k);
    const props = schema.properties as Record<string, { enum?: string[]; properties?: Record<string, unknown>; required?: string[] }>;
    expect(props.archetype!.enum).toContain('hibiscus');
    expect(props.palette!.required).not.toContain('accent');
    expect(Object.keys(props.vi!.properties!)).toEqual(Object.keys(props.en!.properties!));
  });
});

/* ------------------------------------------------------------------ codegen and registration */

describe('writing the flower module', () => {
  it('serialises with the repo style: single quotes, unquoted keys, short arrays inline', () => {
    expect(toTs({ a: 1, 'full-bloom': 'it\'s', list: [1, 2], nested: { b: true } })).toBe("{ a: 1, 'full-bloom': 'it\\'s', list: [1, 2], nested: { b: true } }");
    expect(toTs('line1\nline2')).toBe("'line1\\nline2'");
    expect(toTs([])).toBe('[]');
    expect(toTs({ a: undefined, b: 1 })).toBe('{ b: 1 }');
  });

  it('round-trips a whole flower through TypeScript source', () => {
    const f = flower();
    const src = flowerSource(f);
    expect(src.startsWith("import type { FlowerData } from '../types';\n\nexport const testBloom: FlowerData = {")).toBe(true);
    expect(src.endsWith('};\n')).toBe(true);
    const literal = src.slice(src.indexOf(': FlowerData = ') + ': FlowerData = '.length, src.lastIndexOf(';\n'));
    expect(new Function(`return (${literal});`)()).toEqual(f);
    expect(src).toContain("{ id: 'seed', days: [1, 3] },");
  });

  it('names variables like the existing index does', () => {
    expect(varNameFor('flame-tree')).toBe('flameTree');
    expect(varNameFor('hibiscus')).toBe('hibiscus');
    expect(varNameFor('class')).toBe('classFlower');
    expect(varNameFor('test-bloom')).toBe('testBloom');
  });
});

describe('registering a flower', () => {
  const SAMPLE = [
    "import type { FlowerData, Lang } from './types';",
    "import { alpha } from './flowers/alpha';",
    "import { betaGamma } from './flowers/beta-gamma';",
    '',
    '/** All flowers, in the order they should be listed. */',
    'export const FLOWERS: readonly FlowerData[] = [',
    '  alpha,',
    '  betaGamma,',
    '];',
    '',
    'const byId = new Map(FLOWERS.map((f) => [f.id, f]));',
    '',
  ].join('\n');

  it('adds one import and one list entry in order, and refuses to register twice', () => {
    const out = registerInIndex(SAMPLE, 'test-bloom');
    expect(out).toContain("import { testBloom } from './flowers/test-bloom';");
    expect(out.indexOf("from './flowers/test-bloom'")).toBeGreaterThan(out.indexOf("from './flowers/beta-gamma'"));
    expect(out.indexOf("from './flowers/test-bloom'")).toBeLessThan(out.indexOf('/** All flowers'));
    expect(out).toMatch(/\n {2}betaGamma,\n {2}testBloom,\n\];/);
    expect(out.split('\n').length).toBe(SAMPLE.split('\n').length + 2);
    expect(() => registerInIndex(out, 'test-bloom')).toThrow(/already registers/);
    // A second flower lands after the first.
    expect(registerInIndex(out, 'second-bloom')).toMatch(/\n {2}testBloom,\n {2}secondBloom,\n\];/);
    // An id that merely starts like an existing one is not a duplicate.
    expect(() => registerInIndex(SAMPLE, 'alpha-two')).not.toThrow();
    expect(() => registerInIndex(SAMPLE, 'alpha')).toThrow(/already registers/);
  });

  it('works on the real src/data/index.ts, whatever the last flower is', () => {
    const real = readFileSync(join(ROOT, 'src', 'data', 'index.ts'), 'utf8');
    const out = registerInIndex(real, 'test-bloom');
    const last = /\n {2}(\w+),\n\];/.exec(real)![1]!;
    expect(out).toContain(`\n  ${last},\n  testBloom,\n];`);
    expect(out.split('\n').length).toBe(real.split('\n').length + 2);
  });

  it('fails loudly if the file no longer has the expected shape', () => {
    expect(() => registerInIndex('export const x = 1;', 'test-bloom')).toThrow(/no `import/);
    expect(() => registerInIndex("import { a } from './flowers/a';\nexport const y = 1;", 'test-bloom')).toThrow(/FLOWERS array/);
  });

  it('clears the "new" badge, and bumps the count and review date', () => {
    expect(stripIsNew('  featured: false,\n  isNew: true,\n  stages: [\n')).toBe('  featured: false,\n  stages: [\n');
    expect(stripIsNew('no badge here\n')).toBe('no badge here\n');
    expect(updateReadmeCount('data/ dữ liệu 28 loài (flowers/*.ts)', 32)).toBe('data/ dữ liệu 32 loài (flowers/*.ts)');
    expect(() => updateReadmeCount('nothing', 1)).toThrow(/not found/);
    expect(updateContentUpdated("export const CONTENT_UPDATED = '2026-11-10';", '2026-11-17')).toBe("export const CONTENT_UPDATED = '2026-11-17';");
    expect(() => updateContentUpdated('nothing', '2026-11-17')).toThrow(/not found/);
  });

  it('matches the real README and site config', () => {
    expect(() => updateReadmeCount(readFileSync(join(ROOT, 'README.md'), 'utf8'), 1)).not.toThrow();
    expect(() => updateContentUpdated(readFileSync(join(ROOT, 'src', 'config', 'site.ts'), 'utf8'), '2026-01-01')).not.toThrow();
  });
});

/* ------------------------------------------------------------------ orchestration */

describe('candidates and arguments', () => {
  it('keeps only well-formed candidates that are new, once each', () => {
    const raw = {
      candidates: [
        { scientificName: 'Hibiscus rosa-sinensis', vietnameseName: 'dâm bụt', englishName: 'hibiscus' },
        { scientificName: 'Floribus exempli', vietnameseName: 'hoa thử nghiệm', englishName: 'test bloom' },
        { scientificName: 'floribus  exempli', vietnameseName: 'again', englishName: 'again' },
        { scientificName: 'Floribus', vietnameseName: 'chỉ một từ', englishName: 'one word' },
        { scientificName: 'Tagetes erecta', vietnameseName: 'cúc vạn thọ' },
        'junk',
      ],
    };
    expect(filterCandidates(raw, FLOWERS, new Set()).map((c) => c.scientificName)).toEqual(['Floribus exempli']);
    expect(filterCandidates(raw, FLOWERS, new Set(['floribus exempli']))).toEqual([]);
    expect(filterCandidates({ nope: 1 }, FLOWERS, new Set())).toEqual([]);
  });

  it('parses JSON replies, with or without a code fence', () => {
    expect(parseJson('{"a":1}')).toEqual({ a: 1 });
    expect(parseJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
    expect(() => parseJson('not json')).toThrow(/not valid JSON/);
  });

  it('parses and validates command-line arguments', () => {
    const a = parseArgs(['--count', '3', '--spare', '2', '--date', '2026-11-17', '--no-verify-urls'], '2026-01-01');
    expect(a).toMatchObject({ count: 3, spare: 2, date: '2026-11-17', verifyUrls: false });
    expect(parseArgs([], '2026-11-17')).toMatchObject({ count: 4, spare: 4, date: '2026-11-17', verifyUrls: true });
    expect(() => parseArgs(['--count', 'x'])).toThrow(/whole number/);
    expect(() => parseArgs(['--count', '0'])).toThrow(/at least 1/);
    expect(() => parseArgs(['--date', 'tomorrow'])).toThrow(/--date/);
    expect(() => parseArgs(['--wat'])).toThrow(/Unknown argument/);
  });

  it('lists the illustration styles with example species', () => {
    const menu = archetypeMenu(FLOWERS);
    expect(menu.find((l) => l.startsWith('hibiscus:'))).toMatch(/^hibiscus: Hibiscus \(shrub-tree\)/);
    expect(menu).toHaveLength(ARCHETYPES.size);
  });
});

/** A scripted Gemini: proposes, researches (with citations) and writes, deciding by the system prompt. */
function fakeGemini(opts: { candidates: object[]; citations?: number; drafts: (n: number) => unknown }): GeminiClient & { calls: GenerateRequest[] } {
  const calls: GenerateRequest[] = [];
  let writes = 0;
  const reply = (text: string, citations: GeminiResponse['citations'] = []): GeminiResponse => ({ text, citations, searchQueries: [] });
  return {
    model: 'gemini-test',
    calls,
    async generate(req) {
      calls.push(req);
      if (req.systemInstruction === PROPOSE_SYSTEM) return reply(JSON.stringify({ candidates: opts.candidates }));
      if (req.systemInstruction === RESEARCH_SYSTEM) {
        const n = opts.citations ?? 3;
        return reply('Notes about the plant.', Array.from({ length: n }, (_, i) => ({ url: `https://src${i}.example.org/page`, title: `src${i}.example.org` })));
      }
      expect(req.systemInstruction).toBe(WRITE_SYSTEM);
      return reply(JSON.stringify(opts.drafts(writes++)));
    },
  };
}

const CANDIDATE = { scientificName: 'Floribus exempli', vietnameseName: 'hoa thử nghiệm', englishName: 'test bloom' };

describe('run: the whole weekly pipeline against a scripted Gemini', () => {
  let root: string;
  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'bloomora-flowers-'));
    mkdirSync(join(root, 'src', 'data', 'flowers'), { recursive: true });
    mkdirSync(join(root, 'src', 'config'), { recursive: true });
    copyFileSync(join(ROOT, 'src', 'data', 'index.ts'), join(root, 'src', 'data', 'index.ts'));
    // A stand-in for an older flower that still carries the "new" badge (the real files lose it after each batch).
    writeFileSync(join(root, 'src', 'data', 'flowers', 'legacy.ts'), "export const legacy = {\n  featured: false,\n  isNew: true,\n  stages: [],\n};\n");
    copyFileSync(join(ROOT, 'src', 'config', 'site.ts'), join(root, 'src', 'config', 'site.ts'));
    copyFileSync(join(ROOT, 'README.md'), join(root, 'README.md'));
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  const opts = (over = {}) => ({ root, count: 1, spare: 0, date: '2026-11-17', verifyUrls: false, summaryFile: join(root, 'out', 'summary.md'), ...over });
  const read = (p: string) => readFileSync(join(root, p), 'utf8');

  it('writes the module, registers it, bumps the metadata and writes a summary', async () => {
    const gemini = fakeGemini({ candidates: [CANDIDATE], drafts: () => makeDraft() });
    const result = await run(opts(), { gemini });
    expect(result.added.map((a) => a.flower.id)).toEqual(['test-bloom']);

    expect(existsSync(join(root, 'src/data/flowers/test-bloom.ts'))).toBe(true);
    expect(read('src/data/flowers/test-bloom.ts')).toContain("export const testBloom: FlowerData = {");
    expect(read('src/data/flowers/test-bloom.ts')).toContain('isNew: true,');
    expect(read('src/data/flowers/legacy.ts')).not.toContain('isNew: true');
    expect(read('src/data/flowers/legacy.ts')).toContain('featured: false');
    expect(read('src/data/index.ts')).toContain("import { testBloom } from './flowers/test-bloom';");
    expect(read('README.md')).toContain(`dữ liệu ${FLOWERS.length + 1} loài`);
    expect(read('src/config/site.ts')).toContain("CONTENT_UPDATED = '2026-11-17'");
    const summary = read('out/summary.md');
    expect(summary).toContain('Hoa thử nghiệm / Test bloom');
    expect(summary).toContain('gemini-test');
    expect(summary).toContain('https://src0.example.org/page');
    // Research is grounded; proposing and writing are not.
    const kinds = gemini.calls.map((c) => (c.search ? 'search' : c.schema ? 'json' : 'other'));
    expect(kinds).toEqual(['json', 'search', 'search', 'search', 'json']);
  });

  it('asks for a repair when the first draft fails validation, then accepts the fix', async () => {
    const gemini = fakeGemini({
      candidates: [CANDIDATE],
      drafts: (n) => (n === 0 ? makeDraft({ vi: { ...makeDraft().vi, metaDescription: 'quá ngắn' } }) : makeDraft()),
    });
    const result = await run(opts(), { gemini });
    expect(result.added).toHaveLength(1);
    const writes = gemini.calls.filter((c) => c.systemInstruction === WRITE_SYSTEM);
    expect(writes).toHaveLength(2);
    expect(writes[1]!.input).toContain('failed validation');
    expect(writes[1]!.input).toContain('text.vi.metaDescription is 8 characters');
  });

  it('skips a candidate that never validates and moves on to the spare one', async () => {
    const second = { scientificName: 'Floribus secundus', vietnameseName: 'hoa thứ hai', englishName: 'second bloom' };
    const gemini = fakeGemini({
      candidates: [CANDIDATE, second],
      drafts: (n) => (n < 3 ? makeDraft({ id: 'rose' }) : makeDraft({ id: 'second-bloom', slugEn: 'second-bloom', slugVi: 'hoa-thu-hai', scientificName: 'Floribus secundus', vi: { ...makeDraft().vi, name: 'Hoa thứ hai' }, en: { ...makeDraft().en, name: 'Second bloom' } })),
    });
    const result = await run(opts({ spare: 1 }), { gemini });
    expect(result.added.map((a) => a.flower.id)).toEqual(['second-bloom']);
    expect(result.skipped).toHaveLength(1);
    expect(result.skipped[0]!.reason).toMatch(/validation failed: id "rose" already exists/);
    expect(read('out/summary.md')).toContain('Không thêm được');
  });

  it('adds nothing and fails when every candidate is rejected, leaving the project untouched', async () => {
    const gemini = fakeGemini({ candidates: [CANDIDATE], drafts: () => makeDraft({ id: 'rose' }) });
    const before = read('src/data/index.ts');
    await expect(run(opts(), { gemini })).rejects.toThrow(/No flower could be added/);
    expect(read('src/data/index.ts')).toBe(before);
    expect(existsSync(join(root, 'src/data/flowers/rose.ts'))).toBe(false);
    expect(read('src/data/flowers/legacy.ts')).toContain('isNew: true');
  });

  it('refuses a candidate with fewer than three verified sources', async () => {
    const gemini = fakeGemini({ candidates: [CANDIDATE], citations: 2, drafts: () => makeDraft() });
    await expect(run(opts(), { gemini })).rejects.toThrow(/only 2 verified source/);
  });

  it('with URL checking on, drops dead sources and uses page titles', async () => {
    const fetchImpl = (async (url: string) =>
      url.includes('src2') ? new Response('', { status: 404 }) : new Response(`<title>Real title for ${new URL(url).hostname}</title>`, { status: 200, headers: { 'content-type': 'text/html' } })) as unknown as typeof fetch;
    const gemini = fakeGemini({ candidates: [CANDIDATE], citations: 3, drafts: () => makeDraft() });
    await expect(run(opts({ verifyUrls: true }), { gemini, fetchImpl })).rejects.toThrow(/only 2 verified source/);

    const ok = fakeGemini({ candidates: [CANDIDATE], citations: 4, drafts: () => makeDraft() });
    const result = await run(opts({ verifyUrls: true }), { gemini: ok, fetchImpl });
    expect(result.added[0]!.flower.sources.map((s) => s.title)).toEqual(['Real title for src0.example.org', 'Real title for src1.example.org', 'Real title for src3.example.org']);
    expect(result.added[0]!.flower.sources.some((s) => s.url.includes('src2'))).toBe(false);
  });

  it('retries with another round of candidates when the first round yields nothing new', async () => {
    let round = 0;
    const gemini: GeminiClient = {
      model: 'gemini-test',
      async generate(req) {
        const reply = (t: string, c: GeminiResponse['citations'] = []): GeminiResponse => ({ text: t, citations: c, searchQueries: [] });
        if (req.systemInstruction === PROPOSE_SYSTEM) {
          // First round: only a species already on the site. Second round: a new one.
          return reply(JSON.stringify({ candidates: round++ === 0 ? [{ scientificName: 'Hibiscus rosa-sinensis', vietnameseName: 'dâm bụt', englishName: 'hibiscus' }, { scientificName: 'Plumeria rubra', vietnameseName: 'sứ', englishName: 'plumeria' }] : [CANDIDATE] }));
        }
        if (req.systemInstruction === RESEARCH_SYSTEM) return reply('notes', [0, 1, 2].map((i) => ({ url: `https://s${i}.example.org/p`, title: `source-${i}.example.org` })));
        return reply(JSON.stringify(makeDraft()));
      },
    };
    const result = await run(opts(), { gemini });
    expect(result.added.map((a) => a.flower.id)).toEqual(['test-bloom']);
    expect(round).toBe(2);
  });
});

describe('summary text', () => {
  it('flags sources whose titles could not be read and lists skipped candidates', () => {
    const f = flower();
    const md = buildSummary('gemini-test', '2026-11-17', 4, [{ flower: f, blockedUrls: [f.sources[0]!.url] }], [{ name: 'Second bloom (Floribus secundus)', reason: 'only 1 verified source(s) (need 3)' }]);
    expect(md).toContain('thêm **1/4** loài');
    expect(md).toContain('trang chặn bot');
    expect(md).toContain('Second bloom (Floribus secundus): only 1 verified source(s) (need 3)');
    expect(md).toContain('Cần kiểm tra khi review');
  });
});
