# Proof of work

Append-only build log. UTC timestamps.

---

## 2026-07-27T21:52:00Z — Initial build

### Requested

A modern, high-converting, responsive bilingual site for Junior Martinez Transfer
(private taxi / airport transfers, Sosúa, Dominican Republic). Ten sections, SEO copy
and meta, multiple WhatsApp CTAs, floating WhatsApp button, Google Maps, vehicle gallery,
pricing request form, mobile-first. Animation per the `emilkowalski/skill` skill set.
English primary, Spanish secondary.

### Inputs supplied by the client mid-build

- WhatsApp / phone: **+1 (829) 299-1661**, owner **Junior Martinez**
- Photograph of the physical rate board — 54 destinations, prices in US$, all measured
  from/to Sosúa, valid for 1–6 passengers per vehicle
- `npx skills add emilkowalski/skill` → installed 8 skills into `.agents/skills/`
- "add spanish too but english is the main language"
- "tambien debe tener una version para movil"

### Delivered

**Design direction** — Fraunces (display) / Instrument Sans (body) / JetBrains Mono
(data). Navy + sky blue + amber on white. The gold reads as Dominican amber: Puerto
Plata is the Amber Coast, and Fraunces descends from Windsor, echoing the town's
Victorian gingerbread architecture.

**Signature element** — "the fare line": a route strip in the hero where pick-up and
drop-off compose a live fixed price from the real rate board, and the resulting WhatsApp
message. A small car drives the dashed line on each change.

**Sections built** — header, hero + fare line, trust strip, about, services (6 cards),
CTA band, why-choose-us (7 reasons), destinations (9 cards), CTA band, full 54-row
searchable rate board, fleet gallery (6), CTA band, reviews (6), quote form, FAQ (8),
finale CTA, contact + map, footer, floating WhatsApp button.

**Bilingual** — English in `index.html` as the SEO source of truth; Spanish dictionary in
`i18n.js` covering ~200 keys plus 23 pre-written WhatsApp messages, meta title and
description. Auto-detects Spanish browsers, EN/ES switch in the header, choice persisted.

### Files created

```
index.html
assets/css/styles.css
assets/js/main.js
assets/js/i18n.js
assets/images/README.md
robots.txt
sitemap.xml
README.md
DOCS/SEO.md
DOCS/DEVELOPER_GUIDE.md
DOCS/USER_MANUAL.md
DOCS/DEPLOYMENT.md
DOCS/FOLDER_STRUCTURE.md
DOCS/PROOF_OF_WORK.md
tasks/todo.md
```

Files modified: none pre-existing. Files deleted: none.

### Defects found and fixed during the build

| Defect | Fix |
|---|---|
| Typo'd hex values (`#0B2murky`) in the hero gradient | Replaced with `#061527` |
| `.strip { height: 0 }` overlap hack overlapped the following section | Replaced with a negative `margin-top`, element stays in flow |
| Fare-line car collided with the swap button and the drop-off field | Swap moved into the card header; car travel capped at `lineWidth − 17px` |
| Fare card cramped inside the 42rem copy column | Moved out of `.hero__copy` as a sibling with its own 60rem max-width |
| Duplicated, conflicting `.fare__swap` rules in the ≥720px media query | Consolidated to one block |
| Mobile header: brand text wrapped over three lines, burger pushed off-screen | Tagline hidden <720px, brand text hidden <480px, WhatsApp becomes icon-only |
| FAQ `.qa__body` used `grid-template-rows`, incompatible with the WAAPI height animation | Changed to `overflow: hidden` |

### Verification (Playwright, Chromium)

Ran against `python -m http.server` at 1440×1000 and 390×844.

- Console: **zero JavaScript errors**. The only console entries are 404s for the
  not-yet-supplied photos, which the `onerror` fallback converts to gradient art.
- Rate board renders **54 rows**; fare selects render **54 options** each.
- Fare pricing: POP → Sosúa = `≈ 15 min / US$25`. Sosúa → Punta Cana = `≈ 6 h / US$400`.
  Both match the client's board.
- Custom route (POP → Cabarete, neither endpoint Sosúa) correctly refuses to invent a
  price: shows "Custom route / Ask Junior / Get this price".
- Swap button round-trips `[pop, sosua]` → `[sosua, pop]`.
- Rate search: query "cayo" matches "Punta Rucia" via its alias list.
- Quote form: invalid submit is blocked, shows the error hint, and does **not** open
  WhatsApp. Valid submit produces the correct multi-line message.
- Language: `apply('es')` swaps `<html lang>`, title, meta description, body copy and the
  WhatsApp message text; `apply('en')` restores English exactly.
- Mobile nav: opens with `aria-expanded="true"` and label "Close menu"; closes on
  outside click.
- FAQ accordion opens and animates.
- WhatsApp deep link verified as `https://wa.me/18292991661?text=...`.

### Deliberately not done

- **Review / AggregateRating schema was not added.** The six testimonials are written
  samples, not real customers. Marking them up would submit fabricated reviews to Google.
  Documented in `DOCS/SEO.md`.
- **No photos supplied**, so no stock imagery was substituted. Every image slot falls
  back to gradient art and `assets/images/README.md` specifies exactly what to shoot.

### Open items for the client

1. Confirm the **La Romana US$300** row — it was partly hidden behind a tree in the
   source photo; the name was inferred from alphabetical position.
2. All **drive times are estimates**, labelled "≈". Correct any that are wrong.
3. The photographed rate board carries another company's name, website and phone
   numbers. Only the prices were used, on the client's statement that these are their
   rates. Flagged for the client's judgement before publishing.
4. Replace sample testimonials with real ones.
5. Set the real domain and email address.

---

## 2026-07-28T14:20:00Z — Motion/craft pass, then redesign to the client's reference

### Requested

Two instructions, in order: apply the `emil-design-eng` skill and optimise the page as
a senior front-end designer; then analyse `travelexpress.ae` and adopt its design.

### Part 1 — audit and fixes

| Defect | Fix |
|---|---|
| Anchor links landed section titles underneath the sticky header | `--head-h` token + `scroll-padding-top` on `html` |
| Hero offset hard-coded `-74px` while the mobile header is 64px — a 10px misalignment below 720px | Both now read `--head-h` |
| `prefers-reduced-motion` set every `transition-duration` to `.01ms`, killing the fades the preference is meant to keep — the file's own comment said otherwise | Whitelisted `opacity`/colour/shadow/filter at 150ms, dropped `transform` |
| Header background faded over 280ms while brand text, burger bars and the language pill snapped colour instantly | Matching `--t-panel` colour transitions on all four |
| Floating WhatsApp button used its 280ms entrance duration for press feedback | `:active` now answers in `--t-press` 140ms |
| Closed mobile drawer was `opacity: 0` only — Tab still reached the links | `visibility: hidden`, delayed out so the fade still plays |
| Contact cards and card links had no press state (no hover exists on touch) | `scale(.985)` on `.cx`, arrow nudge on `.link:active` |
| Blur-through swapped the fare text at 150ms while the blur ran 180ms, so the number changed mid-blur | 140ms in / 220ms out, text swaps at the blur peak |
| Fraunces was requested without its `SOFT`, `WONK` and `ital` axes, so every heading's declared variation settings were inert and every `<em>` was a faux-slanted roman | Superseded by Part 2 |
| Under reduced motion the fare car was left parked at the start of the route it never travelled | Now jumps to the end position in one frame |
| Rate table, fleet gallery and trust strip had been removed from `index.html`, leaving ~110 lines of CSS/JS, 3 sprite symbols and 40 Spanish keys unreferenced | Removed after confirming with the client that the removal was intentional |
| FAQ accordion kept `open` state in a JS closure across a WAAPI animation, a cancel flag and the `open` attribute | Replaced with a CSS `::details-content` transition; `initFaq` deleted |

### Part 2 — redesign to `travelexpress.ae`

Extracted their system: Epilogue 700 + DM Sans, `#FF3600` on white and `#FFF8F6`,
large radii, pill CTAs with a detached circular arrow badge, full-bleed photo tiles
with the title overlaid, and a booking bar riding the bottom edge of a rounded hero
panel. All re-implemented against Junior's content and existing motion system.

The signature CTA badge is drawn as `.btn::after`, so all seven CTAs inherit it with
no markup change.

**Not copied:** their header is transparent over photography and leaves the logo and
nav illegible on scroll, and their hero headline is white on a bright sky. Here the
header is solid white from the first pixel and the hero is an inset panel, so artwork
and navigation never overlap.

**Kept deliberately:** WhatsApp green survives only on the floating button, where the
colour is the affordance. Every other CTA is accent orange with the WhatsApp glyph.

### Correction made during this session

The FAQ rework was initially justified by a claim that Chrome does not fire WAAPI
`finish` when `<details>` reveals content in the same frame. That conclusion came from
headless measurements where `requestAnimationFrame` did not tick during `page.evaluate`,
which made the timing data unreliable. The rewrite still stands on its own merits —
one source of truth instead of three, interruptible by construction — and the code
comment was corrected to say so rather than assert a browser bug.

### Files modified

```
index.html                  fonts, palette, favicon, theme-color, CTA classes,
                            sprite cleanup, role="status", section--dark
assets/css/styles.css       full design-system rewrite + every motion fix above
assets/js/main.js           initRates/refreshRates/rateMessage/initFaq removed,
                            driveCar reduced-motion path
assets/js/i18n.js           49 unreferenced Spanish keys and 2 WhatsApp messages removed
DOCS/DEVELOPER_GUIDE.md     design system, motion, a11y and FAQ sections rewritten
DOCS/PROOF_OF_WORK.md       this entry
PROJECT_INFO.md, README.md, tasks/todo.md
```

Files deleted: none.

### Verification

Browser checks ran against `python -m http.server` at 1440×1000 and 390×844 until the
client asked that Playwright not be used; the remainder was verified by inspection.

Confirmed in-browser before that point:

- Console clean — the only entries are 404s for the not-yet-supplied photos, which the
  `onerror` fallback converts to gradient art
- Fraunces italic resolved to a real loaded face and `SOFT`/`WONK` became active
  (that pass was later superseded by the Epilogue/DM Sans switch)
- Header measured 74px against `--head-h` 74px on desktop and 64px against 64px on
  mobile — the pre-existing 10px hero misalignment gone
- Nav anchor landed `#faq` clear of the header
- FAQ toggled cleanly across four consecutive clicks
- Fare: POP → Sosúa `≈ 15 min / US$25`; Sosúa → Cabarete `US$15`; POP → Cabarete
  correctly refuses to invent a price and shows "Ruta especial / Consultar"
- Mobile drawer `hidden` → `visible` → `hidden`, `aria-expanded` tracking
- No horizontal overflow at 390px
- 22 CTAs resolved to `wa.me/18292991661`, none left unwired

Verified by inspection after that point:

- `node --check` passes on both JS files
- No undefined and no unused CSS custom properties
- Every `data-i18n` key in the HTML has a Spanish translation; no orphan keys remain
- Every `data-wa` message has a Spanish counterpart; no orphan WhatsApp strings
- No references to the retired palette, fonts or removed sections survive anywhere

### Not verified

The redesign's rendered result was checked visually only as far as the hero, about and
services sections. Destinations, reviews, quote form, FAQ, finale, contact and footer
were restyled and are structurally sound, but have not been seen rendered. Worth a
look in a browser before publishing.

---

## 2026-07-28T14:40:00Z — "Why choose us" loses its card treatment

### Requested

Client screenshot of the mobile view with "elimina los card para que se vea así".
Ambiguous — the reason tiles were partly in frame, so it was unclear whether they were
the target or the thing to keep. Confirmed with the client: remove the box, keep the
text.

### Changed

`.reasons` was a 1px-gap grid over a light background, which drew hairline dividers,
and each `.reason` painted its own `--ink` fill — six boxes around six short
paragraphs. Both removed; the reasons now sit directly on the dark band and grouping
is done with spacing (`clamp(1.8rem, 4vw, 2.8rem)` row gap).

Two consequences handled:

- The hover state tinted the tile background. With no tile, the icon alone now
  acknowledges the cursor.
- The icon colour moved from `--brand` to `--brand-lift`, matching the accent the
  section's own heading uses and holding up better on a near-black ground.

Files modified: `assets/css/styles.css`, `index.html` (cache version only, now `v=11`).

### Verification

By inspection, at the client's request not to use Playwright: no undefined or unused
CSS custom properties, no HTML class left without a rule. The rendered result has not
been seen — same caveat as the previous entry.

---

## 2026-07-28T14:55:00Z — Fare card de-boxed; brand mark fixed

### Requested

"quita este card tambien y el logo no se ve", with a mobile screenshot of the hero.

### 1. The logo was invisible, not merely faint

`<text>JM</text>` in the brand mark carried no `fill`. SVG's default fill is black, and
`.brand__mark` paints a `--ink` (#040401) background — so the wordmark was black on
near-black. Only the underline path and dot showed, because those use `currentColor`.
Added `fill="currentColor"`, which picks up the mark's accent colour.

This predates the redesign: the old `--midnight` (#08192F) ground hid it just as well.

### 2. Fare card

Read as the same operation as the previous change — remove the box, keep the controls —
since the request said "también". The white card, its radius, padding and shadow are
gone, along with the negative margin that made it overhang the hero panel.

Moving the controls onto the dark artwork meant re-inverting everything the white card
had been carrying:

| Element | Before | After |
|---|---|---|
| Field wells | `--mist` fill, `--line-soft` border | `rgba(255,255,255,.07)` + `.16` border, blurred |
| Field focus | border `--brand`, fill white | border `--brand-lift`, fill `rgba(255,255,255,.12)` |
| Select text and chevron | inherited ink, `#616161` chevron | `#fff` and a white chevron |
| Micro-labels | `--muted-lite` | `rgba(255,255,255,.55)` |
| Price | `--brand` | `--brand-lift` — the saturated orange dulls on near-black |
| Dashed rules | `--line` | `rgba(255,255,255,.22–.28)` |
| Note | `--muted-lite` | `rgba(255,255,255,.5)` |

One easy-to-miss consequence: `<option>` and `<optgroup>` are rendered by the OS, not
by this stylesheet. Setting the `<select>` to white text would have left the open
dropdown white-on-white, so both are pinned to ink-on-white explicitly.

The hero's `padding-bottom: 0` and `overflow: visible` existed only to let the card
overhang; both restored to normal now that nothing breaks out of the panel.

Files modified: `index.html`, `assets/css/styles.css`. Assets at `v=12`.

### Verification

By inspection: no undefined or unused custom properties, no HTML class without a rule,
and no light-surface token (`--mist`, `--line-soft`, `--paper`, `--muted-lite`) left
inside the `.fare` block. Not seen rendered.

---

## 2026-07-28T15:05:00Z — Hero panel goes full-bleed

### Requested

"quita este tambien", with a mobile screenshot of the hero. Read as the dark rounded
panel: the request was singular ("este"), the fare card inside it had already been
de-boxed the step before, and the screenshot framed the panel with its white gutter
visible on all four sides.

### Changed

`.hero` was an inset rounded card — `margin: .75rem var(--gut) 0` plus
`border-radius: var(--r-hero)` on both the section and `.hero__bg`. All removed. The
artwork now runs edge to edge and matches `.section--dark`, the page's other dark band,
so the hero is no longer the odd one out.

Two follow-ons:

- `--r-hero` existed only for that panel and is retired.
- The hero briefly carried `padding: … var(--gut) …`, which double-inset its content:
  the inner `.wrap` already subtracts `var(--gut) * 2` from its own width. Changed to
  `padding-block` only, matching how every other full-bleed section works.

The white-on-dark treatment, the radial orange bloom and the centred composition are
unchanged.

Files modified: `assets/css/styles.css`, `index.html` (cache version, now `v=13`).

### Verification

By inspection: no undefined or unused custom properties, no HTML class without a rule,
hero copy still width-constrained. Not seen rendered.
