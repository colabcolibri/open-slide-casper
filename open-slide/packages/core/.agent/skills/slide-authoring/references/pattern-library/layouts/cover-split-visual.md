# Pattern — cover-split-visual

| Field | Value |
| --- | --- |
| **id** | `cover-split-visual` |
| **kind** | layout |
| **page-types ref** | `../page-types/cover.md`, `../page-types/split.md` |
| **CONTENT keys** | `coverSplit.title`, `coverSplit.subtitle`, `footerLabel` |
| **Canvas formats** | **Both\*** — **slide-first** for side-by-side; on `4x5` use `cover-centered` or `split-stacked-vertical` |

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
