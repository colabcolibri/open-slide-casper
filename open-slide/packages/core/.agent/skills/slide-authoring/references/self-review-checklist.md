# Self-review before finishing

- [ ] `slides/<id>/index.tsx` `export default`s a non-empty `Page[]`.
- [ ] Every page root fills `100% × 100%`.
- [ ] `PageLayout`: `gridRow` 1 / 2 / 3 on head, body, footer; cover (no head) still pins footer to bottom.
- [ ] Footer + eyebrow/label type ≥ 22px (see `canvas-and-layout.md` caption scale).
- [ ] Content inside padding (no edge-kissing text).
- [ ] **Every page:** sum (font × lineHeight × lines) + gaps + 2×padding ≤ 1080px; split if tight. No `overflow: auto`.
- [ ] No wrapping bullets at chosen font size.
- [ ] One visual direction (palette + type scale).
- [ ] Top-level `export const design: DesignSystem` + `var(--osd-X)` unless intentionally locked one-off.
- [ ] **CONTENT** holds all deck copy; no duplicate string literals across pages for the same meaning (`deck-layers.md`).
- [ ] One idea per page.
- [ ] Repeated visuals = explicit `<Component />` instances, not `map` lists (`repeated-elements.md`).
- [ ] Assets exist — slide `assets/` or `@assets/`.
- [ ] Each `<ImagePlaceholder>` = real user-supplied image need (`assets.md`).
- [ ] `<Steps>`/`<Step>`: direct children; page complete when jumped via grid (`steps.md`).
- [ ] `SlideTransition`: one family per deck or omit (`transitions.md`).
- [ ] `morph`: rules in `morph.md` if used.
- [ ] Nothing outside `slides/<id>/` edited.
