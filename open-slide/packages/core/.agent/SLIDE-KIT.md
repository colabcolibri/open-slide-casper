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

| Slash (Cursor / Claude Code) | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/create-slide`** | `workflows/create-slide.md` | `slide-author` | new deck under `slides/` |
| **`/apply-comments`** | `workflows/apply-comments.md` | `slide-author` | inspector `@slide-comment` markers |
| **`/create-theme`** | `workflows/create-theme.md` | `theme-author` | `themes/<id>.md` + demo |

Delegate new themes from deck work to **`theme-author`** + **`/create-theme`**; delegate deck edits from theme work to **`slide-author`** + **`/create-slide`** when the user asks for slide TSX.

## How to reference (agents + humans)

In a **consumer slide workspace** (after `open-slide sync:kit`), paths are relative to the project root unless noted as package-canonical.

| Entry | Consumer adapter | Canonical in `@open-slide/core` |
| --- | --- | --- |
| **`/create-slide`** | `.cursor/commands/create-slide.md` | `packages/core/.agent/workflows/create-slide.md` |
| **`/apply-comments`** | `.cursor/commands/apply-comments.md` | `packages/core/.agent/workflows/apply-comments.md` |
| **`/create-theme`** | `.cursor/commands/create-theme.md` | `packages/core/.agent/workflows/create-theme.md` |
| Skill **`create-slide`** | `.agents/skills/create-slide/SKILL.md` | `.agent/skills/create-slide/SKILL.md` |
| Skill **`apply-comments`** | `.agents/skills/apply-comments/SKILL.md` | `.agent/skills/apply-comments/SKILL.md` |
| Skill **`create-theme`** | `.agents/skills/create-theme/SKILL.md` | `.agent/skills/create-theme/SKILL.md` |
| Skill **`slide-authoring`** | `.agents/skills/slide-authoring/SKILL.md` | `.agent/skills/slide-authoring/SKILL.md` |
| Skill **`current-slide`** | `.agents/skills/current-slide/SKILL.md` | `.agent/skills/current-slide/SKILL.md` |
| Skill **`slide-routing`** | `.agents/skills/slide-routing/SKILL.md` | `.agent/skills/slide-routing/SKILL.md` |
| Agent **`slide-author`** | `.cursor/agents/slide-author.md` | `.agent/agents/slide-author.md` |
| Agent **`theme-author`** | `.cursor/agents/theme-author.md` | `.agent/agents/theme-author.md` |
| Codex workflow skill | `.agents/skills/workflow-<name>/SKILL.md` | same as matching workflow `.md` |

**Path shorthand:** inside a skill hub, `references/foo.md` means that skill’s folder. Sibling skills: `slide-authoring/SKILL.md` under `.agent/skills/`. In workflows and agents, prefer full **`.agent/skills/<name>/…`** (canonical) or **`.agents/skills/<name>/…`** (consumer).

## Drift

On `open-slide dev`, the CLI may warn when synced skills, workflows, or agents differ from the installed package. Run **`sync:kit`** after upgrading `@open-slide/core`.
