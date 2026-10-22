import type { Ctx } from '../core';

export interface ArchetypeRenderer {
  /** Gradients and other <defs> content specific to the archetype. */
  defs(c: Ctx): string;
  /** Background scene (soil by default, pond for lotus). */
  scene?(c: Ctx): string;
  /** The plant itself, drawn on top of the scene. */
  plant(c: Ctx): string;
  /** Drawn after the plant (e.g. water in front of submerged stems). */
  overlay?(c: Ctx): string;
}
