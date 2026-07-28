# Junior Martinez Transfer — website

Bilingual (EN/ES) single-page marketing site for a private taxi and airport transfer
service based in Sosúa, Dominican Republic. Every path through the page ends in a
pre-written WhatsApp message.

No build step, no framework, no dependencies. Open `index.html` and it runs.

---

## The three files you will ever need to edit

| To change… | Edit | Where exactly |
|---|---|---|
| Phone, WhatsApp, email | `assets/js/main.js` | `CONFIG` object, top of file |
| Any price or destination | `assets/js/main.js` | `RATES` array, right below CONFIG |
| Any Spanish wording | `assets/js/i18n.js` | `ES` dictionary |
| Any English wording | `index.html` | English is the source of truth |

Change a price once in `RATES` and it updates the hero fare calculator, the quote
form's location list, and the WhatsApp message text.

---

## Before this goes live

1. **Add photos.** See [`assets/images/README.md`](assets/images/README.md) — exact
   names listed. Until then the site shows built-in gradient art and never looks
   broken. The single most valuable one is `junior-driver.jpg`: a real photo of Junior.
   The destination cards now overlay their title on the photo, so pick images with a
   calm top-left and bottom edge.
2. **Check every price** in `RATES` against the current board. They were transcribed
   from your photographed sign — see "Known items to confirm" below.
3. **Replace the testimonials.** The six reviews in the Reviews section are written
   samples, not real customers. Swap in real quotes before launch. Review schema markup
   was deliberately left out of the page so nothing false is submitted to Google.
4. **Set the real domain.** Search and replace `juniormartineztransfer.com` in
   `index.html`, `robots.txt` and `sitemap.xml`.
5. **Confirm the email address.** `info@juniormartineztransfer.com` is a placeholder.

### Known items to confirm

- **`La Romana` — US$300.** On your photo, this row was partly hidden behind the tree.
  Alphabetical position and price fit La Romana, but confirm it.
- **All drive times are my estimates**, not measured. They are labelled "≈" everywhere.
  Correct any that are off; each is the `m:` value (in minutes) in `RATES`.
- The rate board you photographed carries another company's name and phone numbers.
  I used only the prices, on your instruction that these are your rates. Worth a
  moment's thought before publishing them as your own board.

---

## How the fare calculator decides a price

Your board is written as "Sosúa ↔ X". The code follows that exactly:

- One endpoint is Sosúa → shows that destination's fixed price.
- Neither endpoint is Sosúa (e.g. POP → Cabarete) → shows **"Ask Junior"** rather than
  inventing a number.

This is deliberate. The site never displays a price you have not set.

---

## Languages

English is the default and the SEO source of truth. A visitor whose browser is set to
Spanish gets Spanish automatically; everyone else gets English. The EN/ES switch in the
header overrides that, and the choice is remembered in `localStorage`.

Switching language also translates the pre-written WhatsApp messages, so a Spanish
visitor sends Junior a Spanish message.

---

## Running it locally

```bash
python -m http.server 8000
# then open http://127.0.0.1:8000
```

Opening `index.html` directly by double-clicking also works, but a local server is
closer to production.

## Deploying

Static hosting. Drag the folder into Netlify, or push to a repo and connect Vercel,
Cloudflare Pages or GitHub Pages. Full steps in [`DOCS/DEPLOYMENT.md`](DOCS/DEPLOYMENT.md).

---

## Design

Visual direction follows `travelexpress.ae`, the reference the client chose: Epilogue
headings, DM Sans body, a single hot orange (`#FF3600`) on white and warm off-white,
big radii, and CTAs shaped as a pill with a detached circular arrow. Full breakdown in
[`DOCS/DEVELOPER_GUIDE.md`](DOCS/DEVELOPER_GUIDE.md).

## Docs

- [`DOCS/SEO.md`](DOCS/SEO.md) — title, meta, heading hierarchy, keyword map
- [`DOCS/DEVELOPER_GUIDE.md`](DOCS/DEVELOPER_GUIDE.md) — architecture and motion system
- [`DOCS/USER_MANUAL.md`](DOCS/USER_MANUAL.md) — how to update the site without a developer
- [`DOCS/DEPLOYMENT.md`](DOCS/DEPLOYMENT.md) — hosting and go-live checklist
- [`DOCS/FOLDER_STRUCTURE.md`](DOCS/FOLDER_STRUCTURE.md) — what lives where
