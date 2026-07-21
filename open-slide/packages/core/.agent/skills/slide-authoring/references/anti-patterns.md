# Authoring anti-patterns

- ❌ Walls of text — split if > ~40 words per page.
- ❌ Body copy without 100–160px padding.
- ❌ Vertical overflow on 1080px canvas — split pages.
- ❌ `overflow: auto/scroll/hidden` to hide overflow bugs.
- ❌ Type below scale or padding below 100px to cram content — split instead.
- ❌ Body type under 28px for projection.
- ❌ Inconsistent palette across pages.
- ❌ Extra npm packages — only `react`, `@open-slide/core`, web APIs.
- ❌ Shared CSS files — inline or scoped classes.
- ❌ `README.md` or extra files in slide folder.
- ❌ Edit `package.json`, config, other slides.
- ❌ Use a primitive without reading its `references/*.md` first.
