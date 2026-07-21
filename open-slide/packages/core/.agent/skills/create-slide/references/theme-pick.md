# Create slide — pick a theme (Step 1)

Read **`theme-registry.md`** first — registration is **filesystem only**; the agent uses a **catalog pass**, not full files for every theme.

## Catalog (picker only)

1. From the slide app root: **`pnpm themes:list`** or **`pnpm exec open-slide themes list --json`** (see **`theme-registry.md`** — not a global `open-slide` binary).
2. If the CLI is unavailable, list `themes/*.md` (skip `README.md`) and read **YAML frontmatter only** per file.
3. If many themes (4+), do **not** read all bodies. Offer **3** topic-relevant ids + **"no theme — design from scratch"** in `AskUserQuestion` (`AskUserQuestion` adds "Other" for any omitted id).

## After the user picks

- **One theme:** read **`themes/<id>.md` end-to-end** — palette, typography, fixed components, motion. Copy Title/Footer/Eyebrow verbatim into the slide; set **`meta.theme: '<id>'`**.
- **No theme / empty `themes/`:** proceed to **`scoping.md`** with no aesthetic lock from a theme.

**Step 1 does not replace Step 2.** Picking a theme skips only the **aesthetic direction** scoping question (not topic, page count, density, motion, format). See **`scoping.md`**.

Webfonts: if the theme specifies imports, follow **`slide-authoring/references/webfonts.md`**.

If you skipped aesthetic scoping because of a theme, restate the theme **name** and invite correction before Step 3.
