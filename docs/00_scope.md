---
title: Scope
status: draft
version: 1.0
updated: 2026-07-21
depends_on: []
blocks: [01_tech_stack.md, 04_principles.md, 05_architecture.md]
---

# 00 — Scope

## Name and description

**Product name:** open-slide

open-slide é um **framework open source** (npm `@open-slide/core`, `@open-slide/cli`) para criar e apresentar decks como componentes React em um canvas fixo (1920×1080 por padrão). O runtime inclui dev server Vite, viewer, modo apresentação, inspector com comentários no código-fonte, organização de decks, assets, export estático/PDF/PPTX e skills para coding agents. O monorepo npm fica em `open-slide/`; governança e regras de programação do framework ficam em **`docs/`** na raiz (`04_principles`, `09_design_system`, …). Slides: skills em `open-slide/packages/core/skills/`. Ver `docs/architecture/instruction-surfaces.md`.

## Problem it solves

**Before:** Autores de apresentações técnicas dependem de ferramentas WYSIWYG ou de repos ad hoc sem runtime de palco, sem loop agente→código→preview, e com export frágil para web estática.

**After:** Um comando (`npx @open-slide/cli init`) gera um workspace onde o agente escreve slides em TSX; o dev server oferece preview, comentários no inspector, present mode profissional e export deployável. O framework publicado concentra complexidade de canvas, routing e tooling.

**Why now:** Coding agents tornaram viável “descrever o deck em linguagem natural”; open-slide já shipa runtime, CLI e documentação pública — falta governança Meridian para evolução estruturada pós-adoption do harness.

## Who it is for

| Audience | Role / context | Technical level | Primary need |
| -------- | -------------- | --------------- | ------------ |
| Primary — slide author | Dev ou power-user que usa Cursor/Claude/Codex | Alto | Iterar conteúdo visual via código + agent skills |
| Secondary — presenter | Apresenta decks já buildados | Médio | Modo palco, notas, timer, navegação confiável |
| Secondary — framework contributor | Mantém `@open-slide/core` / CLI | Alto | Monorepo claro, testes, releases npm |
| Tertiary — site visitor | Lê docs em open-slide.dev | Baixo a médio | Entender produto e instalar |

Perfis detalhados em `03_user_types.md`.

## In initial scope (v1 forward — evolução governada)

Capacidades **já existentes** que permanecem in-scope para manutenção e extensão:

1. Autor scaffolda workspace e roda `pnpm dev` com hot reload de slides TSX.
2. Autor comenta elementos no inspector; agente aplica edits via markers `@slide-comment`.
3. Autor organiza decks em pastas, reordena slides, duplica páginas/slides via UI ou API dev.
4. Autor gerencia assets e busca logos (SVGL) no painel integrado.
5. Autor exporta deck para HTML estático, PDF ou PPTX e publica em host estático.
6. Apresentador usa present mode + presenter view com notas e preview next slide.
7. Mantenedor publica versões `@open-slide/core` e `@open-slide/cli` via Changesets.
8. Site `apps/web` documenta produto e skills.

## Out of initial scope

- Contas de usuário, sync na nuvem ou colaboração multi-autor em tempo real.
- Editor WYSIWYG drag-and-drop substituindo código React como fonte da verdade.
- Hospedagem gerenciada de decks (SaaS) operada pelo time open-slide.
- SSO enterprise, RBAC multi-tenant ou billing integrado.
- Suporte mobile nativo (apps iOS/Android) — apenas web responsiva onde aplicável (site/viewer).

## Known constraints

| Type | Constraint | Impact |
| ---- | ---------- | ------ |
| Team | OSS mantido por comunidade pequena (core maintainer + contributors) | Priorização via Meridian backlog |
| Timeline | Releases npm desacoplados de docs Meridian | Changesets obrigatórios em `packages/core` e `packages/cli` |
| Legal | MIT license | Sem restrições copyleft no runtime |
| Technology | React 18 + Vite 5 no core publicado; pnpm 10 + Turbo | Upgrade major exige changeset e e2e |
| Repo | Harness Meridian na raiz (`docs/`, `.meridian/`); código em `open-slide/` | Validar com `validate_meridian.py .` |

## Assumptions

| # | Assumption | Confidence | Validate by |
| - | ---------- | ---------- | ----------- |
| 1 | Usuários finais aceitam TSX como source of truth | high | Feedback issues/discussions |
| 2 | Dev server `__*` APIs nunca são expostas em produção estática | high | Revisão `08_environments` + build output |
| 3 | Não há PII processado pelo framework em runtime default | medium | Confirmar analytics em `apps/web` |
| 4 | Baseline npm atual ≈ v1.17 core / v1.4 cli | high | `open-slide/packages/*/package.json` |

## Open questions

| # | Question | Owner | Target date |
| - | -------- | ----- | ----------- |
| 1 | Criar version `v0` Meridian listando epics já shipped? | manager | TBD |
| 2 | Escopo de conformidade LGPD/GDPR só para site vs framework | manager | TBD |

## Current product state (Mode B)

**Summary:** O framework está **publicado e funcional**: CLI scaffold, runtime completo, inspector, folders, assets, exports, present mode, testes Vitest/Playwright, CI GitHub Actions, site docs. Inventário detalhado em `docs/inventory/as-is.md`.

| Capability | Evidence (path / route) | Confidence |
| ---------- | ----------------------- | ---------- |
| CLI init | `packages/cli/src`, template em `packages/cli/template` | high |
| Dev + API plugin | `packages/core/src/vite/api-plugin.ts` | high |
| Present mode | `packages/core/src/app/routes/presenter.tsx` | high |
| Marketing site | `apps/web/app` | high |
| Meridian init | `docs/` na raiz do harness (este conjunto) | high |

## Gate

Human sets `status: approved` before deepening stack/security and before US creation (requires `05_architecture` approved).
