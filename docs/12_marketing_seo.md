---
title: Marketing and SEO
status: approved
version: 1.0
updated: 2026-07-21
pass: seo-pass-bootstrap
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
| Title/meta per page | yes | Root `app/layout.tsx` metadata + docs via Fumadocs |
| Sitemap | yes | `apps/web/app/sitemap.ts` → `/sitemap.xml` (home + doc pages, git mtime) |
| robots.txt | yes | `apps/web/app/robots.ts` — allow `/`, disallow `/api/`, points to sitemap |
| Core Web Vitals | measure | Run Lighthouse on production deploy; no CI gate yet |
| Canonical URLs | yes | `metadataBase` + `alternates.canonical` use `https://open-slide.dev` (`lib/shared.ts`) |
| Structured data | yes | Landing JSON-LD: WebSite, Organization, SoftwareSourceCode, SoftwareApplication, HowTo, FAQPage (`app/(home)/page.tsx`) |
| Open Graph images | yes | `/opengraph-image.png` in layout + home |

## Analytics and privacy

**Evidence (2026-07-21):** no analytics package in `apps/web` dependencies or layout. Vercel hosting may still collect platform logs — outside app code. Document privacy policy before adding `@vercel/analytics` or similar.

## Content principles

- Docs match shipped npm version; link to GitHub for source.
- Landing e componentes marketing: `docs/09_design_system.md` (seção landing / WIG).

## Gate

Human approves after `/seo-pass full` for public launch criteria.
