export type DesignPalette = {
  bg: string;
  text: string;
  accent: string;
};

export type DesignFonts = {
  display: string;
  body: string;
};

export type DesignTypeScale = {
  hero: number;
  body: number;
};

export type DesignSystem = {
  palette: DesignPalette;
  fonts: DesignFonts;
  typeScale: DesignTypeScale;
  radius: number;
};

const DEFAULT_PADDING = '100px 120px';
const GAP_BODY_RATIO = 0.85;
const HEADING_HERO_RATIO = 0.48;
const MUTED_TEXT_WEIGHT = 0.55;
const LINE_TEXT_WEIGHT = 0.18;

type Rgb = { r: number; g: number; b: number };

function parseHexColor(input: string): Rgb | null {
  const hex = input.trim();
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;
  const raw = match[1];
  const expanded =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = Number.parseInt(expanded, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function toHex({ r, g, b }: Rgb): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export function mixHex(fg: string, bg: string, fgWeight: number): string {
  const a = parseHexColor(fg);
  const b = parseHexColor(bg);
  if (!a || !b) return fg;
  const w = Math.max(0, Math.min(1, fgWeight));
  return toHex({
    r: a.r * w + b.r * (1 - w),
    g: a.g * w + b.g * (1 - w),
    b: a.b * w + b.b * (1 - w),
  });
}

export function deriveMuted(text: string, bg: string): string {
  return mixHex(text, bg, MUTED_TEXT_WEIGHT);
}

export function deriveLine(text: string, bg: string): string {
  return mixHex(text, bg, LINE_TEXT_WEIGHT);
}

export function deriveHeadingSize(hero: number): number {
  return Math.round(hero * HEADING_HERO_RATIO);
}

export function deriveGap(body: number): number {
  return Math.round(body * GAP_BODY_RATIO);
}

export function designToCssVars(d: DesignSystem): Record<string, string> {
  const { palette, fonts, typeScale, radius } = d;
  return {
    '--osd-bg': palette.bg,
    '--osd-text': palette.text,
    '--osd-accent': palette.accent,
    '--osd-muted': deriveMuted(palette.text, palette.bg),
    '--osd-line': deriveLine(palette.text, palette.bg),
    '--osd-font-display': fonts.display,
    '--osd-font-body': fonts.body,
    '--osd-size-hero': `${typeScale.hero}px`,
    '--osd-size-heading': `${deriveHeadingSize(typeScale.hero)}px`,
    '--osd-size-body': `${typeScale.body}px`,
    '--osd-radius': `${radius}px`,
    '--osd-padding': DEFAULT_PADDING,
    '--osd-gap': `${deriveGap(typeScale.body)}px`,
  };
}

export function cssVarsToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
}

export const defaultDesign: DesignSystem = {
  palette: {
    bg: '#f7f5f0',
    text: '#1a1814',
    accent: '#6d4cff',
  },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: {
    hero: 168,
    body: 38,
  },
  radius: 12,
};
