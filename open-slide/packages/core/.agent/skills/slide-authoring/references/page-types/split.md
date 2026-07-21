# Page type — split (two columns)

Compare, before/after, or text + visual side by side inside the body band.

## When to use

- A vs B, problem/solution, copy beside a chart or image.
- Two parallel lists of equal importance (keep each column ≤4 short lines).

## Prerequisites

Paste **`PageLayout` + `DeckFooter`** from `title-body-footer.md` once per deck.

## Pattern

Use `head` for the page title shared across columns. Body is a horizontal flex row with equal-ish columns and `minWidth: 0` so text wraps instead of overflowing.

```tsx
const Compare: Page = () => (
  <PageLayout
    footerLabel="my deck"
    head={
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 80,
          fontWeight: 800,
          margin: 0,
        }}
      >
        Before and after
      </h2>
    }
  >
    <div
      style={{
        display: 'flex',
        gap: 48,
        width: '100%',
        minHeight: 0,
        flex: 1,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 28, color: 'var(--osd-accent)', margin: '0 0 24px' }}>Before</p>
        <ul style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: 0, paddingLeft: 40 }}>
          <li>Point one</li>
          <li>Point two</li>
        </ul>
      </div>
      <div style={{ width: 2, background: 'var(--osd-muted, #6b6560)', opacity: 0.35, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 28, color: 'var(--osd-accent)', margin: '0 0 24px' }}>After</p>
        <ul style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: 0, paddingLeft: 40 }}>
          <li>Point one</li>
          <li>Point two</li>
        </ul>
      </div>
    </div>
  </PageLayout>
);
```

Image in one column: import from `./assets/` and set `maxWidth: '100%'`, `objectFit: 'cover'` on the img; keep the other column to short copy.

## Anti-patterns

- Three or more columns on 1920×1080 — text becomes unreadable; use two pages or a content page with `<Steps>`.
- Nested split inside split — hard to fit in 840px usable height; flatten to sequential pages.
