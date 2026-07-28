# SEO — Junior Martinez Transfer

_Last updated: 2026-07-27T21:52:00Z_

---

## Meta

**SEO Title** (54 characters)

```
Taxi Sosúa & Puerto Plata Airport Transfers | POP 24/7
```

**Meta Description** (152 characters)

```
Private taxi in Sosúa and airport transfers to Puerto Plata (POP). Fixed prices,
English-speaking licensed drivers, A/C vehicles. Book on WhatsApp 24/7.
```

**Open Graph Title**

```
Junior Martinez Transfer — Taxi Sosúa & POP Airport Transfers
```

**Open Graph Description**

```
Safe, punctual private transfers on the North Coast. Puerto Plata Airport (POP),
Sosúa, Cabarete and beyond. Fixed prices. Book in 60 seconds on WhatsApp.
```

**Spanish variants** (swapped at runtime by `assets/js/i18n.js`)

```
Title: Taxi Sosúa y Traslados Aeropuerto Puerto Plata (POP) 24/7
Desc:  Taxi privado en Sosúa y traslados al aeropuerto de Puerto Plata (POP).
       Precios fijos, choferes con licencia, vehículos con A/A. Reserva por WhatsApp 24/7.
```

---

## Heading hierarchy

One `H1`. Every section owns exactly one `H2`. Cards use `H3`.

```
H1  Land at POP. Someone is already waiting.
    ("Private Taxi & Airport Transfers in Sosúa" is carried by the title + meta;
     the H1 earns attention instead of repeating the tag verbatim)

H2  Why travellers on the North Coast ride with Junior         → #about
H2  Transfer services across the Dominican North Coast         → #services
      H3 Airport Transfers / Private Taxi / Hotel & Villa Transfers
      H3 Excursions & Day Trips / VIP & Hourly Driver / Long-Distance Transfers
H2  Still deciding? Just ask the price.                        → CTA band 1
H2  Seven reasons your ride goes exactly to plan               → #why
      H3 Licensed Drivers / Comfortable Vehicles / Ice-Cold A/C / Punctual Service
      H3 Fixed Prices / English & Spanish / Available 24/7
H2  Where the North Coast actually goes                        → #destinations
      H3 Puerto Plata Airport / Sosúa / Cabarete / Puerto Plata / Cofresí & Costambar
      H3 Río San Juan / Gaspar Hernández / Punta Rucia / Santiago
H2  Going somewhere not on the list?                           → CTA band 2
H2  Fixed transfer prices from Sosúa                           → #rates
H2  Cool, clean and ready at the kerb                          → #fleet
      H3 Private Sedan / SUV / Minivan / Interior / Luggage space / Meet & greet
H2  Travelling with a big group?                               → CTA band 3
H2  What passengers say after the first ride                   → #reviews
H2  Get your fixed price in one message                        → #quote
H2  Questions travellers ask before they book                  → #faq
H2  Your driver is already awake.                              → finale CTA
H2  Contact Junior Martinez Transfer                           → #contact
      H3 Services / Destinations / Contact                     → footer columns
```

---

## Keyword placement

| Keyword | Where it lands |
|---|---|
| Taxi Sosua | Title, meta, H2 (#rates), services copy, footer keyword line, schema |
| Airport Transfer Puerto Plata | Title, meta, OG, H2 (#services), service card 1, schema `serviceType` |
| Puerto Plata Airport Taxi | Destination card H3 + body, rates table row, footer |
| POP Airport Transfer | Title, H1, hero eyebrow, trust strip, FAQ 6, rates table |
| Taxi Dominican Republic | Footer keyword line, schema `areaServed`, about copy |
| Taxi Cabarete | Destination card H3, rates table, services copy, footer |
| Private Transfer Sosua | H2 (#services), about copy, hero sub |
| Airport Shuttle Puerto Plata | Service card 1 body, FAQ 6 |
| North Coast DR Transportation | H2 ×2, about section, long-distance card |
| Hotel Transfers Sosua | Service card 3 (H3 + body), rates table (13 Sosúa-area rows) |
| Private Driver Dominican Republic | VIP service card, footer keyword line |
| Airport Taxi POP | Hero, trust strip, destination card 1, schema |

### Long-tail coverage

The rates table renders **54 destination rows**, each with a name, drive time and price.
That single section targets dozens of long-tail queries — "taxi sosua to las terrenas
price", "sosua to punta cana transfer cost", "how much taxi sosua airport" — without any
extra pages. It is the highest-value SEO asset on the site.

---

## Structured data

Two JSON-LD blocks in `index.html`:

1. **`TaxiService`** — name, telephone, email, `priceRange`, currencies, payment,
   `areaServed` (6 entries), `serviceType` (6 entries), `availableLanguage` (en, es),
   and a nested `LocalBusiness` provider with address, geo coordinates and 24/7
   `openingHoursSpecification`.
2. **`FAQPage`** — the six FAQ questions from the brief, eligible for FAQ rich results.

### Deliberately omitted: `AggregateRating` / `Review`

The six testimonials on the page are **written samples, not real customers**. Marking
them up as `Review` would be submitting fabricated reviews to Google — against their
guidelines and a manual-action risk. Once real reviews exist, add the markup and cite
the source (Google Business Profile, TripAdvisor).

---

## Technical

- `lang` attribute updates on language switch (`en` ↔ `es`)
- `hreflang` alternates for `en`, `es` and `x-default`
- `canonical` set
- `robots.txt` + `sitemap.xml` present
- Single-request font load, `display=swap`, both preconnected
- Zero JS dependencies — no framework, no jQuery, no analytics bloat
- Below-the-fold images `loading="lazy"`; the hero image is `fetchpriority="high"`
- All images carry descriptive `alt` text
- `geo.region` / `geo.placename` for local search

---

## Next steps to actually rank

The page is technically ready. Ranking for "taxi sosua" needs off-page work:

1. **Google Business Profile** — the single biggest lever for local transport. Claim it,
   set the service area, add photos, and link this site.
2. **Real reviews** on that profile. Ask every satisfied passenger. Then add the review
   schema.
3. **Listings** — TripAdvisor, DR travel forums, Sosúa/Cabarete Facebook groups.
4. **Villa and hotel partners** — a link from each property that recommends Junior is
   worth more than any on-page tweak.
5. Verify the site in Google Search Console and submit `sitemap.xml`.
