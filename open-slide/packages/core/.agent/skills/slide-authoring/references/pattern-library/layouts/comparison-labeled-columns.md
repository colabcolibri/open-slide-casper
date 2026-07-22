---
kit-doc: pattern
id: comparison-labeled-columns
kind: layout
summary: "A vs B with titled columns (not only bullets). Good for “old way / new way” prose."
formats: both-star
content-keys:
  - compare.title
  - compare.leftTitle
  - compare.leftBody
  - compare.rightTitle
  - compare.rightBody
  - footerLabel
page-types:
  - ../page-types/split.md
---
# Pattern — comparison-labeled-columns

## When to use

A vs B with titled columns (not only bullets). Good for “old way / new way” prose.

## Skeleton (paste into `index.tsx`)

```tsx
const ComparisonColumns: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.compare.title}</PageTitle>}>
    <div style={{ display: 'flex', gap: 'var(--osd-gap)', width: '100%', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 'var(--osd-size-body)' }}>
          {CONTENT.compare.leftTitle}
        </p>
        <BodyCopy>{CONTENT.compare.leftBody}</BodyCopy>
      </div>
      <div style={{ width: 2, background: 'var(--osd-line)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 'var(--osd-size-body)' }}>
          {CONTENT.compare.rightTitle}
        </p>
        <BodyCopy>{CONTENT.compare.rightBody}</BodyCopy>
      </div>
    </div>
  </PageLayout>
);
```

## Related

- `title-body-footer-two-col.md` — bullet-heavy variant
- `FORMAT-GUIDANCE.md`
