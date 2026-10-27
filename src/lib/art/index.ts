/**
 * Illustration entry point.
 * `renderFlowerSvg` returns a complete <svg> string for a given species visual
 * and biological state. It is deterministic, so server and client agree.
 */
import type { FlowerVisual } from '../../data/types';
import type { BioState } from '../timelapse/keyframes';
import { H, W, makeCtx, type RenderOptions } from './core';
import { sharedDefs, soilScene } from './scene';
import type { ArchetypeRenderer } from './archetypes/types';
import { sunflower } from './archetypes/sunflower';
import { marigold } from './archetypes/marigold';
import { chrysanthemum } from './archetypes/chrysanthemum';
import { tulip } from './archetypes/tulip';
import { roseArchetype } from './archetypes/rose';
import { lotus } from './archetypes/lotus';
import { sakura } from './archetypes/sakura';
import { morningGlory } from './archetypes/morning-glory';
import { dahlia } from './archetypes/dahlia';
import { carnation } from './archetypes/carnation';
import { lavender } from './archetypes/lavender';
import { cosmos } from './archetypes/cosmos';

const RENDERERS: Partial<Record<FlowerVisual['archetype'], ArchetypeRenderer>> = {
  sunflower,
  marigold,
  chrysanthemum,
  tulip,
  rose: roseArchetype,
  lotus,
  sakura,
  'morning-glory': morningGlory,
  dahlia,
  carnation,
  lavender,
  cosmos,
};

export interface RenderSvgOptions extends RenderOptions {
  /** Accessible name for the whole illustration. Omit for decorative use. */
  title?: string;
  className?: string;
  /** Extra attributes on the root <svg>. */
  attrs?: string;
}

export function renderFlowerInner(visual: FlowerVisual, state: BioState, opts: RenderOptions): string {
  const renderer = RENDERERS[visual.archetype];
  if (!renderer) throw new Error(`No illustration renderer for archetype "${visual.archetype}"`);
  const c = makeCtx(visual.palette, state, opts);
  const scene = opts.hideSoil ? '' : (renderer.scene ?? soilScene)(c);
  const bg = opts.background ? `<rect width="${W}" height="${H}" fill="${opts.background}"/>` : '';
  return `<defs>${sharedDefs(c)}${renderer.defs(c)}</defs>${bg}${scene}${renderer.plant(c)}${renderer.overlay ? renderer.overlay(c) : ''}`;
}

export function renderFlowerSvg(visual: FlowerVisual, state: BioState, opts: RenderSvgOptions): string {
  const labelled = opts.title
    ? `role="img" aria-label="${opts.title.replace(/"/g, '&quot;')}"`
    : `aria-hidden="true" focusable="false"`;
  const cls = opts.className ? ` class="${opts.className}"` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"${cls} ${labelled}${opts.attrs ? ` ${opts.attrs}` : ''}>` +
    `${renderFlowerInner(visual, state, opts)}</svg>`
  );
}

export { W as ART_WIDTH, H as ART_HEIGHT };
