# Folder structure

_Last updated: 2026-08-06T13:00:00Z_

```
taxista/
├── index.html                  Whole site. Structure + English copy + JSON-LD schema.
├── robots.txt                  Crawler rules, points at the sitemap.
├── sitemap.xml                 One URL. Update lastmod when content changes.
├── README.md                   Start here. Pre-launch checklist.
├── photos/                     Raw, uncompressed source photos from the client
│                                (WhatsApp exports). Git-ignored — contains identifiable
│                                strangers (tourists, kids) with no documented consent to
│                                publish. Never commit this folder. The cropped/compressed
│                                photos actually used on the site live in assets/images/.
│
├── assets/
│   ├── css/
│   │   └── styles.css          The only stylesheet. Mobile-first, tokens in :root.
│   ├── js/
│   │   ├── i18n.js             Spanish dictionary + language switcher. Loads first.
│   │   └── main.js             CONFIG, RATES and all behaviour. Loads second.
│   └── images/
│       └── README.md           Photo slots, exact filenames and what to shoot/what's filled.
│                               Drop .jpg files beside this file; they appear automatically.
│
├── DOCS/
│   ├── SEO.md                  Title, meta, H2 hierarchy, keyword map, schema notes.
│   ├── DEVELOPER_GUIDE.md      Architecture, data flow, motion system, a11y.
│   ├── USER_MANUAL.md          How to change prices and text without a developer.
│   ├── DEPLOYMENT.md           Hosting options and the go-live checklist.
│   ├── FOLDER_STRUCTURE.md     This file.
│   └── PROOF_OF_WORK.md        Append-only build log.
│
├── tasks/
│   └── todo.md                 Work items and their state.
│
└── .agents/skills/             Installed agent skills (emilkowalski/skill).
                                Not part of the website. Safe to exclude from deploys.
```

## What ships to the web server

Everything except `.agents/`, `tasks/`, `skills-lock.json` and `.claude/`. Uploading them
does no harm — they are plain text and not linked from any page — but they are not part
of the site.

## Where things are NOT

- There is no `node_modules`, no `package.json`, no build output. This is intentional.
- There is no separate Spanish HTML page. Spanish is applied at runtime by `i18n.js`.
- There is no backend. The quote form composes a WhatsApp link; it never posts anywhere,
  so no visitor data is stored or transmitted to any server.
