import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { SPEEDS, type Speed } from '../../lib/timelapse/player';
import { buildTimeline, positionAt, progressFor } from '../../lib/timelapse/timeline';
import { bioStateAt } from '../../lib/timelapse/keyframes';
import { posterProgress } from '../../lib/timelapse/poster';
import { formatElapsed } from '../../lib/duration';
import { fmt } from '../../i18n';
import { FlowerMedia } from './FlowerMedia';
import { FlowerTimeline } from './FlowerTimeline';
import { GrowthStageDescription } from './GrowthStageDescription';
import { GrowthStageIndicator } from './GrowthStageIndicator';
import { CompressIcon, ExpandIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, RestartIcon } from './icons';
import type { PlayerProps } from './types';
import { usePlayer, usePrefersReducedMotion } from './usePlayer';

function useFullscreen(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onChange = () => setActive(document.fullscreenElement === ref.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, [ref]);

  const toggle = useCallback(async () => {
    const el = ref.current;
    if (!el) return;
    // iPhone Safari has no Fullscreen API for arbitrary elements: fall back to a CSS "pseudo" fullscreen.
    if (!document.fullscreenEnabled || !el.requestFullscreen) {
      setActive((v) => !v);
      return;
    }
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await el.requestFullscreen();
    } catch {
      setActive((v) => !v);
    }
  }, [ref]);

  return { active, toggle };
}

export default function TimeLapsePlayer(props: PlayerProps) {
  const { lang, labels, stages, stageTexts, visual, media, posterSrc, altText, flowerName, flowerId } = props;
  const idPrefix = props.idPrefix ?? `tl-${flowerId}`;

  const timeline = useMemo(() => buildTimeline(stages), [stages]);
  const poster = useMemo(() => posterProgress(timeline), [timeline]);
  const reduced = usePrefersReducedMotion();
  const { state, dispatch } = usePlayer(timeline, { poster, reducedMotion: reduced });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const rootRef = useRef<HTMLElement>(null);
  const { active: fullscreen, toggle: toggleFullscreen } = useFullscreen(rootRef);
  const resumeAfterScrub = useRef(false);

  const pos = positionAt(timeline, state.progress);
  const bio = useMemo(() => bioStateAt(timeline, state.progress), [timeline, state.progress]);
  const pct = Math.round(state.progress * 100);
  const stageText = stageTexts.find((t) => t.id === pos.segment.id);
  const stageName = stageText?.name ?? pos.segment.id;
  const playing = state.status === 'playing';
  const total = timeline.segments.length;

  const valueText = fmt(labels.timeAnnounce, { stage: stageName, pct });
  // Screen-reader announcements only while paused, so playback never chatters.
  const announce = playing ? '' : state.status === 'ended' ? labels.ended : valueText;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const big = e.shiftKey ? 0.1 : 0.02;
    switch (e.key) {
      case ' ':
      case 'k':
        dispatch({ type: 'toggle' });
        break;
      case 'ArrowRight':
        dispatch({ type: 'nudge', delta: big });
        break;
      case 'ArrowLeft':
        dispatch({ type: 'nudge', delta: -big });
        break;
      case ']':
        dispatch({ type: 'next-stage' });
        break;
      case '[':
        dispatch({ type: 'prev-stage' });
        break;
      case '+':
      case '=':
        dispatch({ type: 'faster' });
        break;
      case '-':
      case '_':
        dispatch({ type: 'slower' });
        break;
      case 'Home':
        dispatch({ type: 'seek', progress: 0 });
        break;
      case 'End':
        dispatch({ type: 'seek', progress: 1 });
        break;
      case 'f':
      case 'F':
        void toggleFullscreen();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <section
      ref={rootRef}
      className={`tl glass${fullscreen ? ' is-fullscreen' : ''}`}
      data-tier="elevated"
      aria-label={fmt(labels.region, { name: flowerName })}
      data-player=""
      data-hydrated={hydrated ? 'true' : 'false'}
      data-status={state.status}
      data-progress={pct}
      data-stage={pos.segment.id}
      data-stage-index={pos.index}
      data-speed={state.speed}
      data-reduced-motion={reduced ? 'true' : 'false'}
    >
      <div
        className="tl__stage"
        tabIndex={0}
        role="group"
        aria-label={`${flowerName} — ${labels.keyboardHint}`}
        onKeyDown={onKeyDown}
      >
        <FlowerMedia
          media={media}
          visual={visual}
          bio={bio}
          stageId={pos.segment.id}
          progress={state.progress}
          idPrefix={idPrefix}
          altText={altText}
          posterSrc={posterSrc}
          hydrated={hydrated}
          labels={labels}
        />
        <p className="tl__badge" aria-hidden="true">
          <span>{fmt(labels.stageOf, { n: pos.index + 1, total })}</span> · {stageName}
        </p>
        <button
          type="button"
          className="btn btn--icon tl__fs"
          onClick={() => void toggleFullscreen()}
          aria-label={fullscreen ? labels.exitFullscreen : labels.fullscreen}
          aria-pressed={fullscreen}
          title={fullscreen ? labels.exitFullscreen : labels.fullscreen}
        >
          {fullscreen ? <CompressIcon /> : <ExpandIcon />}
        </button>
      </div>

      <div className="tl__controls">
        <div className="tl__row">
          <div className="tl__buttons">
            <button
              type="button"
              className="btn btn--primary btn--icon tl__play"
              onClick={() => dispatch({ type: 'toggle' })}
              aria-label={playing ? labels.pause : labels.play}
              title={playing ? labels.pause : labels.play}
              data-testid="play-toggle"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => dispatch({ type: 'restart' })}
              aria-label={labels.restart}
              title={labels.restart}
              data-testid="restart"
            >
              <RestartIcon />
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => dispatch({ type: 'prev-stage' })}
              aria-label={labels.prevStage}
              title={labels.prevStage}
              data-testid="prev-stage"
            >
              <PrevIcon />
            </button>
            <button
              type="button"
              className="btn btn--icon"
              onClick={() => dispatch({ type: 'next-stage' })}
              aria-label={labels.nextStage}
              title={labels.nextStage}
              data-testid="next-stage"
            >
              <NextIcon />
            </button>
          </div>
          <FlowerTimeline
            timeline={timeline}
            progress={state.progress}
            label={labels.timeline}
            valueText={valueText}
            onSeek={(p) => dispatch({ type: 'seek', progress: p })}
            onScrubStart={() => {
              resumeAfterScrub.current = playing;
              if (playing) dispatch({ type: 'pause' });
            }}
            onScrubEnd={() => {
              if (resumeAfterScrub.current && state.status !== 'ended') dispatch({ type: 'play' });
              resumeAfterScrub.current = false;
            }}
          />
          <output className="tl__pct" data-testid="percent">
            {fmt(labels.progressValue, { pct })}
          </output>
        </div>

        <div className="tl__row tl__row--meta">
          <div className="tl__speed" role="group" aria-label={labels.speed}>
            <span className="tl__speed-label" aria-hidden="true">
              {labels.speed}
            </span>
            {SPEEDS.map((s: Speed) => (
              <button
                key={s}
                type="button"
                className="btn btn--sm tl__speed-btn"
                aria-pressed={state.speed === s}
                data-speed={s}
                onClick={() => dispatch({ type: 'set-speed', speed: s })}
              >
                {fmt(labels.speedValue, { n: s })}
              </button>
            ))}
          </div>
          <p className="tl__elapsed" title={labels.elapsedHint}>
            <span className="muted">{labels.elapsed}:</span>{' '}
            <strong data-testid="elapsed">{formatElapsed(pos.elapsedMin, pos.elapsedMax, lang)}</strong>
          </p>
        </div>
      </div>

      <GrowthStageIndicator
        timeline={timeline}
        texts={stageTexts}
        currentIndex={pos.index}
        label={labels.stagesNav}
        smooth={!reduced}
        onSelect={(id) => dispatch({ type: 'seek', progress: progressFor(timeline, id, 0) })}
      />

      <GrowthStageDescription lang={lang} segment={pos.segment} total={total} text={stageText} labels={labels} />

      <div className="tl__notes">
        <p>{labels.illustrative}</p>
        <p>{props.startNote}</p>
        <p>{props.timeNote}</p>
        {reduced && <p data-testid="reduced-note">{labels.reducedMotion}</p>}
        <p className="tl__hint">{labels.keyboardHint}</p>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true" data-testid="live">
        {announce}
      </p>
    </section>
  );
}
