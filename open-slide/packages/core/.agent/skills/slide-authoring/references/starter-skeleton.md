# Starter skeleton (after PageLayout paste)

Copy **`page-types/title-body-footer.md`** into every new deck first, then add helpers and pages.

```tsx
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
// …PageLayout + DeckFooter from page-types/title-body-footer.md…

export const design: DesignSystem = {
  palette: { bg: '#0f172a', text: '#f8fafc', accent: '#fbbf24' },
  fonts: {
    display: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
  },
  typeScale: { hero: 180, body: 40, heading: 56 },
  radius: 12,
  spacing: { padding: '100px 120px' },
};

const muted = '#94a3b8';

const Cover: Page = () => (
  <PageLayout footerLabel="My deck" bodyAlign="center">
    <p style={{ fontSize: 28, color: 'var(--osd-accent)', letterSpacing: '0.2em', margin: 0 }}>
      CHAPTER 01
    </p>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 900,
        margin: 0,
        lineHeight: 1.05,
      }}
    >
      The big idea
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, maxWidth: 1200, margin: 0 }}>
      A short subtitle.
    </p>
  </PageLayout>
);

const Content: Page = () => (
  <PageLayout
    footerLabel="My deck"
    head={
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 80,
          fontWeight: 800,
          margin: 0,
        }}
      >
        Section heading
      </h2>
    }
  >
    <ul style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: 0, paddingLeft: 48 }}>
      <li>One clear point per line</li>
      <li>Keep to 3–5 bullets</li>
    </ul>
  </PageLayout>
);

export const meta: SlideMeta = {
  title: 'The Big Idea',
  createdAt: '2026-05-16T12:00:00Z',
};
export default [Cover, Content] satisfies Page[];
```

Full `PageLayout` source: **`page-types/title-body-footer.md`**.
