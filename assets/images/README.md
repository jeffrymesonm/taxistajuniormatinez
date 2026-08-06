# Image slots

Every `<img>` on the site points at a file in this folder and **removes itself if the
file is missing**, falling back to built-in gradient art. Nothing ever shows a broken
image. Drop a real photo in with the exact filename below and it appears automatically —
no code change needed.

JPG, sRGB, quality ~72, keep each under 250 KB.

## Filled (2026-08-06, from client-supplied WhatsApp photos)

| Filename | Used in | Source |
|---|---|---|
| `hero.jpg` | Hero background (landscape viewports) | Aerial shot of the Toyota Sienna in a tropical driveway. Cropped 16:9. |
| `hero-mobile.jpg` | Hero background (portrait viewports) | Same source photo, kept in its native 9:16 portrait. See note below. |
| `og-cover.jpg` | Social sharing preview | The Sienna parked beside a "TAXI" booth, street-level — clearest single frame for a link preview. Cropped ~1.9:1. |
| `junior-driver.jpg` | About section | Selfie of Junior in his yellow "Taxi S/C & A" polo. Night shot, tight crop — not the ideal "beside the car, daylight" brief below, but it's the only real photo of him on file. Replace with a proper daylight portrait when available. |
| `sosua.jpg` | Destinations | The "SOSÚA" landmark sign. Cropped 800×500 around the sign. |
| `cabarete.jpg` | Destinations | Kitesurfers over Cabarete beach. Source was `.webp` — converted to JPEG. Polished/professional-looking shot; **source/rights unconfirmed**, see note below. |
| `puerto-plata.jpg` | Destinations | The Christ statue atop Pico Isabel de Torres (cable car), city and bay below. |
| `cofresi.jpg` | Destinations | Cofresí beach with the Costambar coastline. |
| `rio-san-juan.jpg` | Destinations | Laguna Gri-Gri — boats on the lagoon. |
| `punta-rucia.jpg` | Destinations | Aerial of the Cayo Arena sandbank. Polished/professional-looking aerial shot; **source/rights unconfirmed**, see note below. |
| `santiago.jpg` | Destinations | Monumento a los Héroes de la Restauración. |
| `pop-airport.jpg` | Destinations | The Aerodom plane monument at the Gregorio Luperón International Airport entrance sign. |

**The hero needs two crops.** The hero section copies the shape of the viewport: wide
on a desktop, tall and narrow on a phone. `object-fit: cover` fills the box and throws
away the rest, so a single 16:9 file loses ~78% of its width on a phone and the vehicle
survives only as a strip. `index.html` therefore serves `hero-mobile.jpg` (9:16, close to
a phone's own proportion) to any viewport taller than it is wide, and `hero.jpg` (16:9)
to landscape ones. The switch is `<source media="(max-aspect-ratio: 1/1)">` — chosen by
viewport *shape*, not width, because a 768px tablet held upright has the same problem as
a phone. If you replace either file, keep its aspect ratio or the crop logic breaks.

**Source/rights note (2026-08-06):** `cabarete.jpg` and `punta-rucia.jpg` look like
professional or stock photography rather than personal snapshots — polished framing,
drone-quality aerial in the Punta Rucía shot. The site's own rule below exists because
copied photos are a legal risk. Confirm with the client that these are their own photos
or properly licensed before this goes live; swap for a personal photo otherwise.

## Still open (gradient placeholder until filled)

None. Every `<img>` slot referenced in `index.html` — hero, driver, all 9 destination
cards, og-cover, and the 6-photo excursions gallery — has a real photo as of
2026-08-06.

`gaspar-hernandez.jpg` and the `fleet-*.jpg` set listed in earlier revisions of this file
are not referenced by any `<img>` in `index.html` — there is no fleet gallery section on
the page currently, so those filenames do nothing if added. Ignore them unless that
section gets built.

## Excursions gallery (added 2026-08-06)

`index.html` has an `#excursions` section (six `.frame.frame--wide` tiles, 4:3) that
backs the "Excursions & Day Trips" service with real trip photos. Filled from the
client's buggy/ATV excursion photos:

| Filename | Caption |
|---|---|
| `excursion-buggy-splash.jpg` | Buggy safari · off-road trails |
| `excursion-buggy-family.jpg` | Family buggy tour |
| `excursion-atv-convoy.jpg` | ATV convoy · jungle roads |
| `excursion-buggy-mud.jpg` | Mud pit crossing |
| `excursion-buggy-river.jpg` | River crossing |
| `excursion-atv-group.jpg` | Group ATV excursion |

Same rules as above: JPG, ~72 quality, 4:3, under 250 KB. Swap any of these by keeping
the filename — no code change needed. Captions live in `assets/js/i18n.js` under the
`xgal.*` keys (English is in `index.html` directly).

## Rules

- **Use your own photos.** Do not pull images off Google — stock photos of the wrong
  country are obvious to travellers, and copied photos are a real legal risk.
- Phone photos are fine if taken in daylight and held steady. Authentic beats polished.
- Compress before uploading: <https://squoosh.app> — drag in, export MozJPEG at ~72.
- Keep the exact filenames. The site looks for these names.
