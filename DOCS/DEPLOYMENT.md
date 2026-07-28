# Deployment

_Last updated: 2026-07-27T21:52:00Z_

Static site. No server, no database, no environment variables, no build command.

---

## Option 1 — Netlify Drop (fastest, no account setup)

1. Go to <https://app.netlify.com/drop>
2. Drag the `taxista` folder onto the page
3. It is live in about ten seconds on a `*.netlify.app` address
4. Site settings → Domain management → add your own domain

**Build command:** none. **Publish directory:** the project root.

## Option 2 — Cloudflare Pages / Vercel / GitHub Pages

Push the folder to a Git repository, connect it, and set:

- Framework preset: **None / Other**
- Build command: **leave empty**
- Output directory: **`/`** (the root)

## Option 3 — Traditional hosting (cPanel, FTP)

Upload the contents of the folder into `public_html/`. That is the entire deployment.

---

## Go-live checklist

- [ ] Photos added to `assets/images/` (see that folder's README) — at minimum
      `hero.jpg`, `junior-driver.jpg` and `og-cover.jpg`
- [ ] Every price in `RATES` confirmed against the current board
- [ ] `La Romana` price confirmed (it was obscured in the source photo)
- [ ] Sample testimonials replaced with real ones
- [ ] Real email address set (currently `info@juniormartineztransfer.com`)
- [ ] Domain replaced in `index.html` (canonical, hreflang, OG tags, JSON-LD),
      `robots.txt` and `sitemap.xml` — search for `juniormartineztransfer.com`
- [ ] HTTPS on and forced (all three hosts above do this automatically)
- [ ] WhatsApp button tested **on a real phone**, not just desktop
- [ ] Google Business Profile claimed and linked to the site
- [ ] `sitemap.xml` submitted in Google Search Console

---

## Cache busting

CSS and JS are linked with `?v=1`:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=1">
<script src="assets/js/main.js?v=1" defer></script>
```

After editing a price or any styling, bump those to `?v=2` (and so on) before uploading.
Otherwise returning visitors keep the cached old version and will not see your change.
This is the single most common "I updated it but nothing changed" cause.

---

## Performance notes

- No framework, no dependencies — the whole site is a handful of small text files
- Icons are one inline SVG sprite: zero extra requests
- Fonts load in a single stylesheet request with `display=swap` and two preconnects
- Below-the-fold images are `loading="lazy"`; the map iframe is lazy too
- Nothing is render-blocking except the stylesheet

If you want it faster still, self-host the three font families instead of loading them
from Google. That removes the two external connections but adds files to maintain.

---

## Privacy

The quote form never sends data anywhere. It builds a WhatsApp link in the visitor's own
browser and opens it. There is no analytics, no tracking pixel, no cookie banner needed.
The only third parties that see a visitor are Google Fonts and the Google Maps iframe.
If you later add analytics, a cookie notice may become a legal requirement depending on
your visitors' jurisdiction.
