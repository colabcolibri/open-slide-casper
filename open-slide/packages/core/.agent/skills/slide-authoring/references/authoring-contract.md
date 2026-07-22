# Authoring contract (Design + Inspect gates)

The dev server classifies each `slides/<id>/index.tsx` as **`full`** or **`legacy`**. Only **`full`** decks allow writes from the **Design** panel and style/text edits from **Inspect**.

## `full` requirements

1. **`export const design`** (or `export { design }` via `export const design`) with a **literal object** initializer — `DesignSystem` shape, no spreads or helper calls (same rules as the Design panel AST writer).
2. **`export default [ … ]`** — non-empty array of pages (`satisfies Page[]` allowed).

Recommended (not required for `full` today): **`const CONTENT`** for copy (`deck-layers.md`), typography roles from **`deck-template/index.tsx`**, layout gaps via **`var(--osd-gap)`**.

## `legacy` behavior

- **Design:** controls disabled; banner explains missing contract; preview and export still work.
- **Inspect:** typography, color, margin, and content fields disabled when legacy; comments may still work.
- **Inspect on unmapped nodes:** even on `full` decks, elements without **`data-slide-loc`** cannot receive style edits.

## How to fix a legacy deck

1. Copy **`references/deck-template/index.tsx`** into your slide id folder.
2. Move copy into **`CONTENT`**; keep **`export const design`** literal.
3. Run dev server — `GET /__design?slideId=…` returns `authoringContract: "full"`.

See **`design-system.md`** § Design panel vs Inspect.
