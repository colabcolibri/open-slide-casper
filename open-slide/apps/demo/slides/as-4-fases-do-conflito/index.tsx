import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#fbf7f0', text: '#231f1a', accent: '#a6533f' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 122, body: 38 },
  radius: 18,
};

export const meta: SlideMeta = {
  title: 'As 4 fases do conflito',
  createdAt: '2026-07-21T23:19:56.475Z',
  format: '4x5',
};

const muted = '#6f665b';
const soft = '#efe6d8';
const ink = '#231f1a';
const cream = '#fffaf2';
const phaseOne = '#54717a';
const phaseTwo = '#b84b3a';
const phaseThree = '#5f7d5f';
const phaseFour = '#9b6a35';
const hairline = '#d8cabb';
const PAGE_GAP = 30;

type PageBodyAlign = 'start' | 'center' | 'end';
type PhaseTone = 'one' | 'two' | 'three' | 'four';

const toneColor = (tone: PhaseTone) => {
  if (tone === 'one') return phaseOne;
  if (tone === 'two') return phaseTwo;
  if (tone === 'three') return phaseThree;
  return phaseFour;
};

const pageFrameStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  rowGap: PAGE_GAP,
  padding: '86px 74px 70px',
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
        fontSize: 22,
        color: muted,
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
    <BackgroundMarks />
    {head ? (
      <header
        data-slide-region="head"
        style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
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
        position: 'relative',
        zIndex: 1,
      }}
    >
      {children}
    </div>
    <footer data-slide-region="footer" style={{ position: 'relative', zIndex: 1 }}>
      <DeckFooter label={footerLabel} />
    </footer>
  </div>
);

const BackgroundMarks = () => (
  <>
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: 480,
        height: 480,
        borderRadius: '50%',
        border: `1px solid ${soft}`,
        right: -160,
        top: 90,
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: '50%',
        border: `1px solid ${soft}`,
        left: -120,
        bottom: 180,
      }}
    />
  </>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      alignSelf: 'flex-start',
      color: 'var(--osd-accent)',
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </span>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      lineHeight: 0.98,
      fontWeight: 700,
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
      fontSize: 72,
      lineHeight: 1.06,
      fontWeight: 700,
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
    }}
  >
    {children}
  </h2>
);

const BodyCopy = ({ children, maxWidth = 850 }: { children: ReactNode; maxWidth?: number }) => (
  <p
    style={{
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.38,
      color: muted,
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

const QuoteCard = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: cream,
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: 42,
      boxShadow: '0 24px 60px rgba(80, 60, 30, 0.08)',
    }}
  >
    <p
      style={{
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 50,
        lineHeight: 1.18,
        color: ink,
        textWrap: 'balance',
      }}
    >
      {children}
    </p>
  </div>
);

const PhaseBadge = ({ tone, label }: { tone: PhaseTone; label: string }) => (
  <div
    style={{
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: toneColor(tone),
      color: '#fffaf2',
      display: 'grid',
      placeItems: 'center',
      fontSize: 40,
      fontWeight: 800,
      flex: '0 0 auto',
    }}
  >
    {label}
  </div>
);

const PhaseCard = ({
  tone,
  number,
  title,
  body,
}: {
  tone: PhaseTone;
  number: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
      background: cream,
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: 30,
      minHeight: 178,
    }}
  >
    <PhaseBadge tone={tone} label={number} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h3 style={{ margin: 0, fontSize: 38, lineHeight: 1.1, color: toneColor(tone) }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 28, lineHeight: 1.32, color: muted }}>{body}</p>
    </div>
  </div>
);

const Signal = ({ children, tone }: { children: ReactNode; tone: PhaseTone }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      fontSize: 31,
      lineHeight: 1.24,
      color: ink,
    }}
  >
    <span
      aria-hidden
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: toneColor(tone),
        flex: '0 0 auto',
      }}
    />
    <span>{children}</span>
  </div>
);

const RoleChip = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: cream,
      border: `1px solid ${hairline}`,
      borderRadius: 16,
      padding: '24px 22px',
      color: phaseTwo,
      fontSize: 30,
      fontWeight: 800,
    }}
  >
    {children}
  </div>
);

const CycleStep = ({ tone, label, title }: { tone: PhaseTone; label: string; title: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '24px 28px',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${hairline}`,
      background: cream,
    }}
  >
    <PhaseBadge tone={tone} label={label} />
    <strong style={{ fontSize: 34, lineHeight: 1.12, color: ink }}>{title}</strong>
  </div>
);

const Cover: Page = () => (
  <PageLayout footerLabel="as 4 fases do conflito" bodyAlign="center">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <Eyebrow>conflito como leitura</Eyebrow>
      <Title>As 4 fases do conflito</Title>
      <BodyCopy>
        Uma chave simples, mas não simplista, para perceber o que acontece quando o incômodo
        aparece.
      </BodyCopy>
    </div>
  </PageLayout>
);

const Definition: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>antes das fases</Eyebrow>
        <PageTitle>Conflito começa antes da briga.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <QuoteCard>
      Toda situação onde, para pelo menos uma das partes, surge tensão e desconforto.
    </QuoteCard>
    <BodyCopy>
      Às vezes chamamos isso só de incômodo. Ainda assim, algo já está pedindo atenção.
    </BodyCopy>
  </PageLayout>
);

const Overview: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>o mapa</Eyebrow>
        <PageTitle>Quatro movimentos que se repetem.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PhaseCard
        tone="one"
        number="1"
        title="Deixa pra lá"
        body="O incômodo existe, mas ainda não é nomeado."
      />
      <PhaseCard
        tone="two"
        number="2"
        title="O conflito"
        body="O elefante entra na sala e os papéis aparecem."
      />
      <PhaseCard
        tone="three"
        number="3"
        title="Empatia"
        body="A escuta começa apesar da discordância."
      />
      <PhaseCard
        tone="four"
        number="4"
        title="Resolução momentânea"
        body="Novos combinados permitem seguir tecendo."
      />
    </div>
  </PageLayout>
);

const PhaseOnePage: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 1</Eyebrow>
        <PageTitle>Deixa pra lá.</PageTitle>
      </>
    }
  >
    <BodyCopy>Existe desconforto, mas ele parece pequeno demais para virar conversa.</BodyCopy>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Signal tone="one">"Não vale me estressar por tão pouco."</Signal>
      <Signal tone="one">"Eu me incomodei, mas vou lidar comigo mesmo."</Signal>
      <Signal tone="one">O corpo já dá sinais, mesmo quando a boca silencia.</Signal>
    </div>
  </PageLayout>
);

const PhaseTwoPage: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 2</Eyebrow>
        <PageTitle>O conflito é nomeado.</PageTitle>
      </>
    }
  >
    <BodyCopy>Quando a tensão captura a atenção, começamos a performar papéis.</BodyCopy>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
      }}
    >
      <RoleChip>Pacificador</RoleChip>
      <RoleChip>Incendiário</RoleChip>
      <RoleChip>Conciliador</RoleChip>
      <RoleChip>Acusador</RoleChip>
      <RoleChip>Defensor</RoleChip>
      <RoleChip>Fugitivo</RoleChip>
    </div>
  </PageLayout>
);

const PhaseThreePage: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 3</Eyebrow>
        <PageTitle>Escutar apesar de.</PageTitle>
      </>
    }
  >
    <BodyCopy>Empatia não faz o conflito desaparecer. Ela muda a posição de onde olhamos.</BodyCopy>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Signal tone="three">Para onde o outro aponta?</Signal>
      <Signal tone="three">E se houvesse 1% de verdade na fala do outro?</Signal>
      <Signal tone="three">Escutar não significa concordar.</Signal>
    </div>
  </PageLayout>
);

const PhaseFourPage: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 4</Eyebrow>
        <PageTitle>Resolução momentânea.</PageTitle>
      </>
    }
  >
    <QuoteCard>Desatar um nó não elimina todos os próximos nós.</QuoteCard>
    <BodyCopy>
      A relação segue porque novos combinados surgem. Até que outro incômodo peça passagem.
    </BodyCopy>
  </PageLayout>
);

const Cycle: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>o ciclo</Eyebrow>
        <PageTitle>Não é uma escada. É um movimento vivo.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <CycleStep tone="one" label="1" title="Incômodo aparece ou fica escondido" />
      <CycleStep tone="two" label="2" title="Tensão é nomeada e escala" />
      <CycleStep tone="three" label="3" title="Escuta abre outra perspectiva" />
      <CycleStep tone="four" label="4" title="Combinados permitem continuar" />
    </div>
  </PageLayout>
);

const Practice: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>na prática</Eyebrow>
        <PageTitle>Uma equipe organizando um evento.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Signal tone="one">Opiniões são guardadas para evitar atrito.</Signal>
      <Signal tone="two">Divergências viram atraso, custo e tensão.</Signal>
      <Signal tone="three">Alguém sustenta a conversa e pergunta pelo 1% de verdade.</Signal>
      <Signal tone="four">O grupo cria canais e combinados melhores.</Signal>
    </div>
  </PageLayout>
);

const Close: Page = () => (
  <PageLayout footerLabel="as 4 fases do conflito" bodyAlign="center">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Eyebrow>para levar</Eyebrow>
      <PageTitle>Nomear o padrão devolve escolha.</PageTitle>
      <BodyCopy>
        O conflito talvez não acabe. Mas, quando entendemos a fase em que estamos, podemos navegar
        com mais consciência.
      </BodyCopy>
    </div>
  </PageLayout>
);

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

export default [
  Cover,
  Definition,
  Overview,
  PhaseOnePage,
  PhaseTwoPage,
  PhaseThreePage,
  PhaseFourPage,
  Cycle,
  Practice,
  Close,
] satisfies Page[];
