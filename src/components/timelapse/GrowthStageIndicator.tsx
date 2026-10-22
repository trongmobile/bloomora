import { useEffect, useRef } from 'react';
import type { StageId } from '../../data/types';
import type { Timeline } from '../../lib/timelapse/timeline';
import type { PlayerStageText } from './types';

interface Props {
  timeline: Timeline;
  texts: PlayerStageText[];
  currentIndex: number;
  label: string;
  smooth: boolean;
  onSelect: (id: StageId) => void;
}

/** Row of stage buttons: shows where we are and jumps to a stage on click or tap. */
export function GrowthStageIndicator({ timeline, texts, currentIndex, label, smooth, onSelect }: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const btn = list?.children[currentIndex] as HTMLElement | undefined;
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [currentIndex, smooth]);

  return (
    <ol className="tl__stages" ref={listRef} aria-label={label}>
      {timeline.segments.map((seg, i) => {
        const text = texts.find((t) => t.id === seg.id);
        return (
          <li key={seg.id}>
            <button
              type="button"
              className="tl__stage-btn"
              aria-current={i === currentIndex ? 'step' : undefined}
              data-stage={seg.id}
              onClick={() => onSelect(seg.id)}
            >
              <span className="n" aria-hidden="true">
                {i + 1}
              </span>
              <span className="t">{text?.name ?? seg.id}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
