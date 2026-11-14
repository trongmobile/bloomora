/**
 * Pure logic for the weekly "add flowers" job: the shape Gemini must return, turning that draft into
 * a `FlowerData`, validating it with the same rules as tests/unit/data.test.ts + docs/CONTENT.md,
 * writing it as a `src/data/flowers/<id>.ts` module, and registering it in the site files.
 * No network and no file access here, so all of it is unit-tested.
 */
import { COLORS, GROUPS, SEASONS, SPEED_LIMITS } from '../../src/data/taxonomy';
import {
  LANGS,
  STAGE_IDS,
  type Archetype,
  type FlowerColor,
  type FlowerData,
  type FlowerGroup,
  type FlowerPalette,
  type FlowerText,
  type Season,
  type SpeedBand,
  type StageId,
  type StageText,
  type StageTiming,
  type StartMaterial,
} from '../../src/data/types';

export const START_MATERIALS: readonly StartMaterial[] = ['seed', 'bulb', 'tuber', 'seed-or-cutting', 'seed-or-rhizome'];

/* ------------------------------------------------------------------ draft */

export interface TextDraft {
  name: string;
  aliases: string[];
  tagline: string;
  metaDescription: string;
  intro: string[];
  /** Species-specific wording for a few stages; the rest fall back to the site dictionary. */
  stageNotes: { id: StageId; name?: string; description: string }[];
  care: { light: string; water: string; soil: string; temperature: string; extra?: string };
  facts: string[];
  keywords: string[];
  altText: string;
  timeNote: string;
  startNote: string;
}

export interface SourceDraft {
  /** 1-based index into the list of verified sources given to the model. */
  ref: number;
  title: string;
  publisher: string;
  supports: string;
}

export interface FlowerDraft {
  id: string;
  slugVi: string;
  slugEn: string;
  scientificName: string;
  scientificAliases: string[];
  family: string;
  group: FlowerGroup;
  colors: FlowerColor[];
  bloomSeasons: Season[];
  startMaterial: StartMaterial;
  stages: { id: StageId; minDays: number; maxDays: number }[];
  archetype: Archetype;
  palette: FlowerPalette;
  related: string[];
  sources: SourceDraft[];
  vi: TextDraft;
  en: TextDraft;
}

/* ----------------------------------------------------------------- schema */

type Schema = Record<string, unknown>;
const str = (description: string): Schema => ({ type: 'string', description });
const strList = (description: string, minItems?: number, maxItems?: number): Schema => ({
  type: 'array',
  description,
  items: { type: 'string' },
  ...(minItems !== undefined ? { minItems } : {}),
  ...(maxItems !== undefined ? { maxItems } : {}),
});
const oneOf = (values: readonly string[], description: string): Schema => ({ type: 'string', enum: [...values], description });
const obj = (properties: Record<string, Schema>, optional: string[] = []): Schema => ({
  type: 'object',
  properties,
  required: Object.keys(properties).filter((k) => !optional.includes(k)),
});

function textSchema(language: string): Schema {
  return obj(
    {
      name: str(`Common name in ${language}`),
      aliases: strList(`Other common names people search for, in ${language} (and Latin synonyms)`),
      tagline: str('One sentence, up to about 160 characters'),
      metaDescription: str('Search-snippet description, 70 to 160 characters'),
      intro: strList('Exactly two paragraphs: what the plant is, then the honest caveat about timing data', 2, 2),
      stageNotes: {
        type: 'array',
        description: 'Species-specific text for the seed, full-bloom and wilting stages (add others only if they differ a lot)',
        items: obj(
          {
            id: oneOf(STAGE_IDS, 'Stage id'),
            name: str('Optional species-specific stage name; empty string if the default name fits'),
            description: str('One to three sentences'),
          },
          ['name'],
        ),
      },
      care: obj({ light: str('Light'), water: str('Water'), soil: str('Soil'), temperature: str('Temperature'), extra: str('Optional extra tip') }, ['extra']),
      facts: strList('Four short, source-backed facts', 3, 5),
      keywords: strList('Five or six SEO keyword phrases people actually search', 3, 8),
      altText: str('Accessible description of the illustration'),
      timeNote: str('Plain-language caveat about how the timings were derived (what the sources do and do not state)'),
      startNote: str('One sentence: what the simulation starts from and how the plant is usually propagated in practice'),
    },
    ['aliases'],
  );
}

export interface SchemaContext {
  archetypes: readonly string[];
}

/** JSON schema for Gemini's structured output. Only keywords the API supports; no pattern/minLength. */
export function flowerDraftSchema(ctx: SchemaContext): Schema {
  const hex = str('Hex colour like #e0243c');
  return obj({
    id: str('Lowercase ASCII, hyphen-separated, e.g. "frangipani"'),
    slugVi: str('Vietnamese URL slug: lowercase ASCII without diacritics, usually starting "hoa-", e.g. "hoa-su"'),
    slugEn: str('English URL slug: lowercase ASCII, e.g. "plumeria"'),
    scientificName: str('Accepted binomial, e.g. "Plumeria rubra"'),
    scientificAliases: strList('Synonyms and common names to match in search'),
    family: str('Botanical family'),
    group: oneOf(GROUPS, 'Plant group'),
    colors: { type: 'array', items: oneOf(COLORS, 'Colour'), minItems: 1, description: 'Flower colours' },
    bloomSeasons: { type: 'array', items: oneOf(SEASONS, 'Season'), minItems: 1, description: 'Seasons when it blooms in Vietnam' },
    startMaterial: oneOf(START_MATERIALS, 'What the time-lapse starts from'),
    stages: {
      type: 'array',
      description: 'All nine stages in biological order, with estimated real-world duration in days',
      minItems: 7,
      maxItems: 9,
      items: obj({
        id: oneOf(STAGE_IDS, 'Stage id'),
        minDays: { type: 'integer', minimum: 1, description: 'Shortest plausible duration in days' },
        maxDays: { type: 'integer', minimum: 1, description: 'Longest plausible duration in days' },
      }),
    },
    archetype: oneOf(ctx.archetypes, 'Existing illustration style that looks most like this plant'),
    palette: obj(
      {
        petal: hex,
        petalDeep: hex,
        petalTip: hex,
        center: hex,
        centerDeep: hex,
        leaf: hex,
        leafDeep: hex,
        stem: hex,
        accent: hex,
      },
      ['accent'],
    ),
    related: strList('Two or three ids of similar flowers already on the site', 1, 4),
    sources: {
      type: 'array',
      description: 'Three to six sources chosen from the verified list',
      minItems: 3,
      maxItems: 6,
      items: obj({
        ref: { type: 'integer', minimum: 1, description: 'Number of the source in the verified list' },
        title: str('Page title as given in the list'),
        publisher: str('Organisation that publishes it'),
        supports: str('What this source was used to support, concretely'),
      }),
    },
    vi: textSchema('Vietnamese (full diacritics)'),
    en: textSchema('English'),
  });
}

/* ------------------------------------------------------------------ build */

export const speedBandFor = (maxDays: number): SpeedBand =>
  maxDays <= SPEED_LIMITS.fast ? 'fast' : maxDays <= SPEED_LIMITS.medium ? 'medium' : 'slow';

const stageIndex = (id: StageId): number => STAGE_IDS.indexOf(id);

/** Days from start material to first open flower: every stage up to and including "blooming". */
export function daysToBloomOf(stages: StageTiming[]): [number, number] {
  const last = stageIndex('blooming');
  let lo = 0;
  let hi = 0;
  for (const s of stages) {
    if (stageIndex(s.id) <= last) {
      lo += s.days[0];
      hi += s.days[1];
    }
  }
  return [lo, hi];
}

export interface VerifiedSource {
  url: string;
  /** Real page title read from the page, when it could be fetched. */
  title: string | null;
}

function buildText(d: TextDraft): FlowerText {
  const stages: Partial<Record<StageId, StageText>> = {};
  for (const n of d.stageNotes) {
    const name = n.name?.trim();
    stages[n.id] = { ...(name ? { name } : {}), description: n.description.trim() };
  }
  const extra = d.care.extra?.trim();
  return {
    name: d.name.trim(),
    aliases: (d.aliases ?? []).map((a) => a.trim()).filter(Boolean),
    tagline: d.tagline.trim(),
    metaDescription: d.metaDescription.trim(),
    intro: d.intro.map((p) => p.trim()),
    stages,
    care: {
      light: d.care.light.trim(),
      water: d.care.water.trim(),
      soil: d.care.soil.trim(),
      temperature: d.care.temperature.trim(),
      ...(extra ? { extra } : {}),
    },
    facts: d.facts.map((x) => x.trim()),
    keywords: d.keywords.map((x) => x.trim()),
    altText: d.altText.trim(),
    timeNote: d.timeNote.trim(),
    startNote: d.startNote.trim(),
  };
}

/**
 * Turns the model's draft into a `FlowerData`. Everything that can be derived is derived, not trusted:
 * stage order, daysToBloom, speedBand, confidence (always "low": a model wrote it), source URLs and titles.
 * Source `ref`s that point outside the verified list are dropped (validation then asks for 3+).
 */
export function buildFlower(d: FlowerDraft, verified: readonly VerifiedSource[]): FlowerData {
  const stages: StageTiming[] = [...d.stages]
    .sort((a, b) => stageIndex(a.id) - stageIndex(b.id))
    .map((s) => ({ id: s.id, days: [Math.round(s.minDays), Math.round(s.maxDays)] as [number, number] }));
  const [lo, hi] = daysToBloomOf(stages);
  const accent = d.palette.accent?.trim();
  const sources: FlowerData['sources'] = [];
  for (const s of d.sources) {
    const v = verified[s.ref - 1];
    if (!v) continue;
    sources.push({
      title: (v.title ?? s.title).trim(),
      publisher: s.publisher.trim(),
      url: v.url,
      supports: s.supports.trim(),
    });
  }
  return {
    id: d.id.trim(),
    slugs: { vi: d.slugVi.trim(), en: d.slugEn.trim() },
    scientificName: d.scientificName.trim(),
    scientificAliases: d.scientificAliases.map((a) => a.trim()).filter(Boolean),
    family: d.family.trim(),
    group: d.group,
    colors: [...new Set(d.colors)],
    bloomSeasons: [...new Set(d.bloomSeasons)],
    daysToBloom: [lo, hi],
    speedBand: speedBandFor(hi),
    startMaterial: d.startMaterial,
    confidence: 'low',
    featured: false,
    isNew: true,
    stages,
    visual: {
      archetype: d.archetype,
      palette: {
        petal: d.palette.petal,
        petalDeep: d.palette.petalDeep,
        petalTip: d.palette.petalTip,
        center: d.palette.center,
        centerDeep: d.palette.centerDeep,
        leaf: d.palette.leaf,
        leafDeep: d.palette.leafDeep,
        stem: d.palette.stem,
        ...(accent ? { accent } : {}),
      },
    },
    related: [...new Set(d.related)],
    sources,
    text: { vi: buildText(d.vi), en: buildText(d.en) },
  };
}

/* --------------------------------------------------------------- validate */

export interface ValidationContext {
  /** Flowers already on the site plus any added earlier in this batch. */
  existing: readonly FlowerData[];
  archetypes: ReadonlySet<string>;
}

const ID_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const VI_DIACRITICS = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;
const PLACEHOLDER = /lorem ipsum|TODO|TBD|FIXME/i;

/** Lowercase, drop the hybrid sign and punctuation, so "Hibiscus × rosa-sinensis" == "hibiscus rosa-sinensis". */
export const normalizeLatin = (s: string): string =>
  s
    .toLowerCase()
    .replace(/×/g, ' ')
    .replace(/[^a-z\- ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const normalizeName = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Returns a list of human-readable problems; empty means the flower is acceptable. */
export function validateFlower(f: FlowerData, ctx: ValidationContext): string[] {
  const errors: string[] = [];
  const err = (m: string) => errors.push(m);

  if (!ID_RE.test(f.id)) err(`id "${f.id}" must be lowercase ASCII words joined by hyphens`);
  if (ctx.existing.some((e) => e.id === f.id)) err(`id "${f.id}" already exists`);
  for (const lang of LANGS) {
    const slug = f.slugs[lang];
    if (!ID_RE.test(slug)) err(`slugs.${lang} "${slug}" must be lowercase ASCII words joined by hyphens`);
    if (ctx.existing.some((e) => e.slugs[lang] === slug)) err(`slugs.${lang} "${slug}" is already used`);
    const name = normalizeName(f.text[lang].name);
    if (name && ctx.existing.some((e) => normalizeName(e.text[lang].name) === name)) err(`text.${lang}.name "${f.text[lang].name}" is already used`);
  }

  const sci = normalizeLatin(f.scientificName);
  if (!/^[a-z-]+ [a-z-]+/.test(sci)) err(`scientificName "${f.scientificName}" is not a binomial`);
  for (const e of ctx.existing) {
    const known = [e.scientificName, ...(e.scientificAliases ?? [])].map(normalizeLatin);
    if (known.includes(sci)) err(`scientificName "${f.scientificName}" is already on the site (${e.id})`);
  }
  if (!f.family) err('family is empty');

  if (!GROUPS.includes(f.group)) err(`group "${f.group}" is not valid`);
  if (f.colors.length === 0) err('colors is empty');
  for (const c of f.colors) if (!COLORS.includes(c)) err(`color "${c}" is not valid`);
  if (f.bloomSeasons.length === 0) err('bloomSeasons is empty');
  for (const s of f.bloomSeasons) if (!SEASONS.includes(s)) err(`season "${s}" is not valid`);
  if (!START_MATERIALS.includes(f.startMaterial)) err(`startMaterial "${f.startMaterial}" is not valid`);
  if (!ctx.archetypes.has(f.visual.archetype)) err(`archetype "${f.visual.archetype}" has no illustration renderer`);

  const ids = f.stages.map((s) => s.id);
  if (new Set(ids).size !== ids.length) err('stages contain a duplicate id');
  if (ids.length < 7) err(`only ${ids.length} stages; need at least 7`);
  for (const s of f.stages) {
    if (!STAGE_IDS.includes(s.id)) err(`unknown stage id "${s.id}"`);
    if (!(s.days[0] > 0) || !(s.days[1] >= s.days[0])) err(`stage "${s.id}" has invalid days [${s.days.join(', ')}]`);
    if (s.days[1] > 40_000) err(`stage "${s.id}" lasts implausibly long (${s.days[1]} days)`);
  }
  if (!ids.includes('blooming') && !ids.includes('full-bloom')) err('stages must include blooming or full-bloom');

  for (const [k, v] of Object.entries(f.visual.palette)) if (!HEX_RE.test(v)) err(`palette.${k} "${v}" is not a #rrggbb colour`);

  if (f.related.length === 0) err('related is empty');
  for (const id of f.related) {
    if (id === f.id) err('related contains the flower itself');
    else if (!ctx.existing.some((e) => e.id === id)) err(`related "${id}" is not a flower on the site`);
  }

  if (f.sources.length < 3) err(`only ${f.sources.length} usable source(s); need at least 3`);
  const urls = f.sources.map((s) => s.url);
  if (new Set(urls).size !== urls.length) err('sources contain a duplicate URL');
  for (const s of f.sources) {
    if (!/^https:\/\/[^\s]+$/.test(s.url)) err(`source URL "${s.url}" is not https`);
    if (s.title.length <= 3) err(`source title for ${s.url} is too short`);
    if (s.publisher.length <= 1) err(`source publisher for ${s.url} is missing`);
    if (s.supports.length <= 3) err(`source "supports" for ${s.url} is missing`);
  }

  for (const lang of LANGS) {
    const t = f.text[lang];
    const at = (field: string) => `text.${lang}.${field}`;
    if (t.name.length <= 1) err(`${at('name')} is missing`);
    if (t.tagline.length <= 10) err(`${at('tagline')} is too short`);
    if (t.metaDescription.length < 70 || t.metaDescription.length > 160) {
      err(`${at('metaDescription')} is ${t.metaDescription.length} characters; it must be 70 to 160`);
    }
    if (t.intro.length < 2) err(`${at('intro')} needs two paragraphs`);
    if (t.facts.length < 3) err(`${at('facts')} needs at least 3 items`);
    if (t.keywords.length < 3) err(`${at('keywords')} needs at least 3 items`);
    for (const key of ['light', 'water', 'soil', 'temperature'] as const) if (!t.care[key]) err(`${at(`care.${key}`)} is empty`);
    for (const key of ['altText', 'timeNote', 'startNote'] as const) if (!t[key]) err(`${at(key)} is empty`);
    for (const [id, st] of Object.entries(t.stages)) {
      if (!ids.includes(id as StageId)) err(`${at(`stages.${id}`)} describes a stage this flower does not have`);
      else if (st.description.length <= 20) err(`${at(`stages.${id}`)} description is too short`);
    }
    if (PLACEHOLDER.test(JSON.stringify(t))) err(`${lang} text contains a placeholder (lorem ipsum / TODO / TBD / FIXME)`);
    if (/https?:\/\//i.test(JSON.stringify(t))) err(`${lang} text contains a raw URL; sources belong in "sources"`);
  }
  const vi = f.text.vi;
  const en = f.text.en;
  if (!VI_DIACRITICS.test(`${vi.tagline} ${vi.intro.join(' ')}`)) err('text.vi does not look like Vietnamese (no diacritics)');
  if (vi.tagline === en.tagline) err('vi and en taglines are identical');
  if (vi.intro[0] === en.intro[0]) err('vi and en first paragraphs are identical');
  if (vi.metaDescription === en.metaDescription) err('vi and en metaDescription are identical');

  return errors;
}

/* ---------------------------------------------------------------- codegen */

const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const MAX_INLINE = 100;

const quote = (s: string): string =>
  `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;

/** Pretty-prints a JSON-like value as TypeScript with the repo's style (single quotes, trailing commas). */
export function toTs(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);
  if (typeof value === 'string') return quote(value);
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((v) => toTs(v, indent + 1));
    const flat = `[${items.join(', ')}]`;
    if (!flat.includes('\n') && pad.length + flat.length <= MAX_INLINE) return flat;
    return `[\n${items.map((i) => `${inner}${i},`).join('\n')}\n${pad}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    const props = entries.map(([k, v]) => `${IDENT_RE.test(k) ? k : quote(k)}: ${toTs(v, indent + 1)}`);
    const flat = `{ ${props.join(', ')} }`;
    if (!flat.includes('\n') && pad.length + flat.length <= MAX_INLINE) return flat;
    return `{\n${props.map((p) => `${inner}${p},`).join('\n')}\n${pad}}`;
  }
  throw new Error(`Cannot serialise ${typeof value}`);
}

const RESERVED = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export',
  'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return', 'super',
  'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'await',
  'async', 'of', 'as', 'type', 'interface', 'package', 'private', 'protected', 'public', 'implements',
]);

/** "flame-tree" -> "flameTree" (the naming used in src/data/index.ts). */
export function varNameFor(id: string): string {
  const camel = id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return RESERVED.has(camel) ? `${camel}Flower` : camel;
}

/** The text of `src/data/flowers/<id>.ts`. */
export function flowerSource(f: FlowerData): string {
  return `import type { FlowerData } from '../types';\n\nexport const ${varNameFor(f.id)}: FlowerData = ${toTs(f)};\n`;
}

/* ----------------------------------------------------------- registration */

/** Adds the import and the list entry for a new flower to the text of `src/data/index.ts`. */
export function registerInIndex(src: string, id: string): string {
  const name = varNameFor(id);
  if (new RegExp(`from '\\./flowers/${id}'`).test(src) || new RegExp(`^\\s+${name},$`, 'm').test(src)) {
    throw new Error(`src/data/index.ts already registers "${id}"`);
  }
  const importRe = /^import \{[^}]+\} from '\.\/flowers\/[^']+';$/gm;
  let lastImportEnd = -1;
  for (const m of src.matchAll(importRe)) lastImportEnd = m.index + m[0].length;
  if (lastImportEnd < 0) throw new Error("src/data/index.ts: no `import … from './flowers/…'` lines found");
  const withImport = `${src.slice(0, lastImportEnd)}\nimport { ${name} } from './flowers/${id}';${src.slice(lastImportEnd)}`;

  const start = withImport.indexOf('export const FLOWERS');
  const close = start < 0 ? -1 : withImport.indexOf('\n];', start);
  if (close < 0) throw new Error('src/data/index.ts: could not find the end of the FLOWERS array');
  return `${withImport.slice(0, close)}\n  ${name},${withImport.slice(close)}`;
}

/** Removes the "new" badge from older flowers: only the latest batch is listed first and badged. */
export function stripIsNew(src: string): string {
  return src.replace(/^[ \t]*isNew: true,\r?\n/m, '');
}

export function updateReadmeCount(readme: string, count: number): string {
  if (!/dữ liệu \d+ loài/.test(readme)) throw new Error('README.md: "dữ liệu N loài" not found');
  return readme.replace(/dữ liệu \d+ loài/, `dữ liệu ${count} loài`);
}

export function updateContentUpdated(siteTs: string, isoDate: string): string {
  if (!/CONTENT_UPDATED = '\d{4}-\d{2}-\d{2}'/.test(siteTs)) throw new Error('src/config/site.ts: CONTENT_UPDATED not found');
  return siteTs.replace(/CONTENT_UPDATED = '\d{4}-\d{2}-\d{2}'/, `CONTENT_UPDATED = '${isoDate}'`);
}

