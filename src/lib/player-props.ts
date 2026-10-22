import type { FlowerData, Lang } from '../data/types';
import type { Dict } from '../i18n';
import type { PlayerProps } from '../components/timelapse/types';

/** Builds the serialisable props for the React time-lapse island. */
export function buildPlayerProps(
  flower: FlowerData,
  lang: Lang,
  dict: Dict,
  posterSrc: string,
  shareUrls: PlayerProps['shareUrls'],
): PlayerProps {
  const text = flower.text[lang];
  return {
    lang,
    flowerId: flower.id,
    flowerName: text.name,
    scientificName: flower.scientificName,
    visual: flower.visual,
    stages: flower.stages,
    stageTexts: flower.stages.map((s) => ({
      id: s.id,
      name: text.stages[s.id]?.name ?? dict.stageNames[s.id],
      description: text.stages[s.id]?.description ?? dict.stageBlurbs[s.id],
    })),
    media: flower.media ?? { type: 'svg' },
    posterSrc,
    altText: text.altText,
    startNote: text.startNote,
    timeNote: text.timeNote,
    labels: dict.player,
    shareUrls,
  };
}
