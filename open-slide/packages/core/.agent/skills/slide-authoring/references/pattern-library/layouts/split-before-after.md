# Pattern — split-before-after

| Field | Value |
| --- | --- |
| **id** | `split-before-after` |
| **kind** | layout |
| **page-types ref** | `../page-types/split.md` |
| **CONTENT keys** | `beforeAfter.title`, `beforeAfter.beforeLabel`, `beforeAfter.beforeItems[]`, `beforeAfter.afterLabel`, `beforeAfter.afterItems[]`, `footerLabel` |
| **Canvas formats** | **Both\*** — ≤3 bullets per side; stack with `flexDirection: 'column'` on `4x5` if needed |

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
