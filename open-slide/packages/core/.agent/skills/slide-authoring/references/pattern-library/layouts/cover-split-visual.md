---
kit-doc: pattern
id: cover-split-visual
kind: layout
summary: "Opener with product visual beside title. Needs horizontal room — avoid on narrow portrait unless you stack."
formats: both-star
content-keys:
  - coverSplit.title
  - coverSplit.subtitle
  - footerLabel
page-types:
  - ../page-types/cover.md, ../page-types/split.md
---
# Pattern — cover-split-visual

## When to use

Opener with product visual beside title. Needs horizontal room — avoid on narrow portrait unless you stack.

## Skeleton (paste into `index.tsx`)

```tsx
import { ImagePlaceholder } from '@open-slide/core';

const CoverSplitVisual: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    <div style={{ display: 'flex', gap: 'var(--osd-gap)', width: '100%', alignItems: 'center' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <DisplayTitle>{CONTENT.coverSplit.title}</DisplayTitle>
        <BodyCopy>{CONTENT.coverSplit.subtitle}</BodyCopy>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
        <ImagePlaceholder hint="Cover visual" width={640} height={480} />
      </div>
    </div>
  </PageLayout>
);
```

## Related

- `split-stacked-vertical.md` — portrait alternative
- `FORMAT-GUIDANCE.md`
