---
title: Design system
status: approved
version: 1.0
updated: 2026-07-21
reviewed: 2026-07-21
pass: design-pass-bootstrap
depends_on: [01_tech_stack.md, 05_architecture.md, 04_principles.md]
blocks: []
---

# 09 — Design system

> Stack id: **ts-shadcn** + Tailwind 4. Regras de UI/motion para programar o runtime (`open-slide/packages/core`) e, com escopo separado, landing (`open-slide/apps/web`).  
> **Slides:** contrato de canvas e TSX em `open-slide/packages/core/.agent/skills/slide-authoring/` (publicado no npm) — não duplicar aqui.

## Summary

**Primary UI stack id:** `ts-shadcn` (Tailwind CSS v4 + shadcn/ui — see kit `ui-stack-catalog.md`).

| Surface | Stack | Primitive path | Composed path |
| ------- | ----- | -------------- | ------------- |
| Runtime shell | ts-shadcn | `packages/core/src/app/components/ui/*` | `components/inspector/*`, `components/present/*`, … |
| Marketing site | Tailwind + custom landing | shared patterns in `apps/web/components/landing/*` | section components (Hero, FAQ, …) |
| Slide decks | React TSX on canvas | N/A (author code) | skill `slide-authoring` |

Runtime shell (home, inspector, present, dialogs): **Tailwind CSS v4**, primitivos **shadcn** em `open-slide/packages/core/src/app/components/ui/` (biome-ignored — **regenerar, não editar à mão**), composições em `components/inspector`, `components/present`, etc. Decks usam tokens `DesignSystem` → CSS vars via `design-plugin` (`app/lib/design.ts`).

**Composition pattern:** config-driven props on composed pieces (`title`, `description`, `variant`, `size`); compound components + provider context for inspector (see § React composition). Planned composed catalog (`AppDialog`, `AppFormField`, …) — implement via showcase US when `/design-showcase` runs; today most UI is feature-local composed components.

## shadcn / shell UI rules

**Workflow:** usar runner do monorepo (`pnpm dlx shadcn@latest` / `npx shadcn@latest`) a partir de `open-slide/packages/core` quando `components.json` existir. Antes de UI custom: `shadcn search` / docs do componente.

| Rule | Do | Don't |
| ---- | -- | ----- |
| Primitives | Compor a partir de `components/ui/*` | Editar arquivos gerados à mão |
| Layout spacing | `flex` + `gap-*` | `space-x-*` / `space-y-*` |
| Equal w/h | `size-*` | `w-10 h-10` separados |
| Colors | Semânticos: `bg-primary`, `text-muted-foreground`, `bg-background` | `bg-blue-500`, overrides manuais `dark:` |
| className | Layout/posicionamento; `cn()` para condicional | Override de cor/tipografia do componente |
| Overlays | Deixar stacking ao Dialog/Sheet/Popover | `z-index` manual em overlay |
| Forms | `FieldGroup` + `Field`; `data-invalid` + `aria-invalid` | `div` + `space-y` como form layout |
| Input groups | `InputGroupInput` / `InputGroupTextarea` | `Input` cru dentro de `InputGroup` |
| Dialogs | Sempre `DialogTitle` / `SheetTitle` / `DrawerTitle` (sr-only ok) | Dialog sem title |
| Cards | `CardHeader`, `CardTitle`, `CardContent`, … | Tudo dentro de `CardContent` |
| Feedback | `sonner` `toast()`, `Skeleton`, `Empty`, `Alert` | Divs custom com `animate-pulse` |
| Icons in Button | prop `data-icon="inline-start|inline-end"` | `size-4` no ícone dentro de Button |
| Tabs | `TabsTrigger` dentro de `TabsList` | Triggers soltos |

**Base UI vs Radix:** checar `base` em `shadcn info --json`; triggers custom usam `render` (base) ou `asChild` (radix).

## React composition (shell components)

Ao criar painéis multi-parte (inspector, sidebars, toolbars):

1. **Sem boolean props** (`isThread`, `isEditing`, …) — usar variantes explícitas ou subcomponentes.
2. **Compound components** com contexto: interface `{ state, actions, meta }`; UI só consome o contrato.
3. **State no Provider** — irmãos fora da árvore visual podem usar o mesmo contexto.
4. **Preferir `children`** a render props para estrutura estática.
5. **React 19** (quando adotado no repo): `use(Context)`; `ref` como prop normal — sem `forwardRef`.

Detalhe de performance em `04_principles.md` § React performance.

## Motion and interaction

Barra de craft para **qualquer** CSS/JS motion no core ou web. Present mode e transições de slide devem respeitar a mesma base.

### When to animate

| Frequency | Policy |
| --------- | ------ |
| 100+/dia (atalhos, toggle repetido) | **Sem** animação |
| Dezenas/dia (hover em listas) | Mínima ou nenhuma |
| Ocasional (modal, drawer, toast) | Animação padrão |
| Raro / onboarding | Pode ter delight |

Propósito válido: consistência espacial, feedback, explicar mudança de estado — não “ficar bonito” em elemento visto o tempo todo.

### Timing and easing

- UI **&lt; 300ms** salvo justificativa (modal/drawer até ~500ms).
- Entrada/saída: **`ease-out`** — evitar **`ease-in`** em UI.
- Preferir curvas fortes, ex.: `cubic-bezier(0.23, 1, 0.32, 1)` para ease-out.
- Botão: feedback no **`:active`**, ex. `transform: scale(0.97)`, ~100–160ms — não esperar `click` para highlight.

### Physicality

- Não animar de **`scale(0)`** — usar `scale(0.9–0.97)` + opacity.
- Popovers/dropdowns: **`transform-origin` no trigger** (vars Radix/Base UI). Modais: center ok.
- Animar só **`transform`** e **`opacity`** — não `width`/`height`/`margin`/ `top`/`left`.
- Gestos: motion **interrompível** (transitions/springs, não keyframes que reiniciam do zero).
- **`prefers-reduced-motion`:** reduzir movimento, manter opacity/cor quando fizer sentido.
- Hover motion: `@media (hover: hover) and (pointer: fine)`.

### Gestures (present / drag)

- Pointer down → feedback imediato; arrastar **1:1** com o dedo/mouse; capturar velocidade para release.
- Springs para gestos reversíveis; bounce sutil (0.1–0.3).

Review de PRs com motion: checklist em `10_test_strategy.md` § Motion review.

## Marketing / landing (`apps/web`)

Fora do shell shadcn neutro. Objetivo: direção estética **intencional** (tipografia distintiva, cor dominante + acento, composição memorável) — evitar clichê “AI slop” (Inter/Roboto + gradiente roxo genérico).  
Coordenar com `12_marketing_seo.md`. Não impor mesma estética no inspector/runtime.

## UX and accessibility audit

Para review “UI/UX/a11y” de arquivos concretos:

1. Buscar checklist atual: [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md)
2. Reportar achados em formato `file:line` + severidade.

Baseline fixo neste doc: foco visível, contraste AA no shell, alvos de toque ≥ 44px em mobile, labels em forms, títulos em dialogs.

## Brand and tone (runtime)

- Chrome: neutro, apresentação, dark/light via `next-themes` + `ThemeToggle`.
- Fonte shell: Geist variable (`@fontsource-variable/geist`).

## Color and tokens

Theme source: `packages/core/src/app/styles.css` (`:root` / `.dark` OKLCH ramps + `@theme inline` radius/shadow tokens).

| Layer | Location | Usage |
| ----- | -------- | ----- |
| Semantic CSS vars | `background`, `foreground`, `primary`, `muted`, `destructive`, `border`, `ring`, … | Shell + shadcn |
| Radius scale | `--radius-sm` … `--radius-4xl` derived from `--radius` | Components |
| Elevation | `--shadow-edge`, `--shadow-floating`, `--shadow-overlay` | Cards, overlays |
| Per-deck | `designToCssVars`, presets in `design.ts` | Slide content |
| Tailwind theme | `@theme inline` maps to CSS vars | Utility classes |
| Slide palette | TSX + `DesignPalette` | Author-defined |

## Typography and spacing

| Token | Shell implementation |
| ----- | -------------------- |
| Sans / UI | `--font-sans` → Geist Variable (`@fontsource-variable/geist`) |
| Heading | `--font-heading` (Geist) |
| Mono | `--font-mono` stack in `@theme` |
| Serif | `--font-serif` (optional marketing/editorial) |
| Spacing | Tailwind spacing scale (4px base); layout via `gap-*`, not `space-y-*` |
| Type scale (slides) | Defined in `slide-authoring` skill — not shell tokens |

## Layout and breakpoints

| Breakpoint | Width | Shell behavior |
| ---------- | ----- | -------------- |
| Mobile | &lt; 768px (`max-width: 767.98px`) | `use-is-mobile.ts` — viewer hides desktop chrome, tap navigation |
| Tablet / desktop | ≥ 768px | Full inspector rails, thumbnail strip |
| Marketing | Tailwind `sm`/`md`/`lg`/`xl` | Responsive landing sections — no horizontal overflow |

Container: shell uses full viewport; slide canvas fixed 1920×1080 scaled in viewer — see § Canvas.

## Component states (shell)

When extending composed UI, document in US acceptance:

| State | Expectation |
| ----- | ----------- |
| Default | Semantic tokens only |
| Hover / focus | Visible focus ring (`ring`), `:focus-visible` |
| Disabled | `disabled` + muted styles from primitives |
| Error | `data-invalid` / `aria-invalid` on fields |
| Loading | `Skeleton` or explicit loading prop — no fake pulse divs |

## Components map

| Area | Path | Notes |
| ---- | ---- | ----- |
| Primitives | `packages/core/src/app/components/ui/*` | Read-only generated |
| Composed (feature) | `inspector/*`, `present/*`, `overview-grid.tsx`, … | Prefer compound/context pattern |
| Slide exports | `ImagePlaceholder`, `MorphElement`, `@open-slide/core` | Public API |
| Showcase (planned) | TBD routes under demo or web | `/design-showcase` — not blocking `09` draft |

## Canvas (slides)

| Constant | Value |
| -------- | ----- |
| Default | 1920 × 1080 (`sdk.ts`) |
| Alt | `meta.format` / `SlideCanvasFormat` |

Shell: `use-is-mobile.ts`; sem overflow horizontal em sidebars.

## Do's and don'ts

- Do: `DesignProvider` em dev; compor fora de `ui/`.
- Do: citar este doc em US com acceptance visual.
- Don't: hex hardcoded no shell; quebrar safe area do slide sem atualizar skill de authoring.

## Gate

Human `approved` before Must US with visual acceptance ship.
