import type { FlowerColor, FlowerGroup, Season, SpeedBand } from './types';

export const GROUPS: readonly FlowerGroup[] = ['annual', 'perennial', 'bulb', 'shrub-tree', 'aquatic', 'vine'];
export const COLORS: readonly FlowerColor[] = ['red', 'pink', 'orange', 'yellow', 'white', 'purple', 'blue'];
export const SEASONS: readonly Season[] = ['spring', 'summer', 'autumn', 'winter'];
export const SPEEDS: readonly SpeedBand[] = ['fast', 'medium', 'slow'];

/** Swatch colour for each flower colour chip. */
export const COLOR_SWATCH: Record<FlowerColor, string> = {
  yellow: '#f3c623',
  orange: '#f4901c',
  red: '#d0243a',
  pink: '#f4a7c3',
  white: '#ffffff',
  purple: '#7a4fc2',
  blue: '#3a63d8',
};

/** Upper bound of days-to-bloom for each speed band. Used by tests to keep data honest. */
export const SPEED_LIMITS = { fast: 120, medium: 365 } as const;
