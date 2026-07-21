# Theme markdown template (`themes/<id>.md`)

Produce a file with this exact section order. Section bodies adapt to the theme; the headings stay consistent across all themes.

````markdown
---
name: <Human title, e.g. "Editorial Noir">
description: <one-line elevator pitch>
mode: <dark | light — whichever matches the palette's bg>
---

# <Theme name>

## Palette

| Role   | Value     | Notes                          |
| ------ | --------- | ------------------------------ |
| bg     | `#0f172a` | page background                |
| text   | `#f8fafc` | primary copy                   |
| accent | `#fbbf24` | callouts, eyebrow, key numbers |
| muted  | `#94a3b8` | secondary copy, dividers       |
| ...    | ...       | extend as the theme requires   |

## Typography

- Display font: `<stack>` — weight 800–900 for headlines.
- Body font: `<stack>` — weight 400–500.
- Webfont import (omit for system stacks): `<stylesheet URL>` — see `references/webfonts.md` in `slide-authoring` for loading rules.
- Type-scale overrides (only list what differs from `slide-authoring` defaults):
  - Hero title: 180 px (default 140–200 ✓)
  - Body text: 36 px

## Layout

- Content padding: 120 px from canvas edges (1920 × 1080).
- Alignment: left-aligned, single column.
- Grid notes: optional 12-column overlay at 80 px gutter for content pages.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: 140,
      fontWeight: 900,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      color: '#f8fafc',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 60,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 24,
        color: '#94a3b8',
      }}
    >
      <span>EDITORIAL NOIR · 2026</span>
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow / accents (optional)

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, letterSpacing: '0.2em', color: '#fbbf24' }}>
    {children}
  </div>
);
```

## Motion

- Philosophy: static / subtle / rich — pick one and explain in one sentence.
- Reusable keyframes (paste-ready, only if the philosophy is subtle or rich):

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Aesthetic

One paragraph. What it feels like, the references it draws on, what to avoid (e.g. "no rounded corners; no gradients; no decorative emoji"). Commit to a single direction — minimal, maximalist, editorial, retro, brutalist, soft/pastel, neon, paper/print.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#0f172a', color: '#f8fafc', padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>CHAPTER 01</Eyebrow>
    <Title>The Big Idea</Title>
    <p style={{ fontSize: 36, color: '#94a3b8', maxWidth: 1200, marginTop: 32 }}>
      A short subtitle that explains what this slide is about.
    </p>
    <Footer />
  </div>
);
```
````
