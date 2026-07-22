# Deck template (canonical scaffold)

Neutral **placeholder** deck for agents and authors. **Do not** ship this folder as a slide id — copy `index.tsx` into `slides/<kebab-id>/index.tsx` and replace `CONTENT` + `design`.

| Layer | In this file |
| --- | --- |
| `export const design` | Panel-tweakable tokens |
| `CONTENT` | Lorem / neutral labels only |
| Templates | `PageLayout`, typography roles, `DeckFooter` |
| Pages | Cover, section, bullets, closing |

Order and rules: `../deck-layers.md`. Grid contract: `../page-types/title-body-footer.md`.

After copy: set `meta.title`, `meta.createdAt` (ISO literal), optional `meta.theme`, and expand `CONTENT` from scoping — never paste production demo decks as a starting point.
