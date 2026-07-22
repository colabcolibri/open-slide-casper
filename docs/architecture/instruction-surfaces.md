---
title: Slide authoring and agent instructions
status: approved
version: 1.1
updated: 2026-07-21
depends_on: [00_scope.md, 04_principles.md, 09_design_system.md]
---

# Slide authoring — instruction surfaces

> O framework **não** guarda regras de UI do monorepo em `open-slide/.agents/`. Duas fontes versionadas:

## Slide kit layers

Camadas do kit publicado em **`@open-slide/core`**. Protocolo: **`packages/core/.agent/SLIDE-KIT.md`**.

| Layer | Canonical path | Mirror (demo / consumer) | Sync |
| --- | --- | --- | --- |
| Portable kit | `open-slide/packages/core/.agent/` | (source tree) | Publicado no npm (`files`: `.agent/`) |
| Protocol | `…/core/.agent/SLIDE-KIT.md` | (read in package tree) | Same as portable kit |
| Agents | `…/core/.agent/agents/*.md` | `.cursor/agents/`, `.claude/agents/` | `sync:kit` · `sync-slide-kit-adapters.sh` |
| Workflows | `…/core/.agent/workflows/*.md` | `.cursor/commands/`, `.claude/commands/`, `.agents/skills/workflow-*/SKILL.md` | `open-slide sync:kit` · `scripts/sync-slide-kit-adapters.sh` |
| Skills | `…/core/.agent/skills/*/SKILL.md` | `.agents/skills/*`, `.claude/skills/*` | `sync:kit` / `sync:skills` + `sync-template-skills.mjs` |
| References | `.agent/skills/slide-authoring/references/**` | Via skill tree above | Same as skills; **pattern-library** entries use `kit-doc: pattern` (`SCHEMA.md`) |
| Routing | `.agent/skills/slide-routing/SKILL.md` | Via skill symlink | Same as skills |

**Edit rule:** altere só **`packages/core/.agent/`** para instruções de slide no kit npm.

## Adapter sync (explode, like `.agent/IDE_ADAPTERS.md`)

| Adapter | Path in slide workspace | Canonical source |
| --- | --- | --- |
| **Cursor agent** | `.cursor/agents/<name>.md` | `packages/core/.agent/agents/<name>.md` |
| **Claude agent** | `.claude/agents/<name>.md` | same |
| **Cursor slash** | `.cursor/commands/<workflow>.md` | `packages/core/.agent/workflows/<workflow>.md` |
| **Claude Code slash** | `.claude/commands/<workflow>.md` | same |
| **Codex / agents skills** | `.agents/skills/workflow-<name>/SKILL.md` | same workflow file |
| **Skills** | `.agents/skills/<name>/` | `packages/core/.agent/skills/<name>/` |

Monorepo dogfood: from `open-slide/` run `./scripts/sync-slide-kit-adapters.sh [apps/demo]`.  
Consumer project: `pnpm exec open-slide sync:kit` (skills, workflow commands, agents).  
Adapters under `.cursor/`, `.claude/`, `.agents/` are **gitignored** in `open-slide/.gitignore` — regenerate with sync commands above.

## 1. Slides (conteúdo TSX)

Publicado em **`open-slide/packages/core/.agent/`** (`SLIDE-KIT.md`, `agents/`, `workflows/`, `skills/`).

| Artifact | Role |
| ----- | ---- |
| `.agent/workflows/create-slide.md` | Entrada: novo deck → skill `create-slide` |
| `.agent/workflows/apply-comments.md` | Entrada: markers `@slide-comment` |
| `.agent/workflows/create-theme.md` | Entrada: bundle em `themes/` |
| `slide-routing` | Intenção → workflow ou skill; escopo de escrita |
| `slide-authoring` | Contrato técnico: canvas, file layout, page types, Steps, transitions, morph, assets |
| `create-slide` | Procedimento: perguntas, theme, novo `slides/<id>/` |
| `apply-comments` | Processar markers do inspector |
| `current-slide` | Resolver “esta página” |
| `create-theme` | Themes em `themes/` |

**Escopo de escrita:** apenas `slides/<id>/` (+ assets) e `themes/` quando `create-theme`. Nunca `packages/core` src.

**Authoring contract (dev):** `GET /__design` retorna `authoringContract` (`full` | `legacy`) e `authoringReasons`; painéis Design/Inspect bloqueiam escrita fora de `full` — ver `slide-authoring/references/authoring-contract.md`.

Demo: run `./scripts/sync-slide-kit-adapters.sh` — adapters symlink to `packages/core/.agent/`.

## 2. Framework UI (runtime + web)

Regras consolidadas nos phase docs na **raiz**:

| Topic | Doc |
| ----- | --- |
| shadcn, composition, motion, landing | `docs/09_design_system.md` |
| React performance, layering | `docs/04_principles.md` |
| Motion PR checklist | `docs/10_test_strategy.md` |
| SEO / landing strategy | `docs/12_marketing_seo.md` |
| Monorepo workflow | `open-slide/AGENTS.md` |

## 3. Maintainers (repo raiz)

Governança do produto open-slide e tooling interno do git repo ficam fora do slide kit npm (`docs/` na raiz, `.agent/` na raiz quando existir). **Autores de deck** usam só **`packages/core/.agent/`** + **`SLIDE-KIT.md`**.

**Raiz do workspace slide (Cursor/Claude/Codex):** adapters locais em `.cursor/`, `.claude/`, `.codex/`, `.agents/` (gitignored). Regenerar com **`open-slide sync:kit`** ou **`./scripts/sync-slide-kit-adapters.sh`**. Regras de UI do framework runtime/web: **`docs/04`** e **`docs/09`** — não duplicar no kit slide.

## Gate

If slide skill and phase doc disagree, **phase doc wins** for framework; **slide-authoring skill wins** for `slides/` content.
