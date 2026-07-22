---
title: Vite dev API — architecture detail
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [05_architecture.md, 02_security.md]
---

# Vite dev API — architecture detail

## Purpose

During `open-slide dev`, `@open-slide/core` mounts Connect middleware on the Vite dev server. These routes **mutate the consumer workspace** (slide TSX, manifests, assets). They are registered only with `apply: 'serve'` and must not appear in static production builds.

Entry: `packages/core/src/vite/api-plugin.ts` → `register*Routes` in `packages/core/src/vite/routes/`.

## Security

All mutation handlers should call `validateMutationRequest` from `packages/core/src/http/request-guard.ts` (JSON content-type when required, block `Sec-Fetch-Site: cross-site`, validate `Origin` against host).

## Route groups

| Prefix | Module | Responsibilities |
| ------ | ------ | ---------------- |
| `/__edit` | `edit.ts` | AST edits, batch edits, revert asset |
| `/__comments` | `comments.ts` | Add/remove/list `@slide-comment` markers |
| `/__slides` | `slides.ts` | Reorder pages, duplicate/delete slide, patch meta |
| `/__assets` | `assets.ts` | Upload/list/delete assets, usage scan |
| `/__folders` | `folders.ts` | CRUD folder manifest `.folders.json` |
| `/__svgl` | `svgl.ts` | Proxy search to SVGL catalogue |
| `/__update-check` / `/__update-package` | `update.ts` | npm update helpers for core package |
| `/__restart-server` / `/__server-status` | `restart.ts` | Dev server lifecycle |
| watchers | `watchers.ts` | HMR ping on manifest/asset changes |

Custom dev events (via `dev-sync.ts`): `open-slide:registry-changed`, `open-slide:themes-changed`, `open-slide:slide-meta-changed` — see `open-slide-plugin.ts` / `themes-plugin.ts`.

See manifest comments at top of each route file for method/path listing.

## Context object

`makeContext()` in `routes/context.ts` resolves:

- `slidesRoot`, `manifestPath` (`slides/.folders.json`)
- Project root from Vite config / `open-slide.config.ts`

## Related docs

- `docs/07_api_contracts.md` — contract tables
- `docs/02_security.md` — threat model for dev exposure
