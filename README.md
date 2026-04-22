# Field Guide for WooCommerce

An open, community-maintained operational playbook for WooCommerce — the reference
that should ship with the plugin but doesn't. Product types, payments, shipping,
tax, troubleshooting protocols, agency playbooks, and custom-code patterns, all in
one searchable place.

**Live site:** TBD (self-hosted; see [Deployment](#deployment))
**Status:** Draft. Expect rough edges and missing sections.

---

## How it works

| Layer    | Tool                                                          |
|----------|---------------------------------------------------------------|
| Content  | Markdown / MDX in `src/content/docs/`                         |
| Site     | [Astro Starlight](https://starlight.astro.build/)             |
| Editing  | [Obsidian](https://obsidian.md/) or VS Code (local Markdown)  |
| Review   | GitHub pull requests                                          |
| Hosting  | Self-hosted static site (any static host works)               |

The entire book is plain Markdown files. Edit in Obsidian, push to GitHub, Astro
rebuilds the site. When a community member files a PR, review and merge — your
local Obsidian vault updates the next time you `git pull`.

---

## Running locally

```bash
# 1. install deps
npm install

# 2. start the dev server at http://localhost:4321
npm run dev

# 3. build the static site into ./dist
npm run build

# 4. preview the built site
npm run preview
```

Requires Node 18.17+ (Node 22 LTS recommended).

---

## Writing content

Every section is a single `.mdx` file. Frontmatter drives the sidebar:

```mdx
---
title: "Simple Products"
description: "One thing, one price, one SKU."
sidebar:
  order: 11          # 1.1 = 11, 1.2 = 12, 1.16 = 160, 2.1 = 21, ...
---

import Friction from '@components/Friction.astro';
import Callout from '@components/Callout.astro';

<Friction level={1} />

Body paragraphs here. Standard Markdown works (**bold**, *italic*, `code`).

<Callout type="field" label="From the field">
A story or anecdote from a real support case.
</Callout>
```

### Available components

- `<Friction level={1..5} />` — the friction chip (1 = low, 5 = extreme)
- `<Callout type="field" />` — teal, "From the field"
- `<Callout type="edge" />`  — amber, edge cases
- `<Callout type="gap" />`   — rose, known gaps in WooCommerce
- `<Callout type="tip" />`   — purple, tips / decision helpers
- `<Callout type="info" />`  — blue, general info

Override the default label with `label="..."`.

### Folders → sidebar sections

| Folder                       | Sidebar group                          |
|------------------------------|----------------------------------------|
| `product-types/`             | Part One — Product Types               |
| `store-operations/`          | Part Two — Store Operations            |
| `troubleshooting/`           | Part Three — When Things Go Wrong      |
| `agencies/`                  | Part Four — For Agencies & Builders    |
| `extending/`                 | Part Five — Extending with Code        |

Add a file, commit, push — it appears in the sidebar automatically.

---

## Using Obsidian

Obsidian works directly on this repo. Point Obsidian at the repo root as a vault.
The `src/content/docs/` tree becomes your editing surface.

Two things to know:
- **MDX import lines** and component tags (`<Friction />`, `<Callout>...</Callout>`)
  render as plain text in Obsidian preview. They compile correctly in Astro.
- The repo already ignores Obsidian workspace state
  (`.obsidian/workspace*`, `.obsidian/cache`) but keeps your vault config
  versioned. If you don't want to share plugin config, delete `.obsidian/` and
  add it to `.gitignore`.

---

## Deployment

The site builds to a static `dist/` folder — any static host will serve it.

### Option A — home server (self-hosted)

Build once, serve the `dist/` directory with any web server:

```bash
npm run build
# dist/ is ready. Serve it with Caddy, nginx, or:
npx serve dist -l 8080
```

For a zero-config home-server setup, [Caddy](https://caddyserver.com/) with a
three-line Caddyfile handles HTTPS and serves `dist/` directly:

```
fieldguide.your-domain.tld {
    root * /path/to/dist
    file_server
}
```

Trigger rebuilds with a `post-receive` git hook or a cron that `git pull`s + runs
`npm run build`.

### Option B — any static host

`dist/` deploys cleanly to Netlify, Cloudflare Pages, Vercel, GitHub Pages, S3 +
CloudFront, etc. No server-side runtime is needed.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the style guide and PR workflow.
TL;DR: open an issue if you're not sure, small PRs welcome, be specific, cite
sources when you can.

---

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Code (components, config): MIT.
