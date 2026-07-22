# Pattern — split-stacked-vertical

| Field | Value |
| --- | --- |
| **id** | `split-stacked-vertical` |
| **kind** | layout |
| **page-types ref** | `../page-types/split.md` |
| **CONTENT keys** | `stacked.title`, `stacked.lead`, `stacked.bullets[]`, `footerLabel` |
| **Canvas formats** | **4x5-first** — also fine on `slide` when you want poster layout |

## When to use

Visual on top, copy below — default split for **`4x5`** and mobile-shaped exports. Prefer over `split-50-50-text-image` on portrait.

## Skeleton (paste into `index.tsx`)

```tsx
import { ImagePlaceholder } from '@open-slide/core';

const SplitStackedVertical: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.stacked.title}</PageTitle>}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--osd-gap)',
        width: '100%',
        minHeight: 0,
        flex: 1,
      }}
    >
      <div style={{ flex: '0 0 42%', minHeight: 0, display: 'flex', justifyContent: 'center' }}>
        <ImagePlaceholder hint="Visual" width={900} height={520} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: 'var(--osd-size-body)',
            color: 'var(--osd-muted)',
          }}
        >
          {CONTENT.stacked.lead}
        </p>
        <BulletList items={CONTENT.stacked.bullets} />
      </div>
    </div>
  </PageLayout>
);
```

## Related

- `split-50-50-text-image.md` — wide side-by-side
- `FORMAT-GUIDANCE.md`
