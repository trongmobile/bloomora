/**
 * Turns a species + playback position into a StoryInput: the content of one clip frame or one
 * "save this moment" image. Pure, so the browser and scripts/render-clips.ts share it.
 */
import type { FlowerVisual, Lang, StageId, StageTiming } from '../../data/types';
import { fmt, type Dict } from '../../i18n';
import { renderFlowerInner } from '../art';
import { formatElapsed } from '../duration';
import { bioStateAt } from '../timelapse/keyframes';
import { buildTimeline, positionAt, progressFor, type Timeline } from '../timelapse/timeline';
import type { StoryInput } from './frame';

export interface MomentStoryData {
  lang: Lang;
  flowerName: string;
  scientificName: string;
  visual: FlowerVisual;
  stages: readonly StageTiming[];
  stageTexts: readonly { id: StageId; name: string }[];
  labels: Pick<Dict['player'], 'stageOf' | 'estimate' | 'illustrative'>;
  /** Address printed as the watermark, without protocol, e.g. "bloomora.example/vi/flowers/hoa-sen". */
  brandUrl: string;
}

export interface MomentStory {
  timeline: Timeline;
  at: (progress: number) => StoryInput;
  /** Progress that shows the middle of a stage (what "share this moment" captures). */
  progressOf: (stage: StageId) => number;
}

export function createMomentStory(data: MomentStoryData): MomentStory {
  const timeline = buildTimeline(data.stages);
  const total = timeline.segments.length;
  const ticks = timeline.segments.slice(1).map((s) => s.start);
  const at = (progress: number): StoryInput => {
    const pos = positionAt(timeline, progress);
    const stageName = data.stageTexts.find((t) => t.id === pos.segment.id)?.name ?? pos.segment.id;
    return {
      title: data.flowerName,
      subtitle: data.scientificName,
      art: { inner: renderFlowerInner(data.visual, bioStateAt(timeline, progress), { idPrefix: 'story' }) },
      headline: stageName,
      detail: `${fmt(data.labels.stageOf, { n: pos.index + 1, total })} · ${data.labels.estimate}: ${formatElapsed(pos.elapsedMin, pos.elapsedMax, data.lang)}`,
      progress: { value: progress, ticks },
      disclaimer: data.labels.illustrative,
      watermark: data.brandUrl,
      tint: data.visual.palette.petal,
    };
  };
  return { timeline, at, progressOf: (stage) => progressFor(timeline, stage, 0.6) };
}

export interface QuizStoryData {
  kicker: string;
  title: string;
  /** e.g. "with Lotus". */
  withFlower: string;
  headline: string;
  detail: string;
  artInner: string;
  stageIndex: number;
  total: number;
  disclaimer: string;
  brandUrl: string;
  tint: string;
}

/** The result card of the quiz: where you are on the nine-stage bar. */
export function quizStory(d: QuizStoryData): StoryInput {
  return {
    kicker: d.kicker,
    title: d.title,
    subtitle: d.withFlower,
    art: { inner: d.artInner },
    headline: d.headline,
    detail: d.detail,
    progress: {
      value: (d.stageIndex + 0.5) / d.total,
      ticks: Array.from({ length: d.total - 1 }, (_, i) => (i + 1) / d.total),
    },
    disclaimer: d.disclaimer,
    watermark: d.brandUrl,
    tint: d.tint,
  };
}

/** "https://host/base/vi/flowers/x/" -> "host/base/vi/flowers/x" */
export function brandAddress(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
}
