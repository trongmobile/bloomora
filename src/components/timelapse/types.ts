import type { FlowerMediaConfig, FlowerVisual, Lang, StageId, StageTiming } from '../../data/types';
import type { Dict } from '../../i18n';

export interface PlayerStageText {
  id: StageId;
  /** Species-specific name if present, otherwise the generic stage name. */
  name: string;
  description: string;
}

/** Everything the island needs. Must be JSON-serialisable (it crosses the Astro/React boundary). */
export interface PlayerProps {
  lang: Lang;
  flowerId: string;
  flowerName: string;
  visual: FlowerVisual;
  stages: StageTiming[];
  stageTexts: PlayerStageText[];
  media: FlowerMediaConfig;
  /** URL of the static poster used before hydration and as the fallback. */
  posterSrc: string;
  altText: string;
  startNote: string;
  timeNote: string;
  labels: Dict['player'];
  /** Unique prefix for SVG ids when several players share a page. */
  idPrefix?: string;
}
