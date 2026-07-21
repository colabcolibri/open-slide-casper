---
title: User types
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md, 02_security.md]
blocks: [05_architecture.md]
---

# 03 — User types

## Overview

open-slide não implementa login. “Usuários” são **papéis comportamentais** em máquinas ou sites distintos. Permissões são implícitas (dono do filesystem / visitante read-only).

## Profiles

### UT-01 — Slide author (primary)

| Field | Value |
| ----- | ----- |
| Context | Cria decks em repo scaffolded ou monorepo demo |
| Goals | Iterar layout/conteúdo com agente, preview rápido, export |
| Tools | IDE, Claude/Cursor skills, dev server, inspector |
| Permissions | Read/write em `slides/`, `assets/`, `.folders.json` via dev APIs |
| Pain points | Canvas rules, comment loop, asset hygiene |

### UT-02 — Presenter

| Field | Value |
| ----- | ----- |
| Context | Apresenta deck já buildado ou via dev present route |
| Goals | Navegação confiável, notas, timer, laser pointer |
| Tools | Browser fullscreen, keyboard shortcuts |
| Permissions | Read-only no conteúdo; no file mutation |
| Pain points | Latência de transição, legibilidade em projetor |

### UT-03 — Framework contributor

| Field | Value |
| ----- | ----- |
| Context | Contribui em `open-slide/packages/*`, CI, docs |
| Goals | Releases seguros, regressões cobertas por testes |
| Tools | pnpm, Turbo, Changesets, Playwright |
| Permissions | Git write, npm publish (maintainers) |
| Pain points | Bundle size, breaking API changes |

### UT-04 — Docs / marketing visitor

| Field | Value |
| ----- | ----- |
| Context | Chega via open-slide.dev ou GitHub |
| Goals | Instalar CLI, ler guias de skills |
| Tools | Browser |
| Permissions | Read-only |
| Pain points | Discoverability, SEO |

### UT-05 — Coding agent (automation)

| Field | Value |
| ----- | ----- |
| Context | Invocado via skills na raiz do harness ou dentro de `open-slide/` |
| Goals | Slides: TSX no canvas; framework: UI/perf alinhados a `docs/04` e `docs/09` |
| Tools | `open-slide/packages/core/.agent/skills/*` (slides); `docs/04`, `docs/09` (framework UI); harness `.agent/*` (Meridian) |
| Constraints | Ver `docs/architecture/instruction-surfaces.md` |

## Permission matrix (logical)

| Action | Author | Presenter | Contributor | Visitor | Agent |
| ------ | ------ | --------- | ----------- | ------- | ----- |
| Edit slide TSX | yes | no | in monorepo | no | yes* |
| POST `/__edit` | yes (local) | no | yes (local) | no | via tools |
| Publish npm | no | no | maintainers | no | no |
| Approve Meridian docs | human | — | human | — | no |

\*Slides: `packages/core/.agent/skills/`. Framework UI: phase docs `04` + `09`. Meridian: harness `.agent/` na raiz do repo.

## Gate

Align with `02_security` before `approved`. Human confirms personas match GTM.
