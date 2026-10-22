import type { APIRoute, GetStaticPaths } from 'astro';
import { FLOWERS, getFlower } from '../../data';
import { renderFlowerSvg } from '../../lib/art';
import { bioStateAt } from '../../lib/timelapse/keyframes';
import { posterProgress } from '../../lib/timelapse/poster';
import { buildTimeline } from '../../lib/timelapse/timeline';

/** Static poster for each flower (mid full-bloom), served as a normal cacheable SVG file. */
export const getStaticPaths = (() => FLOWERS.map((f) => ({ params: { id: f.id } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const flower = getFlower(params.id ?? '');
  if (!flower) return new Response('Not found', { status: 404 });
  const timeline = buildTimeline(flower.stages);
  const svg = renderFlowerSvg(flower.visual, bioStateAt(timeline, posterProgress(timeline)), { idPrefix: `p-${flower.id}` });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
