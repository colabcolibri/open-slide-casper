---
kit-doc: pattern
id: morph-highlight
kind: motion
summary: "The **same object** moves or resizes between two adjacent pages (highlight pill, card, logo). Requires matching `MorphElement` `id` on both pages and `morph` on the incoming transition."
formats: both
content-keys:
  - morph.layout-tsx
page-types:
  - ../morph.md
  - ../transitions.md
---
# Pattern — morph-highlight

## When to use

The **same object** moves or resizes between two adjacent pages (highlight pill, card, logo). Requires matching `MorphElement` `id` on both pages and `morph` on the incoming transition.

## Prerequisites

Read `morph.md` first. Use opacity-only enter/exit on morphing pages so motion stays on the cloned element.

## Variants

Assign the same `SlideTransition` object to both pages when morph should play backward too.

## Skeleton (paste into `index.tsx`)

```tsx
import { MorphElement, type Page, type SlideTransition } from '@open-slide/core';
import type { CSSProperties } from 'react';

const morphTransition: SlideTransition = {
  duration: 280,
  exit: { duration: 224, easing: 'cubic-bezier(0.4, 0, 1, 1)', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 308, delay: 112, easing: 'cubic-bezier(0, 0, 0.2, 1)', keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  morph: { duration: 868, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

const stage: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  position: 'relative',
  overflow: 'hidden',
};

const MorphNarrow: Page = () => (
  <div style={stage}>
    <MorphElement id="highlight-pill">
      <div
        style={{
          position: 'absolute',
          left: 842,
          top: 479,
          width: 236,
          height: 122,
          borderRadius: 999,
          background: 'var(--osd-accent)',
        }}
      />
    </MorphElement>
  </div>
);

const MorphWide: Page = () => (
  <div style={stage}>
    <MorphElement id="highlight-pill">
      <div
        style={{
          position: 'absolute',
          left: 721,
          top: 479,
          width: 478,
          height: 122,
          borderRadius: 999,
          background: 'var(--osd-text)',
        }}
      />
    </MorphElement>
  </div>
);

MorphWide.transition = morphTransition;
MorphNarrow.transition = morphTransition;

// export default [ …, MorphNarrow, MorphWide, … ] satisfies Page[];
```

Use `useIsActivePage()` for any entrance animation on morph pages (`morph.md` rule 5).

## Tokens and layout

Morph rects are snapshotted at cut — use pixel constants, not post-mount measurement.

## Related

- `../morph.md`, `../transitions.md`
- `INDEX.md` — `morph-highlight`
