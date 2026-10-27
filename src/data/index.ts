import type { FlowerData, Lang } from './types';
import { sunflower } from './flowers/sunflower';
import { rose } from './flowers/rose';
import { lotus } from './flowers/lotus';
import { tulip } from './flowers/tulip';
import { chrysanthemum } from './flowers/chrysanthemum';
import { cherryBlossom } from './flowers/cherry-blossom';
import { morningGlory } from './flowers/morning-glory';
import { marigold } from './flowers/marigold';
import { dahlia } from './flowers/dahlia';
import { carnation } from './flowers/carnation';
import { lavender } from './flowers/lavender';
import { cosmos } from './flowers/cosmos';

/** All flowers, in the order they should be listed. */
export const FLOWERS: readonly FlowerData[] = [
  sunflower,
  rose,
  lotus,
  tulip,
  chrysanthemum,
  cherryBlossom,
  morningGlory,
  marigold,
  dahlia,
  carnation,
  lavender,
  cosmos,
];

const byId = new Map(FLOWERS.map((f) => [f.id, f]));

export function getFlower(id: string): FlowerData | undefined {
  return byId.get(id);
}

export function getFlowerBySlug(lang: Lang, slug: string): FlowerData | undefined {
  return FLOWERS.find((f) => f.slugs[lang] === slug);
}

export function relatedFlowers(flower: FlowerData): FlowerData[] {
  return flower.related.map((id) => byId.get(id)).filter((f): f is FlowerData => Boolean(f));
}
