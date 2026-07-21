---
title: Decision log
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md]
blocks: []
---

# 11 — Decision log

Decisions live in **SQLite**: `.meridian/meridian.db` → table `decisions`.

`docs/11_decisions.md` is the human index (this file). The canonical store is the database, not JSON files under `docs/decisions/`.

## Entry shape

Each row stores `decision_date`, `entry_index` (0 = newest that day), and `payload_json`:

```json
{
  "time": "HH:MM",
  "title": "Objective title",
  "affected_document": "path/to/doc.md",
  "what_changed": "factual description",
  "why_changed": "context and motivation",
  "impact": "affected docs; mark review",
  "responsible": "role or person"
}
```

- `time` = real clock when logged (`date +"%H:%M"`). Do not round or invent.
- New entries are **prepended** (`entry_index` 0) for the calendar day.
- Never edit or delete old rows.

## Write

From repo root (harness):

```bash
date +"%Y-%m-%d"
date +"%H:%M"
python3 .agent/scripts/meridian_db_cli.py --package-root . prepend-decision \
  --date "YYYY-MM-DD" \
  --time "HH:MM" \
  --title "…" \
  --affected-document "docs/…" \
  --what-changed "…" \
  --why-changed "…" \
  --impact "…" \
  --responsible "manager"
```

Workflow: `/update-decisions-log` + skill `update-decisions-log`.

## When to log

| Event | Log? |
| ----- | ---- |
| Project started (init) | yes — first entry |
| Phase doc `approved` → `review` after edit | yes |
| Security / architecture material change | yes |
| US scope change after refine | yes |
| Typo fix | no |

## Recent decisions (index)

| Date | Title | Affected |
| ---- | ----- | -------- |
| 2026-07-21 | Phase docs 00–12 approved (manager) | `docs/*.md`, `docs/architecture/*` |
| 2026-07-21 | Architecture and design-system doc pass | `docs/05_architecture.md`, `docs/architecture/export-pipeline.md`, `docs/09_design_system.md` |
| 2026-07-21 | Doc governance wave — security and SEO evidence pass | `docs/02_security.md`, `docs/12_marketing_seo.md`, `docs/10_test_strategy.md` |
| 2026-07-21 | Project started with Meridian | `docs/` |

## Gate

`status: approved` on this stub means rules are understood — not that history is complete.
