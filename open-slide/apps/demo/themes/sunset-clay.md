---
name: Sunset clay
description: Warm terracotta deck — cream canvas, clay accents, soft rounded cards, friendly grotesk.
mode: light
---

# Sunset clay

## Palette

| Role   | Value     | Notes        |
| ------ | --------- | ------------ |
| bg     | `#FFF7F0` | warm cream   |
| text   | `#29180F` | espresso ink |
| muted  | `#8B7355` | secondary    |
| accent | `#C2410C` | terracotta   |
| wash   | `#FED7AA` | soft panels  |

## Typography

- Display / body: `'Outfit', system-ui, sans-serif`.
- Webfont: `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap`
- Hero: 118 px; body: 28 px.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: 118, fontWeight: 700, lineHeight: 1.04, margin: 0, color: '#29180F' }}>{children}</h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#8B7355' }}>
      <span>Sunset clay</span><span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C2410C' }}>{children}</span>
);
```

## Aesthetic

Desert sunset workshop — terracotta pops on cream, rounded 20 px cards, no cool grays.
