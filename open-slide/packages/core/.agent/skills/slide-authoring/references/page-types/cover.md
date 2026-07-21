# Page type — cover

Opening page: one hero idea, optional subtitle, deck chrome via shared `PageLayout`.

## When to use

- First page of the deck.
- Section openers that need a ceremonial beat (title only, no bullet list).

## Prerequisites

Paste **`PageLayout` + `DeckFooter`** from `title-body-footer.md` once per deck before using this pattern.

## Pattern

Omit `head`. Center the body band with `bodyAlign="center"`. Keep copy minimal — hero title + one subtitle line fits the vertical budget.

```tsx
const Cover: Page = () => (
  <PageLayout footerLabel="my deck" bodyAlign="center">
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 900,
        margin: 0,
        lineHeight: 1.05,
        textAlign: 'center',
      }}
    >
      The big idea
    </h1>
    <p
      style={{
        fontSize: 'var(--osd-size-body)',
        color: 'var(--osd-muted, #6b6560)',
        maxWidth: 1200,
        margin: 0,
        textAlign: 'center',
      }}
    >
      Subtitle or audience line.
    </p>
  </PageLayout>
);
```

Optional eyebrow above the title (still inside body, centered):

```tsx
<p style={{ fontSize: 28, color: 'var(--osd-accent)', letterSpacing: '0.2em', margin: 0 }}>
  CHAPTER 01
</p>
```

## Anti-patterns

- Cover with 5+ bullets — split to a content page (`title-body-footer`).
- `bodyAlign="start"` on cover unless you deliberately want top-weighted editorial cover.
