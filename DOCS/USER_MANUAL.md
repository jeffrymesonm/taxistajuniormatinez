# User manual — updating the site without a developer

_Last updated: 2026-07-27T21:52:00Z_

Everything here is a text edit. Open the file in any text editor, change the words
between the quote marks, save, re-upload. Nothing needs to be compiled.

---

## 1. Change the phone or WhatsApp number

Open `assets/js/main.js`. The very first block is:

```js
var CONFIG = {
  owner:        'Junior Martinez',
  waNumber:     '18292991661',        // digits only, with country code
  phoneDisplay: '+1 (829) 299-1661',
  phoneHref:    '+18292991661',
  email:        'info@juniormartineztransfer.com',
  hubId:        'sosua'
};
```

Change `waNumber` and every WhatsApp button on the page follows — the header, the fare
calculator, all 54 rows of the rates table, the quote form, the floating green button
and the footer.

`phoneDisplay` and the visible phone numbers in `index.html` are separate; search
`index.html` for `829` to find the four places the number is written out.

---

## 2. Change a price

Open `assets/js/main.js` and find the `RATES` list. Each line is one destination:

```js
{ id:'cabarete', n:'Cabarete Center', p:15, m:15, g:'Sosúa area', a:'cabarete kite beach centro' },
```

| Field | Meaning |
|---|---|
| `id` | Internal name. Do not change it. |
| `n` | The name shown on screen |
| `p` | **The price in US dollars.** Change this number. |
| `m` | Drive time from Sosúa, in minutes (90 = 1 h 30) |
| `g` | Which group it appears under |
| `a` | Extra words that should find this row in the search box |

Changing `p:15` to `p:18` updates the rates table, the fare calculator and the WhatsApp
message, all at once.

### Adding a new destination

Copy any line, paste it below, and change the values. Give it a new `id` (lowercase, no
spaces). Keep it inside the right group so it appears in the right place.

---

## 3. Change the words on the page

- **English** lives in `index.html`. Find the sentence, change it, save.
- **Spanish** lives in `assets/js/i18n.js`, in the `ES` list. Each line looks like
  `'about.cta': 'Escríbele a Junior',` — change the text after the second quote mark.

If you change an English sentence, change its Spanish twin too, or Spanish visitors will
still see the old wording. The key (`'about.cta'`) tells you which line pairs with which.

---

## 4. Add your photos

Put the files in `assets/images/` using the exact names listed in
`assets/images/README.md`. That is all — the site picks them up automatically. If a file
is missing, the site shows a gradient panel instead and still looks finished.

Start with `junior-driver.jpg`. A real photo of Junior beside the car does more for
bookings than anything else on the page.

---

## 5. Replace the testimonials

The six reviews in the Reviews section are **samples written to show the layout** — they
are not real customers. Before launch, open `index.html`, search for `class="review"`,
and replace each quote, name and location with a real one.

Their Spanish translations are in `assets/js/i18n.js` under `rev.1.q` through `rev.6.q`.

---

## 6. Change the FAQ

Each question is a block in `index.html` that starts with `<details class="qa reveal">`.
Copy one to add a question, or delete one to remove it.

If you add or change a question, also update the `FAQPage` block near the bottom of
`index.html` — that is the version Google reads for search results.

---

## 7. What not to touch

- Anything inside `<svg>` tags (those are the icons)
- The `data-i18n="..."` attributes — they link English to Spanish
- `assets/css/styles.css` unless you are changing the design

---

## If something breaks

Undo your last change and reload. If the page still misbehaves, open the browser console
(F12 → Console) — a red message names the file and line number. The most common cause is
a missing comma or a missing closing quote mark in `main.js` or `i18n.js`.
