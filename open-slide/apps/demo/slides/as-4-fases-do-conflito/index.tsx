import colibriLogo from '@assets/Colibri - Logotipo RGB-01.svg';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import desconfortoSilencioso from './assets/desconforto-silencioso.png';
import elefanteNaSala from './assets/elefante-na-sala.png';
import equipeEvento from './assets/equipe-evento.png';
import noveloRelacoes from './assets/novelo-relacoes.png';
import pressaoAcumulada from './assets/pressao-acumulada.png';

export const design: DesignSystem = {
  palette: { bg: '#fbf7f0', text: '#231f1a', accent: '#a6533f' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 118, body: 36 },
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
const PAGE_GAP = 28;

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
  padding: '78px 70px 64px',
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
        fontSize: 21,
        color: muted,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
        <img
          src={colibriLogo}
          alt="Colibri"
          style={{ width: 118, height: 'auto', display: 'block', objectFit: 'contain' }}
        />
        <span style={{ color: muted }}>{label}</span>
      </span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const PageLayout = ({
  head,
  bodyAlign = 'center',
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
        style={{ display: 'flex', flexDirection: 'column', gap: 20, gridRow: 1 }}
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
        gridRow: 2,
      }}
    >
      {children}
    </div>
    <footer data-slide-region="footer" style={{ position: 'relative', zIndex: 1, gridRow: 3 }}>
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
        width: 450,
        height: 450,
        borderRadius: '50%',
        border: `1px solid ${soft}`,
        right: -170,
        top: 80,
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: 300,
        height: 300,
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
      fontSize: 30,
      fontWeight: 800,
      letterSpacing: '0.06em',
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
      fontSize: 68,
      lineHeight: 1.05,
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
      lineHeight: 1.36,
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
      padding: 38,
      boxShadow: '0 24px 60px rgba(80, 60, 30, 0.08)',
    }}
  >
    <p
      style={{
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 48,
        lineHeight: 1.16,
        color: ink,
        textWrap: 'balance',
      }}
    >
      {children}
    </p>
  </div>
);

const ImageSlot = ({ alt, src }: { alt: string; src: string }) => (
  <div
    style={{
      background: cream,
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: 16,
      boxShadow: '0 20px 50px rgba(80, 60, 30, 0.07)',
      height: 500,
      overflow: 'hidden',
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
        borderRadius: 12,
      }}
    />
  </div>
);

const PhaseBadge = ({ tone, label }: { tone: PhaseTone; label: string }) => (
  <div
    style={{
      width: 90,
      height: 90,
      borderRadius: '50%',
      background: toneColor(tone),
      color: '#fffaf2',
      display: 'grid',
      placeItems: 'center',
      fontSize: 38,
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
      gap: 22,
      alignItems: 'flex-start',
      background: cream,
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: 26,
      minHeight: 166,
    }}
  >
    <PhaseBadge tone={tone} label={number} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h3 style={{ margin: 0, fontSize: 36, lineHeight: 1.08, color: toneColor(tone) }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 27, lineHeight: 1.28, color: muted }}>{body}</p>
    </div>
  </div>
);

const Signal = ({ children, tone }: { children: ReactNode; tone: PhaseTone }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
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
        marginTop: 10,
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
      padding: '22px 20px',
      color: phaseTwo,
      fontSize: 29,
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
      gap: 18,
      padding: '22px 26px',
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${hairline}`,
      background: cream,
    }}
  >
    <PhaseBadge tone={tone} label={label} />
    <strong style={{ fontSize: 32, lineHeight: 1.1, color: ink }}>{title}</strong>
  </div>
);

const Cover: Page = () => (
  <PageLayout footerLabel="as 4 fases do conflito" bodyAlign="center">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Eyebrow>conflito como leitura</Eyebrow>
      <Title>As 4 fases do conflito</Title>
      <BodyCopy>
        Uma chave simples, mas não simplista, para perceber o que acontece quando o incômodo
        aparece.
      </BodyCopy>
    </div>
  </PageLayout>
);

const SimpleNotSimplist: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>um aviso</Eyebrow>
        <PageTitle>É simples. Não é simplista.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <BodyCopy>
      Depois que o óbvio é nomeado, ele parece fácil. Antes disso, pode ser um ponto cego.
    </BodyCopy>
    <QuoteCard>O mapa não resolve o conflito por você. Ele amplia a consciência.</QuoteCard>
  </PageLayout>
);

const Definition: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>definição</Eyebrow>
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

const Pressure: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>o acúmulo</Eyebrow>
        <PageTitle>Uma gota d'água raramente vem sozinha.</PageTitle>
      </>
    }
  >
    <ImageSlot
      src={pressaoAcumulada}
      alt="Panela com vapor e água transbordando, simbolizando incômodos acumulados."
    />
    <BodyCopy>
      Um incômodo leve pode passar. Um conjunto de incômodos pode virar tempestade.
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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

const PhaseOneIntro: Page = () => (
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <Signal tone="one">"Não vale me estressar por tão pouco."</Signal>
      <Signal tone="one">"Eu me incomodei, mas vou lidar comigo mesmo."</Signal>
      <Signal tone="one">A relação segue, mas algo ficou sem nome.</Signal>
    </div>
  </PageLayout>
);

const PhaseOneBody: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 1</Eyebrow>
        <PageTitle>Mesmo calado, o corpo fala.</PageTitle>
      </>
    }
  >
    <BodyCopy>
      O conflito pode já existir sem ter sido comunicado. O sinal aparece no tom, no olhar, no
      afastamento, na tensão.
    </BodyCopy>
    <ImageSlot
      src={desconfortoSilencioso}
      alt="Pessoa desconfortável e silenciosa durante uma conversa em grupo."
    />
  </PageLayout>
);

const PhaseTwoIntro: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 2</Eyebrow>
        <PageTitle>O elefante é nomeado.</PageTitle>
      </>
    }
  >
    <ImageSlot
      src={elefanteNaSala}
      alt="Elefante em uma sala de conversa, simbolizando o conflito que não pode mais ser ignorado."
    />
    <BodyCopy>Quando a tensão captura a atenção, entramos formalmente no conflito.</BodyCopy>
  </PageLayout>
);

const PhaseTwoRoles: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 2</Eyebrow>
        <PageTitle>Os papéis aparecem rápido.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <RoleChip>Pacificador</RoleChip>
      <RoleChip>Incendiário</RoleChip>
      <RoleChip>Conciliador</RoleChip>
      <RoleChip>Acusador</RoleChip>
      <RoleChip>Defensor</RoleChip>
      <RoleChip>Fugitivo</RoleChip>
    </div>
    <BodyCopy>Não são identidades fixas. São posições que alternamos em segundos.</BodyCopy>
  </PageLayout>
);

const PhaseTwoRisk: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 2</Eyebrow>
        <PageTitle>Quanto mais tempo aqui, maior o risco de escalada.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <Signal tone="two">Acusação puxa defesa.</Signal>
      <Signal tone="two">Defesa pode virar contra-ataque.</Signal>
      <Signal tone="two">A conversa perde complexidade e vira disputa.</Signal>
    </div>
  </PageLayout>
);

const PhaseThreeIntro: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 3</Eyebrow>
        <PageTitle>Empatia é escutar apesar de.</PageTitle>
      </>
    }
  >
    <BodyCopy>
      O conflito não precisa desaparecer para que a escuta comece. Discordar ainda permite tentar
      compreender.
    </BodyCopy>
    <QuoteCard>Escutar não significa concordar.</QuoteCard>
  </PageLayout>
);

const PhaseThreePointing: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>exercício 1</Eyebrow>
        <PageTitle>Para onde o outro aponta?</PageTitle>
      </>
    }
  >
    <BodyCopy>
      Saia, por um instante, do lugar de alvo. Vá para o lado da pessoa e olhe para o mesmo ponto.
    </BodyCopy>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Signal tone="three">Que valor foi ferido?</Signal>
      <Signal tone="three">Que expectativa não foi cuidada?</Signal>
      <Signal tone="three">Que pedido ainda não foi traduzido?</Signal>
    </div>
  </PageLayout>
);

const PhaseThreeOnePercent: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>exercício 2</Eyebrow>
        <PageTitle>E se houver 1% de verdade?</PageTitle>
      </>
    }
  >
    <QuoteCard>O 1% abre uma fresta de curiosidade.</QuoteCard>
    <BodyCopy>
      Não é abrir mão da sua percepção. É suspender a certeza por tempo suficiente para escutar.
    </BodyCopy>
  </PageLayout>
);

const PhaseFourIntro: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>fase 4</Eyebrow>
        <PageTitle>Resolução momentânea.</PageTitle>
      </>
    }
  >
    <BodyCopy>
      A resolução acontece quando o conflito passa por empatia mútua e chega a novos combinados.
    </BodyCopy>
    <QuoteCard>É momentânea porque a vida continua produzindo novos nós.</QuoteCard>
  </PageLayout>
);

const Crochet: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>metáfora</Eyebrow>
        <PageTitle>Relacionar-se é seguir tecendo.</PageTitle>
      </>
    }
  >
    <ImageSlot
      src={noveloRelacoes}
      alt="Novelo e crochê com fios embaraçados, simbolizando relações e nós a desatar."
    />
    <BodyCopy>Desatar um nó permite continuar. Não garante que outro nó não apareça.</BodyCopy>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CycleStep tone="one" label="1" title="Incômodo aparece ou fica escondido" />
      <CycleStep tone="two" label="2" title="Tensão é nomeada e escala" />
      <CycleStep tone="three" label="3" title="Escuta abre outra perspectiva" />
      <CycleStep tone="four" label="4" title="Combinados permitem continuar" />
    </div>
  </PageLayout>
);

const PracticeSetup: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>na prática</Eyebrow>
        <PageTitle>Uma equipe organizando um evento.</PageTitle>
      </>
    }
  >
    <ImageSlot
      src={equipeEvento}
      alt="Equipe em reunião de planejamento de evento, em conversa focada."
    />
    <BodyCopy>Divergências sobre tema, logística e palestrantes começam pequenas.</BodyCopy>
  </PageLayout>
);

const PracticeFlow: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>na prática</Eyebrow>
        <PageTitle>O mesmo ciclo em quatro passos.</PageTitle>
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Signal tone="one">Opiniões são guardadas para evitar atrito.</Signal>
      <Signal tone="two">Divergências viram atraso, custo e tensão.</Signal>
      <Signal tone="three">Alguém pergunta pelo 1% de verdade.</Signal>
      <Signal tone="four">O grupo cria canais e combinados melhores.</Signal>
    </div>
  </PageLayout>
);

const Return: Page = () => (
  <PageLayout
    footerLabel="as 4 fases do conflito"
    head={
      <>
        <Eyebrow>retorno</Eyebrow>
        <PageTitle>Depois da resolução, o ciclo pode recomeçar.</PageTitle>
      </>
    }
  >
    <BodyCopy>
      A paz eterna não é o ponto. O ponto é reconhecer mais cedo quando um novo incômodo pede
      conversa.
    </BodyCopy>
    <QuoteCard>Família. Amigos. Trabalho. Sociedade. Os ciclos rodam em paralelo.</QuoteCard>
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
  SimpleNotSimplist,
  Definition,
  Pressure,
  Overview,
  PhaseOneIntro,
  PhaseOneBody,
  PhaseTwoIntro,
  PhaseTwoRoles,
  PhaseTwoRisk,
  PhaseThreeIntro,
  PhaseThreePointing,
  PhaseThreeOnePercent,
  PhaseFourIntro,
  Crochet,
  Cycle,
  PracticeSetup,
  PracticeFlow,
  Return,
  Close,
] satisfies Page[];
