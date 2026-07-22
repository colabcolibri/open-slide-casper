---
kit-doc: pattern
id: title-body-footer-closing-cta
kind: layout
summary: "Last page: recap + one CTA line (URL, next step, contact). Often `bodyAlign='center'` on body band."
formats: both
content-keys:
  - closing.eyebrow
  - closing.title
  - closing.body
  - closing.action
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — title-body-footer-closing-cta

## When to use

Last page: recap + one CTA line (URL, next step, contact). Often `bodyAlign="center"` on body band.

## Skeleton (paste into `index.tsx`)

```tsx
const ClosingCta: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    bodyAlign="center"
    head={
      <>
        <Eyebrow>{CONTENT.closing.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.closing.title}</PageTitle>
      </>
    }
  >
    <BodyCopy>{CONTENT.closing.body}</BodyCopy>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--osd-size-body)',
        fontWeight: 600,
        color: 'var(--osd-accent)',
      }}
    >
      {CONTENT.closing.action}
    </p>
  </PageLayout>
);
```

## Related

- `deck-template` Closing page
- `FORMAT-GUIDANCE.md`
