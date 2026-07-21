---
name: Luxe midnight
description: Premium dark deck — midnight navy, champagne gold type accents, high-contrast serif display.
mode: dark
---

# Luxe midnight

## Palette

| Role   | Value     | Notes              |
| ------ | --------- | ------------------ |
| bg     | `#0C0E14` | midnight           |
| text   | `#F5F3EE` | champagne white    |
| muted  | `#9CA3AF` | cool gray          |
| accent | `#D4AF37` | gold               |
| line   | `#2A2F3A` | hairline borders   |

## Typography

- Display: `'Cormorant Garamond', Georgia, serif` — 600.
- Body: `'Inter', system-ui, sans-serif` — 400.
- Webfont: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500&display=swap`
- Hero: 124 px; body: 28 px.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 124, fontWeight: 600, lineHeight: 1.02, margin: 0, color: '#F5F3EE' }}>{children}</h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#9CA3AF' }}>
      <span style={{ color: '#D4AF37', letterSpacing: '0.2em' }}>LUXE</span><span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 14, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D4AF37' }}>{children}</span>
);
```

## Aesthetic

Private banking keynote — gold sparingly, navy depth, serif elegance.
