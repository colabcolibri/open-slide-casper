import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');`;
const p = { bg: '#FFF7F0', text: '#29180F', muted: '#8B7355', accent: '#C2410C', wash: '#FED7AA' };

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'Outfit', system-ui, sans-serif",
      fontSize: 118,
      fontWeight: 700,
      lineHeight: 1.04,
      margin: 0,
      color: p.text,
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: 18,
        color: p.muted,
      }}
    >
      <span>Sunset clay</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: p.accent,
    }}
  >
    {children}
  </span>
);

const base: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: p.bg,
  color: p.text,
  padding: '100px 120px',
  boxSizing: 'border-box',
  position: 'relative',
  fontFamily: "'Outfit', system-ui, sans-serif",
};

const Cover: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}
  >
    <style>{css}</style>
    <Eyebrow>Studio week · 2026</Eyebrow>
    <Title>Make it by hand, ship it at scale.</Title>
    <p style={{ fontSize: 30, color: p.muted, lineHeight: 1.5, maxWidth: 1080, margin: 0 }}>
      Ceramics-inspired UI for teams who care about craft in every release note.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <style>{css}</style>
    <Eyebrow>Roadmap</Eyebrow>
    <div
      style={{
        background: p.wash,
        borderRadius: 20,
        padding: 40,
        fontSize: 26,
        lineHeight: 1.5,
        color: p.text,
      }}
    >
      Q1 — Kiln: design tokens baked in clay tones.
      <br />
      Q2 — Glaze: motion presets that feel tactile, not bouncy.
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}
  >
    <style>{css}</style>
    <Title>Fired and ready.</Title>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
