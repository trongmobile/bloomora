/**
 * Data model for Bloomora flowers.
 *
 * Everything the UI, the SEO layer, the OG generator and the time-lapse engine
 * need to know about a species lives in a `FlowerData` object. Components never
 * hard-code botanical facts.
 */

export type Lang = 'vi' | 'en';
export const LANGS: readonly Lang[] = ['vi', 'en'] as const;
export const DEFAULT_LANG: Lang = 'vi';

/** Canonical growth stages, in biological order. A species may skip some of them. */
export const STAGE_IDS = [
  'seed',
  'germination',
  'seedling',
  'vegetative',
  'bud-formation',
  'bud-development',
  'blooming',
  'full-bloom',
  'wilting',
] as const;
export type StageId = (typeof STAGE_IDS)[number];

export type FlowerGroup = 'annual' | 'perennial' | 'bulb' | 'shrub-tree' | 'aquatic' | 'vine';
export type FlowerColor = 'yellow' | 'orange' | 'red' | 'pink' | 'white' | 'purple' | 'blue';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
/** Rough "time to first bloom" band used by the duration filter. */
export type SpeedBand = 'fast' | 'medium' | 'slow';
/** What the time-lapse starts from. Most species start from seed; some honestly do not. */
export type StartMaterial = 'seed' | 'bulb' | 'seed-or-cutting' | 'seed-or-rhizome';
/** How much published data supports the timing numbers. Shown to the reader. */
export type Confidence = 'moderate' | 'low';

export type Archetype =
  | 'sunflower'
  | 'rose'
  | 'lotus'
  | 'tulip'
  | 'chrysanthemum'
  | 'sakura'
  | 'morning-glory'
  | 'marigold';

export interface StageTiming {
  id: StageId;
  /** Estimated real-world duration of the stage in days: [min, max]. */
  days: [number, number];
  /** Optional share of playback time. Defaults to a log-scaled share of the duration. */
  weight?: number;
}

export interface FlowerPalette {
  petal: string;
  petalDeep: string;
  petalTip?: string;
  center: string;
  centerDeep: string;
  leaf: string;
  leafDeep: string;
  stem: string;
  accent?: string;
}

export interface FlowerVisual {
  archetype: Archetype;
  palette: FlowerPalette;
}

export interface StageText {
  /** Optional species-specific stage name (e.g. "Củ giống" instead of "Hạt giống"). */
  name?: string;
  description: string;
}

export interface CareText {
  light: string;
  water: string;
  soil: string;
  temperature: string;
  extra?: string;
}

export interface FlowerText {
  /** Common name in this language. */
  name: string;
  /** Other common names, used by search. */
  aliases?: string[];
  tagline: string;
  /** <= ~158 characters. */
  metaDescription: string;
  intro: string[];
  stages: Partial<Record<StageId, StageText>>;
  care: CareText;
  facts: string[];
  keywords: string[];
  /** Alt text / accessible description for the illustration. */
  altText: string;
  /** Plain-language caveat about how the timings were derived. */
  timeNote: string;
  /** One sentence about the starting material, shown next to the player. */
  startNote: string;
}

export interface Source {
  title: string;
  publisher: string;
  url: string;
  /** What this source was used to support. */
  supports: string;
}

/**
 * What the player shows. Every species currently uses the generated SVG illustration.
 * `images` (crossfaded stage photos) and `video` are supported by the player, with
 * automatic fallback to the SVG, so licensed media can be added later without UI changes.
 */
export type FlowerMediaConfig =
  | { type: 'svg' }
  | { type: 'images'; stages: Partial<Record<StageId, { src: string; alt: string }>> }
  | { type: 'video'; src: string; mime?: string; poster?: string; durationSec?: number };

export interface FlowerData {
  id: string;
  slugs: Record<Lang, string>;
  scientificName: string;
  /** Other scientific names to match in search. */
  scientificAliases?: string[];
  family: string;
  group: FlowerGroup;
  colors: FlowerColor[];
  bloomSeasons: Season[];
  /** Rough days from start material to first bloom: [min, max]. */
  daysToBloom: [number, number];
  speedBand: SpeedBand;
  startMaterial: StartMaterial;
  confidence: Confidence;
  stages: StageTiming[];
  visual: FlowerVisual;
  related: string[];
  featured?: boolean;
  /** Defaults to { type: 'svg' }. */
  media?: FlowerMediaConfig;
  sources: Source[];
  text: Record<Lang, FlowerText>;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  /** Shared by the vi/en versions of the same article. */
  translationKey: string;
  datePublished: Date;
  dateModified?: Date;
  readingMinutes?: number;
  relatedFlowers: string[];
  sources: { title: string; publisher: string; url: string }[];
  keywords: string[];
}
