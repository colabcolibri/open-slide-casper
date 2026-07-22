# open-slide — Framework Repo Guide

You are working on the **open-slide framework** in the **Casper fork** — local runtime and slide kit. **This repo does not publish to npm** (see `docs/architecture/fork-local-only.md`).

This monorepo lives in `open-slide/`. **Phase docs** at repo root (`docs/`) are the source for framework UI, React, and motion rules (`04_principles.md`, `09_design_system.md`). **Slide authoring:** `packages/core/.agent/` and **`SLIDE-KIT.md`** — see `docs/architecture/instruction-surfaces.md`.

(Slide authoring: **`packages/core/.agent/SLIDE-KIT.md`**. In demo, run `./scripts/sync-slide-kit-adapters.sh` — skills at `.agents/skills/`, slash **`/create-slide`**, **`/apply-comments`**, **`/create-theme`**. Use only when editing `apps/demo/slides/` or `themes/`.)

## Layout

pnpm + Turbo monorepo.

| Path | Package | Role |
| --- | --- | --- |
| `packages/core` | `@open-slide/core` | Runtime (viewer, present mode, inspector), Vite plugin, `open-slide` dev/build CLI. |
| `packages/cli` | `@open-slide/cli` | `npx @open-slide/cli init` scaffolder + project template. |
| `apps/demo` | private | Local consumer of `@open-slide/core` via `workspace:*`. Dogfood target — run `pnpm dev` here to exercise the framework. |
| `apps/web` | private | Marketing site (Next.js). |

Shared config: `biome.json`, `turbo.json`, `pnpm-workspace.yaml`, `tsconfig` per package.

## Workflow

```bash
pnpm dev          # turbo: runs demo against local core
pnpm build        # build all packages
pnpm typecheck    # tsc across the graph
pnpm check        # biome (format + lint + organize imports)
pnpm check:fix    # auto-fix what biome can
pnpm test         # vitest
```

Filter to one package: `pnpm core <script>` / `pnpm cli <script>`.

## Hard rules

- **Biome must pass before commit.** Run `pnpm check` (or `pnpm check:fix`). CI and the user's review both expect a clean tree.
- **No changesets, no `pnpm release`, no npm publish** in this fork. Ignore `.changeset/` unless preparing an upstream PR to 1weiho/open-slide.
- Don't add dependencies casually. The `core` runtime is large; every dep inflates install size.
- `packages/core/src/app/components/ui` is shadcn-generated and biome-ignored — leave it alone unless regenerating.
- **Default to writing no comments.** Only add one when the WHY is non-obvious — a hidden constraint, a subtle invariant, a workaround for a specific bug, behavior that would surprise a reader. Don't explain WHAT the code does (well-named identifiers handle that), don't reference tasks/PRs/callers ("added for X", "used by Y"), don't write section-divider banners (`// ── Section ──`) or module-header descriptions, and don't leave commented-out code. If removing a comment wouldn't confuse a future reader, don't write it.
