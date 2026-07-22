import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&family=Inter:wght@400;500;600&display=swap';
const FONT_LINK_ID = 'osd-webfont-principios-da-escuta-consciente';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

export const design: DesignSystem = {
  palette: { bg: '#F4F7F4', text: '#1A2E1A', accent: '#4A6741' },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
  typeScale: { hero: 104, body: 31 },
  radius: 18,
};

export const meta: SlideMeta = {
  title: 'Princípios da escuta consciente',
  createdAt: '2026-07-22T00:21:00.655Z',
  theme: 'sage-paper',
  format: '4x5',
};

const muted = '#5C6B5C';
const line = '#D4DDD4';
const paper = '#FBFDFB';
const pale = '#E8EFE8';
const moss = '#314D2B';
const olive = '#718067';
const PAGE_GAP = 30;
const FOOTER_LABEL = '12 princípios da escuta consciente';

type PageBodyAlign = 'start' | 'center' | 'end';
type RelationTone = 'self' | 'other' | 'world';

const relationColors: Record<RelationTone, { accent: string; soft: string; label: string }> = {
  self: { accent: '#4A6741', soft: '#E4ECE2', label: 'Eu comigo' },
  other: { accent: '#6D6B3F', soft: '#ECEAD8', label: 'Eu com o outro' },
  world: { accent: '#3E6A68', soft: '#DDEDEC', label: 'Eu com o meio' },
};

const pageFrameStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  rowGap: PAGE_GAP,
  padding: '86px 82px 62px',
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
    <BotanicalMarks />
    {head ? (
      <header
        data-slide-region="head"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          position: 'relative',
          zIndex: 1,
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

const BotanicalMarks = () => (
  <>
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: -120,
        top: 96,
        width: 280,
        height: 620,
        border: `1px solid ${pale}`,
        borderRadius: '52% 48% 45% 55%',
        transform: 'rotate(18deg)',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: -92,
        bottom: 156,
        width: 210,
        height: 430,
        border: `1px solid ${pale}`,
        borderRadius: '48% 52% 55% 45%',
        transform: 'rotate(-14deg)',
      }}
    />
  </>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
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
      fontSize: 68,
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

const BodyCopy = ({ children, maxWidth = 850 }: { children: ReactNode; maxWidth?: number }) => (
  <p
    style={{
      maxWidth,
      margin: 0,
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.56,
      color: muted,
    }}
  >
    {children}
  </p>
);

const PrincipleCard = ({
  number,
  title,
  tone,
  children,
}: {
  number: string;
  title: string;
  tone: RelationTone;
  children: ReactNode;
}) => {
  const colors = relationColors[tone];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        gap: 28,
        minHeight: 0,
        padding: '44px 42px',
        background: paper,
        border: `1px solid ${line}`,
        borderRadius: 'var(--osd-radius)',
        boxShadow: '0 28px 70px rgba(26, 46, 26, 0.07)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: 999,
            background: colors.soft,
            color: colors.accent,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {number}
        </span>
        <span style={{ fontSize: 20, fontWeight: 600, color: colors.accent }}>{colors.label}</span>
      </div>
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 55,
          lineHeight: 1.08,
          fontWeight: 600,
          color: moss,
          textWrap: 'balance',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>{children}</div>
    </div>
  );
};

const LensGrid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 22 }}>
    <RelationPanel title="Eu comigo" tone="self" items={['perceber', 'refletir', 'regular', 'escolher']} />
    <RelationPanel title="Eu com o outro" tone="other" items={['compreender', 'expressar', 'integrar', 'cultivar']} />
    <RelationPanel title="Eu com o meio" tone="world" items={['contextualizar', 'influenciar', 'construir', 'acolher']} />
  </div>
);

const RelationPanel = ({ title, tone, items }: { title: string; tone: RelationTone; items: string[] }) => {
  const colors = relationColors[tone];
  return (
    <div
      style={{
        padding: '30px 34px',
        borderRadius: 'var(--osd-radius)',
        background: colors.soft,
        border: `1px solid ${line}`,
      }}
    >
      <h3
        style={{
          margin: '0 0 18px',
          color: colors.accent,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 42,
          lineHeight: 1.1,
          fontWeight: 600,
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              padding: '10px 14px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.55)',
              color: colors.accent,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const PullQuote = ({ children }: { children: ReactNode }) => (
  <p
    style={{
      margin: 0,
      paddingLeft: 28,
      borderLeft: `4px solid ${olive}`,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 44,
      lineHeight: 1.22,
      color: moss,
      textWrap: 'balance',
    }}
  >
    {children}
  </p>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 18, margin: 0, padding: 0, listStyle: 'none' }}>
    {items.map((item) => (
      <li key={item} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 18, alignItems: 'start' }}>
        <span
          style={{
            width: 10,
            height: 10,
            marginTop: 18,
            borderRadius: 999,
            background: 'var(--osd-accent)',
          }}
        />
        <span style={{ fontSize: 29, lineHeight: 1.45, color: muted }}>{item}</span>
      </li>
    ))}
  </ul>
);

const Cover: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Eyebrow>manifesto prático</Eyebrow>
      <Title>12 princípios da escuta consciente</Title>
      <BodyCopy maxWidth={790}>
        Um mapa pessoal para sustentar a abertura ao outro, reconhecer divergências e escolher limites com
        lucidez.
      </BodyCopy>
    </div>
  </PageLayout>
);

const Origin: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>ponto de partida</Eyebrow>
        <PageTitle>Escutar também é uma escolha de presença.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <PullQuote>
      A escuta se fortalece quando existe consciência interna, respeito pela diferença e clareza sobre os
      próprios limites.
    </PullQuote>
  </PageLayout>
);

const Map: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>três relações</Eyebrow>
        <PageTitle>O caminho se organiza em três camadas.</PageTitle>
      </>
    }
  >
    <LensGrid />
  </PageLayout>
);

const SelfIntro: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>relação eu comigo</Eyebrow>
        <PageTitle>Antes do diálogo, existe um campo interno.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <BodyCopy maxWidth={840}>
      Esta camada fortalece a capacidade de perceber emoções, aprender com experiências, atravessar mudanças
      e decidir a partir de valores.
    </BodyCopy>
  </PageLayout>
);

const SelfKnowledge: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="01" title="Autoconhecimento" tone="self">
      <BodyCopy>
        Mergulhar em si mesmo para compreender emoções, pensamentos e padrões que aparecem na comunicação.
      </BodyCopy>
      <BulletList
        items={[
          'Nomear o que acontece por dentro antes de reagir.',
          'Transformar a escuta em uma interação mais autêntica.',
          'Reconhecer que o mundo interior molda cada conversa.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Reflection: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="02" title="Reflexão e crescimento pessoal" tone="self">
      <BodyCopy>
        Encarar cada dia como fonte de aprendizado, extraindo lições das experiências e das relações.
      </BodyCopy>
      <BulletList
        items={[
          'Revisar atitudes sem transformar erro em identidade.',
          'Aprofundar a compreensão de si e dos outros.',
          'Escolher crescimento contínuo como prática relacional.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Resilience: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="03" title="Resiliência e adaptação" tone="self">
      <BodyCopy>
        Enfrentar mudanças e desafios com equilíbrio, preservando serenidade mesmo diante do inesperado.
      </BodyCopy>
      <BulletList
        items={[
          'Sustentar clareza quando a situação muda.',
          'Cultivar força interior sem endurecer a escuta.',
          'Adaptar a comunicação ao que a vida apresenta.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const ConsciousChoice: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="04" title="Escolha consciente" tone="self">
      <BodyCopy>
        Tomar decisões informadas, alinhadas aos próprios valores e atentas ao impacto de cada gesto.
      </BodyCopy>
      <BulletList
        items={[
          'Refletir antes de agir, especialmente sob tensão.',
          'Reconhecer influência, consequência e responsabilidade.',
          'Escolher quando permanecer e quando se retirar.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const OtherIntro: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>relação eu com o outro</Eyebrow>
        <PageTitle>A divergência pode existir sem romper a humanidade.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <BodyCopy maxWidth={840}>
      Esta camada trabalha sensibilidade, assertividade, diversidade e compromisso com vínculos que se
      aprofundam ao longo do tempo.
    </BodyCopy>
  </PageLayout>
);

const Empathy: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="05" title="Empatia estratégica" tone="other">
      <BodyCopy>
        Compreender emoções e contextos alheios para melhorar a comunicação e agir com inteligência emocional.
      </BodyCopy>
      <BulletList
        items={[
          'Escutar além da frase dita.',
          'Considerar contexto antes de interpretar intenção.',
          'Usar compreensão para fortalecer laços, não para manipular.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Communication: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="06" title="Comunicação consciente e assertiva" tone="other">
      <BodyCopy>
        Falar e ouvir com intenção, clareza e responsabilidade, transformando diálogos em crescimento.
      </BodyCopy>
      <BulletList
        items={[
          'Expressar pensamentos e sentimentos de forma direta.',
          'Ouvir sem abandonar a própria posição.',
          'Criar relações mais autênticas por meio da clareza.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Diversity: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="07" title="Unidade na diversidade" tone="other">
      <BodyCopy>
        Celebrar diferenças e integrar perspectivas distintas como fonte de ampliação do entendimento.
      </BodyCopy>
      <BulletList
        items={[
          'Valorizar o que é diferente sem apagar conflitos reais.',
          'Expandir horizontes por contato com outras visões.',
          'Buscar unidade sem exigir uniformidade.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const LongTerm: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="08" title="Relacionamentos de longo prazo" tone="other">
      <BodyCopy>
        Investir em laços duradouros, olhando além do imediato e cultivando respeito mútuo.
      </BodyCopy>
      <BulletList
        items={[
          'Construir continuidade em vez de vencer conversas isoladas.',
          'Aprofundar confiança por consistência.',
          'Cuidar do vínculo sem ignorar limites importantes.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const WorldIntro: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>relação eu com o meio</Eyebrow>
        <PageTitle>Nenhuma conversa acontece fora de um sistema.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <BodyCopy maxWidth={840}>
      Esta camada amplia a escuta para contexto, poder, impacto social e dores do mundo que atravessam nossas
      interações.
    </BodyCopy>
  </PageLayout>
);

const Context: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="09" title="Consciência do contexto" tone="world">
      <BodyCopy>
        Perceber dinâmicas sociais, culturais e globais para interagir de modo mais informado e adaptável.
      </BodyCopy>
      <BulletList
        items={[
          'Observar o que move conversas públicas e privadas.',
          'Situar a fala dentro de seu tempo e ambiente.',
          'Ajustar a escuta às mudanças sociais e culturais.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const SystemInfluence: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="10" title="Influência no sistema" tone="world">
      <BodyCopy>
        Entender o próprio papel em dinâmicas de poder, privilégio e responsabilidade coletiva.
      </BodyCopy>
      <BulletList
        items={[
          'Reconhecer como posições influenciam os outros.',
          'Agir com consciência nas estruturas sociais existentes.',
          'Transformar privilégio percebido em responsabilidade prática.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Change: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="11" title="Construção de mudanças significativas" tone="world">
      <BodyCopy>
        Participar ativamente de impactos positivos e duradouros, no círculo imediato e no mundo ampliado.
      </BodyCopy>
      <BulletList
        items={[
          'Entender que contribuições pequenas também acumulam futuro.',
          'Escolher ações coerentes com o mundo que se deseja construir.',
          'Converter consciência em presença ativa.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Pain: Page = () => (
  <PageLayout footerLabel={FOOTER_LABEL} bodyAlign="center">
    <PrincipleCard number="12" title="Reconhecimento das dores do mundo" tone="world">
      <BodyCopy>
        Abrir-se para acolher complexidades globais com empatia, coragem e ação compassiva.
      </BodyCopy>
      <BulletList
        items={[
          'Encarar adversidades sem anestesiar a sensibilidade.',
          'Permitir que a consciência mova atitudes concretas.',
          'Integrar compaixão interna e responsabilidade externa.',
        ]}
      />
    </PrincipleCard>
  </PageLayout>
);

const Closing: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>critério final</Eyebrow>
        <PageTitle>Escutar não é se abandonar.</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <PullQuote>
      A prática madura combina abertura, discernimento e limite: permanecer quando há caminho; sair quando o
      custo fere o essencial.
    </PullQuote>
  </PageLayout>
);

const CallToAction: Page = () => (
  <PageLayout
    footerLabel={FOOTER_LABEL}
    head={
      <>
        <Eyebrow>convite</Eyebrow>
        <PageTitle>Qual princípio mais conversa com o seu momento?</PageTitle>
      </>
    }
    bodyAlign="center"
  >
    <div
      style={{
        display: 'grid',
        gap: 30,
        padding: '44px 42px',
        background: paper,
        border: `1px solid ${line}`,
        borderRadius: 'var(--osd-radius)',
        boxShadow: '0 28px 70px rgba(26, 46, 26, 0.07)',
      }}
    >
      <BodyCopy maxWidth={790}>
        Comente o número ou o nome do princípio que você quer praticar mais nas próximas conversas.
      </BodyCopy>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 9 }}>
        {[
          '01 Autoconhecimento',
          '02 Reflexão e crescimento pessoal',
          '03 Resiliência e adaptação',
          '04 Escolha consciente',
          '05 Empatia estratégica',
          '06 Comunicação consciente e assertiva',
          '07 Unidade na diversidade',
          '08 Relacionamentos de longo prazo',
          '09 Consciência do contexto',
          '10 Influência no sistema',
          '11 Construção de mudanças significativas',
          '12 Reconhecimento das dores do mundo',
        ].map((item) => (
          <span
            key={item}
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              background: '#E8EFE8',
              color: moss,
              fontSize: 17,
              fontWeight: 600,
              lineHeight: 1.18,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default [
  Cover,
  Origin,
  Map,
  SelfIntro,
  SelfKnowledge,
  Reflection,
  Resilience,
  ConsciousChoice,
  OtherIntro,
  Empathy,
  Communication,
  Diversity,
  LongTerm,
  WorldIntro,
  Context,
  SystemInfluence,
  Change,
  Pain,
  Closing,
  CallToAction,
] satisfies Page[];
