import { useEffect, useMemo, useRef, useState } from 'react';
import { fmt } from '../../i18n';
import { brandAddress, createMomentStory } from '../../lib/clip/story';
import { copyText } from '../../scripts/share';
import { showToast } from '../../scripts/toast';
import { DownloadIcon, ImageIcon, ShareIcon, VideoIcon } from './icons';
import type { PlayerProps } from './types';

/** Length of the recorded clip, including the short holds on the first and last frame. */
export const CLIP_SECONDS = 14;

interface Props {
  player: PlayerProps;
  /** Current playback position (0..1) and stage: what "this moment" means. */
  progress: number;
  stageId: PlayerProps['stages'][number]['id'];
  stageName: string;
  /** Called when a clip starts recording, so the host can pause its own playback. */
  onClipStart?: () => void;
}

interface ClipResult {
  url: string;
  file: File;
  ext: string;
}

/** Cheap feature test that does not load the export code. */
function canRecordCanvas(): boolean {
  return (
    typeof MediaRecorder !== 'undefined' &&
    typeof HTMLCanvasElement !== 'undefined' &&
    typeof HTMLCanvasElement.prototype.captureStream === 'function'
  );
}

export function PlayerShare({ player, progress, stageId, stageName, onClipStart }: Props) {
  const { labels, flowerId, flowerName, shareUrls } = player;
  const [canRecord, setCanRecord] = useState(false);
  const [busy, setBusy] = useState<'image' | 'clip' | null>(null);
  const [pct, setPct] = useState(0);
  const [note, setNote] = useState('');
  const [clip, setClip] = useState<ClipResult | null>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => setCanRecord(canRecordCanvas()), []);
  useEffect(
    () => () => {
      abort.current?.abort();
    },
    [],
  );
  // Release the previous clip's object URL whenever it is replaced or the player goes away.
  useEffect(() => () => (clip ? URL.revokeObjectURL(clip.url) : undefined), [clip]);

  const story = useMemo(
    () =>
      createMomentStory({
        lang: player.lang,
        flowerName,
        scientificName: player.scientificName,
        visual: player.visual,
        stages: player.stages,
        stageTexts: player.stageTexts,
        labels,
        brandUrl: brandAddress(shareUrls.flower),
      }),
    [player, flowerName, labels, shareUrls.flower],
  );

  const sample = useMemo(
    () => [flowerName, player.scientificName, ...player.stageTexts.map((s) => s.name), labels.illustrative, labels.stageOf, labels.estimate, shareUrls.flower, 'Bloomora 0123456789'].join(' '),
    [flowerName, player, labels, shareUrls.flower],
  );

  const momentUrl = `${shareUrls.momentBase}${stageId}/`;
  const shareTitle = `${flowerName} — ${stageName}`;

  const onShareMoment = async () => {
    setNote('');
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: `${shareTitle} | Bloomora`, text: player.altText, url: momentUrl });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }
    if (await copyText(momentUrl)) showToast(labels.momentCopied);
  };

  const onImage = async () => {
    setBusy('image');
    setNote('');
    try {
      const b = await import('../../lib/clip/browser');
      await b.loadStoryFonts(sample);
      const blob = await b.renderStill(b.layoutStory(story.at(progress)));
      const file = new File([blob], `bloomora-${flowerId}-${stageId}.png`, { type: 'image/png' });
      const result = await b.shareOrDownload(file, { title: `${shareTitle} | Bloomora`, text: player.altText });
      setNote(result === 'cancelled' ? '' : labels.imageSaved);
    } catch {
      setNote(labels.imageFailed);
    } finally {
      setBusy(null);
    }
  };

  const onClip = async () => {
    const controller = new AbortController();
    abort.current = controller;
    setBusy('clip');
    setPct(0);
    setNote('');
    setClip(null);
    onClipStart?.();
    try {
      const b = await import('../../lib/clip/browser');
      await b.loadStoryFonts(sample);
      const out = await b.recordClip({
        frameAt: story.at,
        durationSec: CLIP_SECONDS,
        onProgress: (f) => setPct(Math.round(f * 100)),
        signal: controller.signal,
      });
      const file = new File([out.blob], `bloomora-${flowerId}.${out.ext}`, { type: out.blob.type });
      setClip({ url: URL.createObjectURL(out.blob), file, ext: out.ext });
      setNote(labels.clipReady);
    } catch (err) {
      setNote(err instanceof DOMException && err.name === 'AbortError' ? '' : labels.clipFailed);
    } finally {
      abort.current = null;
      setBusy(null);
    }
  };

  const onShareClip = async () => {
    if (!clip) return;
    const b = await import('../../lib/clip/browser');
    await b.shareOrDownload(clip.file, { title: `${shareTitle} | Bloomora`, text: player.altText });
  };
  const onDownloadClip = async () => {
    if (!clip) return;
    (await import('../../lib/clip/browser')).downloadFile(clip.file);
  };

  return (
    <div className="tl__share-wrap">
      <div className="tl__share" role="group" aria-label={labels.shareGroup}>
        <button type="button" className="btn btn--sm" onClick={() => void onShareMoment()} data-testid="share-moment">
          <ShareIcon />
          {labels.shareMoment}
        </button>
        <button type="button" className="btn btn--sm" onClick={() => void onImage()} disabled={busy !== null} data-testid="save-image">
          <ImageIcon />
          {labels.saveImage}
        </button>
        {canRecord && (
          <button type="button" className="btn btn--sm" onClick={() => void onClip()} disabled={busy !== null} data-testid="save-clip">
            <VideoIcon />
            {labels.saveClip}
          </button>
        )}
      </div>

      {busy === 'clip' && (
        <div className="tl__clip-busy">
          <progress max={100} value={pct} aria-label={fmt(labels.clipBusy, { pct })} />
          <p>
            {fmt(labels.clipBusy, { pct })} {labels.clipKeepOpen}
          </p>
          <button type="button" className="btn btn--sm" onClick={() => abort.current?.abort()}>
            {labels.clipCancel}
          </button>
        </div>
      )}

      {clip && (
        <div className="tl__clip" data-testid="clip-result">
          <video src={clip.url} controls playsInline muted loop aria-label={labels.clipPreview} />
          <div className="tl__clip-actions">
            <p className="muted t-small">{fmt(labels.clipFormat, { ext: clip.ext.toUpperCase(), sec: CLIP_SECONDS })}</p>
            <button type="button" className="btn btn--sm" onClick={() => void onDownloadClip()} data-testid="clip-download">
              <DownloadIcon />
              {labels.clipDownload}
            </button>
            <button type="button" className="btn btn--sm" onClick={() => void onShareClip()}>
              <ShareIcon />
              {labels.clipShare}
            </button>
          </div>
        </div>
      )}

      <p className="tl__share-note" role="status" aria-live="polite" data-testid="share-note">
        {note}
      </p>
    </div>
  );
}
