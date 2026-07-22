# Slide kit protocol

Instruction kit shipped in **`@open-slide/core`** at **`packages/core/.agent/`**. Start here before editing decks or themes in a consumer workspace.

**Tour (how it fits together):** [`README.md`](./README.md) in this folder — workflows, pattern library, sync, validation. This file is the **normative protocol** (priority, write scope, adapters).

## Priority

```txt
P0  SLIDE-KIT.md (this file) + write scope
P1  Workflow (slash command) → named agent
P2  Agent mission / forbidden
P3  Skill SKILL.md (+ references on demand)
```

When layers conflict on **slide content**, **`slide-authoring`** wins. When the work is **framework UI** (runtime, web, CLI source), stop — that is outside this kit (see **`open-slide/AGENTS.md`** in the framework monorepo).

Ambiguous intent → read **`.agent/skills/slide-routing/SKILL.md`** before writing.

## Tree

```txt
packages/core/.agent/
  SLIDE-KIT.md          ← protocol (this file)
  agents/               ← personas (slide-author, theme-author)
  workflows/            ← entry: critical rules + agent + skills
  skills/               ← procedures + references/
```

Edit **only** canonical files under **`packages/core/.agent/`** (monorepo) or upgrade **`@open-slide/core`** (consumer). After changes, run sync — the workspace gets **copies**, not live links into the package.

## Instruction layers

**You invoke workflows (slash commands), not skills.** Agents and skills are loaded by the model from the workflow (or from `@agent-name` if you override routing).

```txt
YOU  →  /create-slide, /apply-comments, /create-theme, /generate-infographic     (workflow)
         ↓
Agent (@slide-author, @theme-author)                       (persona + scope)
         ↓
Skill (create-slide, slide-authoring, …)                   (procedure)
         ↓
skills/<name>/references/                                    (detail on demand)
         ↓
slides/, themes/                                             (what you ship)
```

| Layer | Where | Who | Role |
| --- | --- | --- | --- |
| **Workflow** | `workflows/*.md` | **You** type `/…` in Cursor or Claude Code (Codex: `$workflow-…` skill) | Entry for one job: critical rules, which agent, which skills are mandatory |
| **Agent** | `agents/*.md` | Model (optional **`@slide-author`** / **`@theme-author`**) | Mission, write scope, forbidden paths, default skill list for that persona |
| **Skill** | `skills/<name>/SKILL.md` | Model — rarely typed by humans | Step-by-step procedure; hub file stays short |
| **References** | `skills/<name>/references/` | Model when the skill points there | Templates, page-types, checklists — not loaded unless needed |

### Reference families (metadata)

Not every file under `references/` uses YAML. Three families keep drift low without a big-bang migration:

| Family | Paths | Frontmatter |
| --- | --- | --- |
| **IDE discovery** | `workflows/*.md`, `agents/*.md`, `skills/*/SKILL.md` | Required (`name`, `description`, …) — IDE adapters |
| **Catalog (`kit-doc: pattern`)** | `slide-authoring/references/pattern-library/layouts/*.md`, `motion/*.md` | Required — see `pattern-library/SCHEMA.md`; validated in Vitest |
| **Guides & checklists** | `steps.md`, `page-types/*`, `self-review-checklist.md`, … | None — prose/checklists; hub table in `slide-authoring/SKILL.md` |

Optional future: `kit-doc: guide` with light `title` / `summary` / `related` — not required today.

**Same name, different job:** **`/create-slide`** (workflow) is what you run; skill **`create-slide`** is the checklist inside that run (theme, scoping, `slides/<id>/`). Workflows stay thin; skills hold the steps.

**No slash of their own (usually):** **`slide-authoring`** — TSX and layout rules shared by create-slide and apply-comments (including **CONTENT → templates → pages** in `skills/slide-authoring/references/deck-layers.md`); **`slide-routing`** — pick the right workflow when intent is ambiguous; **`current-slide`** — resolve “this page” before editing.

**Adapters** in the slide project (`.cursor/`, `.agents/`, `.claude/`) are **gitignored**; sync recreates **symlinks** into **`.agent/`**. Do not treat them as source of truth — edit the package kit, then re-sync.

## Write scope

| Area | Agent | Allowed |
| --- | --- | --- |
| `slides/<id>/`, slide assets | `slide-author` | yes |
| `themes/` | `theme-author` | yes |
| `packages/core/src`, `apps/web` (framework source) | — | only when explicitly maintaining the framework — not via slide workflows |

## Sync

Two steps on every sync (consumer **`open-slide sync:kit`** or monorepo **`pnpm sync:kit:demo`**):

1. **Copy** `@open-slide/core/.agent` → **`<project>/.agent/`** (snapshot in the workspace).
2. **Symlink** IDE adapters into that copy — not into `node_modules` or `packages/core`.

| Command | When |
| --- | --- |
| `pnpm exec open-slide sync:kit` | Consumer project root |
| `pnpm sync:kit:demo` | Monorepo → **`apps/demo`** |
| `pnpm sync:kit:adapters -- [dir]` | Any slide workspace (default **`apps/demo`**) |

| Path in workspace | After sync |
| --- | --- |
| **`.agent/`** | **Copy** of the package kit (snapshot — not a symlink) |
| **`.cursor/commands/*.md`** | **Symlink** → **`.agent/workflows/*.md`** |
| **`.cursor/agents/*.md`** | **Symlink** → **`.agent/agents/*.md`** |
| **`.agents/skills/<name>/`** | **Symlink** → **`.agent/skills/<name>/`** |
| **`.agents/skills/workflow-*/SKILL.md`** | **Symlink** → **`.agent/workflows/*.md`** |
| **`.claude/commands/*.md`**, **`.claude/agents/*.md`** | Same targets as **`.cursor/`** |
| **`.claude/skills/<name>/`** | **Symlink** → **`.agent/skills/<name>/`** (monorepo script) or → **`.agents/skills/<name>/`** (CLI; that hop also points at **`.agent/`**) |
| **`.codex/agents/*.toml`** | **Generated** from **`.agent/agents/*.md`** (Codex subagents) |
| **`.codex/README.md`** | **Symlink** → **`.agent/SLIDE-KIT.md`** |
| **`AGENTS.md`** (project root) | **Symlink** → **`.agent/rules/AGENTS.md`** when missing or already a kit symlink |

**Not** a single symlink: **`.cursor/`**, **`.agents/`**, and **`.claude/`** are normal folders whose **entries** are symlinks into **`.agent/`**. There is no **`.cursor` → .agent`** at the root.

Edit the kit only in **`packages/core/.agent/`** (monorepo) or bump **`@open-slide/core`** (consumer), then re-sync. Do not edit **`demo/.agent/`** as canonical — it is replaced on the next copy.

Adapters are gitignored. **`open-slide dev`** warns when the installed package is ahead of **`.agent/`**.

## Themes (registration)

No separate registry file. Each theme is:

- `themes/<kebab-id>.md` — frontmatter **`name`**, **`description`**, optional **`mode`**; body = authoring spec.
- `themes/<kebab-id>.demo.tsx` — optional preview for **`/themes`** in dev.

The Vite **`themesPlugin`** globs `themes/*.md` at dev/build. Agents: **`pnpm exec open-slide themes list --json`** from the slide app root (script **`pnpm themes:list`** when defined) — then one full `themes/<id>.md` after pick; see **`create-slide/references/theme-registry.md`**.

## Git

| Location | Commit? |
| --- | --- |
| **`packages/core/.agent/`** (monorepo) / published in **`@open-slide/core`** | **Yes** — canonical kit |
| **`<workspace>/.agent/`** after sync (e.g. **`apps/demo`**, consumer project) | **No** — generated copy |
| **`.agents/`**, **`.cursor/`**, **`.claude/`**, **`.codex/`** in a slide workspace | **No** — generated adapters |

**Monorepo** (`open-slide/.gitignore`): ignore **`**/.agent/`** everywhere, then **`!packages/core/.agent/**`** so only the core package kit is tracked.

**Consumer** (`open-slide init` scaffold): ignore **`.agent/`** and adapter dirs; canonical kit stays inside **`node_modules/@open-slide/core/.agent`**.

If adapters were committed before gitignore, remove from the index only: `git rm -r --cached apps/demo/.agents apps/demo/.claude` (paths vary).

## Workflow → agent map

| Slash (Cursor / Claude Code) | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/create-slide`** | `workflows/create-slide.md` | `slide-author` | new deck under `slides/` |
| **`/apply-comments`** | `workflows/apply-comments.md` | `slide-author` | inspector `@slide-comment` markers |
| **`/create-theme`** | `workflows/create-theme.md` | `theme-author` | `themes/<id>.md` + demo |
| **`/generate-infographic`** | `workflows/generate-infographic.md` | `infographic-author` | catalog + prompt plan (no `slides/`) |

Delegate new themes from deck work to **`theme-author`** + **`/create-theme`**; delegate deck edits from theme work to **`slide-author`** + **`/create-slide`** when the user asks for slide TSX. Delegate infographics to **`infographic-author`** + **`/generate-infographic`** — not **`slide-authoring`** pattern library.

## How to reference (agents + humans)

In a **consumer slide workspace** (after `open-slide sync:kit`), paths are relative to the project root unless noted as package-canonical.

| Entry | Consumer adapter | Canonical in `@open-slide/core` |
| --- | --- | --- |
| **Protocol** | `.agent/SLIDE-KIT.md` | `packages/core/.agent/SLIDE-KIT.md` |
| **`/create-slide`** | `.cursor/commands/create-slide.md` | `packages/core/.agent/workflows/create-slide.md` |
| **`/apply-comments`** | `.cursor/commands/apply-comments.md` | `packages/core/.agent/workflows/apply-comments.md` |
| **`/create-theme`** | `.cursor/commands/create-theme.md` | `packages/core/.agent/workflows/create-theme.md` |
| **`/generate-infographic`** | `.cursor/commands/generate-infographic.md` | `packages/core/.agent/workflows/generate-infographic.md` |
| Skill **`create-slide`** | `.agents/skills/create-slide/SKILL.md` | `.agent/skills/create-slide/SKILL.md` |
| Skill **`apply-comments`** | `.agents/skills/apply-comments/SKILL.md` | `.agent/skills/apply-comments/SKILL.md` |
| Skill **`create-theme`** | `.agents/skills/create-theme/SKILL.md` | `.agent/skills/create-theme/SKILL.md` |
| Skill **`generate-infographic`** | `.agents/skills/generate-infographic/SKILL.md` | `.agent/skills/generate-infographic/SKILL.md` |
| Skill **`infographic-catalog`** | `.agents/skills/infographic-catalog/SKILL.md` | `.agent/skills/infographic-catalog/SKILL.md` |
| Skill **`slide-authoring`** | `.agents/skills/slide-authoring/SKILL.md` | `.agent/skills/slide-authoring/SKILL.md` |
| Skill **`current-slide`** | `.agents/skills/current-slide/SKILL.md` | `.agent/skills/current-slide/SKILL.md` |
| Skill **`slide-routing`** | `.agents/skills/slide-routing/SKILL.md` | `.agent/skills/slide-routing/SKILL.md` |
| Agent **`slide-author`** | `.cursor/agents/slide-author.md` | `.agent/agents/slide-author.md` |
| Agent **`theme-author`** | `.cursor/agents/theme-author.md` | `.agent/agents/theme-author.md` |
| Agent **`infographic-author`** | `.cursor/agents/infographic-author.md` | `.agent/agents/infographic-author.md` |
| **Codex** | `$workflow-create-slide`, … | `.agents/skills/workflow-*/SKILL.md` → **`.agent/workflows/`**; **`.codex/agents/*.toml`** from **`.agent/agents/`**; optional **`AGENTS.md`** → **`.agent/rules/AGENTS.md`** |

**Path shorthand:** inside a skill hub, `references/foo.md` means that skill’s folder. Sibling skills: `slide-authoring/SKILL.md` under `.agent/skills/`. In workflows and agents, prefer full **`.agent/skills/<name>/…`** (canonical) or **`.agents/skills/<name>/…`** (consumer).

## Drift

On `open-slide dev`, the CLI may warn when synced skills, workflows, or agents differ from the installed package. Run **`sync:kit`** after upgrading `@open-slide/core`.
