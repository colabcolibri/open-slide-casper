# open-slide-casper

**Casper** is our workflow for turning ideas into social carousels and exports (PDF, HTML, PPTX). **open-slide** is the open-source engine: React slides on a fixed canvas, dev preview, present mode, and agent skills.

This repository is **both**:

1. A **git fork** of [open-slide](https://github.com/1weiho/open-slide) — the full upstream monorepo lives in [`open-slide/`](open-slide/README.md).
2. The **home for Casper** — product docs, production direction, and fork-only changes we need for Instagram/LinkedIn-style output.

We do **not** replace open-slide. We **vendor the upstream tree** and build Casper around it. Framework releases still conceptually belong to [1weiho/open-slide](https://github.com/1weiho/open-slide) and [open-slide.dev](https://open-slide.dev); changes under `open-slide/packages/core` and `open-slide/packages/cli` should stay small and mergeable upstream when possible.

---

## Mental model

```text
  Upstream (npm / public framework)
  github.com/1weiho/open-slide
              │
              │  fork — full monorepo copied into this repo
              ▼
  open-slide-casper/
  ├── open-slide/          ← runtime, CLI, Vite plugin, apps/web (same layout as upstream)
  ├── docs/                ← Casper scope, architecture, decisions
  └── README.md            ← start here
```

**Clone this repo** if you work on the fork or on Casper.  
**Run `npx @open-slide/cli init`** if you only want a fresh slide project with no fork.

---

## What Casper adds (on top of the fork)

- A **production-minded** path: structured copy → slides → export, with a human approving each step (not “one prompt, ship to Instagram”).
- **Product documentation** in [`docs/`](docs/README.md) (scope, architecture, design system).
- Room for **fork-only** features (extra canvas formats, export tweaks, pipeline tooling) without pretending they are the upstream default yet.

Your slide source of truth stays **TSX/React** — same as open-slide. No WYSIWYG editor, no hosted SaaS in this repo.

---

## Repository layout

| Path | What it is |
| ---- | ---------- |
| [`open-slide/`](open-slide/README.md) | The forked monorepo (`@open-slide/core`, `@open-slide/cli`, marketing site, etc.) |
| [`docs/`](docs/README.md) | Casper / fork product docs |
| `open-slide/apps/demo/` | Local dogfood app — **`slides/` and `assets/` are not committed** (production decks stay on your machine) |
| `.agent/` (repo root) | Internal Meridian tooling for maintainers — ignore unless you govern docs/backlog |

---

## Quick start

**Requirements:** Node.js 22, pnpm 10.17+ (`corepack enable`).

```bash
git clone https://github.com/colabcolibri/open-slide-casper.git
cd open-slide-casper/open-slide
pnpm install
pnpm dev:demo
```

Open the URL the dev server prints. Put your own decks under `apps/demo/slides/` locally — they will not be pushed to this GitHub repo.

Optional from the repo root: `pnpm dev` runs the same commands inside `open-slide/`.

**Agent skills** (for `/create-slide`, `/create-theme`, …):

```bash
cd open-slide
pnpm sync:kit:demo
```

Edit skills only in `packages/core/.agent/`. `apps/demo/.agent/` is generated on sync.

---

## Documentation

| Doc | Purpose |
| --- | ------- |
| [open-slide/README.md](open-slide/README.md) | Upstream framework overview |
| [docs/00_scope.md](docs/00_scope.md) | Scope and boundaries |
| [docs/05_architecture.md](docs/05_architecture.md) | System map |
| [docs/architecture/instruction-surfaces.md](docs/architecture/instruction-surfaces.md) | Where humans vs agents read rules |

Framework contributions: `pnpm check` and `pnpm test` from `open-slide/`; changesets for publishable package changes — [CONTRIBUTING.md](open-slide/CONTRIBUTING.md).

---

## License

MIT. See `open-slide/packages/` for package licenses. Code derived from upstream open-slide remains MIT-compatible.
