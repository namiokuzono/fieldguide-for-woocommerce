# Contributing to the Field Guide for WooCommerce

This is an open book. The goal is an accurate, opinionated, practitioner-grade
reference. Anyone who's shipped, supported, or debugged a WooCommerce store is
qualified to contribute.

## Ways to help

- **Fix an inaccuracy.** Something in the guide is wrong, outdated, or imprecise?
  Open a PR.
- **Fill a gap.** A section is thin, missing edge cases, or missing the "here's
  how it actually breaks" detail that only comes from the field? Expand it.
- **Add a section.** If you've been in the trenches with a product type, payment
  gateway, shipping integration, or obscure failure mode that isn't covered,
  write it up.
- **Share a "from the field" story.** Real stories from real cases make the
  guide concrete. Keep them anonymized and specific.

## The style

- **Operational, not aspirational.** Describe how WooCommerce actually works,
  including the parts that are ugly or surprising.
- **Specific over general.** Numbers, version requirements, exact setting
  locations, exact error messages.
- **Honest about limits.** If WooCommerce's tooling doesn't cover a case, say
  so. Flag it with a `<Callout type="gap" />`.
- **Short paragraphs.** Aim for 2–4 sentences per paragraph. The book should be
  scannable.
- **One idea per section.** If you find yourself adding a second topic, it's
  probably a new section.

## PR workflow

1. Fork the repo (or create a branch if you have push access).
2. Make your edits. Run `npm run dev` locally to verify they render.
3. Open a PR. In the description:
   - What's changing and why.
   - Any sources (Woo docs, blog posts, support thread).
   - If this is a story from a real case, confirm it's anonymized.
4. A maintainer reviews. Small factual fixes usually merge quickly. New sections
   get a closer read on structure and tone.

## What not to submit

- Marketing for your extension or service. The guide recommends patterns and
  tools by merit, not by vendor.
- Unverified claims. If you're not sure how something behaves, open an issue
  instead of asserting it in the guide.
- Copy-pasted content from other sites. Paraphrase, cite, and link.

## Style cheat-sheet

**Headings:** the file's `title` frontmatter is the page title — don't repeat it
as an H1. Use H2 (`##`) for major subsections, H3 for finer structure.

**Friction level** (optional, at the top of each section):

```mdx
<Friction level={3} />
```

1 = trivial to get right, 5 = genuinely hard / commonly broken.

**Callouts** — pick the right type:

- `field` — first-person observations, support-case anecdotes
- `edge` — unusual inputs that trip the system
- `gap` — WooCommerce doesn't handle this; here's what actually happens
- `tip` — a decision helper or shortcut
- `info` — general clarifying info

**Code** — fenced blocks with language tags:

```php
// PHP example
add_action( 'woocommerce_checkout_order_processed', 'my_handler' );
```

**Links** — link to official Woo docs, dev.woocommerce.com, or high-quality
third-party writeups. Avoid link-farms and SEO-spam blogs.

## Questions

Open an issue with the "question" label. If you're not sure whether something
belongs in the guide, ask before investing effort in a long PR.

Thanks for helping make WooCommerce a little less mysterious.
