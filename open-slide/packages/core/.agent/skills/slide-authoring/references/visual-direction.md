# Visual direction

Pick a coherent look and hold it across every page:

- **Palette** — 1 background, 1 primary text, 1 accent, 1 muted. Put bg/text/accent in the `design` const; extra colors like muted as plain consts.
- **Typography** — one display + one body font. System stack unless user specifies. Headlines 800–900, body 400–500. Set **`design.typeScale.body` to 38+** for new decks unless scoping was **dense** (`canvas-and-layout.md`). Reuse **`BodyCopy` / `BulletList`** from `page-types/title-body-footer.md` so every paragraph and bullet shares `var(--osd-size-body)`.
- **Layout grid** — single content padding (e.g. 120px). Left-aligned = editorial; centered = ceremonial.
- **Aesthetic commitment** — ONE: minimal, maximalist, editorial, retro, brutalist, soft/pastel, neon, paper/print.

If `frontend-design` is available, use it for bold aesthetics.

Themes: if `themes/<id>.md` applies, read **`themes-on-slides.md`**.
