---
name: slide-authoring
description: Technical reference for writing or editing open-slide pages — file contract, 1920×1080 canvas, type scale, layout, palette/visual direction, assets, stepped reveals, page transitions, and morph transitions. Consult this whenever you are about to write or modify any file under `slides/<id>/`, including from inside the `create-slide` or `apply-comments` workflows, or for any ad-hoc slide edit. Triggers on phrases like "edit slide", "tweak this page", "fix the layout", "change the palette", "reveal one by one", "add a transition", "morph transition", "investigate the slide framework", "how do slides work here".
---

# Authoring open-slide pages

Technical reference for `slides/<id>/index.tsx`. Workflows: **`create-slide`**, **`apply-comments`**, **`workflows/*`**. Deictic “this page” → **`current-slide`** first. Ambiguous intent → **`slide-routing`**.

Do not duplicate this skill in other skills — link here.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/file-contract.md` | New slide or `meta` / exports |
| `references/deck-layers.md` | **Mandatory** for new decks and copy edits — CONTENT → templates → pages |
| `references/editing-existing-slide.md` | Touch one page in a large deck |
| `references/canvas-and-layout.md` | Layout, type scale, 1080px budget |
| `references/visual-direction.md` | Palette, aesthetic commitment |
| `references/themes-on-slides.md` | Slide follows `themes/<id>.md` |
| `references/design-system.md` | `design` const + Design panel |
| `references/deck-template/index.tsx` | **Mandatory** new deck — copy scaffold (placeholder) |
| `references/pattern-library/INDEX.md` | **Before new layout/motion TSX** — pick skeleton id; not `apps/demo/examples/` |
| `references/pattern-library/FORMAT-GUIDANCE.md` | **When scoping `slide` vs `4x5`** — format matrix per pattern |
| `references/infographic-catalog/INDEX.md` | **Infographic image generation (future)** — layout/style prompts + previews; not slide TSX |
| `references/infographic-catalog/prompt-assembly.md` | How to compose strategy + image prompts (minus-ai parity) |
| `references/authoring-contract.md` | Design/Inspect gates — full vs legacy decks |
| `references/starter-skeleton.md` | Checklist after copying deck-template |
| `references/page-types/title-body-footer.md` | Default page chrome + **BodyCopy / BulletList** |
| `references/page-types/cover.md` | Opener |
| `references/page-types/split.md` | Two columns |
| `references/assets.md` | Imports, placeholders |
| `references/webfonts.md` | Non-system fonts |
| `references/page-numbers.md` | Footer page numbers |
| `references/steps.md` | `<Steps>` / `<Step>` |
| `references/transitions.md` | `SlideTransition` |
| `references/morph.md` | `MorphElement` |
| `references/repeated-elements.md` | Cards / rows — no `map` |
| `references/runtime-behavior.md` | Dev UI navigation |
| `references/self-review-checklist.md` | Before handoff |
| `references/anti-patterns.md` | Guardrails |

---

## Page types

Copy **`PageLayout`** once per deck from **`references/page-types/title-body-footer.md`**.

| Type | File | When to use | Anti-pattern |
| --- | --- | --- | --- |
| Title / body / footer | `references/page-types/title-body-footer.md` | Default editorial pages | Absolute footer; skip layout on “normal” pages |
| Cover | `references/page-types/cover.md` | Deck opener | Many bullets on cover |
| Split (2 col) | `references/page-types/split.md` | Compare, text + visual | Three+ columns on 1080p |

---

## Primitives

Read the reference **before** using the primitive on a page:

| Primitive | File |
| --- | --- |
| `design` + `var(--osd-X)` | `references/design-system.md` |
| Assets + `<ImagePlaceholder>` | `references/assets.md` |
| Webfonts | `references/webfonts.md` |
| `useSlidePageNumber()` | `references/page-numbers.md` |
| `<Steps>` / `<Step>` | `references/steps.md` |
| `SlideTransition` | `references/transitions.md` |
| `MorphElement` + `morph` | `references/morph.md` |

---

## Hard rules

- **Pattern library:** before inventing a layout or motion block, open **`references/pattern-library/INDEX.md`** and copy the matching skeleton into templates/pages. **`apps/demo/examples/`** is a read-only vitrine in the dev app — never use it (or production demos under `apps/demo/slides/`) as scaffold; use **`deck-template`** + patterns.
- **`index.tsx` layers:** declare **`CONTENT`** (all strings), then **templates** (reused components), then **`Page` structure** — see `references/deck-layers.md`. No duplicate copy across pages outside CONTENT.
- Slide under `slides/<kebab-case-id>/`; entry `index.tsx`; media in `slides/<id>/assets/`.
- Do **not** touch `package.json`, `open-slide.config.ts`, or other slides.
- No new dependencies. Only `react`, `@open-slide/core`, standard web APIs.
- **One `index.tsx` + `assets/`** — no sibling components files, no `README.md` in slide folder.

---

## Quick paths

| Task | Read |
| --- | --- |
| New deck | `file-contract.md` → `pattern-library/INDEX.md` → `canvas-and-layout.md` → `page-types/*` → `self-review-checklist.md` |
| Edit one page | `editing-existing-slide.md` + primitive reference |
| Theme-backed slide | `themes-on-slides.md` + theme `.md` file |

---

## Self-review

Run **`references/self-review-checklist.md`** before finishing any slide edit.
