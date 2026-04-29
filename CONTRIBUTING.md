# Contributing to the Field Guide for WooCommerce

This is an open book. The goal is an accurate, opinionated,
practitioner-grade reference. Anyone who's shipped, supported, or
debugged a WooCommerce store is qualified to contribute.

The whole guide is plain `.mdx` files in this repo. There's no CMS, no
auth wall, no review board. You write Markdown, open a PR, and once
merged it deploys to [wcfield.guide](https://wcfield.guide)
automatically within ~1 minute.

## Two paths to edit

| You are… | Path |
|---|---|
| **A maintainer** with push access | Edit in your editor → commit → push to `main` → Cloudflare auto-deploys |
| **A community contributor** | Fork on GitHub → branch → edit → open a PR → maintainer reviews → merge → auto-deploy |

Both paths use the same files and conventions; just the gate differs.

---

## Editing in Obsidian (recommended for prose)

The repo is structured to work as an Obsidian vault. This is the
fastest path for writing prose — Obsidian's markdown editor + live
preview + auto-save make sustained writing comfortable.

### One-time Obsidian setup

1. **Open the repo as a vault.** In Obsidian: *Open folder as vault* →
   pick the cloned repo's root directory.

2. **Show `.mdx` files.** Settings → *Files & Links* → toggle on
   *Detect all file extensions*. Without this, Obsidian hides every
   section file in the guide.

3. **Install the *Custom File Extensions Plugin***
   (Settings → *Community plugins* → *Browse* → search for it →
   install + enable). In its settings, paste:
   ```json
   {
     "markdown": [
       "", "md", "mdx", "txt", "js", "css", "ts",
       "jsx", "tsx", "yaml", "yml", "tex", "json", "html"
     ]
   }
   ```
   Restart Obsidian. `.mdx` files will now open in the markdown
   editor, not the "unsupported file" view.

4. **Install *Obsidian Git*** (Settings → *Community plugins* →
   *Browse* → "Obsidian Git" by Vinzent → install + enable). In its
   settings:
   - **Vault backup interval (minutes)** → `10`
   - **Auto pull interval (minutes)** → `10`
   - **Pull updates on startup** → on
   - **Commit message** (optional) → `vault: {{date}}`

   This auto-commits + auto-pulls every 10 minutes. Edits flow:
   *Obsidian save → commit → push → Cloudflare rebuild → live.*

5. **Optional but useful:** the file tree only matters under
   `src/content/guide/`. Hide the rest from your view by clicking
   the eye icon in the file explorer toolbar, or just navigate
   directly with `Cmd-O` and start typing the section slug.

### Things to know about MDX in Obsidian

- The frontmatter (`---` block at the top) and component imports
  (`import Friction from '@components/Friction.astro';`) **render
  as literal text** in Obsidian preview. They render correctly in
  the actual site. Ignore them while writing.
- Component tags like `<Friction level={3} />` and
  `<Callout type="field">…</Callout>` also show as literal text in
  Obsidian. Compile correctly on build.
- Otherwise, normal Markdown — bold, italic, links, lists, tables.

---

## Editing in VS Code or Cursor (better for reviewing builds)

If you want syntax-highlighted MDX with autocomplete on component
names, a VS Code editor (or Cursor, or any IDE with the *MDX* extension)
is better than Obsidian. The trade-off: you don't get Obsidian Git's
auto-sync — you commit + push manually.

```bash
git clone https://github.com/namiokuzono/fieldguide-for-woocommerce.git
cd fieldguide-for-woocommerce
npm install
npm run dev          # http://localhost:4321 — live-reloads on save
```

Edit MDX in VS Code, save, refresh the browser, see the page render.
When you're done:

```bash
git add -A
git commit -m "your message"
git push                              # if you have push access
# or push to your fork + open a PR
```

---

## Submitting a PR (community contributors)

1. **Fork** the repo on GitHub
2. **Clone your fork** locally + create a branch
   ```bash
   git clone https://github.com/YOUR-USERNAME/fieldguide-for-woocommerce.git
   cd fieldguide-for-woocommerce
   git checkout -b your-section-name
   ```
3. **Edit** the relevant `.mdx` file under `src/content/guide/<part>/`.
4. **Verify locally** with `npm install && npm run dev`. The site
   should render at <http://localhost:4321>.
5. **Commit + push** to your fork.
6. **Open a PR** against `main` of the upstream repo. In the PR
   description:
   - What's changing and why
   - Any sources (Woo docs, dev.woocommerce.com, support threads)
   - If you're sharing a "from the field" story, confirm it's
     anonymized
7. **Cloudflare Pages auto-builds a preview** for every PR — the bot
   posts a unique URL in the PR thread within ~2 minutes. Use it to
   verify the page renders the way you expect.

A maintainer reviews. Small factual fixes merge quickly. New sections
get a closer read on structure and tone.

---

## What this guide is and is not

### Welcomes

- **Inaccuracy fixes** — anything wrong, outdated, or imprecise
- **Section expansion** — a thin section that needs depth (most do)
- **New sections** — a product type, gateway, integration, or failure
  mode not yet covered
- **"From the field" stories** — anonymized, specific, real cases

### Does not welcome

- Marketing for an extension or service. The guide recommends
  patterns by merit, not by vendor.
- Unverified claims. Not sure how something behaves? Open an issue
  rather than asserting it in the guide.
- Copy-paste from other sites. Paraphrase, cite, and link.

---

## Style

- **Operational, not aspirational.** Describe how WooCommerce
  actually works, including the parts that are ugly or surprising.
- **Specific over general.** Numbers, version requirements, exact
  setting locations, exact error messages.
- **Lede first, code later.** Every section opens in plain English
  for any reader. Code, hooks, and developer-only mechanics live
  inside a `<ForDevelopers>` block at the bottom.
- **Honest about limits.** If WooCommerce doesn't handle a case, say
  so. Flag with `<Callout type="gap" />`.
- **Short paragraphs.** 2–4 sentences. The book should be scannable.
- **One idea per section.** If a second topic creeps in, it's
  probably a new section.
- **Treat all readers as peers.** Don't talk down to merchants for
  not knowing code; don't talk down to developers for caring about
  UX. Three audiences, same URL, no inferiority projected.

---

## File + section conventions

### Where each file lives

```
src/content/guide/
├── product-types/             ← Part 1
├── store-operations/          ← Part 2
├── troubleshooting/           ← Part 3
├── agencies/                  ← Part 4
└── extending/                 ← Part 5
```

Each section is one `.mdx` file. The filename becomes the URL slug.

### Frontmatter

```mdx
---
title: "Cart & Checkout Failures"
description: "When the buy button breaks. The diagnostic sequence for the most common ticket type."
sidebar:
  order: 33
---
```

- `title` — the section heading (also browser tab + sidebar)
- `description` — one-line subtitle (renders as italic lede)
- `sidebar.order` — within-part ordering. First-digit = part number,
  rest = section number. So `33` = Part 3 / section 3.

### Components available in any `.mdx`

```mdx
import Friction from '@components/Friction.astro';
import Callout from '@components/Callout.astro';
import ForDevelopers from '@components/ForDevelopers.astro';
```

#### `<Friction level={1..5} />`

Optional, top of section. Humanized labels render automatically:

| Level | Label                         |
|-------|-------------------------------|
| 1     | Easy — anyone can do this     |
| 2     | Straightforward               |
| 3     | Takes a weekend               |
| 4     | Get help if you are new       |
| 5     | Hire a developer              |

Override with `label="..."` if a section needs different wording.

#### `<Callout type="…" label="…">…</Callout>`

| `type`  | Meaning                                              |
|---------|------------------------------------------------------|
| `field` | First-person observations, support-case anecdotes    |
| `edge`  | Unusual inputs that trip the system                  |
| `gap`   | WooCommerce doesn't handle this; here's what happens |
| `tip`   | A decision helper or shortcut                        |
| `info`  | General clarifying info                              |

Default labels render if you omit the `label` prop.

#### `<ForDevelopers>…</ForDevelopers>`

Wraps developer-depth content at the end of a section. Visually
distinct so merchant readers know to skim past.

```mdx
<ForDevelopers>
Hooks, filters, SQL, and anything that makes a merchant's eyes glaze
over goes here.
</ForDevelopers>
```

### Code blocks

Fenced with a language tag:

````mdx
```php
add_action( 'woocommerce_checkout_order_processed', 'my_handler' );
```
````

### Links

Prefer:
- `developer.woocommerce.com` (official)
- `wordpress.org/plugins/...` (canonical plugin pages)
- High-quality third-party writeups (with the author's domain visible)

Avoid SEO-spam blogs and link farms.

### Headings inside a section

The `title` frontmatter is the page H1 — **don't repeat it as an H1
in the body.** Use `##` for major subsections, `###` for finer
structure.

---

## How a contribution reaches the live site

```
your edit → git commit → git push → GitHub
                                       │
                                       ├── Cloudflare Pages auto-build
                                       │      ↓
                                       │   ~1 min later
                                       │      ↓
                                       │   wcfield.guide updated
                                       │
                                       └── PR? → preview URL in PR thread
```

For maintainer direct-push: ~1 min from save in Obsidian to live.
For PRs: same ~1 min for the preview build, then ~1 min after merge.

---

## Questions

Open a [GitHub issue](https://github.com/namiokuzono/fieldguide-for-woocommerce/issues)
with the "question" label. If you're not sure whether something
belongs in the guide, ask before investing effort in a long PR.

Thanks for helping make WooCommerce a little less mysterious.
