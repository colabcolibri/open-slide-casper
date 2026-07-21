import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#202124', accent: '#1a73e8' },
  fonts: {
    display: "'Inter Tight', 'Inter', -apple-system, system-ui, sans-serif",
    body: "'Inter', -apple-system, system-ui, sans-serif",
  },
  typeScale: { hero: 116, body: 30 },
  radius: 24,
};

const surface = '#f7f9fc';
const muted = '#5f6368';
const hairline = '#e8eaed';
const red = '#ea4335';
const yellow = '#fbbc04';
const green = '#34a853';
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

type Tone = 'blue' | 'red' | 'yellow' | 'green';

const toneColor = (tone: Tone) => {
  if (tone === 'red') return red;
  if (tone === 'yellow') return yellow;
  if (tone === 'green') return green;
  return 'var(--osd-accent)';
};

const Eyebrow = ({ children, tone = 'blue' }: { children: React.ReactNode; tone?: Tone }) => {
  const fillColor = toneColor(tone);
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: '8px 18px',
        borderRadius: 999,
        background: fillColor,
        color: tone === 'yellow' ? '#202124' : '#ffffff',
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </span>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
    }}
  >
    {children}
  </h1>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 56,
      fontWeight: 600,
      lineHeight: 1.14,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--osd-text)',
      textWrap: 'balance',
    }}
  >
    {children}
  </h2>
);

const Footer = () => {
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
        fontSize: 18,
        color: muted,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--osd-accent)',
          }}
        />
        rótulos e nuances
      </span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const PageShell = ({
  children,
  align = 'start',
}: {
  children: React.ReactNode;
  align?: 'start' | 'center';
}) => (
  <div
    style={{
      ...fill,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: 34,
      textAlign: undefined,
    }}
  >
    {children}
    <Footer />
  </div>
);

const Body = ({ children, maxWidth = 820 }: { children: React.ReactNode; maxWidth?: number }) => (
  <p
    style={{
      fontSize: 'var(--osd-size-body)',
      lineHeight: 1.5,
      color: muted,
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

const Card = ({ title, body, tone = 'blue' }: { title: string; body: string; tone?: Tone }) => (
  <div
    style={{
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      background: surface,
      padding: 34,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 154,
    }}
  >
    <div
      style={{
        width: 46,
        height: 8,
        borderRadius: 999,
        background: toneColor(tone),
      }}
    />
    <h3 style={{ fontSize: 30, lineHeight: 1.18, margin: 0, fontWeight: 600 }}>{title}</h3>
    <p style={{ fontSize: 24, lineHeight: 1.38, margin: 0, color: muted }}>{body}</p>
  </div>
);

const BigQuote = ({ children, by }: { children: React.ReactNode; by?: string }) => (
  <div
    style={{
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      background: surface,
      padding: 42,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      maxWidth: 840,
    }}
  >
    <p style={{ fontSize: 44, lineHeight: 1.22, margin: 0, fontWeight: 600, textWrap: 'balance' }}>
      “{children}”
    </p>
    {by ? <p style={{ fontSize: 24, lineHeight: 1.3, margin: 0, color: muted }}>{by}</p> : null}
  </div>
);

const BulletList = ({
  first,
  second,
  third,
  fourth,
}: {
  first: string;
  second: string;
  third: string;
  fourth?: string;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 820 }}>
    <Bullet>{first}</Bullet>
    <Bullet>{second}</Bullet>
    <Bullet>{third}</Bullet>
    {fourth ? <Bullet>{fourth}</Bullet> : null}
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
    <span
      aria-hidden
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'var(--osd-accent)',
        marginTop: 17,
        flex: '0 0 auto',
      }}
    />
    <p style={{ fontSize: 29, lineHeight: 1.42, margin: 0, color: '#303134' }}>{children}</p>
  </div>
);

const TwoCards = ({
  leftTitle,
  leftBody,
  rightTitle,
  rightBody,
  rightTone = 'green',
}: {
  leftTitle: string;
  leftBody: string;
  rightTitle: string;
  rightBody: string;
  rightTone?: Tone;
}) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 840 }}>
    <Card title={leftTitle} body={leftBody} />
    <Card title={rightTitle} body={rightBody} tone={rightTone} />
  </div>
);

const Cover: Page = () => (
  <PageShell align="center">
    <Eyebrow>carrossel para pensar</Eyebrow>
    <Title>O mapa não é o território.</Title>
    <Body maxWidth={780}>
      Rótulos ajudam a organizar o mundo. Mas quando esquecemos que são apenas mapas, deixamos de
      ver pessoas inteiras.
    </Body>
  </PageShell>
);

const Garden: Page = () => (
  <PageShell>
    <Eyebrow tone="green">01 · jardim</Eyebrow>
    <Heading>Imagine um jardim cheio de flores diferentes.</Heading>
    <Body>
      Cada flor tem cor, forma, ritmo e história. Para entender o jardim, criamos nomes. Mas nenhum
      nome captura tudo.
    </Body>
    <TwoCards
      leftTitle="Nomear ajuda"
      leftBody="Sem categorias, tudo vira ruído."
      rightTitle="Reduzir empobrece"
      rightBody="Com categorias rígidas, a vida perde detalhe."
    />
  </PageShell>
);

const LabelMachine: Page = () => (
  <PageShell>
    <Eyebrow>02 · mente</Eyebrow>
    <Heading>Nossa mente cria etiquetas o tempo todo.</Heading>
    <BulletList
      first="Pessoa difícil."
      second="Introvertido."
      third="Sensível demais."
      fourth="Sempre faz assim."
    />
    <Body>
      Às vezes a etiqueta organiza. Às vezes ela substitui a curiosidade que a situação pedia.
    </Body>
  </PageShell>
);

const Map: Page = () => (
  <PageShell align="center">
    <Eyebrow tone="yellow">03 · lembrete</Eyebrow>
    <BigQuote by="Alfred Korzybski">O mapa não é o território.</BigQuote>
    <Body>Palavras, diagnósticos, perfis e teorias são aproximações. Úteis, mas imperfeitas.</Body>
  </PageShell>
);

const Language: Page = () => (
  <PageShell>
    <Eyebrow>04 · linguagem</Eyebrow>
    <Heading>As palavras que temos moldam o que conseguimos perceber.</Heading>
    <Body>
      Uma palavra nova pode abrir uma janela. Uma palavra rígida pode fechar uma conversa inteira.
    </Body>
    <TwoCards
      leftTitle="Quando falta vocabulário"
      leftBody="A experiência parece confusa."
      rightTitle="Quando sobra certeza"
      rightBody="A pessoa vira uma categoria."
      rightTone="red"
    />
  </PageShell>
);

const Drawer: Page = () => (
  <PageShell>
    <Eyebrow tone="green">05 · categorias</Eyebrow>
    <Heading>Categorias são gavetas. Pessoas não são gavetas.</Heading>
    <BulletList
      first="Gavetas servem para organizar."
      second="Elas não devem decidir o que existe."
      third="Tudo que é vivo transborda."
      fourth="Toda classificação tem contexto."
    />
  </PageShell>
);

const Tomato: Page = () => (
  <PageShell>
    <Eyebrow tone="red">06 · exemplo</Eyebrow>
    <Heading>Tomate é fruta ou legume?</Heading>
    <Body>Para a botânica, uma coisa. Para a cozinha, outra. O tomate continua sendo tomate.</Body>
    <TwoCards
      leftTitle="Categoria técnica"
      leftBody="Ajuda em um campo específico."
      rightTitle="Uso cotidiano"
      rightBody="Funciona em outro contexto."
      rightTone="yellow"
    />
  </PageShell>
);

const People: Page = () => (
  <PageShell>
    <Eyebrow>07 · pessoas</Eyebrow>
    <Heading>Com gente, o risco é maior.</Heading>
    <Body>Quando um rótulo cola em alguém, ele começa a filtrar tudo que percebemos depois.</Body>
    <BulletList
      first="A pessoa muda, mas o rótulo fica."
      second="A história some atrás da conclusão."
      third="A escuta vira defesa de uma tese."
    />
  </PageShell>
);

const Nominalism: Page = () => (
  <PageShell>
    <Eyebrow tone="green">08 · ferramenta</Eyebrow>
    <Heading>Use conceitos como instrumentos, não como verdades absolutas.</Heading>
    <Body>
      Essa postura reconhece o valor das categorias sem esquecer que elas são construções humanas.
    </Body>
    <TwoCards
      leftTitle="Sem relativismo vazio"
      leftBody="Alguns mapas são mais úteis que outros."
      rightTitle="Sem rigidez"
      rightBody="Nenhum mapa substitui o encontro."
    />
  </PageShell>
);

const Needs: Page = () => (
  <PageShell>
    <Eyebrow tone="yellow">09 · necessidades</Eyebrow>
    <Heading>Até “necessidade” pode virar rótulo.</Heading>
    <Body>
      Na comunicação, falar de necessidades ajuda muito. O problema começa quando tratamos a palavra
      como uma essência fixa.
    </Body>
    <TwoCards
      leftTitle="Confiança"
      leftBody="Para uma pessoa, abrir a porta."
      rightTitle="Confiança"
      rightBody="Para outra, trancar a porta."
      rightTone="green"
    />
  </PageShell>
);

const Pointing: Page = () => (
  <PageShell align="center">
    <Eyebrow>10 · escuta</Eyebrow>
    <BigQuote>Importa menos o que a pessoa diz, e mais para onde aquilo aponta.</BigQuote>
    <Body>
      A palavra é uma pista. A conversa começa quando buscamos o significado vivo por trás dela.
    </Body>
  </PageShell>
);

const Space: Page = () => (
  <PageShell>
    <Eyebrow tone="green">11 · nuance</Eyebrow>
    <Heading>“Preciso de espaço” não quer dizer sempre a mesma coisa.</Heading>
    <BulletList
      first="Pode ser descanso."
      second="Pode ser segurança."
      third="Pode ser autonomia."
      fourth="Pode ser medo de conflito."
    />
    <Body>O sentido aparece no contexto, não na palavra isolada.</Body>
  </PageShell>
);

const Syllogism: Page = () => (
  <PageShell>
    <Eyebrow tone="red">12 · pressa</Eyebrow>
    <Heading>Conclusões lógicas podem partir de premissas pobres.</Heading>
    <Card
      title="A fórmula parece perfeita"
      body="Toda equipe boa faz reunião diária. Esta equipe faz reunião diária. Logo, esta equipe é boa."
      tone="red"
    />
    <Body>O raciocínio fecha. A realidade, nem sempre.</Body>
  </PageShell>
);

const FamilyLunch: Page = () => (
  <PageShell>
    <Eyebrow>13 · escolhas</Eyebrow>
    <Heading>“Largar estabilidade é inconsequência.” Será?</Heading>
    <Body>
      Talvez haja planejamento, saúde mental, contexto familiar, dinheiro guardado e anos de desejo.
    </Body>
    <TwoCards
      leftTitle="Julgamento rápido"
      leftBody="Transforma medo pessoal em regra geral."
      rightTitle="Pergunta melhor"
      rightBody="O que eu ainda não sei sobre essa decisão?"
      rightTone="green"
    />
  </PageShell>
);

const PracticeOne: Page = () => (
  <PageShell>
    <Eyebrow tone="green">14 · prática</Eyebrow>
    <Heading>Troque sentença por curiosidade.</Heading>
    <BulletList
      first="O que essa palavra significa para você?"
      second="Em que contexto isso aparece?"
      third="O que seria cuidado nessa situação?"
      fourth="Tem algo que eu estou presumindo?"
    />
  </PageShell>
);

const PracticeTwo: Page = () => (
  <PageShell>
    <Eyebrow>15 · sugestão</Eyebrow>
    <Heading>Compartilhe experiência sem impor regra.</Heading>
    <Card
      title="Uma frase possível"
      body="Eu tenho uma forma diferente de olhar para isso. Topa escutar, ou você prefere ficar com o caminho atual?"
      tone="blue"
    />
    <Body>Assim, sua experiência vira oferta. Não vira medida universal.</Body>
  </PageShell>
);

const ActiveListening: Page = () => (
  <PageShell>
    <Eyebrow tone="green">16 · escuta ativa</Eyebrow>
    <Heading>Antes de responder, tente entender o mundo da outra pessoa.</Heading>
    <BulletList
      first="O que ela está tentando proteger?"
      second="O que ela valoriza aqui?"
      third="Que medo ou desejo está por baixo?"
      fourth="O que mudaria se eu acreditasse nela por um minuto?"
    />
  </PageShell>
);

const Flexibility: Page = () => (
  <PageShell>
    <Eyebrow tone="yellow">17 · flexibilidade</Eyebrow>
    <Heading>Regras gerais são guias. Não são algemas.</Heading>
    <Body>
      Uma boa regra precisa continuar conversando com a situação concreta que está diante de você.
    </Body>
    <TwoCards
      leftTitle="Estrutura"
      leftBody="Ajuda a não se perder."
      rightTitle="Ajuste fino"
      rightBody="Ajuda a não atropelar."
      rightTone="green"
    />
  </PageShell>
);

const Invitation: Page = () => (
  <PageShell>
    <Eyebrow>18 · convite</Eyebrow>
    <Heading>Da próxima vez que um rótulo surgir, faça uma pausa.</Heading>
    <BulletList
      first="Ele está ajudando a entender?"
      second="Ou está encerrando a conversa?"
      third="O que ainda pode estar invisível?"
      fourth="Que pergunta abriria mais espaço?"
    />
  </PageShell>
);

const CallToAction: Page = () => (
  <PageShell align="center">
    <Eyebrow tone="green">19 · call to action</Eyebrow>
    <Title>Menos rótulo. Mais escuta.</Title>
    <Body maxWidth={820}>
      Salve este post para lembrar. Compartilhe com alguém que gosta de pensar comunicação com mais
      nuance.
    </Body>
  </PageShell>
);

export const meta: SlideMeta = {
  title: 'Rótulos e Nuances',
  createdAt: '2026-07-21T20:20:16.060Z',
  theme: 'bright-sans',
  format: '4x5',
};

export default [
  Cover,
  Garden,
  LabelMachine,
  Map,
  Language,
  Drawer,
  Tomato,
  People,
  Nominalism,
  Needs,
  Pointing,
  Space,
  Syllogism,
  FamilyLunch,
  PracticeOne,
  PracticeTwo,
  ActiveListening,
  Flexibility,
  Invitation,
  CallToAction,
] satisfies Page[];
