import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Inter:wght@400;500&display=swap');`;
const p = { bg: '#F4F7F4', text: '#1A2E1A', muted: '#5C6B5C', accent: '#4A6741', line: '#D4DDD4' };

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: 112,
      fontWeight: 600,
      lineHeight: 1.06,
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
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 18,
        color: p.muted,
      }}
    >
      <span>Sage paper</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: '0.14em',
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
  fontFamily: "'Inter', system-ui, sans-serif",
};

const Cover: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}
  >
    <style>{css}</style>
    <Eyebrow>Impact report</Eyebrow>
    <Title>Growth that respects the ground.</Title>
    <p style={{ fontSize: 28, lineHeight: 1.55, color: p.muted, maxWidth: 1050, margin: 0 }}>
      Regenerative supply chains, measured in hectares restored and communities funded.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <style>{css}</style>
    <div style={{ height: 1, background: p.line, width: '100%' }} />
    <Eyebrow>2025 outcomes</Eyebrow>
    <ul style={{ margin: 0, paddingLeft: 28, fontSize: 26, lineHeight: 1.7, color: p.text }}>
      <li>18k acres under restorative agriculture</li>
      <li>Carbon intensity −22% vs baseline</li>
      <li>Local hiring up 34% in pilot regions</li>
    </ul>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}
  >
    <style>{css}</style>
    <Title>Plant the next season.</Title>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
