# PROJECT_INFO

_Last updated: 2026-08-06T13:00:00Z_

| Field | Value |
|---|---|
| Project | Junior Martinez Transfer — marketing website |
| Business | Private taxi and airport transfers, Sosúa, Puerto Plata, Dominican Republic |
| Owner | Junior Martinez |
| Goal | Generate WhatsApp bookings |
| Stack | Static HTML + CSS + vanilla JavaScript (ES5 syntax) |
| Dependencies | None |
| Build command | None |
| Package manager | None |
| Fonts | Epilogue + DM Sans, both variable (Google Fonts, one request) |
| Languages | English (primary, SEO source of truth), Spanish (runtime layer) |
| WhatsApp | +1 (829) 299-1661 → `assets/js/main.js` → `CONFIG.waNumber` |
| Email | info@juniormartineztransfer.com *(placeholder — confirm)* |
| Domain | juniormartineztransfer.com *(placeholder — not yet registered)* |
| Deploy target | Any static host (Netlify / Cloudflare Pages / Vercel / cPanel) |
| Backend | None. The quote form composes a WhatsApp link client-side. |
| Analytics | None installed |
| Entry point | `index.html` |
| Price data | `assets/js/main.js` → `RATES` (54 destinations, US$, 1–6 pax, from Sosúa) |
| Design reference | travelexpress.ae — Epilogue/DM Sans, #FF3600 accent, see `DOCS/DEVELOPER_GUIDE.md` |
| Spanish copy | `assets/js/i18n.js` → `ES` |
| Image slots | `assets/images/` — every `<img>` slot referenced in `index.html` is filled with a real photo (hero, driver, all 9 destinations, og-cover, 6-photo excursions gallery). See that folder's README. |
| Cache busting | `?v=N` on the CSS and JS links; currently `v=14`. **Bump on every change** — a stale `?v` silently serves the old file. |
