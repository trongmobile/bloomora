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
import { zinnia } from './flowers/zinnia';
import { gerbera } from './flowers/gerbera';
import { daisy } from './flowers/daisy';
import { echinacea } from './flowers/echinacea';
import { peachBlossom } from './flowers/peach-blossom';
import { mai } from './flowers/mai';
import { phalaenopsis } from './flowers/phalaenopsis';
import { narcissus } from './flowers/narcissus';
import { celosia } from './flowers/celosia';
import { gladiolus } from './flowers/gladiolus';
import { pansy } from './flowers/pansy';
import { lily } from './flowers/lily';
import { bougainvillea } from './flowers/bougainvillea';
import { flameTree } from './flowers/flame-tree';
import { plumeria } from './flowers/plumeria';
import { hibiscus } from './flowers/hibiscus';
import { mexicanSunflower } from './flowers/mexican-sunflower';
import { waterLily } from './flowers/water-lily';
import { queensCrapeMyrtle } from './flowers/queens-crape-myrtle';
import { orchidTree } from './flowers/orchid-tree';
import { tonkinRosewood } from './flowers/tonkin-rosewood';
import { mossRose } from './flowers/moss-rose';
import { hydrangea } from './flowers/hydrangea';
import { azalea } from './flowers/azalea';
import { buckwheat } from './flowers/buckwheat';
import { arabianJasmine } from './flowers/arabian-jasmine';

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
  zinnia,
  gerbera,
  daisy,
  echinacea,
  peachBlossom,
  mai,
  phalaenopsis,
  narcissus,
  celosia,
  gladiolus,
  pansy,
  lily,
  bougainvillea,
  flameTree,
  plumeria,
  hibiscus,
  mexicanSunflower,
  waterLily,
  queensCrapeMyrtle,
  orchidTree,
  tonkinRosewood,
  mossRose,
  hydrangea,
  azalea,
  buckwheat,
  arabianJasmine,
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
