# open-slide-casper

**Casper** is our workflow for turning ideas into social carousels and exports (PDF, HTML, PPTX). **open-slide** is the open-source engine: React slides on a fixed canvas, dev preview, present mode, and agent skills.

This repository is **three things at once**:

1. A **git fork** of [open-slide](https://github.com/1weiho/open-slide) — the full upstream monorepo lives in [`open-slide/`](open-slide/README.md).
2. The **home for Casper** — product docs, production direction, and fork-only changes for Instagram/LinkedIn-style output.
3. A **[Meridian](https://github.com/colabcolibri/meridian) harness** — how we govern docs, backlog, and agent workflows while evolving the fork (see below).

We do **not** replace open-slide. We **vendor the upstream tree** and build Casper around it. **This fork does not publish to npm** — no `pnpm release` or Changesets in day-to-day work ([fork-local-only.md](docs/architecture/fork-local-only.md)). Upstream [1weiho/open-slide](https://github.com/1weiho/open-slide) owns public releases; keep core/cli changes mergeable when possible.

---

## Mental model

```text
  Upstream (npm / public framework)
  github.com/1weiho/open-slide
              │
              │  fork — full monorepo copied into this repo
              ▼
  open-slide-casper/                    ← Meridian workspace (repo root)
  ├── open-slide/          ← runtime, CLI, Vite plugin, slide kit in packages/core/.agent/
  ├── docs/                ← phase docs (scope, architecture, …) — product source of truth
  ├── .agent/              ← Meridian kit (agents, skills, templates) — canonical
  ├── .meridian/           ← delivery DB + config (local; backlog not in git)
  └── README.md
```

**Clone this repo** if you work on the fork, Casper, or Meridian-backed delivery.  
**Run `npx @open-slide/cli init`** if you only want a fresh slide project with no fork.

---

## Meridian (why the repo root is not “just” open-slide)

[Meridian](https://github.com/colabcolibri/meridian) is the protocol we use to run this repo as a **documented product** with coding agents (Cursor, Claude Code, Codex, etc.):

| Layer | Location | Role |
| ----- | -------- | ---- |
| **Phase docs** | [`docs/`](docs/README.md) | Approved scope, architecture, security, design system — agents read these before inventing features |
| **Meridian kit** | [`.agent/`](.agent/MERIDIAN.md) | Agents, slash-command workflows, story templates, validation scripts |
| **Delivery** | `.meridian/` (local) | Epics, sprints, user stories in SQLite — planning export, not committed |
| **Slide authoring kit** | `open-slide/packages/core/.agent/` | `/create-slide`, canvas rules, export skills — ships with the framework fork |

**Two kits, two jobs:** Meridian at the **repo root** governs *building the product*; the slide kit inside **core** governs *writing decks in TSX*. See [instruction-surfaces.md](docs/architecture/instruction-surfaces.md).

After clone, regenerate IDE adapters (gitignored symlinks):

```bash
./.agent/scripts/sync_cursor_kit.sh
```

Human-oriented entry: [AGENTS.md](AGENTS.md) · Protocol: [.agent/MERIDIAN.md](.agent/MERIDIAN.md)

---

## What Casper adds (on top of the fork)

- A **production-minded** path: structured copy → slides → export, with a human approving each step (not “one prompt, ship to Instagram”).
- **Product documentation** in `docs/` (scope, architecture, design system).
- Room for **fork-only** features (extra canvas formats, export tweaks, pipeline tooling) without pretending they are the upstream default yet.

Your slide source of truth stays **TSX/React** — same as open-slide. No WYSIWYG editor, no hosted SaaS in this repo.

---

## Repository layout

| Path | What it is |
| ---- | ---------- |
| [`open-slide/`](open-slide/README.md) | Forked monorepo (`@open-slide/core`, `@open-slide/cli`, `apps/web`, …) |
| [`docs/`](docs/README.md) | Meridian phase docs for the open-slide / Casper product |
| [`.agent/`](.agent/MERIDIAN.md) | Meridian kit (canonical); sync to `.cursor/`, `.claude/`, etc. |
| `.meridian/` | Local delivery connector + `meridian.db` (gitignored) |
| `open-slide/apps/demo/` | Local dogfood — **`slides/` and `assets/` are not committed** |

---

## Quick start

**Requirements:** Node.js 22, pnpm 10.17+ (`corepack enable`).

```bash
git clone https://github.com/colabcolibri/open-slide-casper.git
cd open-slide-casper
./.agent/scripts/sync_cursor_kit.sh   # optional: Cursor / Claude / Codex adapters

cd open-slide
pnpm install
pnpm dev:demo
```

Open the URL the dev server prints. Put decks under `apps/demo/slides/` locally — they are not pushed to GitHub.

From the repo root, `pnpm dev` delegates to `open-slide/`.

**Slide agent skills** (`/create-slide`, `/create-theme`, …):

```bash
cd open-slide
pnpm sync:kit:demo
```

Edit skills only in `packages/core/.agent/`. `apps/demo/.agent/` is generated on sync.

---

## Documentation

| Doc | Purpose |
| --- | ------- |
| [docs/README.md](docs/README.md) | Phase doc index + Meridian workflow on this repo |
| [open-slide/README.md](open-slide/README.md) | Framework overview (upstream-shaped) |
| [docs/05_architecture.md](docs/05_architecture.md) | System map |
| [docs/architecture/instruction-surfaces.md](docs/architecture/instruction-surfaces.md) | Meridian docs vs slide kit vs IDE adapters |

Framework changes: `pnpm check` and `pnpm test` from `open-slide/` — [CONTRIBUTING.md](open-slide/CONTRIBUTING.md). **No npm release in this fork.**

---

## License

MIT. See `open-slide/packages/` for package licenses. Derived work from upstream open-slide remains MIT-compatible.
