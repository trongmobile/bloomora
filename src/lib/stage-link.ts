import { STAGE_IDS, type StageId } from '../data/types';

/** Reads `?stage=<id>` from a query string. Unknown or unavailable stages are ignored. */
export function parseStageParam(search: string, allowed: readonly StageId[] = STAGE_IDS): StageId | undefined {
  const raw = new URLSearchParams(search).get('stage');
  return raw && (allowed as readonly string[]).includes(raw) ? (raw as StageId) : undefined;
}

/** Deep link to one stage of a species page: `…/?stage=full-bloom#timelapse`. */
export function stageDeepLink(flowerUrl: string, stage: StageId): string {
  return `${flowerUrl}?stage=${stage}#timelapse`;
}
