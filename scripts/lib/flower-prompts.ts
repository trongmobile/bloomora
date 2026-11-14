/**
 * Prompts for the weekly flower job. Kept apart from the orchestration so the wording is easy to tune.
 * The rules mirror docs/CONTENT.md: no invented sources or numbers, timings are estimates, the
 * time-lapse is an illustration, Vietnamese and English are written separately.
 */
import type { FlowerData } from '../../src/data/types';

export interface Candidate {
  scientificName: string;
  vietnameseName: string;
  englishName: string;
}

export const PROPOSE_SYSTEM = [
  'You curate species for Bloomora, a bilingual (Vietnamese / English) website that shows the life cycle of flowers as an illustrated time-lapse.',
  'You are accurate and conservative: you only name real, well-documented plant species.',
].join(' ');

export const PROPOSE_SCHEMA = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          scientificName: { type: 'string', description: 'Accepted binomial name, e.g. "Plumeria rubra"' },
          vietnameseName: { type: 'string', description: 'Common Vietnamese name with diacritics, e.g. "hoa sứ"' },
          englishName: { type: 'string', description: 'Common English name' },
        },
        required: ['scientificName', 'vietnameseName', 'englishName'],
      },
    },
  },
  required: ['candidates'],
};

const countBy = <T extends string>(items: readonly T[]): string =>
  Object.entries(items.reduce<Record<string, number>>((acc, k) => ({ ...acc, [k]: (acc[k] ?? 0) + 1 }), {}))
    .map(([k, n]) => `${k}: ${n}`)
    .join(', ');

export function proposePrompt(existing: readonly FlowerData[], n: number, rejected: readonly string[]): string {
  const have = existing.map((f) => `- ${f.text.en.name} / ${f.text.vi.name} (${f.scientificName})`).join('\n');
  return [
    `Propose ${n} flowering plants that are commonly grown, sold or admired in Vietnam and are NOT yet on the site.`,
    'Think of Tết flowers, garden and hedge shrubs, street and temple trees, cut flowers, pond and wild flowers, and flowers of the highlands such as Đà Lạt.',
    '',
    'Already on the site (never propose these species or their synonyms):',
    have,
    ...(rejected.length > 0 ? ['', `Already tried and rejected this run (do not propose again): ${rejected.join(', ')}`] : []),
    '',
    'Rules:',
    '- Real species with an accepted binomial scientific name. No invented, garbled or purely horticultural trade names.',
    '- Be varied: prefer plant groups, colours and seasons that the site has few of.',
    `  Current counts, by group: ${countBy(existing.map((f) => f.group))}; by colour: ${countBy(existing.flatMap((f) => f.colors))}.`,
    '- Prefer species that reputable sources document (university extensions, botanical gardens, floras, national plant databases), so the page can cite three or more.',
    '- Different genera from each other and from the existing list where possible.',
    '',
    'Reply with JSON only.',
  ].join('\n');
}

export const RESEARCH_SYSTEM = [
  'You are a careful botanical researcher. Use Google Search and rely on reputable sources: university extension services, botanical gardens (Kew POWO, RHS, NTBG), national plant databases and floras, and Vietnamese government, university or botanical references.',
  'Write concise factual notes in English. Quote concrete numbers (days, sizes, seasons) only when a source states them; otherwise write "no source figure". Never invent facts.',
].join(' ');

export const RESEARCH_TOPICS: { key: string; ask: string }[] = [
  {
    key: 'identity',
    ask: 'Identity: the accepted scientific name and synonyms, family, Vietnamese common names (and look-alike species people confuse it with), native range, how it is grown or used in Vietnam, flower colours and flower structure.',
  },
  {
    key: 'timing',
    ask: 'Growth timing and propagation: the usual starting material (seed, bulb, tuber, rhizome, cutting), germination time, time from seed or cutting to first bloom, flowering season in Vietnam or similar tropical or subtropical climates, how long one flower lasts, how long the plant keeps flowering, and what is left after flowering (fruit or seed head).',
  },
  {
    key: 'care',
    ask: 'Care and facts: light, water, soil and temperature needs, pruning, common problems, plus four or five verified, interesting facts (cultural uses in Vietnam, symbolism, safety such as toxicity).',
  },
];

export function researchPrompt(c: Candidate, ask: string): string {
  return `Plant: ${c.scientificName} (Vietnamese: ${c.vietnameseName}; English: ${c.englishName}).\n\nTopic — ${ask}`;
}

export const WRITE_SYSTEM = [
  'You write one flower entry for Bloomora as JSON that matches the given schema.',
  'You use ONLY facts found in the RESEARCH NOTES. Where the notes give no figure, you give a rough estimate and say so honestly.',
].join(' ');

export interface WriteContext {
  candidate: Candidate;
  notes: string;
  /** Verified sources, 1-based in the prompt. */
  sources: { url: string; title: string | null; host: string }[];
  existing: readonly FlowerData[];
  /** archetype -> example species that use it, e.g. "rose: Rose (shrub-tree)". */
  archetypeMenu: string[];
}

export function writePrompt(ctx: WriteContext): string {
  const { candidate: c } = ctx;
  const sources = ctx.sources.map((s, i) => `[${i + 1}] ${s.title ?? '(title unavailable)'} — ${s.host}`).join('\n');
  const existing = ctx.existing.map((f) => `${f.id} (${f.text.en.name}; ${f.group})`).join(', ');
  return [
    `Write the Bloomora entry for ${c.scientificName} (Vietnamese: ${c.vietnameseName}; English: ${c.englishName}).`,
    '',
    'RESEARCH NOTES (the only facts you may use):',
    ctx.notes,
    '',
    'VERIFIED SOURCES (every one was cited by Google Search and opens). In "sources", choose 3 to 6 by number (ref) and use the exact title shown:',
    sources,
    '',
    'ILLUSTRATION STYLES (archetype). The site draws each plant with one of these existing SVG styles. Pick the one whose habit and flower shape look most like this plant (examples of species that use each style):',
    ...ctx.archetypeMenu.map((l) => `- ${l}`),
    '',
    `FLOWERS ALREADY ON THE SITE (use their ids in "related"; pick 2 or 3 that are most alike): ${existing}`,
    '',
    'RULES',
    '1. Facts: use only the notes. Never state a number, date, place or claim that the notes do not support. If a figure is missing, estimate and say so in timeNote.',
    '2. Timing: give all nine stages in biological order (seed, germination, seedling, vegetative, bud-formation, bud-development, blooming, full-bloom, wilting) with realistic [minDays, maxDays] integer estimates for a plant grown in Vietnam. For a cutting-propagated plant the "seed" stage stands for the cutting. Make the first-bloom total (the stages up to and including blooming) match what the notes say; when they say nothing, stay modest and say it is a rough estimate.',
    '3. timeNote: state plainly what the sources do and do not say about timing. startNote: what the simulation starts from, and how the plant is usually propagated in practice if that differs.',
    '4. The time-lapse is an illustration. Never imply photos or video. Never call the timings exact.',
    '5. Language: "vi" is natural Vietnamese with full diacritics; "en" is natural English. Write each separately (not a word-for-word translation); neither may be empty. Vietnamese names in the English text are welcome.',
    '6. Lengths: metaDescription is 70 to 160 characters in both languages (count them). tagline is one sentence. intro is exactly two paragraphs: the first says what the plant is and where it grows, the second gives the honest caveat about timing. facts has four short, sourced facts.',
    '7. stageNotes: write species-specific text at least for seed, full-bloom and wilting; each description is 1 to 3 sentences.',
    '8. Naming: id and slugs are lowercase ASCII with hyphens. slugVi is the Vietnamese common name without diacritics, usually starting "hoa-" (for example hoa-su); slugEn is the English common name (for example plumeria). The id is usually the English slug.',
    '9. group: "shrub-tree" for woody plants, "vine" for climbers, "aquatic" for water plants, "bulb" for bulbs, corms, tubers and rhizomes, otherwise "annual" or "perennial". startMaterial: seed, bulb, tuber, seed-or-cutting or seed-or-rhizome.',
    '10. palette: realistic #rrggbb colours of this plant. petal is the main flower colour, petalDeep a darker shade, petalTip a lighter one; center and centerDeep are the flower centre; leaf, leafDeep and stem are greens and browns.',
    '11. sources: "supports" says concretely what that source was used for (a fact it backs), written from the notes. Do not put URLs in any text field.',
    '12. No placeholders such as TODO or TBD. Reply with JSON only.',
  ].join('\n');
}

export function repairPrompt(previousJson: string, errors: readonly string[]): string {
  return [
    'The JSON entry you wrote failed validation. Return the complete corrected JSON entry, changing only what is needed to fix these problems:',
    ...errors.map((e) => `- ${e}`),
    '',
    'Previous JSON:',
    previousJson,
  ].join('\n');
}
