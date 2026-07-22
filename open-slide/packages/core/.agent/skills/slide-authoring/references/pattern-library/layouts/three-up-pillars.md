---
kit-doc: pattern
id: three-up-pillars
kind: layout
summary: "Three parallel benefits/principles. Requires horizontal space — avoid cramming on portrait."
formats: slide-first
content-keys:
  - pillars.title
  - pillars.items (three { title
  - body })
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — three-up-pillars

## When to use

Three parallel benefits/principles. Requires horizontal space — avoid cramming on portrait.

## Skeleton (paste into `index.tsx`)

```tsx
const Pillar = ({ title, body }: { title: string; body: string }) => (
  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p style={{ margin: 0, fontWeight: 700, fontSize: 'var(--osd-size-body)', color: 'var(--osd-accent)' }}>
      {title}
    </p>
    <p style={{ margin: 0, fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: 'var(--osd-muted)' }}>
      {body}
    </p>
  </div>
);

const ThreeUpPillars: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.pillars.title}</PageTitle>}>
    <div style={{ display: 'flex', gap: 40, width: '100%', flex: 1, minHeight: 0 }}>
      <Pillar title={CONTENT.pillars.items[0].title} body={CONTENT.pillars.items[0].body} />
      <Pillar title={CONTENT.pillars.items[1].title} body={CONTENT.pillars.items[1].body} />
      <Pillar title={CONTENT.pillars.items[2].title} body={CONTENT.pillars.items[2].body} />
    </div>
  </PageLayout>
);
```

## Related

- `FORMAT-GUIDANCE.md`
