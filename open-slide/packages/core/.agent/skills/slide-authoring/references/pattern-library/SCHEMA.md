# Pattern library — `kit-doc: pattern` schema

Catalog entries under `layouts/` and `motion/` **must** start with YAML frontmatter. Guides (`steps.md`, `page-types/*`, checklists) do **not** use this schema — see `SLIDE-KIT.md` § Reference families.

## Required frontmatter

```yaml
---
kit-doc: pattern
id: kebab-case-stable-id
kind: layout | motion
summary: "One line for INDEX and search."
formats: both | both-star | slide-first | 4x5-first
content-keys:
  - section.key
  - footerLabel
page-types:   # optional
  - ../page-types/split.md
---
```

| Field | Rule |
| --- | --- |
| `kit-doc` | Always `pattern` |
| `id` | Stable forever; matches row in `INDEX.md` and filename stem |
| `kind` | `layout` or `motion` |
| `summary` | Short prose; not duplicated as a metadata table in the body |
| `formats` | See `FORMAT-GUIDANCE.md` ratings |
| `content-keys` | Dotted paths under `CONTENT` (use `_` only in key names if needed) |
| `page-types` | Optional links to contract docs |

## Body sections (after `---`)

1. `## When to use`
2. `## Prerequisites` (optional)
3. `## Skeleton (paste into index.tsx)`
4. `## Related` (optional)

Do **not** repeat id/kind/formats in a markdown table — frontmatter is the source of truth.

## Validation

- `packages/core/src/app/lib/pattern-library-index.test.ts`
- `open-slide/scripts/validate-pattern-kit-docs.mjs` (same rules, runnable from repo root)
