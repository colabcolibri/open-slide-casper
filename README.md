# open-slide-casper

A **fork and product harness** built on top of the upstream [open-slide](https://github.com/1weiho/open-slide) monorepo. We keep the original framework intact under [`open-slide/`](open-slide/README.md) and evolve **Casper** here: social-first production (carousels, infographics, PDF/HTML/PPTX export) with **humans in the loop** and **process before tooling**.

**This repo:** [github.com/colabcolibri/open-slide-casper](https://github.com/colabcolibri/open-slide-casper)  
**Upstream (source of the engine):** [github.com/1weiho/open-slide](https://github.com/1weiho/open-slide) · [open-slide.dev](https://open-slide.dev)

## Relationship to upstream open-slide

| | Upstream | This repository |
| --- | --- | --- |
| **What it is** | Agent-native slide framework (`@open-slide/core`, `@open-slide/cli`) | Same codebase **vendored in** `open-slide/`, plus Casper product docs and workflow direction |
| **Who maintains releases** | Upstream publishes to npm | We track upstream in git; framework changes should stay **merge-friendly** back to [1weiho/open-slide](https://github.com/1weiho/open-slide) |
| **What we add on top** | — | Production pipeline intent, Colibri/Casper docs in `docs/`, and fork-only features (formats, export, agent skills) as they land |

**You are not looking at a rewrite of open-slide.** The runtime, Vite plugin, viewer, present mode, inspector, and CLI template still live in the upstream-shaped tree at `open-slide/packages/*` and `open-slide/apps/*`. Clone this repo when you want **our fork + harness**; use `npx @open-slide/cli init` when you only need a vanilla consumer workspace.

Historically, **Casper** turned editorial pipelines into Instagram/LinkedIn carousels and PDFs. **open-slide** added TSX decks, dev preview, and agent skills. **open-slide-casper** is where those lines meet: keep shipping improvements to the forked framework while building the production story around it.

## What is in this repository

| Piece | Path | Role |
| ----- | ---- | ---- |
| **Forked open-slide monorepo** | [`open-slide/`](open-slide/README.md) | Full pnpm/turbo monorepo from upstream — `packages/core`, `packages/cli`, `apps/web`, etc. |
| **Product & architecture docs** | [`docs/`](docs/README.md) | Scope, architecture, design system, decisions (Casper / fork governance) |
| **Local slide workspace** | `open-slide/apps/demo/` | Dogfood on your machine — **`slides/` and `assets/` are gitignored** here so production decks stay off GitHub |
| **Internal Meridian kit** | `.agent/` (repo root) | Maintainer harness for phase docs and backlog — **not** part of the published slide product |

## Prerequisites

- **Node.js 22**
- **pnpm 10.17+** (`corepack enable`)

## Quick start

Work inside the **forked monorepo** (not the repo root alone):

```bash
git clone https://github.com/colabcolibri/open-slide-casper.git
cd open-slide-casper/open-slide
pnpm install
pnpm dev:demo
```

Root-level scripts (`pnpm dev`, `pnpm build`, …) are thin wrappers that run in `open-slide/`.

### New slide workspace (vanilla scaffold, no fork)

```bash
npx @open-slide/cli init my-carousel
cd my-carousel
pnpm install
pnpm dev
```

### Sync agent skills into the demo app (monorepo only)

```bash
cd open-slide
pnpm sync:kit:demo
```

Canonical skills live in `packages/core/.agent/`; `apps/demo/.agent/` is a generated copy.

## Agents and skills

| What | Where |
| ---- | ----- |
| Canonical slide kit | `open-slide/packages/core/.agent/` (`SLIDE-KIT.md`, skills, workflows) |
| Workspace copy | `open-slide/apps/demo/.agent/` after `sync:kit:demo` — do not edit as source |

Use `/create-slide`, `/create-theme`, and related workflows from your IDE after sync. Framework changes in `packages/core` or `packages/cli` need a **changeset** before release — see [open-slide/CONTRIBUTING.md](open-slide/CONTRIBUTING.md).

## Documentation

- [docs/00_scope.md](docs/00_scope.md) — product scope (framework + fork)
- [docs/05_architecture.md](docs/05_architecture.md) — system map
- [docs/architecture/instruction-surfaces.md](docs/architecture/instruction-surfaces.md) — human vs agent instruction surfaces
- [docs/architecture/desktop-tauri-rig.md](docs/architecture/desktop-tauri-rig.md) — draft: Tauri desktop + embedded agent (planned)
- Upstream framework readme: [open-slide/README.md](open-slide/README.md)

## Contributing framework changes upstream

1. Prefer small, focused diffs under `open-slide/packages/core` and `open-slide/packages/cli`.
2. Run `pnpm check` and `pnpm test` from `open-slide/`.
3. Open PRs here first; cherry-pick or PR equivalent changes to [1weiho/open-slide](https://github.com/1weiho/open-slide) when they belong in the public framework.

## License

MIT — see package licenses under `open-slide/packages/`. Derived work from upstream open-slide remains MIT-compatible.
