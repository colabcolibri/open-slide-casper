# Page type — title / body / footer (head · body · footer)

Every slide deck owns its layout in **`slides/<id>/index.tsx`**. Do not import layout from `@open-slide/core` — copy the block below once per deck and customize chrome (footer label, gaps, typography components).

## Contract

| Region | Role |
| --- | --- |
| **Head** | Eyebrow, section label, page title — pinned to the top |
| **Body** | Main copy, grids, `<Steps>` — fills the middle (`1fr`), optional vertical align |
| **Footer** | Deck label + `useSlidePageNumber()` — pinned to the bottom |

Grid: `auto 1fr auto`. Footer is **not** `position: absolute` so the body band is real vertical space.

**Pin rows explicitly** — always set `gridRow: 1` (head), `gridRow: 2` (body), `gridRow: 3` (footer). Cover pages omit `head`, so only body + footer are grid children; without explicit rows they auto-place into rows **1 and 2**, the footer sits under the title block, and row 3 stays empty (looks “floating”, not bottom-pinned).

Decorative layers (`position: 'absolute'`) do not consume grid rows; they can sit inside the frame or in a single `inset: 0` wrapper.

Regions use `data-slide-region="head|body|footer"` so inspector/tooling can recognize structure later.

## Copy into the top of `index.tsx` (after `design`)

```tsx
import type { CSSProperties, ReactNode } from 'react';
import { useSlidePageNumber } from '@open-slide/core';

type PageBodyAlign = 'start' | 'center' | 'end';

const PAGE_GAP = 34;

const pageFrameStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  rowGap: PAGE_GAP,
  padding: 'var(--osd-padding, 100px 120px)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  overflow: 'hidden',
  position: 'relative',
};

function bodyJustify(align: PageBodyAlign): CSSProperties['justifyContent'] {
  if (align === 'center') return 'center';
  if (align === 'end') return 'flex-end';
  return 'flex-start';
}

const DeckFooter = ({ label }: { label: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        fontSize: 24,
        color: 'var(--osd-muted, #6b6560)',
      }}
    >
      <span>{label}</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const PageLayout = ({
  head,
  bodyAlign = 'start',
  footerLabel,
  children,
}: {
  head?: ReactNode;
  bodyAlign?: PageBodyAlign;
  footerLabel: string;
  children: ReactNode;
}) => (
  <div style={pageFrameStyle} data-slide-layout="">
    {head ? (
      <header
        data-slide-region="head"
        style={{ display: 'flex', flexDirection: 'column', gap: PAGE_GAP, gridRow: 1 }}
      >
        {head}
      </header>
    ) : null}
    <div
      data-slide-region="body"
      style={{
        minHeight: 0,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: bodyJustify(bodyAlign),
        gap: PAGE_GAP,
        gridRow: 2,
      }}
    >
      {children}
    </div>
    <footer data-slide-region="footer" style={{ gridRow: 3 }}>
      <DeckFooter label={footerLabel} />
    </footer>
  </div>
);
```

## Typography templates (layer 2 — copy with `PageLayout`)

Paste these **once per deck** after `PageLayout`. Wire all readable body text through them so export/present mode stays legible.

```tsx
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 26,
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
    }}
  >
    {children}
  </span>
);

const PageTitle = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 72,
      fontWeight: 600,
      lineHeight: 1.08,
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
    }}
  >
    {children}
  </h2>
);

const BodyCopy = ({ children, maxWidth = 900 }: { children: ReactNode; maxWidth?: number }) => (
  <p
    style={{
      maxWidth,
      margin: 0,
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.56,
      color: 'var(--osd-muted, #6b6560)',
    }}
  >
    {children}
  </p>
);

const BulletList = ({ items }: { items: readonly string[] }) => (
  <ul style={{ display: 'grid', gap: 20, margin: 0, padding: 0, listStyle: 'none' }}>
    {items.map((item) => (
      <li key={item} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 18, alignItems: 'start' }}>
        <span
          style={{
            width: 10,
            height: 10,
            marginTop: '0.35em',
            borderRadius: 999,
            background: 'var(--osd-accent)',
          }}
        />
        <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: 'var(--osd-muted, #6b6560)' }}>
          {item}
        </span>
      </li>
    ))}
  </ul>
);
```

**`design` baseline** (adjust hero to topic; keep body in range from `canvas-and-layout.md`):

```tsx
export const design: DesignSystem = {
  palette: { bg: '#f7f5f0', text: '#1a1814', accent: '#6d4cff' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 168, body: 38 },
  radius: 12,
};
```

For `meta.format: '4x5'`, typical `hero: 100–112`, `body: 36–38`.

## Usage

**Standard content page** — head stays top, body grows from the top:

```tsx
const Example: Page = () => (
  <PageLayout
    footerLabel="my deck"
    head={
      <>
        <Eyebrow>01 · section</Eyebrow>
        <PageTitle>One idea per page</PageTitle>
      </>
    }
  >
    <BodyCopy>Paragraph or bullets go here.</BodyCopy>
  </PageLayout>
);
```

**Steps** — put the headline in `head`, wrap reveals inside `children`:

```tsx
<PageLayout footerLabel="my deck" head={<PageTitle>Always visible</PageTitle>}>
  <Steps>
    <Step>First reveal</Step>
    <Step>Second reveal</Step>
  </Steps>
</PageLayout>
```

## Anti-patterns

- Footer with `position: absolute` — steals body height and breaks vertical budget math.
- `PageLayout` without `gridRow` on head/body/footer — cover pages (no `head`) break footer pinning.
- Skipping `PageLayout` on “normal” pages while using it elsewhere — padding and footer drift.
- Footer or eyebrow type below **22px** on a 1920×1080 / 4×5 canvas — use caption scale (`canvas-and-layout.md`).
- Hard-coded body/bullet sizes (e.g. `fontSize: 29`) instead of **`var(--osd-size-body)`** — looks fine in dev zoom but weak in export; use `BodyCopy` / `BulletList` above.
