# Slide kit — como tudo funciona

Este diretório (`packages/core/.agent/`) é o **kit de instruções** publicado no npm em **`@open-slide/core`**. Agentes (Cursor, Claude Code, Codex) e humanos usam o mesmo conteúdo para criar decks em `slides/` e themes em `themes/`.

Regras normativas e prioridades: **[`SLIDE-KIT.md`](./SLIDE-KIT.md)**. Este README é o **mapa legível** do fluxo e dos catálogos.

---

## Onde isso aparece no seu projeto

| Contexto | Caminho |
| --- | --- |
| **Canônico (git)** | `open-slide/packages/core/.agent/` |
| **Depois do sync** | `<seu-projeto>/.agent/` (cópia; não editar como fonte) |
| **Adaptadores IDE** | `.cursor/commands/`, `.agents/skills/`, … → symlinks para `.agent/` |

```bash
# Monorepo → demo
pnpm sync:kit:demo

# Novo workspace local (sem npx) — apps/* com workspace:*
pnpm init:slides [nome-ou-caminho]

# Projeto consumidor (npm publicado)
pnpm exec open-slide sync:kit
```

Framework UI (runtime, web) **não** mora aqui — ver `docs/` na raiz do repositório open-slide.

---

## Camadas (o que invocar)

```txt
Você          →  /create-slide, /apply-comments, /create-theme, /generate-infographic,
                 /list-infographic-layouts, /list-infographic-styles   (workflow)
                    ↓
Agente        →  @slide-author, @theme-author, @infographic-author
                    ↓
Skill         →  create-slide, slide-authoring, apply-comments, …
                    ↓
References    →  contratos, checklists, catálogos (só quando a skill manda ler)
                    ↓
Produto       →  slides/<id>/index.tsx, themes/
```

| Camada | Pasta | YAML no topo? |
| --- | --- | --- |
| Workflow | `workflows/*.md` | Sim — entrada do slash command |
| Agent | `agents/*.md` | Sim — persona e escopo |
| Skill | `skills/*/SKILL.md` | Sim — descoberta na IDE |
| Referência (guia) | ex. `steps.md`, `page-types/*` | Não — prosa e checklists |
| Referência (catálogo) | `pattern-library/layouts|motion/*.md` | Sim — `kit-doc: pattern` |

Detalhe das famílias: **SLIDE-KIT.md** § Reference families.

---

## Criar um deck novo (fluxo mental)

1. **`/create-slide`** — workflow chama skill **`create-slide`** + **`slide-authoring`**.
2. **Scoping** — tema, formato (`slide` 16∶9 ou `4x5`), densidade, motion; **não** escrever TSX antes das respostas.
3. **Estrutura** — lista de páginas; para cada uma escolha um **id** em [`pattern-library/INDEX.md`](./skills/slide-authoring/references/pattern-library/INDEX.md) (e/ou page-types).
4. **Scaffold** — copiar [`deck-template/index.tsx`](./skills/slide-authoring/references/deck-template/index.tsx) → `slides/<id>/index.tsx` (**não** clonar `apps/demo/slides/` nem `packages/core/examples/`).
5. **Camadas no arquivo** — [`deck-layers.md`](./skills/slide-authoring/references/deck-layers.md): `CONTENT` → templates (skeletons do catálogo) → `Page`.
6. **Formato** — [`FORMAT-GUIDANCE.md`](./skills/slide-authoring/references/pattern-library/FORMAT-GUIDANCE.md) + [`canvas-and-layout.md`](./skills/slide-authoring/references/canvas-and-layout.md).
7. **Self-review** — [`self-review-checklist.md`](./skills/slide-authoring/references/self-review-checklist.md).

Comentários no inspector: **`/apply-comments`** + skill **`apply-comments`**.

---

## Pattern library (layouts e motion em TSX)

Catálogo de **skeletons copiáveis** para `index.tsx` — não substitui o `deck-template` inteiro.

| Arquivo | Função |
| --- | --- |
| [`INDEX.md`](./skills/slide-authoring/references/pattern-library/INDEX.md) | Índice humano: id → link para entrada |
| [`SCHEMA.md`](./skills/slide-authoring/references/pattern-library/SCHEMA.md) | Frontmatter `kit-doc: pattern` (campos obrigatórios) |
| [`FORMAT-GUIDANCE.md`](./skills/slide-authoring/references/pattern-library/FORMAT-GUIDANCE.md) | Matriz 16∶9 vs 4∶5 por id |
| [`_entry-template.md`](./skills/slide-authoring/references/pattern-library/_entry-template.md) | Modelo para nova entrada |
| `layouts/*.md`, `motion/*.md` | YAML + “When to use” + bloco TSX |

**Validação (monorepo):**

```bash
cd open-slide   # pasta do monorepo npm (onde está vitest)
pnpm exec vitest run packages/core/src/app/lib/pattern-library-index.test.ts
# ou
node scripts/validate-pattern-kit-docs.mjs
```

Código: `packages/core/src/app/lib/pattern-kit-doc.ts`.

---

## Infographic catalog (image prompts)

Fluxo separado dos slides TSX: **`/generate-infographic`** → agente **`infographic-author`** → skills **`generate-infographic`** + **`infographic-catalog`**.

| Pasta | Função |
| --- | --- |
| [`skills/infographic-catalog/`](./skills/infographic-catalog/SKILL.md) | Catálogo (`references/catalog.json`, layouts, styles, previews) |
| [`skills/generate-infographic/`](./skills/generate-infographic/SKILL.md) | Procedimento de plano + montagem de prompt |
| [`workflows/generate-infographic.md`](./workflows/generate-infographic.md) | Plano + prompt |
| [`workflows/list-infographic-layouts.md`](./workflows/list-infographic-layouts.md) | Lista os 39 layouts (opcional: categoria em `$ARGUMENTS`) |
| [`workflows/list-infographic-styles.md`](./workflows/list-infographic-styles.md) | Lista os 56 estilos visuais (opcional: vibe/format em `$ARGUMENTS`) |

Ver [`infographic-catalog/references/README.md`](./skills/infographic-catalog/references/README.md).

---

## Examples no dev server

Sem `examplesDir` no config, o menu **Examples** usa os decks em `packages/core/examples/` (incluídos no pacote npm). Override com um caminho no projeto ou `examplesDir: false` para desligar. São **read-only** no editor e **não** são scaffold para `/create-slide`. Scaffold = **deck-template** + **pattern library**.

---

## Editar o kit (maintainers)

1. Alterar só **`packages/core/.agent/`** no monorepo.
2. Rodar testes do core (`pnpm test` na raiz `open-slide/`).
3. `pnpm sync:kit:demo` (ou `sync:kit` no consumidor).
4. Commit + PR no fork. **Sem changeset** — publicação npm é só no upstream.

Documentação de arquitetura do monorepo: [`docs/architecture/instruction-surfaces.md`](../../../../docs/architecture/instruction-surfaces.md) (caminho a partir do clone open-slide na raiz Meridian).

---

## Leitura rápida por persona

| Persona | Começar por |
| --- | --- |
| Humano autor | Este README → `create-slide` workflow → INDEX da pattern library |
| Agente em chat | `SLIDE-KIT.md` → workflow do slash → `SKILL.md` listado no workflow |
| Maintainer catálogo | `SCHEMA.md` + testes `pattern-library-index` |
| Maintainer infográfico | `infographic-catalog/references/README.md` + workflow `/generate-infographic` |
