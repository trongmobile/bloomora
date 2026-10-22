import { useEffect, useRef, useState } from 'react';
import type { FlowerMediaConfig, FlowerVisual, StageId } from '../../data/types';
import { STAGE_IDS } from '../../data/types';
import type { Dict } from '../../i18n';
import type { BioState } from '../../lib/timelapse/keyframes';
import { FlowerAnimation } from './FlowerAnimation';

interface Props {
  media: FlowerMediaConfig;
  visual: FlowerVisual;
  bio: BioState;
  stageId: StageId;
  /** 0..1 playback position, used to scrub video. */
  progress: number;
  idPrefix: string;
  altText: string;
  posterSrc: string;
  hydrated: boolean;
  labels: Pick<Dict['player'], 'mediaFallback'>;
}

/** The nearest stage image at or before the current stage (so gaps keep the previous picture). */
export function pickStageImage(
  stages: Extract<FlowerMediaConfig, { type: 'images' }>['stages'],
  stageId: StageId,
): { src: string; alt: string } | undefined {
  for (let i = STAGE_IDS.indexOf(stageId); i >= 0; i--) {
    const hit = stages[STAGE_IDS[i]!];
    if (hit) return hit;
  }
  return Object.values(stages)[0];
}

/**
 * One interface for three kinds of media:
 *  - "svg" (default): the live generated illustration
 *  - "images": stage photos with a crossfade
 *  - "video": a lazily loaded clip scrubbed by the timeline
 * Any load error switches to the SVG illustration and tells the reader.
 */
export function FlowerMedia({ media, visual, bio, stageId, progress, idPrefix, altText, posterSrc, hydrated, labels }: Props) {
  const [failed, setFailed] = useState(false);

  if (!hydrated) {
    return <img className="tl__poster" src={posterSrc} alt={altText} width={800} height={600} decoding="async" data-media="poster" />;
  }

  const svg = <FlowerAnimation visual={visual} state={bio} idPrefix={idPrefix} title={altText} />;

  if (failed || media.type === 'svg') {
    return (
      <>
        {svg}
        {failed && (
          <p className="tl__media-note" role="status" data-testid="media-fallback">
            {labels.mediaFallback}
          </p>
        )}
      </>
    );
  }

  if (media.type === 'images') {
    const current = pickStageImage(media.stages, stageId);
    const all = Object.entries(media.stages) as [StageId, { src: string; alt: string }][];
    if (!current || all.length === 0) return svg;
    return (
      <div className="tl__crossfade" data-media="images">
        {all.map(([id, img]) => (
          <img
            key={id}
            src={img.src}
            alt={img === current ? img.alt : ''}
            aria-hidden={img === current ? undefined : true}
            className="tl__layer"
            data-active={img === current ? 'true' : 'false'}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ))}
      </div>
    );
  }

  return <VideoMedia media={media} progress={progress} altText={altText} posterSrc={posterSrc} onError={() => setFailed(true)} />;
}

function VideoMedia({
  media,
  progress,
  altText,
  posterSrc,
  onError,
}: {
  media: Extract<FlowerMediaConfig, { type: 'video' }>;
  progress: number;
  altText: string;
  posterSrc: string;
  onError: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  // Lazy: only attach the source once the player is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSrc(media.src);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSrc(media.src);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [media.src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const duration = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : media.durationSec;
    if (!duration) return;
    const target = progress * duration;
    if (Math.abs(el.currentTime - target) > 0.08) el.currentTime = target;
  }, [progress, src, media.durationSec]);

  return (
    <video
      ref={ref}
      className="tl__video"
      src={src}
      data-mime={media.mime}
      poster={media.poster ?? posterSrc}
      muted
      playsInline
      preload={src ? 'metadata' : 'none'}
      aria-label={altText}
      data-media="video"
      onError={onError}
    />
  );
}
