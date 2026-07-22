---
kit-doc: pattern
id: split-before-after
kind: layout
summary: "Explicit before/after narrative (process change, migration). Shared title in `head`."
formats: both-star
content-keys:
  - beforeAfter.title
  - beforeAfter.beforeLabel
  - beforeAfter.beforeItems[]
  - beforeAfter.afterLabel
  - beforeAfter.afterItems[]
  - footerLabel
page-types:
  - ../page-types/split.md
---
# Pattern — split-before-after

## When to use

Explicit before/after narrative (process change, migration). Shared title in `head`.

## Skeleton (paste into `index.tsx`)

```tsx
const BeforeAfter: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.beforeAfter.title}</PageTitle>}>
    <div style={{ display: 'flex', gap: 48, width: '100%', minHeight: 0, flex: 1 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 24px', fontSize: 28, color: 'var(--osd-accent)' }}>
          {CONTENT.beforeAfter.beforeLabel}
        </p>
        <BulletList items={CONTENT.beforeAfter.beforeItems} />
      </div>
      <div style={{ width: 2, background: 'var(--osd-muted)', opacity: 0.35, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: '0 0 24px', fontSize: 28, color: 'var(--osd-accent)' }}>
          {CONTENT.beforeAfter.afterLabel}
        </p>
        <BulletList items={CONTENT.beforeAfter.afterItems} />
      </div>
    </div>
  </PageLayout>
);
```

## Related

- `comparison-labeled-columns.md`
- `FORMAT-GUIDANCE.md`
