---
title: Security
status: approved
version: 1.0
updated: 2026-07-21
reviewed: 2026-07-21
pass: security-pass-full
depends_on: [00_scope.md, 01_tech_stack.md]
blocks: [03_user_types.md, 04_principles.md, 05_architecture.md]
---

# 02 — Security

> Deepen: `/security-pass bootstrap` → `full`; `/privacy-pass` se analytics/PII no site forem confirmados.

## Security posture summary

| Attribute | Value |
| --------- | ----- |
| **Exposure** | Framework: local dev + static export. Site: public internet |
| **Auth required** | no — no user accounts in framework runtime |
| **Sensitive data** | none in default slide workspace; marketing site has no analytics SDK in repo (2026-07-21 scan) |
| **Compliance** | framework runtime: N/A (no data controller); site: privacy policy TBD before claiming LGPD/GDPR compliance |
| **Trust boundary** | Dev server mutates local disk only; static build has no `__*` APIs |

## Data classification

| Class | Examples in this product | Storage | Retention | Encryption |
| ----- | ------------------------ | ------- | --------- | ---------- |
| Public | Slide TSX, exported HTML, npm package | git / static host | author-controlled | TLS in transit to hosts |
| Internal | `.meridian/meridian.db`, turbo cache | local disk | until deleted | n/a local |
| Confidential | npm tokens, GitHub secrets (maintainers) | CI secrets | per provider | provider-managed |
| Regulated | none identified in framework | — | — | — |

**PII inventory:** none in core slide workflow. **Evidence:** no `@vercel/analytics`, gtag, or Plausible imports under `open-slide/apps/web` (only marketing copy mentions Vercel hosting).

**Data minimization:** Core não coleta telemetry dos decks; update-check pode consultar registry npm (see `/__update-check`).

## Privacy — LGPD (Brazil)

**Framework runtime:** N/A — no personal data processed by `@open-slide/core` in default workflows.

**open-slide.dev:** static/docs site; no first-party analytics in codebase. If production adds trackers or forms, run `/privacy-pass` and link policy URL here.

## Privacy — GDPR (EU/EEA)

**Framework runtime:** N/A.

**Site:** same as LGPD — no EU-facing data collection in repo today; policy + consent required before adding analytics or newsletter.

## Authentication model

| Surface | Mechanism | Session / token | Expiry | Notes |
| ------- | --------- | --------------- | ------ | ----- |
| Slide dev server | none | — | — | Localhost trust model |
| Static exported deck | none | — | — | Hoster's problem |
| npm publish | npm OIDC / token | CI | per npm | `.github/workflows/release.yml` |
| GitHub | GitHub Actions `GITHUB_TOKEN` | CI | job-scoped | — |

**If no authentication:** Explicit for slide runtime. Protect: maintainer secrets, consumer `.env` if added, agent write access to repo.

## Authorization model

| Role / profile | Can | Cannot | Enforced where |
| -------------- | --- | ------ | -------------- |
| Local author | Read/write workspace files via dev APIs | Cross-origin browser mutations | `request-guard.ts` on POST/PATCH/DELETE |
| CI bot | Run tests, publish with secrets | — | GitHub permissions |
| Anonymous web visitor | Read public docs | Mutate framework | Next.js server |

**Model type:** ownership-based (single user per machine for dev).

## Threat model (STRIDE summary)

| Surface | Threat actors | Top STRIDE threats | Mitigation | Residual risk |
| ------- | ------------- | ------------------ | ---------- | ------------- |
| Dev `__*` APIs | Malicious site in browser | CSRF (S), spoofing (S) | Origin/Sec-Fetch-Site checks in `validateMutationRequest` | low by default (Vite localhost); **medium** if author passes `--host` / `--host 0.0.0.0` |
| File writes (edit/slides) | Local malware / agent | Tampering (T) | OS user perms; no remote exposure in static build | low local |
| SVGL proxy | Supply chain / SSRF | SSRF (S) | Proxy only in dev; validate upstream | medium — review `svgl.ts` |
| npm dependencies | Supply chain | Tampering (T) | lockfile, dependabot, `/dependency-audit` | medium |
| Agent with repo access | Prompt injection | Tampering (T) | MERIDIAN gates, no secrets in prompts | medium |

## Secrets and configuration

| Secret type | Storage | Rotation | Never in Git |
| ----------- | ------- | -------- | ------------ |
| npm publish | GitHub secrets | per npm policy | yes |
| Consumer API keys | `.env` in user projects | user | yes |

- `.env*` gitignored in consumer template where applicable
- No `.env.example` required in core for runtime (no secrets by default)

## Input validation and output encoding

| Boundary | Validation approach | Library | Encoding notes |
| -------- | ------------------- | ------- | -------------- |
| Dev JSON APIs | Content-Type JSON + body parsers | manual + `readBody` | JSON responses |
| Slide IDs | `SLIDE_ID_RE`, `validateSlideName` | `slide-ops.ts` | Prevents path escape |
| File paths (assets) | Resolved under workspace roots | `files/assets.ts` | Path traversal guard |
| TSX edits | Babel AST ops | `@babel/parser` | Structural edits only |

## Data protection

- **In transit:** HTTPS for npm, GitHub, SVGL fetch; local dev HTTP
- **At rest:** User disk; no server-side deck storage
- **Logs:** Avoid logging full slide source in CI artifacts

## Rate limiting and abuse

| Endpoint / action | Limit | Response | Notes |
| ----------------- | ----- | -------- | ----- |
| Dev mutations | none | — | Local-only assumption |
| SVGL search | implicit via upstream | errors forwarded | Dev only |

## Audit and logging

| Event | Logged fields | Retention | Who can read |
| ----- | ------------- | --------- | ------------ |
| CI test failures | GitHub Actions logs | GitHub policy | maintainers |
| Security decisions | Meridian SQLite | project lifetime | team |

## Dependencies and supply chain

| Concern | Policy |
| ------- | ------ |
| Lockfiles committed | yes — `open-slide/pnpm-lock.yaml` |
| Audit command | `pnpm audit` / dependabot weekly `/open-slide` |
| CI gate | manual review — no auto-fail on `pnpm audit` in CI (2026-07-21: 31 advisories incl. transitive js-yaml via fumadocs) |
| License | MIT core; review new deps (size matters for npm) |

## AI and automation safety (Meridian / agents)

| Rule | Detail |
| ---- | ------ |
| Write scope (framework) | `open-slide/packages/*`, `open-slide/apps/*` only after `/implement-us` + `ready: true` |
| Write scope (slide demo) | `open-slide/apps/demo/slides/*` via `packages/core/skills/` |
| UI agent rules | `docs/09_design_system.md`, `docs/04_principles.md` |
| Forbidden | Secrets in chat, `git push --force` main, disabling request-guard, hand-editing `components/ui/` |
| Human gates | Phase doc `approved`, US `Record`, npm release |
| Harness | Meridian P0 in `.agent/rules/`; product `open-slide/AGENTS.md` |

## OWASP and common risks

| Risk area | Posture | Follow-up |
| --------- | ------- | --------- |
| Broken access control | N/A multi-user; dev CSRF guarded | Document bind address |
| Cryptographic failures | TLS delegated to hosts | — |
| Injection | AST edits, no eval of user strings | US if adding templates |
| Insecure design | Static export reduces attack surface | — |
| Security misconfiguration | Don't expose dev server publicly | docs + CLI warnings |
| Vulnerable components | dependabot | `/dependency-audit` |
| SSRF | SVGL proxy review | `07_api_contracts` |

## Gaps / open questions

| # | Gap | Severity | Owner | Target |
| - | --- | -------- | ----- | ------ |
| 1 | Warn when `--host` exposes dev APIs on LAN | low | maintainer | CLI/docs hint (default bind is localhost-only when `--host` omitted — `dev.ts` only forwards host when flag set) |
| 2 | Privacy policy URL for open-slide.dev | medium | manager | `/privacy-pass` when trackers or PII forms added |
| 3 | Formal threat review of batch edit API | low | security | optional before `approved` |
| 4 | Transitive npm advisories (e.g. js-yaml) | medium | maintainer | dependabot / upgrade fumadocs chain |

## Gate

Human sets `status: approved` after `/security-pass full` and critical gaps accepted or logged.
