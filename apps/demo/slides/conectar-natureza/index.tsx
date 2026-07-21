import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#0E0E0E', text: '#FFF9F0', accent: '#F0ABFC' },
  fonts: {
    display: "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', system-ui, sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', system-ui, sans-serif",
  },
  typeScale: { hero: 116, body: 26 },
  radius: 28,
};

const surface = 'rgba(255, 249, 240, 0.07)';
const surfaceHi = 'rgba(240, 171, 252, 0.13)';
const border = 'rgba(255, 249, 240, 0.16)';
const muted = '#C9BFB2';
const accentSoft = 'rgba(240, 171, 252, 0.18)';
const green = '#9AE6B4';
const butter = '#FDE68A';
const padding = '100px 120px';

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
  padding,
} as const;

type CardTone = 'violet' | 'green';

type CopyCard = {
  title: string;
  body: string;
  tone?: CardTone;
};

const WHY_CARDS: CopyCard[] = [
  {
    title: 'Presença',
    body: 'Ambientes naturais desaceleram a atenção e reduzem a sensação de urgência contínua.',
  },
  {
    title: 'Regulação',
    body: 'Luz, ar, água e movimento ajudam o sistema nervoso a encontrar um ritmo mais estável.',
    tone: 'green',
  },
];

const MIND_CARDS: CopyCard[] = [
  {
    title: 'Menos fragmentação',
    body: 'O olhar percorre formas orgânicas sem exigir resposta imediata.',
  },
  {
    title: 'Mais perspectiva',
    body: 'O contato com ciclos naturais coloca problemas humanos em outra escala.',
    tone: 'green',
  },
];

const PRACTICE_CARDS: CopyCard[] = [
  {
    title: '10 minutos ao ar livre',
    body: 'Sem tela, sem meta. Apenas notar luz, sons e temperatura.',
    tone: 'green',
  },
  {
    title: 'Um trajeto mais verde',
    body: 'Trocar eficiência máxima por uma rota com árvores quando possível.',
  },
  {
    title: 'Cuidar de algo vivo',
    body: 'Planta, horta, jardim ou vaso: presença repetida cria vínculo.',
  },
  {
    title: 'Rituais de estação',
    body: 'Perceber chuva, calor, vento e mudança como parte da agenda.',
    tone: 'green',
  },
];

const BODY_TAGS = ['respiração', 'sono', 'movimento'] as const;

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const Glow = ({ x = '78%', y = '30%' }: { x?: string; y?: string }) => (
  <div
    style={{
      position: 'absolute',
      width: 520,
      height: 520,
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, rgba(240,171,252,0.28), rgba(154,230,180,0.1) 38%, rgba(240,171,252,0) 70%)',
      filter: 'blur(40px)',
      opacity: 0.76,
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 18px',
      borderRadius: 999,
      border: `1px solid ${border}`,
      background: surface,
      fontFamily: "'SF Mono', 'JetBrains Mono', 'Menlo', monospace",
      fontSize: 18,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: muted,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset',
    }}
  >
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: 'var(--osd-accent)',
        boxShadow: '0 0 12px var(--osd-accent)',
      }}
    />
    {children}
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      fontWeight: 720,
      lineHeight: 1.05,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
      textShadow: '0 0 34px rgba(240,171,252,0.16)',
    }}
  >
    {children}
  </h1>
);

const Footer = ({ path = '/natureza' }: { path?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: "'SF Mono', 'JetBrains Mono', 'Menlo', monospace",
        fontSize: 22,
        letterSpacing: '0.04em',
        color: muted,
      }}
    >
      <span>{path}</span>
      <span>
        {String(current).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.4 }}>/ {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Card = ({
  title,
  body,
  tone = 'violet',
}: {
  title: string;
  body: string;
  tone?: CardTone;
}) => (
  <div
    style={{
      border: `1px solid ${border}`,
      background: surface,
      borderRadius: 'var(--osd-radius)',
      padding: 38,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset',
    }}
  >
    <div
      style={{
        width: 42,
        height: 10,
        borderRadius: 999,
        background:
          tone === 'green' ? green : `linear-gradient(90deg, var(--osd-accent), ${butter})`,
        marginBottom: 24,
        boxShadow: tone === 'green' ? `0 0 16px ${green}` : '0 0 16px var(--osd-accent)',
      }}
    />
    <h3 style={{ margin: 0, fontSize: 34, fontWeight: 680, lineHeight: 1.2 }}>{title}</h3>
    <p style={{ margin: '18px 0 0', color: muted, fontSize: 25, lineHeight: 1.45 }}>{body}</p>
  </div>
);

const CardGrid = ({ items, columns = 2 }: { items: CopyCard[]; columns?: 1 | 2 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr',
      gap: columns === 2 ? 28 : 22,
    }}
  >
    {items.map((item) => (
      <Card key={item.title} title={item.title} body={item.body} tone={item.tone} />
    ))}
  </div>
);

const Cover: Page = () => (
  <section
    style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}
  >
    <Glow x="82%" y="28%" />
    <Eyebrow>bem-estar · cuidado vivo</Eyebrow>
    <Title>A natureza não é cenário. É o lugar onde a vida volta a pulsar.</Title>
    <p style={{ margin: 0, color: muted, fontSize: 28, lineHeight: 1.5, maxWidth: 780 }}>
      Quando a gente se aproxima do verde, o corpo lembra: respirar também é pertencer.
    </p>
    <Footer path="/inicio" />
  </section>
);

const WhyItMatters: Page = () => (
  <section style={{ ...fill }}>
    <Glow x="85%" y="16%" />
    <Eyebrow>por que importa</Eyebrow>
    <h2
      style={{ margin: '42px 0 0', fontSize: 58, fontWeight: 600, lineHeight: 1.12, maxWidth: 780 }}
    >
      O corpo reconhece o mundo vivo antes da mente explicar.
    </h2>
    <div style={{ marginTop: 64 }}>
      <CardGrid items={WHY_CARDS} />
    </div>
    <Footer path="/por-que" />
  </section>
);

const Body: Page = () => (
  <section style={{ ...fill }}>
    <Glow x="18%" y="28%" />
    <Eyebrow>corpo</Eyebrow>
    <h2
      style={{ margin: '42px 0 0', fontSize: 58, fontWeight: 600, lineHeight: 1.12, maxWidth: 760 }}
    >
      Natureza é infraestrutura para energia humana.
    </h2>
    <div
      style={{
        marginTop: 70,
        border: `1px solid ${border}`,
        background: surface,
        borderRadius: 'var(--osd-radius)',
        padding: 44,
      }}
    >
      <p style={{ margin: 0, color: muted, fontSize: 27, lineHeight: 1.55 }}>
        Caminhar sob árvores, tocar a terra, sentir vento e perceber o sol criam sinais simples: o
        dia tem corpo, temperatura, distância e pausa.
      </p>
    </div>
    <div
      style={{
        display: 'flex',
        gap: 18,
        marginTop: 34,
        fontFamily: "'SF Mono', monospace",
        fontSize: 21,
        color: muted,
      }}
    >
      {BODY_TAGS.map((tag, i) => (
        <span
          key={tag}
          style={{
            padding: '12px 16px',
            border: `1px solid ${border}`,
            borderRadius: 999,
            background: i === 0 ? accentSoft : surfaceHi,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
    <Footer path="/corpo" />
  </section>
);

const Mind: Page = () => (
  <section style={{ ...fill }}>
    <Glow x="78%" y="54%" />
    <Eyebrow>mente</Eyebrow>
    <h2
      style={{ margin: '42px 0 0', fontSize: 58, fontWeight: 600, lineHeight: 1.12, maxWidth: 790 }}
    >
      A atenção se recompõe quando encontra menos ruído.
    </h2>
    <div style={{ marginTop: 58 }}>
      <CardGrid items={MIND_CARDS} columns={1} />
    </div>
    <Footer path="/mente" />
  </section>
);

const Practices: Page = () => (
  <section style={{ ...fill }}>
    <Glow x="85%" y="20%" />
    <Eyebrow>práticas simples</Eyebrow>
    <h2 style={{ margin: '42px 0 0', fontSize: 58, fontWeight: 600, lineHeight: 1.12 }}>
      Conexão começa pequeno.
    </h2>
    <div style={{ marginTop: 62 }}>
      <CardGrid items={PRACTICE_CARDS} />
    </div>
    <Footer path="/praticas" />
  </section>
);

const Closing: Page = () => (
  <section
    style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}
  >
    <Glow x="50%" y="36%" />
    <Eyebrow>convite</Eyebrow>
    <Title>Quem cuida da natureza também aprende a cuidar de si.</Title>
    <p style={{ margin: 0, color: muted, fontSize: 28, lineHeight: 1.5, maxWidth: 760 }}>
      Um passo para fora pode ser pequeno. O que ele desperta por dentro, não.
    </p>
    <Footer path="/fechamento" />
  </section>
);

export const meta: SlideMeta = {
  title: 'A importância de conectar-se com a natureza',
  createdAt: '2026-07-21T20:02:45.318Z',
  theme: 'aurora',
  format: '4x5',
};

export default [Cover, WhyItMatters, Body, Mind, Practices, Closing] satisfies Page[];
