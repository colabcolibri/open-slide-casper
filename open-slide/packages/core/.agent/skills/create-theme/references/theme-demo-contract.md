# Theme demo file (`themes/<id>.demo.tsx`)

The demo is a normal slide module — same shape as `slides/<id>/index.tsx`, just sitting under `themes/` so the runtime knows it's preview-only. The dev-UI Themes panel imports it and renders it inside `SlideCanvas` (1920×1080).

## Contract

- `import { type Page, useSlidePageNumber } from '@open-slide/core';`
- Inline the **same** `Title`, `Footer`, `Eyebrow` components defined in the theme markdown — verbatim, no abstractions, no imports from elsewhere. The demo and the markdown must stay in lockstep so what the user sees in the panel matches what `create-slide` will paste into a real slide.
- Export 2–3 `Page` components and a default array. Aim for: a Cover (Eyebrow + Title + subtitle), one Content page exercising body type + accent, and a Closer or "End" card. The "Example usage" block at the bottom of the markdown is a good starting point — extend it.
- If the theme has runtime-tweakable tokens worth surfacing in the Design panel later, also `export const design: DesignSystem = {...}` (add `import type { DesignSystem } from '@open-slide/core';` alongside the base import).
- No asset file imports, no `import` from `@/`, no slides-only helpers (e.g. `WindowShell` from a real slide). Webfont stylesheet `@import`s inside an inline `<style>` are fine here — a deliberate exception to `webfonts.md`'s loader rules, since the demo only mounts in the Themes panel. Demo files must be self-contained.

## Skeleton

```tsx
import { type Page, useSlidePageNumber } from '@open-slide/core';

const Title = ({ children }: { children: React.ReactNode }) => (
  // …same JSX as in themes/<id>.md
);
const Footer = () => {
  const { current, total } = useSlidePageNumber();
  // …
};
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  // …
);

const Cover: Page = () => (
  // …
);
const Content: Page = () => (
  // …
);
const Closer: Page = () => (
  // …
);

export default [Cover, Content, Closer];
```
