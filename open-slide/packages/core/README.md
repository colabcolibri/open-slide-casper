# @open-slide/core

Runtime and CLI for [open-slide](https://github.com/1weiho/open-slide) — a React-based slide framework where you write slides and the framework handles the Vite/React stack, layout, navigation, hot reload, and fullscreen play mode.

## Install

```bash
pnpm add @open-slide/core
```

Most users get this installed automatically by running `npx @open-slide/cli init`. Use this package directly only if you're wiring up an existing workspace by hand.

## What's inside

- **Runtime** — home page, slide viewer, thumbnail rail, keyboard navigation, and fullscreen presenter mode. Every slide renders into a fixed **1920×1080** canvas; the framework scales it.
- **Vite plugin** — discovers `slides/<id>/index.{tsx,jsx,ts,js}`, exposes them via virtual modules, and reloads when slides are added or removed.
- **CLI** — `open-slide dev | build | preview` so workspaces never need to touch Vite, React, or tsconfig directly.

## CLI

Once `@open-slide/core` is installed, the **`open-slide`** bin is on PATH **inside npm/pnpm scripts** and via **`pnpm exec`** / **`npx`** from that workspace — not as a global command unless you install globally.

| Command | Description |
| --- | --- |
| `open-slide dev` | Start the dev server. Flags: `-p, --port <port>`, `--host [host]`, `--open`. |
| `open-slide build` | Build a static site. Flags: `--out-dir <dir>` (defaults to `dist`). |
| `open-slide preview` | Preview the production build. Flags: `-p, --port <port>`, `--host [host]`, `--open`. |
| `open-slide themes list` | Theme catalog (frontmatter only). Flag: `--json` for agents. |
| `pnpm themes:list` | Convenience script (when added in `package.json`) — same as `open-slide themes list --json`. |

## Config

Create `open-slide.config.ts` in the workspace root (all fields optional):

```ts
import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  slidesDir: 'slides',
  // examplesDir omitted → bundled design decks (sidebar → Examples); override with a path or `false`
  port: 5173,
};

export default openSlideConfig;
```

### Hosting under a subpath

Set `base` to deploy the built site under a sub-directory (intranet folders, GitHub Pages project sites, reverse proxies). Use a leading and trailing slash:

```ts
const openSlideConfig: OpenSlideConfig = {
  base: '/my-slides/',
};
```

The value is passed straight to Vite's `base` and to React Router's `basename`, so client-side navigation matches the deployed path.

## Authoring slides

Slides live under `slides/<kebab-case-id>/index.tsx` and default-export an array of `Page` components.

**Agents and humans:** the slide instruction kit ships inside this package at **`.agent/`** — start with [`.agent/README.md`](./.agent/README.md) (overview) and [`.agent/SLIDE-KIT.md`](./.agent/SLIDE-KIT.md) (protocol). After `open-slide sync:kit`, the same tree is copied to your project root as `.agent/`.

Workflows: **`/create-slide`** (new deck), **`/apply-comments`** (inspector markers). Layout skeletons: **`.agent/skills/slide-authoring/references/pattern-library/INDEX.md`**.

Minimal shape:

```tsx
import type { Page } from '@open-slide/core';

const Cover: Page = () => (
  <div className="flex h-full w-full items-center justify-center">
    <h1 className="text-[120px] font-bold">Hello, open-slide</h1>
  </div>
);

const pages: Page[] = [Cover];
export default pages;

export const meta = { title: 'Hello' };
```

## Exports

```ts
import {
  CANVAS_WIDTH,   // 1920
  CANVAS_HEIGHT,  // 1080
  MorphElement,   // match or fade objects across pages for morph transitions
  type Page,
  type SlideMeta,
  type SlideModule,
  type SlideTransition,
  type OpenSlideConfig,
} from '@open-slide/core';
```

The Vite plugin is exposed under a subpath for advanced setups:

```ts
import { createViteConfig } from '@open-slide/core/vite';
```

## License

MIT
