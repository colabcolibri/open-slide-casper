---
title: Slide authoring and agent instructions
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md, 04_principles.md, 09_design_system.md]
---

# Slide authoring — instruction surfaces

> O framework **não** guarda regras de UI do monorepo em `open-slide/.agents/`. Duas fontes versionadas:

## 1. Slides (conteúdo TSX)

Publicado em **`open-slide/packages/core/skills/`** (copiado para projetos via `@open-slide/cli` → `.agents/skills/` / `.claude/skills/` no **consumer**).

| Skill | Role |
| ----- | ---- |
| `slide-authoring` | Contrato técnico: canvas, file layout, Steps, transitions, morph, assets |
| `create-slide` | Workflow: perguntas, theme, novo `slides/<id>/` |
| `apply-comments` | Markers `@slide-comment` |
| `current-slide` | Resolver “esta página” |
| `create-theme` | Themes em `apps/demo/themes/` |

**Escopo de escrita:** apenas `slides/<id>/` (+ assets). Nunca `packages/core` src.

Demo symlinks: `open-slide/apps/demo/.agents/skills/*` → `packages/core/skills/*`.

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

Raiz do repo: `.agent/`, `docs/`, `.meridian/`. Não misturar com código npm em `open-slide/`.

**Raiz do workspace (Cursor/Claude/Codex):** adapters locais em `.cursor/`, `.claude/`, `.codex/`, `.agents/` e `/AGENTS.md` (gitignored). Regenerar com `./.agent/scripts/sync_cursor_kit.sh` após clone ou mudança em `.agent/`. Não reinstalar skills vendored (shadcn, vercel-*, `skills-lock.json`) na raiz — regras de UI do framework vivem só em `docs/04` e `docs/09`.

## Gate

If slide skill and phase doc disagree, **phase doc wins** for framework; **slide-authoring skill wins** for `slides/` content.
