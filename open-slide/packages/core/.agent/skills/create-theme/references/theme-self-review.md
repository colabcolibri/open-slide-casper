# Create theme — self-review checklist

Run before handoff:

- [ ] Palette covers `bg` / `text` / `accent` / `muted` at minimum, all as hex.
- [ ] Frontmatter includes `mode` matching the palette's background.
- [ ] Type scale specifies hero, heading, body, caption sizes (or explicitly defers to `slide-authoring` defaults).
- [ ] At least Title and Footer are defined as paste-ready React with concrete inline styles.
- [ ] Motion section commits to one of static / subtle / rich.
- [ ] Aesthetic paragraph names a single coherent direction.
- [ ] Both files written: `themes/<id>.md` and `themes/<id>.demo.tsx`. No slide changes, no config changes.
- [ ] Demo `.tsx` exports 2–3 pages and inlines the same Title/Footer/Eyebrow components defined in the markdown.
- [ ] Demo `.tsx` will load cleanly in the **Themes** panel: verify it against `theme-demo-contract.md` by reading the file — do not start a server.
