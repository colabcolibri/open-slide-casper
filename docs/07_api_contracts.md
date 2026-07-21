---
title: API and public contracts
status: draft
version: 1.0
updated: 2026-07-21
depends_on: [05_architecture.md, 02_security.md]
blocks: []
---

# 07 — API contracts

## Scope

This document covers:

1. **Dev server HTTP API** (`/__*`) — local Vite only; see `architecture/vite-dev-api.md`.
2. **npm package exports** — stable API for slide authors.
3. **CLI commands** — consumer-facing binaries.

Production static builds do not expose § Dev server endpoints.

## Authentication

| Mechanism | Header / param | Consistent with `02_security` |
| --------- | -------------- | ----------------------------- |
| none (local trust) | Origin/Host match on mutations | yes — `validateMutationRequest` |

## Common headers (dev mutations)

| Header | Required | Description |
| ------ | -------- | ----------- |
| `Content-Type` | yes (JSON routes) | `application/json` |
| `Origin` | validated when present | must match host |

## Error envelope (dev API)

```json
{
  "error": "human-readable message"
}
```

HTTP status: 400/403/415/etc. per handler.

## Dev server endpoints

| Method | Path | Purpose | Auth | Request | Response |
| ------ | ---- | ------- | ---- | ------- | -------- |
| POST | `/__edit` | Apply AST edit ops | origin guard | `{ slideId, line, column, ops }` | `{ ok }` |
| POST | `/__edit/batch` | Batch edits | same | `{ slideId, edits[] }` | `{ ok }` |
| POST | `/__edit/revert-asset` | Revert asset ref | same | `{ slideId, assetPath }` | `{ ok }` |
| GET | `/__comments?slideId=` | List comment markers | read | query | `{ comments[] }` |
| POST | `/__comments/add` | Add marker | mutation | `{ slideId, line, text, … }` | marker |
| DELETE | `/__comments/:id` | Remove marker | mutation | — | `{ ok }` |
| PUT | `/__slides/:id/reorder` | Reorder pages | mutation | `{ order: number[] }` | `{ ok }` |
| DELETE | `/__slides/:id/pages/:i` | Remove page | mutation | — | `{ ok }` |
| POST | `/__slides/:id/pages/:i/duplicate` | Duplicate page | mutation | — | `{ ok }` |
| POST | `/__slides/:id/duplicate` | Duplicate slide dir | mutation | `{ newId? }` | slide meta |
| PATCH | `/__slides/:id` | Patch title/format | mutation | `{ name?, format? }` | meta |
| DELETE | `/__slides/:id` | Delete slide | mutation | — | `{ ok }` |
| GET | `/__folders` | Read manifest | read | — | manifest JSON |
| POST | `/__folders` | Create folder | mutation | `{ name, icon }` | folder |
| PUT | `/__folders/assign` | Assign slide | mutation | `{ slideId, folderId }` | manifest |
| PUT | `/__folders/reorder` | Reorder folders | mutation | `{ ids[] }` | manifest |
| PATCH | `/__folders/:id` | Update folder | mutation | `{ name?, icon? }` | folder |
| DELETE | `/__folders/:id` | Delete folder | mutation | — | manifest |
| GET | `/__assets/:scope` | List assets | read | — | listing |
| GET | `/__assets/:scope/:file` | Serve bytes | read | — | binary |
| POST | `/__assets/:scope/:file` | Upload | mutation | raw body | meta |
| PATCH | `/__assets/:scope/:file` | Rename | mutation | `{ name }` | meta |
| DELETE | `/__assets/:scope/:file` | Delete | mutation | — | `{ ok }` |
| GET | `/__assets/.../usages` | Reference count | read | — | `{ count }` |
| GET | `/__svgl/search` | Logo search | read | `q`, `limit` | proxied JSON |
| GET | `/__svgl/svg` | Fetch SVG | read | `u` https URL | svg |
| GET | `/__update-check` | npm version check | read | — | version info |
| POST | `/__update-package` | suggest update cmd | mutation | — | command hint |
| GET | `/__server-status` | Dev server meta | read | — | status |
| POST | `/__restart-server` | Restart Vite | mutation | — | `{ restarting }` |

## npm package `@open-slide/core` (public exports)

From `packages/core/src/index.ts` (representative):

| Export | Kind | Purpose |
| ------ | ---- | ------- |
| `SlideCanvas`, layout helpers | components | Authoring in slides |
| `CanvasSizeProvider`, `useCanvasSize` | React | Canvas dimensions |
| `DesignSystem`, `designToCssVars` | types/utils | Theming |
| `Step`, `Steps`, page context | React | Multi-page slides |
| `SlideTransition`, morph types | types | Motion |
| `@open-slide/core/vite` | plugin entry | Consumer Vite config |
| `@open-slide/core/locale` | i18n | Runtime strings |

Breaking changes require semver + changeset.

## CLI commands (`open-slide` bin in core)

| Command | Purpose |
| ------- | ------- |
| `dev` | Start Vite dev server with plugins |
| `build` | Production static build |
| `preview` | Preview production build |
| `sync` | Sync skills/template artifacts (see `cli/sync.ts`) |

Scaffold CLI `@open-slide/cli`: `init [dir]` — copies template project.

## Internal contracts (non-HTTP)

| Consumer | Provider | Contract |
| -------- | -------- | -------- |
| Meridian agents | `validate_meridian.py` | exit code 0 = pass |
| Board UI | `meridian.db` | schema v11 |
| Vite plugins | `OpenSlideConfig` | `open-slide.config.ts` |

## Rate limits

See `02_security` — no app-level rate limits on local dev.

## Gaps / open questions

| # | Missing | US / epic |
| - | ------- | --------- |
| 1 | OpenAPI machine-readable spec for `__*` | optional tooling epic |
| 2 | Public API stability policy document on web | docs site |

## Gate

Paths listed must exist (Mode B) or be marked `planned` before `approved`.
