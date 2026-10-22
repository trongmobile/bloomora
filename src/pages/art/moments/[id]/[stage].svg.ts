import type { APIRoute, GetStaticPaths } from 'astro';
import { FLOWERS, getFlower } from '../../../../data';
import { STAGE_IDS, type StageId } from '../../../../data/types';
import { momentSvg } from '../../../../lib/moment';

/**
 * One static illustration per species and stage: the poster of a share landing page, the art on
 * a printable stage card and on a quiz result. Served as a normal cacheable SVG file.
 */
export const getStaticPaths = (() =>
  FLOWERS.flatMap((f) => STAGE_IDS.map((stage) => ({ params: { id: f.id, stage } })))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const flower = getFlower(params.id ?? '');
  const stage = params.stage as StageId | undefined;
  if (!flower || !stage || !STAGE_IDS.includes(stage)) return new Response('Not found', { status: 404 });
  return new Response(momentSvg(flower, stage, `m-${flower.id}-${stage}`), { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
