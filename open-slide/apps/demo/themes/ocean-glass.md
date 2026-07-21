---
name: Ocean glass
description: Light airy deck — sky wash, frosted panels, deep teal accent, rounded sans headlines.
mode: light
---

# Ocean glass

## Palette

| Role    | Value     | Notes           |
| ------- | --------- | --------------- |
| bg      | `#E8F4FC` | sky wash        |
| surface | `#FFFFFF` | glass cards     |
| text    | `#0F172A` | ink             |
| muted   | `#64748B` | secondary       |
| accent  | `#0891B2` | teal highlights |

## Typography

- Display / body: `'DM Sans', system-ui, sans-serif` — 600 / 400.
- Webfont: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap`
- Hero: 120 px; body: 30 px.

## Layout

- Padding 120 px; cards with 24 px radius, 1 px `#CBD5E1` border, subtle backdrop blur on overlays.

## Fixed components

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 120, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, color: '#0F172A' }}>{children}</h1>
);
```

### Footer

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ position: 'absolute', left: 120, right: 120, bottom: 56, display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#64748B' }}>
      <span>Ocean glass</span><span>{current} / {total}</span>
    </div>
  );
};
```

### Eyebrow

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span style={{ alignSelf: 'flex-start', padding: '8px 16px', borderRadius: 999, background: 'rgba(8,145,178,0.12)', color: '#0891B2', fontSize: 16, fontWeight: 600 }}>{children}</span>
);
```

## Aesthetic

Coastal product launch — soft blues, glass surfaces, one teal accent. No harsh shadows.
