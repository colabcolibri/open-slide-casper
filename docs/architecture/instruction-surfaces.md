---
title: Slide authoring and agent instructions
status: approved
version: 1.1
updated: 2026-07-21
depends_on: [00_scope.md, 04_principles.md, 09_design_system.md]
---

# Slide authoring — instruction surfaces

> O framework **não** guarda regras de UI do monorepo em `open-slide/.agents/`. Duas fontes versionadas:

## Kit layers (Meridian-style, slide-only)

Lógica de camadas espelhada do harness Meridian — **sem** copiar skills de delivery (`create-us`, SQLite, etc.).

| Layer | Canonical path | Mirror (demo / consumer) | Sync |
| --- | --- | --- | --- |
| Portable kit | `open-slide/packages/core/.agent/` | (source tree) | Publicado no npm `@open-slide/core` (`files`: `.agent/`) |
| Workflows | `…/core/.agent/workflows/*.md` | `.cursor/commands/`, `.claude/commands/`, `.agents/skills/workflow-*/SKILL.md` | `open-slide sync:kit` · `scripts/sync-slide-kit-adapters.sh` |
| Skills | `…/core/.agent/skills/*/SKILL.md` | `.agents/skills/*`, `.claude/skills/*` | `sync:kit` / `sync:skills` + `sync-template-skills.mjs` |
| References | `.agent/skills/slide-authoring/references/**` | Via skill tree above | Same as skills |
| Routing | `.agent/skills/slide-routing/SKILL.md` | Via skill symlink | Same as skills |

**Dois `.agent/` no monorepo:** raiz **`/.agent/`** = Meridian delivery (harness); **`packages/core/.agent/`** = slide portable kit (npm). Nunca misturar conteúdo.

**Edit rule:** altere só **`packages/core/.agent/`** para instruções de slide.

## Adapter sync (explode, like `.agent/IDE_ADAPTERS.md`)

| Adapter | Path in slide workspace | Canonical source |
| --- | --- | --- |
| **Cursor slash** | `.cursor/commands/<workflow>.md` | `packages/core/.agent/workflows/<workflow>.md` |
| **Claude Code slash** | `.claude/commands/<workflow>.md` | same |
| **Codex / agents skills** | `.agents/skills/workflow-<name>/SKILL.md` | same workflow file |
| **Skills** | `.agents/skills/<name>/` | `packages/core/.agent/skills/<name>/` |

Monorepo dogfood: from `open-slide/` run `./scripts/sync-slide-kit-adapters.sh [apps/demo]`.  
Consumer project: `pnpm exec open-slide sync:kit` (includes skills + workflow adapters).  
Adapters under `.cursor/`, `.claude/`, `.agents/` are **gitignored** in `open-slide/.gitignore` — same policy as Meridian harness adapters.

## 1. Slides (conteúdo TSX)

Publicado em **`open-slide/packages/core/.agent/`** (`workflows/` + `skills/`).

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
| Delivery / US | Meridian `docs/*`, `.agent/` |

## 3. Meridian harness

Raiz do repo: **`/.agent/`**, `docs/`, `.meridian/` (Meridian harness). Slide kit: **`open-slide/packages/core/.agent/`** (npm). Não misturar.

**Raiz do workspace (Cursor/Claude/Codex):** adapters locais em `.cursor/`, `.claude/`, `.codex/`, `.agents/` e `/AGENTS.md` (gitignored). Regenerar com `./.agent/scripts/sync_cursor_kit.sh` após clone ou mudança em `.agent/`. Não reinstalar skills vendored (shadcn, vercel-*, `skills-lock.json`) na raiz — regras de UI do framework vivem só em `docs/04` e `docs/09`.

## Gate

If slide skill and phase doc disagree, **phase doc wins** for framework; **slide-authoring skill wins** for `slides/` content.
