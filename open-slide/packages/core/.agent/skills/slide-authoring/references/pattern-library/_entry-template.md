# Pattern — `<id>`

| Field | Value |
| --- | --- |
| **id** | `<kebab-id>` |
| **kind** | `layout` \| `motion` |
| **page-types ref** | `../page-types/<name>.md` (layouts) or primitive ref (motion) |
| **CONTENT keys** | List keys to add under `CONTENT` in `deck-layers.md` |
| **Canvas formats** | `Both` \| `Both*` \| `slide-first` \| `4x5-first` — see `FORMAT-GUIDANCE.md` |

## Canvas formats

State how this pattern behaves on **`slide` (16∶9)** and **`4x5`**. Link stacked/alternate ids when portrait needs a different layout.

## When to use

One short paragraph: audience moment, density, when **not** to use this pattern.

## Prerequisites

- Deck already copied from `../deck-template/index.tsx`.
- `PageLayout` / shared chrome from `../page-types/title-body-footer.md` (layouts).
- Do **not** paste a second `export const design` — keep the deck's literal `design` object.

## Variants

| Variant file | When |
| --- | --- |
| _(single entry or link sibling `.md`)_ | |

## Skeleton (paste into `index.tsx`)

Snippet only — merge into **templates** then **pages** per `../deck-layers.md`. Imports shown are additive.

```tsx
// Paste imports at top of index.tsx if missing:
// import type { Page } from '@open-slide/core';
// import { Step, Steps } from '@open-slide/core'; // motion only, when needed

// Add to CONTENT:
const CONTENT = {
  // …existing keys…
  patternExample: {
    title: '…',
  },
} as const;

// Template or Page component:
const PatternPage: Page = () => (
  // …
);

// Append to export default [ … ] satisfies Page[];
```

## Tokens and layout

- Grid gap: `var(--osd-gap)`; padding: `var(--osd-padding)`.
- Typography: `var(--osd-size-hero)`, `var(--osd-size-heading)`, `var(--osd-size-body)`, `var(--osd-muted)`, `var(--osd-accent)`.
- Regions: `data-slide-region="head|body|footer"` when using `PageLayout`.

## Related

- `INDEX.md` — catalog id
- `../self-review-checklist.md` — before handoff
