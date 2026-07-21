---
title: Marketing and SEO
status: draft
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md, 01_tech_stack.md]
blocks: []
---

# 12 — Marketing and SEO

> Public web: `apps/web` → open-slide.dev. Deepen via `/seo-pass bootstrap`.

## Product positioning

open-slide is the **agent-native slide framework**: React slides, fixed canvas, inspector loop, present mode, static export. Primary CTA: `npx @open-slide/cli init`.

## Audiences

| Segment | Message | Channel |
| ------- | ------- | ------- |
| Dev influencers | “Slides as code with your agent” | GitHub, X, conferences |
| Teams | Deploy static decks, no SaaS lock-in | Docs, landing |
| Contributors | MIT monorepo, clear packages | CONTRIBUTING.md |

## Site structure (evidence)

| Area | Path | Notes |
| ---- | ---- | ----- |
| Landing | `apps/web/components/landing/*` | Hero, FAQ, composer |
| Docs | `apps/web/content/docs/**` MDX | Fumadocs |
| LLM hint | `apps/web/app/llms.txt/route.ts` | GEO |
| Search | `apps/web/app/api/search/route.ts` | Doc search API |

## SEO checklist (initial)

| Item | Status | Notes |
| ---- | ------ | ----- |
| Title/meta per page | partial | verify with `/seo-pass` |
| Sitemap | TBD | Next.js app router |
| Core Web Vitals | TBD | Lighthouse on landing |
| Canonical URLs | TBD | production domain |
| Structured data | TBD | SoftwareApplication schema? |
| Open Graph images | partial | screenshots in `public/assets` |

## Analytics and privacy

**Gap:** confirm whether Vercel Analytics or other trackers run in production — required for `02_security` / privacy passes.

## Content principles

- Docs match shipped npm version; link to GitHub for source.
- Landing e componentes marketing: `docs/09_design_system.md` (seção landing / WIG).

## Gate

Human approves after `/seo-pass full` for public launch criteria.
