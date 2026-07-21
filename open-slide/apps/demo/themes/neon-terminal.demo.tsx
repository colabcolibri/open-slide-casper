import { type Page, useSlidePageNumber } from '@open-slide/core';
import type { ReactNode } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
.nt-grid {
  background-image: linear-gradient(rgba(57,255,20,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
}
`;

const p = { bg: '#0D1117', text: '#E6FFE6', muted: '#6B7280', accent: '#39FF14' };

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 96,
      fontWeight: 700,
      lineHeight: 1.08,
      margin: 0,
      color: p.accent,
      textShadow: '0 0 24px rgba(57,255,20,0.35)',
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
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18,
        color: p.muted,
      }}
    >
      <span>{'>'} session</span>
      <span>
        {current}/{total}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 16,
      color: p.muted,
      marginBottom: 16,
    }}
  >
    {'// '}
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
  fontFamily: "'JetBrains Mono', monospace",
};

const Cover: Page = () => (
  <div
    className="nt-grid"
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}
  >
    <style>{css}</style>
    <Eyebrow>boot sequence</Eyebrow>
    <Title>root@demo:~$</Title>
    <p style={{ fontSize: 24, lineHeight: 1.6, color: p.text, maxWidth: 1100, margin: 0 }}>
      Deploy scripts, watch logs, and patch prod — all from one phosphor-green dashboard.
    </p>
    <Footer />
  </div>
);

const Content: Page = () => (
  <div className="nt-grid" style={{ ...base, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <style>{css}</style>
    <Eyebrow>metrics</Eyebrow>
    <pre
      style={{
        margin: 0,
        padding: 28,
        border: '1px solid rgba(57,255,20,0.25)',
        borderRadius: 8,
        fontSize: 22,
        lineHeight: 1.5,
        color: p.accent,
      }}
    >
      {`cpu.usage    12%\nmem.used     4.2G / 16G\nrequests/s   18.4k\nerrors       0.02%`}
    </pre>
    <Footer />
  </div>
);

const Closer: Page = () => (
  <div
    className="nt-grid"
    style={{ ...base, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}
  >
    <style>{css}</style>
    <Title>exit 0</Title>
    <Footer />
  </div>
);

export default [Cover, Content, Closer];
