---
title: Environments
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [01_tech_stack.md, 05_architecture.md]
blocks: [10_test_strategy.md]
---

# 08 — Environments

## Overview

| Environment | Purpose | Host | Deploy trigger |
| ----------- | ------- | ---- | -------------- |
| local-dev | Author + contributor | laptop | manual `pnpm dev` |
| ci | Verify PR/main | GitHub Actions | push/PR to `main` |
| npm | Package distribution | registry.npmjs.org | release workflow + changeset |
| web-prod | Marketing/docs | Vercel (assumed) | merge to main |

## Local setup (product monorepo)

```bash
cd open-slide
pnpm install
pnpm dev          # turbo → demo dev against workspace core
pnpm dev:web      # marketing site only
pnpm dev:demo     # demo app only
```

Requirements: Node ≥18, pnpm 10.17.0 (Corepack).

Optional harness commands from repo root:

```bash
pnpm dev          # delegates to open-slide via root package.json
python3 .agent/scripts/validate_meridian.py .
```

## Environment variables

### Framework / monorepo

| Variable | Where | Secret? | Purpose |
| -------- | ----- | ------- | ------- |
| `NODE_ENV` | build/test | no | standard |
| `CI` | GitHub Actions | no | test behavior |
| `npm` publish tokens | GitHub secrets | **yes** | release.yml |

Consumer slide repos may define custom vars in Vite — not standardized by core.

### apps/web

Document per Next.js conventions when `/seo-pass` runs (e.g. `VERCEL_URL`, analytics IDs). **Not inventoried in init — gap.**

## CI pipeline (`.github/workflows/ci.yml`)

| Job | Command | working-directory |
| --- | ------- | ------------------- |
| lint | `pnpm format:check`, `pnpm lint` | `open-slide` |
| typecheck | `pnpm typecheck` | `open-slide` |
| test | `pnpm test` | `open-slide` |
| e2e | `pnpm test:e2e` | `open-slide` (Playwright container) |

Cache: `open-slide/pnpm-lock.yaml`

## Release pipeline (`.github/workflows/release.yml`)

1. `pnpm install --frozen-lockfile`
2. changesets/action → `pnpm version-packages` / `pnpm release`
3. Publishes `@open-slide/core` and `@open-slide/cli` with npm provenance

## Consumer project layout (after `cli init`)

```txt
my-deck/
  slides/
  assets/
  open-slide.config.ts
  package.json  # depends on @open-slide/core
```

Deploy: run `open-slide build`, upload `dist/` to static host.

## Meridian harness

| Path | Notes |
| ---- | ----- |
| `.agent/` | Kit source at git root |
| `.meridian/` | Delivery DB + `projects.json` |
| `docs/` | Phase docs (Meridian) |
| `open-slide/` | Product monorepo (npm) |

## Gaps / open questions

| # | Gap | Owner |
| - | --- | ----- |
| 1 | Document exact Vercel project/env for apps/web | maintainer |
| 2 | Staging environment for web (if any) | manager |

## Gate

Human confirms local + CI instructions match machine reality.
