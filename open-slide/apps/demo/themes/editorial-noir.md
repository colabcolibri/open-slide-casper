---
name: Editorial noir
description: High-contrast magazine deck — ink black, ivory type, crimson rule lines, serif headlines.
mode: dark
---

# Editorial noir

## Palette

| Role   | Value     | Notes                |
| ------ | --------- | -------------------- |
| bg     | `#0A0A0A` | canvas               |
| text   | `#F5F0E8` | primary copy         |
| muted  | `#9A9488` | secondary            |
| accent | `#C41E3A` | rules, eyebrows      |
| line   | `#2A2826` | dividers             |

## Typography

- Display: `'Playfair Display', Georgia, serif` — weight 700.
- Body: `'Source Serif 4', Georgia, serif` — weight 400.
- Webfont: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:wght@400;600&display=swap`
- Hero: 128 px; section: 52 px; body: 28 px.

## Layout

- Padding 120 px; left-aligned column; hairline top rule in accent on interior pages.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 128, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0, color: '#F5F0E8' }}>
    {children}
  </h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontFamily: "'Source Serif 4', serif", fontSize: 20, color: '#9A9488' }}>
      <span>Editorial</span>
      <span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 18, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C41E3A', marginBottom: 20 }}>{children}</div>
);
```

## Aesthetic

Film-noir editorial: one crimson accent, generous whitespace, serif rhythm. No gradients or drop shadows.
