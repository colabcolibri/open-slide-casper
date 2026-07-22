---
kit-doc: pattern
id: title-body-footer-prose
kind: layout
summary: "Single idea explained in prose (no bullets). Section transitions in narrative decks."
formats: both
content-keys:
  - prose.eyebrow
  - prose.title
  - prose.body
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — title-body-footer-prose

## When to use

Single idea explained in prose (no bullets). Section transitions in narrative decks.

## Skeleton (paste into `index.tsx`)

```tsx
const ProsePage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.prose.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.prose.title}</PageTitle>
      </>
    }
  >
    <BodyCopy>{CONTENT.prose.body}</BodyCopy>
  </PageLayout>
);
```

## Related

- `title-body-footer-bullets.md`
- `FORMAT-GUIDANCE.md`
