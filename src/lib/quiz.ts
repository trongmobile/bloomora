/**
 * Quiz scoring. Pure and free of site data so the client script can import it without pulling
 * every flower into the bundle.
 */
import { STAGE_IDS, type StageId } from '../data/types';
import { mulberry32 } from './art/core';

/** Votes per stage for a list of chosen answers (each answer is the stage it votes for). */
export function tally(answers: readonly StageId[]): Record<StageId, number> {
  const counts = Object.fromEntries(STAGE_IDS.map((id) => [id, 0])) as Record<StageId, number>;
  for (const a of answers) counts[a] += 1;
  return counts;
}

/**
 * The stage with the most votes. A tie goes to the stage closest to the average of all the
 * votes (the middle of the person's answers), then to the earlier stage, so the result is
 * deterministic and never feels arbitrary.
 */
export function scoreQuiz(answers: readonly StageId[]): StageId {
  if (answers.length === 0) throw new Error('A quiz result needs at least one answer.');
  const counts = tally(answers);
  const top = Math.max(...Object.values(counts));
  const mean = answers.reduce((sum, a) => sum + STAGE_IDS.indexOf(a), 0) / answers.length;
  const tied = STAGE_IDS.filter((id) => counts[id] === top);
  return tied.reduce((best, id) => {
    const d = Math.abs(STAGE_IDS.indexOf(id) - mean);
    const bd = Math.abs(STAGE_IDS.indexOf(best) - mean);
    return d < bd ? id : best;
  });
}

export function isStageId(value: string | null | undefined): value is StageId {
  return !!value && (STAGE_IDS as readonly string[]).includes(value);
}

/** The flower picked in `?f=<id>` when it is one of `ids`, else `fallback`. */
export function pickFlowerId(search: string, ids: readonly string[], fallback: string): string {
  const raw = new URLSearchParams(search).get('f');
  return raw && ids.includes(raw) ? raw : fallback;
}

/** `?f=<id>` for result links. */
export function resultQuery(flowerId: string): string {
  return `?f=${encodeURIComponent(flowerId)}`;
}

/**
 * A fixed shuffle of a question's options, so they are not listed in life-cycle order (which
 * would make the "later" answer easy to spot). Seeded, so every build and both languages agree.
 */
export function shuffleStable<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  const rnd = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}
