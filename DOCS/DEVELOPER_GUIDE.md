# Developer guide

_Last updated: 2026-07-28T14:20:00Z_

## Stack

Static HTML, CSS and vanilla ES5-compatible JavaScript. No build step, no package
manager, no runtime dependencies. Three external requests total: one Google Fonts
stylesheet (Epilogue + DM Sans, both variable), its font files, and the Google Maps
iframe (lazy-loaded).

## Architecture

```
index.html          Structure + all English copy (the SEO source of truth)
assets/css/         One stylesheet, mobile-first, sectioned by comment banners
assets/js/i18n.js   Spanish dictionary + language switching. Loads FIRST.
assets/js/main.js   CONFIG, RATES, and all behaviour. Loads SECOND.
```

Load order matters. `i18n.js` swaps `data-wa` attributes on `DOMContentLoaded`;
`main.js` then reads those attributes to build the `wa.me` links. Both use `defer`, so
they execute in document order.

## Data flow

`RATES` in `main.js` is the single source of truth for prices. Two consumers:

1. **Fare calculator** (`initFare`) — populates two grouped `<select>`s, computes the
   price, writes the WhatsApp message.
2. **Quote form** (`initQuoteForm`) — feeds the `<datalist>` for pick-up/drop-off.

The searchable 54-row rate table and the fleet gallery were removed from the page on
2026-07-28; their CSS, JS and Spanish strings were removed with them. The `a` (search
alias) field on each `RATES` entry is now unread — it is kept because it is original
client data transcribed from the price board, not code.

### The pricing rule

The board is authored as "Sosúa ↔ X", so a fixed price exists only when one endpoint is
`CONFIG.hubId` (`'sosua'`). Any other pair returns `null` and the UI shows "Ask Junior".
The site never renders an invented price.

## Images

Every `<img>` has an inline `onerror` that removes itself and flags its container, which
reveals a CSS gradient placeholder. This means a missing photo degrades to intentional
art rather than a broken-image icon. Placeholder styling lives under
`.frame--empty, .dest__media.is-empty, .veh__media.is-empty`.

## i18n

- Translatable nodes carry `data-i18n` (textContent) or `data-i18n-html` (innerHTML,
  for inline `<em>` and `<br>`).
- On first `apply()`, the English content of every keyed node is captured into `EN`, so
  ES → EN restores exactly. English is never stored twice.
- `data-i18n-ph` handles input placeholders.
- WhatsApp messages are swapped via the `WA_ES` map, keyed by the English string, so
  buttons need no extra attributes.
- `main.js` builds some strings at runtime (fare button, rate rows, form body). Those
  read `I18N.t()` or branch on `isES()`. A `langchange` CustomEvent re-renders them.

Adding a translated string: add the key to `ES`, add `data-i18n="key"` to the element.

## Design system

Visual direction follows the reference site the client selected
(`travelexpress.ae`), re-implemented rather than copied:

| Element | Value |
|---|---|
| Display face | Epilogue 600–800, tracking −.03em |
| Body face | DM Sans 400–700 |
| Accent | `--brand` `#FF3600` — the only hot colour; carries every CTA |
| Ground | White and `--brand-tint` `#FFF8F6` alternating bands |
| Dark bands | `--ink` `#040401` with a radial orange bloom (`.section--dark`) |
| Radii | 12 / 18 / 26px, hero panel up to 40px |
| Signature CTA | Pill plus a detached circular arrow badge, drawn as `.btn::after` |
| Destination tile | Full-bleed photo, title overlaid, circular arrow badge bottom-right |
| Hero | Inset rounded panel with the fare card riding over its bottom edge |

WhatsApp green (`--wa`) survives only on the floating button, where the colour is how
people recognise the affordance. Every other CTA is accent orange and keeps the
WhatsApp glyph so the destination stays legible.

Two defects in the reference were deliberately **not** reproduced: its transparent
header leaves the logo and nav illegible over photography further down the page, and
its hero headline sits white-on-bright-sky. Here the header is solid white from the
first pixel and the hero artwork is an inset panel, so the two never overlap.

## Motion system

Follows Emil Kowalski's design-engineering principles (`.claude/skills/emil-design-eng`).

| Rule | Applied |
|---|---|
| Only `transform` / `opacity` | Every transition except the FAQ disclosure, which genuinely needs size |
| Custom easing, never built-ins | `--ease-out`, `--ease-drawer` in `:root` |
| Never `ease-in` on UI | Not used anywhere |
| UI under 300ms | `--t-press` 140ms, `--t-hover` 180ms, `--t-ui` 220ms, `--t-panel` 280ms |
| Marketing may run longer | `--t-reveal` 620ms for scroll reveals only |
| Press feedback | `.btn:active` scale(.97), plus burger, language switch, choices, contact cards, floating button |
| Press ≠ entrance timing | The floating button arrives over 280ms but answers a press in 140ms |
| Never animate from `scale(0)` | Mobile nav enters at `scale(.97)` + opacity |
| Origin-aware | Mobile nav has `transform-origin: top right` (its trigger) |
| Transitions over keyframes | Nav, floating button, cards and the FAQ — all interruptible |
| Blur to mask a crossfade | `.fare__readout.is-updating` blurs 140ms in, settles 220ms out, text swaps at the 150ms peak |
| Stagger 30–80ms | `--d` set per item in `[data-stagger]`, capped at 8 items × 60ms |
| Hover gated | Every `:hover` sits inside `@media (hover: hover) and (pointer: fine)` |
| Reduced motion | Movement removed, fades and colour kept |

### Anchor scrolling

`--head-h` holds the sticky header's height (74px, 64px below 720px). The hero offset
and `html { scroll-padding-top }` both read it, so nav links always land the section
title below the header and the hero can never drift out of alignment with it.

### The FAQ disclosure

Animated entirely in CSS via `::details-content` + `interpolate-size: allow-keywords`,
behind an `@supports` guard. This replaced a WAAPI height animation that kept `open`
state in a JS closure and flipped it from the animation's finish callback — that design
had to keep the running animation, the `open` attribute and a "closing" flag in sync,
and a click mid-animation had to cancel and re-derive all three. A CSS transition
retargets from wherever the panel is, so the `open` attribute stays the only state.
Browsers without `::details-content` snap open, which is native `<details>` behaviour.

### The fare-line car

The small car icon travels the dashed route line whenever the route changes. It resets
with `transition: none`, forces a reflow, then animates to the line's end on
`--ease-drawer`. Under `prefers-reduced-motion` it jumps to the same end position in one
frame rather than being left stranded at the start.

## Scroll reveal

One `IntersectionObserver`, `threshold: 0.08`, `rootMargin: '0px 0px -12% 0px'`, and
`unobserve` after firing — each element reveals once and is then forgotten. Under
`prefers-reduced-motion` or without IO support, everything is made visible immediately.

## Accessibility

- Skip link, visible `:focus-visible` rings (3px accent, 3px offset) on all interactives
- `aria-expanded` / `aria-label` maintained on the burger; Escape and outside-click close
- The closed mobile drawer is `visibility: hidden`, so Tab cannot reach links that are
  not on screen — opacity alone left them focusable
- `aria-live="polite"` on the fare readout so price changes are announced
- `role="status"` on the quote-form hint so validation errors are announced, not just seen
- `aria-pressed` on the language buttons
- Radio choices use real inputs with `:focus-visible` forwarded to the styled `<span>`
- Icons are `aria-hidden`; every icon-only link carries an `aria-label`
- Destination tiles overlay type on client photography, so each carries a fixed
  top-to-bottom scrim rather than relying on the image being dark enough

## Browser support

Modern evergreen browsers. `backdrop-filter` degrades to a solid background. The
JavaScript is ES5-syntax with `var` and no arrow functions, so it parses everywhere;
the only modern APIs used are `IntersectionObserver` and `CustomEvent`, both with
graceful fallbacks.
