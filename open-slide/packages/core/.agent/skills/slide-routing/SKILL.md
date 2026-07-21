---
name: slide-routing
description: Route slide-authoring requests to the right workflow or skill in an open-slide workspace. Use when the user intent is ambiguous, when choosing an entry point, or before editing slides/framework code. Triggers on "how do I…", "where is the skill for…", or mixed requests (new deck + theme + comment).
---

# Slide kit routing

Canonical kit: **`packages/core/.agent/`** (in the framework repo) or the same tree inside installed **`@open-slide/core`**. Workspaces mirror it to `.agents/`, `.cursor/`, `.claude/` via **`sync:kit`** — edit canonical files only, then sync.

Read **`SLIDE-KIT.md`** for protocol and write scope.

## Layer model

| Layer | Path (canonical) | Role |
| --- | --- | --- |
| Protocol | `.agent/SLIDE-KIT.md` | Priority, scope, sync, workflow → agent map |
| Agents | `.agent/agents/*.md` | Persona, forbidden, delegation (`slide-author`, `theme-author`) |
| Workflows | `.agent/workflows/*.md` | Entry: critical rules + agent + skills |
| Skills | `.agent/skills/*/SKILL.md` | Procedure for one job |
| References | `.agent/skills/slide-authoring/references/**` | Contracts, page types, primitives |

Read **`workflows/`** when the user invokes a named flow. Load the **agent** named in the workflow before skills. Read **`references/`** before writing or changing TSX.

## Intent → entry

| User intent | Agent | Start here | Then |
| --- | --- | --- | --- |
| New deck / “make slides about …” | `slide-author` | **`/create-slide`** → `.agent/workflows/create-slide.md` | skills **`create-slide`**, **`slide-authoring`** |
| Apply inspector comments | `slide-author` | **`/apply-comments`** → `.agent/workflows/apply-comments.md` | **`apply-comments`**, **`slide-authoring`** |
| New or extract theme | `theme-author` | **`/create-theme`** → `.agent/workflows/create-theme.md` | **`create-theme`**, **`slide-authoring`** |
| “This page”, “current slide”, present URL | `slide-author` | skill **`current-slide`** only | then **`slide-authoring`** |
| Tweak layout, palette, steps, morph on known slide | `slide-author` | skill **`slide-authoring`** | `.agent/skills/slide-authoring/references/*` |
| Edit `@open-slide/core` UI, Vite, CLI | **Stop** — not slide kit | `open-slide/AGENTS.md` | framework maintenance |
| Unrelated repo tooling | **Stop** — not slide kit | — | do not use slide workflows |

## Write scope

| Area | Allowed |
| --- | --- |
| `slides/<id>/`, slide assets | yes (slide skills) |
| `themes/` | yes (`create-theme` only) |
| `packages/core/src`, `apps/web`, repo `docs/` for framework work | only when explicitly maintaining the framework — not via slide workflows |

## Demo / consumer mirror

In `apps/demo/`: symlinks point at `packages/core/.agent/`. Change canonical files under **`packages/core/.agent/`**, then run **`open-slide sync:kit`** or **`./scripts/sync-slide-kit-adapters.sh`** in the monorepo.
