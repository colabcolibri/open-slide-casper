---
name: slide-routing
description: Route slide-authoring requests to the right workflow or skill in an open-slide workspace. Use when the user intent is ambiguous, when choosing an entry point, or before editing slides/framework code. Triggers on "how do I…", "where is the skill for…", or mixed requests (new deck + theme + comment).
---

# Slide kit routing

Canonical kit lives under **`packages/core/`** in the framework repo (mirrored to `.agents/` in consumer workspaces). This is **not** the Meridian delivery kit (`.agent/` at harness root).

## Layer model

| Layer | Path (canonical) | Role |
| --- | --- | --- |
| Workflows | `workflows/*.md` | Entry: critical rules + which skill to run |
| Skills | `skills/*/SKILL.md` | Procedure for one job |
| References | `skills/slide-authoring/references/**` | Contracts, page types, primitives |

Read **`workflows/`** when the user invokes a named flow or slash-style command. Read **`skills/`** for step-by-step execution. Read **`references/`** before writing or changing TSX.

## Intent → entry

| User intent | Start here | Then |
| --- | --- | --- |
| New deck / “make slides about …” | `workflows/create-slide.md` | `create-slide` → `slide-authoring` + page types |
| Apply inspector comments | `workflows/apply-comments.md` | `apply-comments` → `slide-authoring` |
| New or extract theme | `workflows/create-theme.md` | `create-theme` → `slide-authoring` |
| “This page”, “current slide”, present URL | `current-slide` skill only | then `slide-authoring` for edits |
| Tweak layout, palette, steps, morph on known slide | `slide-authoring` | relevant `references/*` |
| Edit `@open-slide/core` UI, Vite, CLI | **Stop** — read harness `docs/04_principles.md`, `docs/09_design_system.md`, `open-slide/AGENTS.md` | not slide kit |
| Meridian backlog, US, sprint | **Stop** — harness `.agent/`, `docs/` | not slide kit |

## Write scope

| Area | Allowed |
| --- | --- |
| `slides/<id>/`, slide assets | yes (slide skills) |
| `themes/` | yes (`create-theme` only) |
| `packages/core/src`, `apps/web`, harness `docs/` for framework work | only when explicitly maintaining the framework — not via slide workflows |

## Demo / consumer mirror

In `apps/demo/`: `.agents/skills/*` and workflow commands symlink to `packages/core/.agent/`. Do not edit mirrored files in the demo tree — change canonical files under `packages/core/.agent/` and run `open-slide sync:kit` (or `./scripts/sync-slide-kit-adapters.sh` in the monorepo).
