import { memo, useMemo } from 'react';
import type { FlowerVisual } from '../../data/types';
import { renderFlowerInner, ART_HEIGHT, ART_WIDTH } from '../../lib/art';
import type { BioState } from '../../lib/timelapse/keyframes';

interface Props {
  visual: FlowerVisual;
  state: BioState;
  idPrefix: string;
  title: string;
}

/**
 * Live SVG illustration. The markup comes from our own deterministic renderer (never from
 * user input), so injecting it as inner HTML is safe and much cheaper than building
 * thousands of React nodes every frame.
 */
export const FlowerAnimation = memo(function FlowerAnimation({ visual, state, idPrefix, title }: Props) {
  const html = useMemo(() => renderFlowerInner(visual, state, { idPrefix }), [visual, state, idPrefix]);
  return (
    <svg
      className="tl__art"
      viewBox={`0 0 ${ART_WIDTH} ${ART_HEIGHT}`}
      role="img"
      aria-label={title}
      data-media="svg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
