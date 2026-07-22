# Pattern — page-transition

| Field | Value |
| --- | --- |
| **id** | `page-transition` |
| **kind** | motion |
| **page-types ref** | `../transitions.md` |
| **CONTENT keys** | _(none — transition is module or per-page export)_ |
| **Canvas formats** | **Both** |

## When to use

Motion between pages adds clarity (direction, softness). Default snap is fine for dense decks — opt in deliberately.

## Prerequisites

Deck `index.tsx` with `export default [ … ] satisfies Page[]`. Read `transitions.md` for incoming-page wins rule.

## Variants

Module-level default vs `SomePage.transition = { … }` override.

## Skeleton (paste into `index.tsx`)

```tsx
import type { Page, SlideTransition } from '@open-slide/core';

export const transition: SlideTransition = {
  duration: 280,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  enter: {
    keyframes: [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
    duration: 280,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 200,
  },
};

const FadeBody: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>With transition</PageTitle>}>
    <BodyCopy>Module transition applies unless a page overrides.</BodyCopy>
  </PageLayout>
);

// Per-page override example:
// FadeBody.transition = { duration: 400, enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }] } };
```

Do **not** add a second `export const design` — only `transition` (and optional `Page.transition`).

## Tokens and layout

`--osd-dir` / `data-osd-dir` available on wrapper for direction-aware keyframes (`transitions.md`).

## Related

- `../transitions.md`
- `INDEX.md` — `page-transition`
