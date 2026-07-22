---
kit-doc: pattern
id: <kebab-id>
kind: layout
summary: "One line for INDEX and agents."
formats: both
content-keys:
  - section.key
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — <kebab-id>

See `SCHEMA.md` for field rules and `FORMAT-GUIDANCE.md` for `formats` values.

## When to use

One short paragraph: audience moment, density, when **not** to use this pattern.

## Prerequisites

- Deck already copied from `../deck-template/index.tsx`.
- `PageLayout` / shared chrome from `../page-types/title-body-footer.md` (layouts).
- Do **not** paste a second `export const design` — keep the deck's literal `design` object.

## Skeleton (paste into `index.tsx`)

Snippet only — merge into **templates** then **pages** per `../deck-layers.md`.

```tsx
const PatternPage: Page = () => (
  // …
);
```

## Related

- `INDEX.md` — catalog id
- `../self-review-checklist.md` — before handoff
