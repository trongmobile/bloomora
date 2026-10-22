import type { Lang } from '../../data/types';
import { fmt } from '../../i18n';
import type { Dict } from '../../i18n';
import { formatDayRange } from '../../lib/duration';
import type { StageSegment } from '../../lib/timelapse/timeline';
import type { PlayerStageText } from './types';

interface Props {
  lang: Lang;
  segment: StageSegment;
  total: number;
  text: PlayerStageText | undefined;
  labels: Dict['player'];
}

export function GrowthStageDescription({ lang, segment, total, text, labels }: Props) {
  return (
    <div className="tl__desc" data-testid="stage-description">
      <h3 className="tl__desc-title">
        <span className="tl__desc-count">{fmt(labels.stageOf, { n: segment.index + 1, total })}</span>
        <span data-testid="stage-name">{text?.name ?? segment.id}</span>
      </h3>
      <p className="tl__desc-dur">
        {labels.estimate}: {formatDayRange([segment.daysMin, segment.daysMax], lang)}
      </p>
      <p className="tl__desc-text">{text?.description}</p>
    </div>
  );
}
