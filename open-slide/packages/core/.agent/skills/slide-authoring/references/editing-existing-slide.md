# Editing an existing slide

A finished slide commonly runs 1000–1800 lines. When you only need to touch one page, **don't read the whole file** — locate the page first, then read just that range:

```bash
grep -n ": Page = " slides/<id>/index.tsx
```

This lists every `const Foo: Page = …` declaration with its line number. Read the target page with `Read` using `offset` + `limit` (~150 lines is usually enough). Read the whole file only when you need cross-page context (palette audit, reordering, design const tweaks).

**Copy edits:** read the **`CONTENT`** block at the top first (`references/deck-layers.md`). Change the key there when the note is about wording; update the page JSX only if it still references an old literal. Shared phrases must stay single-sourced in CONTENT.
