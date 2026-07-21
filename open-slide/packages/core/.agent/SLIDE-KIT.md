# Slide kit protocol

Instruction kit shipped in **`@open-slide/core`** at **`packages/core/.agent/`**. Start here before editing decks or themes in a consumer workspace.

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

Edit **only** canonical files under **`core/.agent/`**. Consumer workspaces mirror via sync — do not edit symlinks in `.cursor/`, `.claude/`, or `.agents/`.

## Write scope

| Area | Agent | Allowed |
| --- | --- | --- |
| `slides/<id>/`, slide assets | `slide-author` | yes |
| `themes/` | `theme-author` | yes |
| `packages/core/src`, `apps/web` (framework source) | — | only when explicitly maintaining the framework — not via slide workflows |

## Sync

| Command | What it updates |
| --- | --- |
| `pnpm exec open-slide sync:kit` | skills, workflow commands, agents (consumer project) |
| `./scripts/sync-slide-kit-adapters.sh` | same mirrors for monorepo demo (`apps/demo`) |

Adapters (`.cursor/commands`, `.cursor/agents`, `.agents/skills`, …) are local and gitignored in slide workspaces.

## Workflow → agent map

| Workflow | Agent | Mode |
| --- | --- | --- |
| `create-slide` | `slide-author` | new deck under `slides/` |
| `apply-comments` | `slide-author` | inspector `@slide-comment` markers |
| `create-theme` | `theme-author` | `themes/<id>.md` + demo |

Delegate new themes from deck work to **`theme-author`**; delegate deck edits from theme work to **`slide-author`** when the user asks for slide TSX.

## How to reference (agents + humans)

Two surfaces in a **consumer slide workspace** (after `open-slide sync:kit`):

| What the user types | Adapter (local, gitignored) | Canonical source in `@open-slide/core` |
| --- | --- | --- |
| **`/create-slide`** | `.cursor/commands/create-slide.md` or `.claude/commands/create-slide.md` | `packages/core/.agent/workflows/create-slide.md` |
| **`/apply-comments`** | `.cursor/commands/apply-comments.md` | `.agent/workflows/apply-comments.md` |
| **`/create-theme`** | `.cursor/commands/create-theme.md` | `.agent/workflows/create-theme.md` |
| Skill **`create-slide`** (no slash) | `.agents/skills/create-slide/SKILL.md` | `.agent/skills/create-slide/SKILL.md` |
| Skill **`slide-authoring`** | `.agents/skills/slide-authoring/SKILL.md` | `.agent/skills/slide-authoring/SKILL.md` |
| Agent **`slide-author`** | `.cursor/agents/slide-author.md` | `.agent/agents/slide-author.md` |

**Path shorthand inside the slide kit:** in a skill hub, `references/foo.md` = that skill’s folder; `slide-authoring/SKILL.md` = sibling under `.agent/skills/`. In workflows, prefer **`.agent/skills/<name>/…`** (package tree) or **`.agents/skills/<name>/…`** (consumer workspace).

## Drift

On `open-slide dev`, the CLI may warn when synced skills, workflows, or agents differ from the installed package. Run **`sync:kit`** after upgrading `@open-slide/core`.
