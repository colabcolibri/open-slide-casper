import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#f7f5f0', text: '#1a1814', accent: '#6d4cff' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 140, body: 36 },
  radius: 12,
};

const CONTENT = {
  deckTitle: 'Lorem deck',
  footerLabel: 'Lorem deck',
  cover: {
    eyebrow: 'placeholder · 01',
    title: 'Lorem ipsum dolor sit amet',
    subtitle:
      'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  section: {
    eyebrow: 'section · 02',
    title: 'Ut enim ad minim veniam',
    body: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
  },
  bullets: {
    eyebrow: 'list · 03',
    title: 'Excepteur sint occaecat',
    items: [
      'Cupidatat non proident, sunt in culpa qui officia.',
      'Deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error.',
    ],
  },
  closing: {
    eyebrow: 'closing · 04',
    title: 'Nemo enim ipsam voluptatem',
    body: 'Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    action: 'Replace this line with a CTA or next step.',
  },
} as const;

type PageBodyAlign = 'start' | 'center' | 'end';

const pageFrameStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  rowGap: 'var(--osd-gap)',
  padding: 'var(--osd-padding)',
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
        fontSize: 'var(--osd-size-body)',
        lineHeight: 1.2,
        color: 'var(--osd-muted)',
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--osd-gap)',
          gridRow: 1,
        }}
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
        gap: 'var(--osd-gap)',
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

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 'calc(var(--osd-size-body) * 0.72)',
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
    }}
  >
    {children}
  </span>
);

const DisplayTitle = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      fontWeight: 600,
      lineHeight: 1.06,
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
    }}
  >
    {children}
  </h1>
);

const PageTitle = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-heading)',
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

const BodyCopy = ({ children }: { children: ReactNode }) => (
  <p
    style={{
      maxWidth: 900,
      margin: 0,
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.56,
      color: 'var(--osd-muted)',
    }}
  >
    {children}
  </p>
);

const BulletList = ({ items }: { items: readonly string[] }) => (
  <ul style={{ display: 'grid', gap: 20, margin: 0, padding: 0, listStyle: 'none' }}>
    {items.map((item) => (
      <li
        key={item}
        style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 18, alignItems: 'start' }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            marginTop: '0.35em',
            borderRadius: 999,
            background: 'var(--osd-accent)',
          }}
        />
        <span
          style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: 'var(--osd-muted)' }}
        >
          {item}
        </span>
      </li>
    ))}
  </ul>
);

const Cover: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    <Eyebrow>{CONTENT.cover.eyebrow}</Eyebrow>
    <DisplayTitle>{CONTENT.cover.title}</DisplayTitle>
    <BodyCopy>{CONTENT.cover.subtitle}</BodyCopy>
  </PageLayout>
);

const Section: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.section.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.section.title}</PageTitle>
      </>
    }
  >
    <BodyCopy>{CONTENT.section.body}</BodyCopy>
  </PageLayout>
);

const BulletPage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.bullets.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.bullets.title}</PageTitle>
      </>
    }
  >
    <BulletList items={CONTENT.bullets.items} />
  </PageLayout>
);

const Closing: Page = () => (
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
        lineHeight: 1.4,
        color: 'var(--osd-accent)',
        fontWeight: 600,
      }}
    >
      {CONTENT.closing.action}
    </p>
  </PageLayout>
);

export const meta: SlideMeta = {
  title: CONTENT.deckTitle,
  createdAt: '2026-07-22T10:00:00.000Z',
};

export default [Cover, Section, BulletPage, Closing] satisfies Page[];
