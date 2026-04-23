# Field Guide for WooCommerce

An open, community-maintained operational playbook for WooCommerce — the
reference that should ship with the plugin but doesn't. Product types,
payments, shipping, tax, troubleshooting protocols, agency playbooks, and
custom-code patterns, all in one readable place.

Written for merchants, agencies, and developers. Every section opens in
plain English; deeper mechanics and code live in a clearly-marked
*For developers* zone later in the same page, so three audiences read
the same URL without anyone feeling talked down to or locked out.

**Live site:** wcfield.guide
**Repo:** <https://github.com/namiokuzono/fieldguide-for-woocommerce>
**License:** Content is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Fork it, adapt it, hand it off to your clients — attribution appreciated.

---

## Stack

| Layer    | Tool                                                                 |
|----------|----------------------------------------------------------------------|
| Content  | Markdown / MDX in `src/content/guide/`                               |
| Site     | Plain [Astro](https://astro.build/) with a custom magazine layout    |
| Editing  | [Obsidian](https://obsidian.md/) or VS Code (local Markdown)         |
| Review   | GitHub pull requests                                                 |
| Search   | [Pagefind](https://pagefind.app/), built at `npm run build`          |
| Hosting  | Self-hosted static site (any static host works)                      |

The entire book is plain MDX files. Edit in your editor of choice, push to
GitHub, Astro rebuilds the site. No CMS, no database, no lock-in.

---

## Running locally

```bash
# 1. install deps
npm install

# 2. start the dev server at http://localhost:4321
npm run dev

# 3. build the static site into ./dist
npm run build

# 4. preview the built site (includes search)
npm run preview
```

Requires Node 18.17+ (Node 22 LTS recommended). Pagefind search only works
after `npm run build` (or `npm run preview`) — dev mode skips the index.

---

## Writing content

Every section is one `.mdx` file under `src/content/guide/<part>/`.
The file path becomes the URL (`product-types/simple.mdx` → `/product-types/simple/`).

### Frontmatter

```mdx
---
title: "Simple Products"
description: "One thing, one price, one SKU."
sidebar:
  order: 11       # 1.1 = 11, 1.2 = 12, 1.16 = 160, 2.1 = 21, ...
---
```

`order` determines the sequence within the part (the section number in the
URL bar comes from this). `draft: true` hides a page from production builds.

### The section template

The structural convention: **lede first, code later**. Merchant-friendly
paragraphs at the top; developer depth wrapped in `<ForDevelopers>` at
the bottom. Merchants stop when the panel starts; devs keep reading.

```mdx
---
title: "Hooks & Filters"
description: "The extension points WooCommerce exposes."
sidebar: { order: 53 }
---

import Friction from '@components/Friction.astro';
import Callout from '@components/Callout.astro';
import ForDevelopers from '@components/ForDevelopers.astro';

<Friction level={3} />

WooCommerce lets you hook into almost everything it does — change the
price format, add a field to checkout, send a Slack message on a new
order. You don't need to edit WooCommerce itself; you write a small
plugin that "hooks into" the right moment.

<Callout type="field" label="From the field">
The #1 reason custom code stops working after a Woo update isn't Woo —
it's the hook name changing. Pin to stable hooks only.
</Callout>

<ForDevelopers>
  ### Actions vs filters

  ```php
  add_action( 'woocommerce_checkout_order_processed', function ( $order_id ) {
    // do thing
  } );
  ```

  Filters pass a value through; actions fire and forget. ...
</ForDevelopers>
```

### Available components

| Component         | Purpose                                                   |
|-------------------|-----------------------------------------------------------|
| `<Friction level={1..5} />` | Setup-difficulty chip (humanized labels)        |
| `<Callout type="field">`    | Teal — "From the field" (real support stories) |
| `<Callout type="edge">`     | Amber — edge cases                             |
| `<Callout type="gap">`      | Rose — things WooCommerce doesn't handle       |
| `<Callout type="tip">`      | Plum — "Worth knowing"                         |
| `<Callout type="info">`     | Blue — general notes                           |
| `<ForDevelopers>`           | Wraps a developer-depth panel                  |

Override any default label with `label="..."`.

### Folders → parts

| Folder                 | Part  | Shown as                              |
|------------------------|-------|---------------------------------------|
| `product-types/`       | One   | What you can sell                     |
| `store-operations/`    | Two   | Running your store                    |
| `troubleshooting/`     | Three | When things go wrong                  |
| `agencies/`            | Four  | For agencies & builders               |
| `extending/`           | Five  | Extending with code                   |

Part titles and subtitles live in `src/data/parts.ts` — edit there to
rename a part without renaming the folder.

---

## Using Obsidian

Obsidian works directly on this repo. Point Obsidian at the repo root as a vault.

Two things to know:
- **Obsidian hides `.mdx` by default.** Settings → Files & Links →
  *Detect all file extensions* → on. Then install the *Custom File
  Extensions Plugin* and register `.mdx` as markdown.
- **MDX import lines + component tags render as literal text in
  Obsidian preview.** They only render in Astro. Ignore them while
  writing; they compile correctly on build.

---

## For agencies and consultants

This book is CC BY 4.0. That means you can:

- Fork the repo, rewrite sections in your voice, strip to what your
  clients need, and hand off — as long as you credit the source.
- Print any section to PDF (every article has a Print action).
- Cite individual sections by permalink (URLs are stable).

Concrete idea: clone, delete the parts that don't apply to your client,
rewrite the tone to match your brand, deploy under your own domain as a
white-labelled "store operations manual." That's allowed. That's
encouraged.

---

## Deployment

The site builds to a static `dist/` folder — any static host will serve it.

### Home server (self-hosted)

```bash
npm run build        # produces dist/
```

Serve `dist/` with [Caddy](https://caddyserver.com/):

```caddyfile
fieldguide.your-domain.tld {
    root * /path/to/fieldguide-for-woocommerce/dist
    file_server
    encode zstd gzip
}
```

Automate rebuilds with a cron that `git pull`s and runs `npm run build`,
or with a GitHub Actions workflow that rsyncs `dist/` to the server.

### Any static host

`dist/` deploys cleanly to Netlify, Cloudflare Pages, Vercel, GitHub
Pages, S3 + CloudFront, etc. No server-side runtime needed.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: small PRs
welcome, be specific, cite sources, anonymize stories.

---

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Code (layouts, components, config): MIT.
