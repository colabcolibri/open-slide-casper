# Pattern — transition-fade-minimal

| Field | Value |
| --- | --- |
| **id** | `transition-fade-minimal` |
| **kind** | motion |
| **page-types ref** | `../transitions.md` |
| **CONTENT keys** | _(none)_ |
| **Canvas formats** | **Both** |

## When to use

Subtle deck-wide fade when `page-transition` feels too heavy. Good for dense editorial decks.

## Skeleton (paste into `index.tsx`)

```tsx
import type { SlideTransition } from '@open-slide/core';

export const transition: SlideTransition = {
  duration: 220,
  easing: 'ease-out',
  enter: { keyframes: [{ opacity: 0 }, { opacity: 1 }], duration: 220 },
  exit: { keyframes: [{ opacity: 1 }, { opacity: 0 }], duration: 180 },
};
```

Do not duplicate `export const design`.

## Related

- `page-transition.md`
- `FORMAT-GUIDANCE.md`
