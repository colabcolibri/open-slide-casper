---
name: Neon terminal
description: Retro CRT deck — near-black grid, phosphor green type, monospace eyebrows, scanline texture.
mode: dark
---

# Neon terminal

## Palette

| Role   | Value     | Notes              |
| ------ | --------- | ------------------ |
| bg     | `#0D1117` | terminal black     |
| grid   | `#1F2937` | faint grid lines   |
| text   | `#E6FFE6` | phosphor white     |
| muted  | `#6B7280` | dim green-gray     |
| accent | `#39FF14` | neon green         |

## Typography

- All UI: `'JetBrains Mono', 'SF Mono', Menlo, monospace`.
- Webfont: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap`
- Hero: 96 px; body: 24 px.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 96, fontWeight: 700, lineHeight: 1.08, margin: 0, color: '#39FF14', textShadow: '0 0 24px rgba(57,255,20,0.35)' }}>{children}</h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: '#6B7280' }}>
      <span>{'>'} session</span><span>{current}/{total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, color: '#6B7280', marginBottom: 16 }}>{'// '}{children}</div>
);
```

## Aesthetic

Hacker demo night — green on black, subtle grid, no serif fonts.
