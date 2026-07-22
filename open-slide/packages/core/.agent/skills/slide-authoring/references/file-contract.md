# Slide file contract

```tsx
// slides/<id>/index.tsx
import type { Page, SlideMeta } from '@open-slide/core';

const CONTENT = { title: 'My slide' } as const;

const Cover: Page = () => <div>{CONTENT.title}</div>;
const Body: Page = () => <div>…</div>;

export const meta: SlideMeta = {
  title: CONTENT.title,
  createdAt: '2026-05-16T12:00:00Z',
};
export default [Cover, Body] satisfies Page[];
```

Inside one slide file, organize as **CONTENT → templates → pages** (`references/deck-layers.md`). All deck copy should live in CONTENT unless it is a one-off that never repeats.

- `export default` is a **non-empty array of zero-prop React components**, one per page, in order.
- `meta.title` (optional) shows in the slide header. Default is the folder name.
- The slide id is the kebab-case folder name. Pick something short and descriptive (`q2-roadmap`, `team-offsite-2026`).
- `meta.theme` (optional) marks the slide as built from a theme under `themes/`. The id must match a `<id>.md` basename. Surfaces a back-link chip on the slide card and lists the slide on `/themes/<id>`. Omit if the slide isn't derived from a registered theme.
- `meta.createdAt` is an **ISO 8601 string literal** (e.g. `'2026-05-16T12:00:00Z'`) set once when the slide is scaffolded. The home page uses it for the default "newest first" sort. Always include it on new slides — **immediately before writing the file, run `node -e "console.log(new Date().toISOString())"` via Bash and paste the exact output** as the value. Don't type a timestamp from memory. Must be a plain string literal (no `new Date(...)` in the slide) — the framework reads it via regex at build time.
- `meta.format` (optional) sets canvas size. Default `slide` is **1920×1080**. Use `'4x5'` for **1080×1350** portrait. Layout must match the format.
