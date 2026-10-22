import type { PointerEvent } from 'react';
import type { Timeline } from '../../lib/timelapse/timeline';

interface Props {
  timeline: Timeline;
  progress: number;
  label: string;
  valueText: string;
  onSeek: (progress: number) => void;
  onScrubStart: () => void;
  onScrubEnd: () => void;
}

const STEPS = 1000;

/** Draggable timeline: a native range input (keyboard, touch and screen-reader friendly) with stage ticks. */
export function FlowerTimeline({ timeline, progress, label, valueText, onSeek, onScrubStart, onScrubEnd }: Props) {
  const value = Math.round(progress * STEPS);
  const end = (_e?: PointerEvent<HTMLInputElement>) => onScrubEnd();
  return (
    <div className="tl__scrub" style={{ ['--p' as string]: `${progress * 100}%` }}>
      <div className="tl__ticks" aria-hidden="true">
        {timeline.segments.slice(1).map((s) => (
          <span key={s.id} style={{ left: `${s.start * 100}%` }} />
        ))}
      </div>
      <input
        className="tl__range"
        type="range"
        min={0}
        max={STEPS}
        step={1}
        value={value}
        aria-label={label}
        aria-valuetext={valueText}
        data-testid="timeline"
        onChange={(e) => onSeek(Number(e.currentTarget.value) / STEPS)}
        onPointerDown={onScrubStart}
        onPointerUp={end}
        onPointerCancel={end}
      />
    </div>
  );
}
