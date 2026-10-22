import type { SVGProps } from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

type P = SVGProps<SVGSVGElement>;

export const PlayIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
  </svg>
);
export const PauseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 5v14M16 5v14" strokeWidth={3.2} />
  </svg>
);
export const RestartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
    <path d="M3.5 4v4.6h4.6" />
  </svg>
);
export const PrevIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 5v14" />
    <path d="M19 5.5v13l-9.5-6.5z" fill="currentColor" />
  </svg>
);
export const NextIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M18 5v14" />
    <path d="M5 5.5v13l9.5-6.5z" fill="currentColor" />
  </svg>
);
export const ExpandIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const CompressIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </svg>
);
