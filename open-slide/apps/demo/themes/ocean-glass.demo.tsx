import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`;
const p = {
  bg: '#E8F4FC',
  surface: '#FFFFFF',
  text: '#0F172A',
  muted: '#64748B',
  accent: '#0891B2',
  border: '#CBD5E1',
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 120,
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
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
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 18,
        color: p.muted,
      }}
    >
      <span>Ocean glass</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      alignSelf: 'flex-start',
      padding: '8px 16px',
      borderRadius: 999,
      background: 'rgba(8,145,178,0.12)',
      color: p.accent,
      fontSize: 16,
      fontWeight: 600,
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
  fontFamily: "'DM Sans', system-ui, sans-serif",
};

const Cover: Page = () => (
  <div
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}
  >
    <style>{css}</style>
    <Eyebrow>Coastal API · v2</Eyebrow>
    <Title>Clear water, clearer data.</Title>
    <p style={{ fontSize: 30, lineHeight: 1.5, color: p.muted, maxWidth: 1100, margin: 0 }}>
      Real-time telemetry with dashboards that feel as calm as the horizon.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div style={{ ...base, display: 'flex', flexDirection: 'column', gap: 28 }}>
    <style>{css}</style>
    <Eyebrow>Highlights</Eyebrow>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 20,
        marginTop: 8,
      }}
    >
      {['Latency −40%', 'Uptime 99.98%', 'Regions +12', 'SDK refresh'].map((label) => (
        <div
          key={label}
          style={{
            background: p.surface,
            border: `1px solid ${p.border}`,
            borderRadius: 24,
            padding: 32,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          {label}
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
    <Title>Ship on calm seas.</Title>
    <p style={{ fontSize: 28, color: p.muted, margin: 0 }}>Start a pilot fleet in under an hour.</p>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
