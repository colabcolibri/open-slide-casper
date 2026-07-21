---
name: Sage paper
description: Calm botanical deck — recycled paper white, sage green accents, soft serif headlines.
mode: light
---

# Sage paper

## Palette

| Role   | Value     | Notes           |
| ------ | --------- | --------------- |
| bg     | `#F4F7F4` | paper white     |
| text   | `#1A2E1A` | deep forest     |
| muted  | `#5C6B5C` | secondary       |
| accent | `#4A6741` | sage green      |
| line   | `#D4DDD4` | rules           |

## Typography

- Display: `'Fraunces', Georgia, serif` — 600.
- Body: `'Inter', system-ui, sans-serif` — 400.
- Webfont: `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Inter:wght@400;500&display=swap`
- Hero: 112 px; body: 28 px.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 112, fontWeight: 600, lineHeight: 1.06, margin: 0, color: '#1A2E1A' }}>{children}</h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#5C6B5C' }}>
      <span>Sage paper</span><span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A6741' }}>{children}</span>
);
```

## Aesthetic

Wellness annual report — muted greens, paper texture feel, botanical calm.
