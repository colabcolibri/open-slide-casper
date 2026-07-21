---
title: Test strategy
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [01_tech_stack.md, 08_environments.md]
blocks: []
---

# 10 — Test strategy

> Deepen with `/test-pass bootstrap` → `full` before `approved`.

## Goals

- Prevent regressions in **published runtime** (`@open-slide/core`) and CLI packaging.
- Keep unit tests fast; reserve Playwright for critical user journeys.
- CI must pass on every PR to `main` before merge.

## Test pyramid

| Layer | Tool | Scope | Location |
| ----- | ---- | ----- | -------- |
| Unit | Vitest | Pure logic, AST helpers, guards, utils | `packages/**/*.test.ts` |
| Integration | Vitest | Plugin behavior, route helpers | `packages/core/src/vite/*.test.ts` |
| E2E | Playwright | Dev server UI flows | `packages/core/e2e/tests/*.spec.ts` |
| Manual | Human | Visual slides, present mode polish | demo decks |

Root config: `open-slide/vitest.config.ts` includes `packages/**/*.test.ts(x)`.

## CI mapping

| Job | Command | Blocks merge |
| --- | ------- | ------------ |
| lint | `pnpm format:check` + `pnpm lint` | yes |
| test | `pnpm test` | yes |
| e2e | `pnpm test:e2e` (Playwright container) | yes |
| typecheck | `pnpm typecheck` | yes |

Workflow: `.github/workflows/ci.yml` (jobs `lint`, `typecheck`, `test`, `e2e`; `working-directory: open-slide`).

E2E runs in container `mcr.microsoft.com/playwright:v1.56.1-noble` matching `@playwright/test` version.

## Coverage expectations

- New logic in `editing/*`, `http/request-guard`, file ops: unit tests expected.
- New dev routes: handler tests or e2e smoke where feasible.
- UI-only polish: e2e or manual checklist in US `tests` field.

No enforced coverage % in CI today — gap.

## Fixtures

- E2E fixture package: `packages/core/e2e/fixture` (workspace member)
- Scratch dir gitignored: `packages/core/e2e/.scratch`

## Flake policy

- Playwright report uploaded on failure (`playwright-report` artifact).
- Retry policy: default Playwright — tune in `playwright.config.ts` if flakes appear.

## Motion review (PRs touching CSS/transition/animation)

Manual bar before merge when diff includes motion in `packages/core` or `apps/web`. Full rules: **`09_design_system.md` § Motion**.

| # | Check |
| - | ----- |
| 1 | Every animation has a purpose (not decoration on hot paths) |
| 2 | UI duration &lt; 300ms unless modal/drawer class |
| 3 | Only `transform` + `opacity` animated |
| 4 | No `ease-in` on enter/exit UI |
| 5 | Popovers scale from trigger origin |
| 6 | `prefers-reduced-motion` honored |
| 7 | Keyboard-heavy actions not animated |

## Manual testing

Before npm release:

1. `pnpm dev:demo` — smoke inspector, present, folder reorder.
2. `npx @open-slide/cli init /tmp/smoke-deck` — scaffold integrity.
3. Review changeset impact on consumers.

## Gaps / open questions

| # | Gap | Action |
| - | --- | ------ |
| 1 | CWV not gated in CI | optional Lighthouse job or manual before major marketing releases |
| 2 | Visual regression for slides | optional future epic |

## Gate

Human approves after `/test-review` on critical paths.
