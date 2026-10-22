/**
 * Generic "bushy annual" plant used by marigold and chrysanthemum: a main stem
 * plus side branches, compound leaves and a flower head at every tip.
 */
import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAngle,
  cubicAt,
  darken,
  f,
  mix,
  ramp,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, roots, stemStroke } from '../scene';

export interface LocalState {
  bud: number;
  open: number;
  wilt: number;
  fruit: number;
}

export interface BranchSpec {
  /** Where on the main stem the branch leaves (fraction of max height). */
  at: number;
  /** Tip offset from the attachment point at full growth. */
  dx: number;
  dy: number;
  /** Delay before this head develops (0 = leads). */
  delay: number;
  size: number;
}

export interface LeafParams {
  pairs: number;
  length: number;
  leafletLen: number;
  leafletWid: number;
  spread: number;
}

export interface BushConfig {
  maxH: number;
  stemW: number;
  branches: BranchSpec[];
  leavesPerStem: number;
  leaf: LeafParams;
  /** Custom leaf drawing (defaults to a pinnate leaf). */
  leafFn?: (c: Ctx, x: number, y: number, angle: number, scale: number, dry: number) => string;
  /** Extra decoration along the main stem (thorns...). */
  decor?: (c: Ctx, curve: Cubic, color: string) => string;
  head: (c: Ctx, x: number, y: number, angle: number, scale: number, st: LocalState) => string;
}

/** A pinnate (feather-like) compound leaf, drawn as a single path. */
export function pinnateLeaf(x: number, y: number, angleDeg: number, scale: number, p: LeafParams, droop: number): { d: string; rachis: string } {
  const a = (angleDeg * Math.PI) / 180;
  const L = p.length * scale;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const rach = (t: number): [number, number] => [x + ca * L * t, y + sa * L * t + droop * L * 0.35 * t * t];
  let d = '';
  const addLeaflet = (bx: number, by: number, dirDeg: number, len: number, wid: number) => {
    const r = (dirDeg * Math.PI) / 180;
    const tx = bx + Math.cos(r) * len;
    const ty = by + Math.sin(r) * len;
    const mx = (bx + tx) / 2;
    const my = (by + ty) / 2;
    const nx = -Math.sin(r) * wid;
    const ny = Math.cos(r) * wid;
    d += `M${f(bx)} ${f(by)}Q${f(mx + nx)} ${f(my + ny)} ${f(tx)} ${f(ty)}Q${f(mx - nx)} ${f(my - ny)} ${f(bx)} ${f(by)}Z`;
  };
  for (let i = 0; i < p.pairs; i++) {
    const t = 0.16 + (i / p.pairs) * 0.72;
    const [bx, by] = rach(t);
    const taper = 1 - 0.45 * Math.abs(t - 0.5);
    const len = p.leafletLen * scale * taper;
    const wid = p.leafletWid * scale * taper;
    const base = angleDeg + droop * 10;
    addLeaflet(bx, by, base - p.spread, len, wid);
    addLeaflet(bx, by, base + p.spread, len, wid);
  }
  const [tx, ty] = rach(1);
  addLeaflet(tx, ty, angleDeg + droop * 14, p.leafletLen * scale * 0.8, p.leafletWid * scale * 0.8);
  const [rx, ry] = rach(0.98);
  return { d, rachis: `M${f(x)} ${f(y)}Q${f((x + rx) / 2)} ${f((y + ry) / 2 + droop * 4)} ${f(rx)} ${f(ry)}` };
}

function leafMarkup(c: Ctx, x: number, y: number, angle: number, scale: number, p: LeafParams, dry: number): string {
  const res = pinnateLeaf(x, y, angle, scale, p, 0.5 + dry * 0.6);
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  return (
    `<path d="${res.rachis}" fill="none" stroke="${darken(col, 0.2)}" stroke-width="${f(1.6 * scale + 0.4)}" stroke-linecap="round"/>` +
    `<path d="${res.d}" fill="${dry > 0.05 ? mix(c.pal.leaf, '#a08c45', dry * 0.75) : c.url('leaf')}" stroke="${darken(col, 0.38)}" stroke-width=".7" stroke-linejoin="round"/>`
  );
}

export function bushPlant(c: Ctx, cfg: BushConfig): string {
  const { s } = c;
  const under = SEED_Y - GROUND_Y;
  const totalMax = cfg.maxH + under;
  const total = Math.max(0.0001, s.stem * totalMax);
  const sway = c.sway * 4 * ramp(0.2, 1, s.stem);
  const mainTop: [number, number] = [CX + sway, SEED_Y - total];
  const main: Cubic = {
    p0: [CX, SEED_Y],
    p1: [CX + 5, SEED_Y - total * 0.35],
    p2: [CX - 6 + sway * 0.5, SEED_Y - total * 0.7],
    p3: mainTop,
  };
  const dry = smooth(0.15, 1, s.wilt);
  const stemColor = mix(c.pal.stem, '#8c7a3c', dry * 0.55);
  let out = roots(c, { depth: 92, spread: 120, laterals: 7 });
  if (s.stem <= 0.01) return out;

  const stems: { curve: Cubic; scale: number; delay: number; grow: number }[] = [
    { curve: main, scale: 1, delay: 0, grow: 1 },
  ];
  for (const br of cfg.branches) {
    const grow = smooth(br.at, br.at + 0.5, s.stem);
    if (grow < 0.03) continue;
    const t = (br.at * cfg.maxH + under) / total;
    if (t > 0.98) continue;
    const [ax, ay] = cubicAt(main, t);
    const tipX = ax + br.dx * grow + sway * 0.4;
    const tipY = ay + br.dy * grow;
    const curve: Cubic = {
      p0: [ax, ay],
      p1: [ax + br.dx * 0.1 * grow, ay + br.dy * 0.45 * grow],
      p2: [ax + br.dx * 0.55 * grow, ay + br.dy * 0.8 * grow],
      p3: [tipX, tipY],
    };
    stems.push({ curve, scale: br.size, delay: br.delay, grow });
  }

  // Stems first, then leaves, then heads (so heads sit on top).
  stems.forEach((st, i) => {
    out += stemStroke(st.curve, (cfg.stemW * (i === 0 ? 1 : 0.7) * (0.6 + 0.4 * st.grow)), stemColor);
  });
  if (cfg.decor) out += cfg.decor(c, main, stemColor);
  const leafAmt = smooth(0.0, 1, s.leaf);
  stems.forEach((st, si) => {
    const count = si === 0 ? cfg.leavesPerStem : Math.max(3, Math.round(cfg.leavesPerStem * 0.55));
    for (let i = 0; i < count; i++) {
      const frac = 0.12 + (i / count) * 0.8;
      const reveal = smooth((i / count) * 0.8, (i / count) * 0.8 + 0.25, leafAmt);
      if (reveal < 0.03) continue;
      const [x, y] = cubicAt(st.curve, si === 0 ? Math.min(frac, 0.96) : frac);
      const side = (i + si) % 2 === 0 ? 1 : -1;
      const sc = (0.5 + 0.5 * (1 - frac * 0.55)) * reveal * (0.45 + 0.55 * smooth(0.1, 0.9, s.leaf)) * (si === 0 ? 1 : 0.8);
      out += cfg.leafFn ? cfg.leafFn(c, x, y, side > 0 ? -32 : 212, sc, dry) : leafMarkup(c, x, y, side > 0 ? -28 : 208, sc, cfg.leaf, dry);
    }
  });
  // Cotyledons at the very start.
  const coty = smooth(0.02, 0.2, s.stem) * (1 - smooth(0.55, 0.95, s.leaf));
  if (coty > 0.02) {
    const [tx, ty] = cubicAt(main, 1);
    for (const side of [-1, 1]) {
      const a = side < 0 ? 188 : -8;
      const r = (a * Math.PI) / 180;
      const l = 30 * coty;
      out += `<path d="M${f(tx)} ${f(ty)}q${f(Math.cos(r) * l * 0.5)} ${f(Math.sin(r) * l * 0.5 - 7 * coty)} ${f(Math.cos(r) * l)} ${f(Math.sin(r) * l)}q${f(-Math.cos(r) * l * 0.5)} ${f(Math.sin(r) * l * 0.5 + 8 * coty)} ${f(-Math.cos(r) * l)} ${f(-Math.sin(r) * l)}z" fill="${c.url('leaf')}" stroke="${darken(c.pal.leafDeep, 0.25)}" stroke-width=".7"/>`;
    }
  }
  if (s.bud > 0.02) {
    stems.forEach((st) => {
      const [x, y] = cubicAt(st.curve, 1);
      const ang = cubicAngle(st.curve, 1) + 90;
      const sh = (v: number) => clamp01((v - st.delay) / (1 - st.delay));
      const local: LocalState = {
        bud: clamp01(ramp(st.delay * 0.4, 1, s.bud)),
        open: sh(s.open),
        wilt: sh(s.wilt),
        fruit: sh(s.fruit),
      };
      out += cfg.head(c, x, y, ang * 0.5, st.scale, local);
    });
  }
  return out;
}
