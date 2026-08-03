# Deployment

_Last updated: 2026-08-03T20:10:00Z_

Static site. No server, no database, no environment variables, no build command.

---

## Deployment actual (en producción)

| | |
|---|---|
| Host | GitHub Pages |
| Repositorio | `jeffrymesonm/taxistajuniormatinez` |
| Fuente | rama `main`, carpeta raíz `/` |
| Dominio | **`juniortransfertour.com`** (apex) |
| HTTPS | forzado, certificado Let's Encrypt gestionado por GitHub |

`www` redirige al apex, y `http` redirige a `https`. Ambas cosas las hace GitHub solo.

**Publicar un cambio = `git push` a `main`.** No hay build. Tarda ~1 minuto.

### El archivo `CNAME` es obligatorio

En la raíz del repo, con una sola línea:

```
juniortransfertour.com
```

Si ese archivo desaparece, GitHub olvida el dominio y el sitio vuelve a mostrar
"There isn't a GitHub Pages site here". Nunca lo borres ni lo sobrescribas al subir
archivos.

### DNS (ya configurado, no tocar)

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jeffrymesonm.github.io` |

### Si vuelve a salir el 404 de GitHub

El DNS casi nunca es la causa. Comprueba primero que el dominio siga registrado:

```bash
gh api repos/jeffrymesonm/taxistajuniormatinez/pages --jq '.status, .cname, .https_enforced'
```

Si `cname` sale `null`, el dominio se desconectó. Vuelve a fijarlo:

```bash
gh api -X PUT repos/jeffrymesonm/taxistajuniormatinez/pages -f cname='juniortransfertour.com'
```

No pases `https_enforced` en esa misma llamada: mientras el certificado no exista, la
API responde `The certificate does not exist yet` y no aplica nada. Actívalo después,
cuando el certificado ya esté emitido.

---

## Alternativas (si algún día migras)

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
- [ ] Real email address set — sigue en `info@juniormartineztransfer.com`, que **no**
      coincide con el dominio real. Decidir si ese buzón existe o cambiarlo a
      `juniortransfertour.com` en `index.html` (líneas 728, 730, 801, 829) y
      `assets/js/main.js:29`
- [x] Domain replaced in `index.html` (canonical, hreflang, OG tags, JSON-LD),
      `robots.txt` and `sitemap.xml` → `juniortransfertour.com` _(2026-08-03)_
- [x] HTTPS on and forced _(2026-08-03)_
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
