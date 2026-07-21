import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500&display=swap');`;
const p = { bg: '#0C0E14', text: '#F5F3EE', muted: '#9CA3AF', accent: '#D4AF37', line: '#2A2F3A' };

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: 124,
      fontWeight: 600,
      lineHeight: 1.02,
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
      <span style={{ color: p.accent, letterSpacing: '0.2em' }}>LUXE</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 14,
      letterSpacing: '0.28em',
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
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}
  >
    <style>{css}</style>
    <Eyebrow>Private clients</Eyebrow>
    <Title>Capital with discretion.</Title>
    <p style={{ fontSize: 28, lineHeight: 1.55, color: p.muted, maxWidth: 1000, margin: 0 }}>
      bespoke portfolios, concierge reporting, and markets access — without the noise.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 28 }}>
    <style>{css}</style>
    <Eyebrow>Allocation</Eyebrow>
    <div
      style={{
        border: `1px solid ${p.line}`,
        borderRadius: 4,
        padding: 36,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        textAlign: 'center',
      }}
    >
      {[
        { label: 'Equities', pct: '42%' },
        { label: 'Credit', pct: '28%' },
        { label: 'Alternatives', pct: '30%' },
      ].map((row) => (
        <div key={row.label}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: p.accent }}>
            {row.pct}
          </div>
          <div style={{ fontSize: 18, color: p.muted, marginTop: 8 }}>{row.label}</div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}
  >
    <style>{css}</style>
    <Title>We remain at your service.</Title>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
