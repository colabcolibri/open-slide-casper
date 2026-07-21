---
title: Tech stack
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md]
blocks: [02_security.md, 04_principles.md, 08_environments.md, 09_design_system.md, 10_test_strategy.md]
---

# 01 — Tech stack

## Summary

open-slide é um monorepo **TypeScript** com **pnpm workspaces** e **Turbo** para orquestrar build/dev/test. O artefato principal publicado é `@open-slide/core` (runtime React + plugin Vite + CLI bin `open-slide`) e `@open-slide/cli` (scaffolder). O site marketing usa **Next.js** com **Fumadocs**. Não há banco de dados de aplicação — persistência de decks é filesystem; delivery Meridian usa **SQLite** local.

## Runtime and language

| Layer | Technology | Version (if pinned) | Rationale |
| ----- | ---------- | ------------------- | --------- |
| Primary language | TypeScript | 5.9.x | Tipagem no core publicado |
| Runtime | Node.js | ≥18 (CI: 22) | CLI, Vite, build |
| Package manager | pnpm | 10.17.0 (`packageManager`) | Workspaces monorepo |
| Monorepo orchestration | Turbo | ^2.10 | Cache de tasks dev/build/typecheck |

## Application surfaces

| Surface | Framework / host | Path in repo | Notes |
| ------- | ---------------- | ------------ | ----- |
| Slide runtime + dev UI | React 18 + Vite 5 + React Router 7 | `open-slide/packages/core/src/app` | Empacotado no npm package |
| Vite plugins + dev APIs | Vite plugin API | `open-slide/packages/core/src/vite` | `apply: 'serve'` para APIs |
| CLI (consumer projects) | Commander | `open-slide/packages/core/src/cli`, `packages/cli` | Dois bins: core vs init |
| Marketing + docs site | Next.js + Fumadocs MDX | `open-slide/apps/web` | Private workspace package |
| Demo decks | Consumer of workspace `@open-slide/core` | `open-slide/apps/demo` | Dogfood, não publicado |
| Meridian harness | Python 3 scripts | `../../.agent/scripts` | Fora do pacote npm |

## Data layer

| Concern | Choice | Config / path | Notes |
| ------- | ------ | ------------- | ----- |
| Primary database | none (app) | — | Decks = arquivos TSX/JSON |
| Deck metadata | JSON manifest | `slides/.folders.json` | Pastas e assignments |
| Comments / notes | Embedded in TSX + plugins | `editing/comments.ts`, `notes-plugin` | Source is truth |
| Meridian delivery | SQLite | `.meridian/meridian.db` | gitignored |
| ORM | n/a | — | — |
| Migrations (app) | n/a | — | — |
| File storage | Local workspace dirs | `slides/`, `assets/` per project | Consumer repos |
| Cache | Turbo cache, Vite HMR | `.turbo`, `.vite` | Dev/build only |

## Infrastructure and hosting

| Environment | Provider | Region | Notes |
| ----------- | -------- | ------ | ----- |
| Local | Developer machine | — | `pnpm dev` in `open-slide/` |
| CI | GitHub Actions | ubuntu-latest | `working-directory: open-slide` |
| npm registry | npmjs.com | global | `@open-slide/*` public |
| Production (site) | Vercel (typical for Next) | — | `apps/web`; confirm in deploy config |
| Production (decks) | Static host (user choice) | — | Output de `open-slide build` |

## Dev tooling

| Tool | Purpose | Config file |
| ---- | ------- | ----------- |
| Vite | Dev server + bundling runtime | `packages/core` vite config via plugin |
| tsdown / tsc | Build core + typecheck | `tsdown.config.ts`, `tsconfig.json` |
| Biome | Lint + format | `open-slide/biome.json` |
| Vitest | Unit tests | `open-slide/vitest.config.ts` |
| Playwright | E2E runtime | `packages/core/e2e`, image v1.56.1 in CI |
| Changesets | Versioning npm packages | `open-slide/.changeset/config.json` |
| CI | lint, typecheck, test, e2e | `.github/workflows/ci.yml` |

## UI stack signals

- [x] Web UI → `09_design_system.md`; `/design-pass bootstrap`
- [x] Automated tests in scope → `10_test_strategy.md`; `/test-pass bootstrap`

**Suggested UI stack id:** `ts-shadcn` (Tailwind 4 + shadcn/Base UI em `packages/core/src/app/components/ui`)

**Suggested test stack id:** `ts-vitest` + `ts-playwright` (e2e)

## Discarded alternatives

| Option | Why rejected |
| ------ | ------------ |
| DSL proprietário de slides | Produto aposta em React/TSX total para agentes |
| Server-side render de decks | Build estático + dev local; sem backend produto |
| PowerPoint como source of truth | Export é saída, não entrada |

## Evidence (Mode B)

| Claim | Source file |
| ----- | ----------- |
| pnpm workspace | `open-slide/pnpm-workspace.yaml` |
| Core deps React/Vite | `open-slide/packages/core/package.json` |
| CLI scaffold | `open-slide/packages/cli/package.json` |
| Web app Next | `open-slide/apps/web/package.json` |
| Biome + Turbo root scripts | `open-slide/package.json` |

## Gaps / open questions

| # | Unknown | Blocker for |
| - | ------- | ----------- |
| 1 | Versão exata Node em produção Vercel (web) | `08_environments` |
| 2 | Roadmap React 19 + Vite 8 | `05_architecture`, release planning |

## Gate

Human approves before `/security-pass bootstrap` and architecture gate.
