# Page type — title / body / footer (head · body · footer)

Every slide deck owns its layout in **`slides/<id>/index.tsx`**. Do not import layout from `@open-slide/core` — copy the block below once per deck and customize chrome (footer label, gaps, typography components).

## Contract

| Region | Role |
| --- | --- |
| **Head** | Eyebrow, section label, page title — pinned to the top |
| **Body** | Main copy, grids, `<Steps>` — fills the middle (`1fr`), optional vertical align |
| **Footer** | Deck label + `useSlidePageNumber()` — pinned to the bottom |

Grid: `auto 1fr auto`. Footer is **not** `position: absolute` so the body band is real vertical space.

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
        fontSize: 18,
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
      <header data-slide-region="head" style={{ display: 'flex', flexDirection: 'column', gap: PAGE_GAP }}>
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
      }}
    >
      {children}
    </div>
    <footer data-slide-region="footer">
      <DeckFooter label={footerLabel} />
    </footer>
  </div>
);
```

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
- Skipping `PageLayout` on “normal” pages while using it elsewhere — padding and footer drift.
