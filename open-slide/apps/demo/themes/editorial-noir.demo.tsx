import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:wght@400;600&display=swap');`;

const p = { bg: '#0A0A0A', text: '#F5F0E8', muted: '#9A9488', accent: '#C41E3A', line: '#2A2826' };

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 128,
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
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
        fontFamily: "'Source Serif 4', serif",
        fontSize: 20,
        color: p.muted,
      }}
    >
      <span>Editorial</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: "'Source Serif 4', serif",
      fontSize: 18,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 20,
    }}
  >
    {children}
  </div>
);

const base: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: p.bg,
  color: p.text,
  padding: '100px 120px',
  boxSizing: 'border-box',
  position: 'relative',
  fontFamily: "'Source Serif 4', Georgia, serif",
};

const Cover: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}
  >
    <style>{css}</style>
    <Eyebrow>Winter issue</Eyebrow>
    <Title>Stories worth the long read.</Title>
    <p style={{ fontSize: 30, lineHeight: 1.55, color: p.muted, maxWidth: 1100, margin: 0 }}>
      Long-form reporting, quiet photography, and layouts that let the words breathe.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 32 }}>
    <style>{css}</style>
    <div style={{ height: 2, background: p.accent, width: 80 }} />
    <Eyebrow>Chapter one</Eyebrow>
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 52,
        fontWeight: 600,
        margin: 0,
        lineHeight: 1.1,
      }}
    >
      The city after midnight
    </h2>
    <p style={{ fontSize: 28, lineHeight: 1.6, color: p.muted, maxWidth: 1200, margin: 0 }}>
      Neon reflects in wet asphalt. Our reporters followed three night shifts to map how work never
      really stops.
    </p>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}
  >
    <style>{css}</style>
    <Title>Thank you for reading.</Title>
    <p style={{ fontSize: 26, color: p.muted, margin: 0 }}>
      Subscribe for the next issue — print and digital.
    </p>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
