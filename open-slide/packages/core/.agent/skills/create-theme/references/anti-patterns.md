# Create theme — anti-patterns

| Wrong | Right |
| ----- | ----- |
| Executable code in `.md` outside labeled component snippets | Markdown is documentation; snippets are paste-ready |
| Only markdown or only demo | Theme **bundle** — both files every time |
| Demo under `slides/` | Preview-only under `themes/` |
| `@/` or slide helpers in demo | Self-contained demo |
| Invent palette when user supplied images/slide | Extract, don't fabricate |
| Edit `slides/`, `packages/`, config | Only `themes/<id>.md` + `.demo.tsx` |
| Skip Fixed components | Title + Footer paste-ready |
