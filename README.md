# open-slide-casper

Harness para **conteúdo social em código**: da ideia e da estrutura de copy a carrosséis, infográficos e export (HTML, PDF, PPTX) — com **humano no loop** e **processo antes de ferramenta**, em cima do framework [open-slide](https://open-slide.dev).

**Repositório:** [github.com/colabcolibri/open-slide-casper](https://github.com/colabcolibri/open-slide-casper)

## Por que este projeto existe

Antes do boom de IA, dava para rodar posts em um pipeline simples: calendário → roteiro → artefatos → publicação. O **Casper** nasceu para transformar isso em carrosséis e PDFs para Instagram e LinkedIn. O **open-slide** trouxe runtime agent-native (TSX, preview, inspector, export). Este repo é o cruzamento: **estágios de produção** + **motor de slides** + **skills para agentes** (Cursor, Claude Code, Codex, etc.).

Não é mais um editor WYSIWYG nem um SaaS de hospedagem. A fonte da verdade continua sendo **React/TSX** no canvas; o que evolui aqui é o **fluxo de produção** e o fork do framework quando precisamos de formatos e tooling para redes.

## O que tem neste repositório

| Parte | Caminho | Papel |
| ----- | ------- | ----- |
| **Framework open-slide** | [`open-slide/`](open-slide/README.md) | Monorepo `@open-slide/core` + `@open-slide/cli` — dev server, viewer, present mode, export, slide kit em `packages/core/.agent/` |
| **Documentação de produto** | [`docs/`](docs/README.md) | Escopo, arquitetura, design system, decisões (phase docs do produto) |
| **Workspace de decks (local)** | `open-slide/apps/demo/` | Dogfood e decks de produção **na sua máquina** — não versionamos pastas de conteúdo (`slides/`, assets de marca, etc.) neste remoto |

A pasta `.agent/` na raiz é kit **Meridian** (governança interna de docs e backlog). Ela apoia o time que mantém o produto; **não é o que você instala para publicar no Instagram**. Quem consome o projeto começa pelo monorepo `open-slide/`.

## Pré-requisitos

- **Node.js 22**
- **pnpm 10.17+** (`corepack enable`)

## Quick start

Instale e rode o demo **só dentro do monorepo**:

```bash
git clone https://github.com/colabcolibri/open-slide-casper.git
cd open-slide-casper/open-slide
pnpm install
pnpm dev:demo
```

Na raiz do repo há atalhos (`pnpm dev`, `pnpm build`, …) que delegam para `open-slide/`.

### Criar um workspace novo (fora deste clone)

```bash
npx @open-slide/cli init meu-carrossel
cd meu-carrossel
pnpm install
pnpm dev
```

Skills de autoría (`/create-slide`, `/create-theme`, …) vêm do pacote core; no monorepo, sincronize o kit no app de slides:

```bash
cd open-slide
pnpm sync:kit:demo
```

(Execute a partir de `open-slide/`; o alvo padrão é `apps/demo`.)

## Agentes e skills

| O quê | Onde |
| ----- | ---- |
| Slide kit canônico | `open-slide/packages/core/.agent/` (`SLIDE-KIT.md`, skills, workflows) |
| Cópia no workspace de slides | `apps/demo/.agent/` após `sync:kit:demo` — gerada, não editar como fonte |

Comandos úteis no monorepo: `pnpm check`, `pnpm test`, `pnpm build`. Mudanças publicáveis em `packages/core` ou `packages/cli` exigem **changeset** (ver [open-slide/CONTRIBUTING.md](open-slide/CONTRIBUTING.md)).

## Documentação

- [docs/00_scope.md](docs/00_scope.md) — visão e limites do framework
- [docs/05_architecture.md](docs/05_architecture.md) — mapa do sistema
- [docs/architecture/instruction-surfaces.md](docs/architecture/instruction-surfaces.md) — onde ficam regras para humanos vs agentes
- [docs/architecture/desktop-tauri-rig.md](docs/architecture/desktop-tauri-rig.md) — rascunho: app desktop Tauri + agente embutido (planejado)
- Framework upstream e releases npm: [open-slide/README.md](open-slide/README.md), site [open-slide.dev](https://open-slide.dev)

## Upstream

Mudanças em `open-slide/packages/core` e `open-slide/packages/cli` buscam permanecer **merge-friendly** com [1weiho/open-slide](https://github.com/1weiho/open-slide). Código derivado do projeto base segue **MIT**.

## Licença

MIT — ver licenças nos pacotes em `open-slide/packages/`.
