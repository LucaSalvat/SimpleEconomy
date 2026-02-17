# Simple Economy — Static Educational Site

Simple Economy is a **content website**, not a software product/library.  
It publishes accessible economics notes and articles as a static site built with HTML, CSS, and JavaScript.

## What this repository is

This repository contains the source for a static economics learning website, including:

- A homepage and topic landing pages
- Category pages for economics subject areas
- Individual article pages
- Shared styling and JavaScript for navigation, rendering, and pagination
- Structured article metadata used across pages

## Site structure

```text
.
├── index.html                      # Homepage
├── homes/                          # Main site pages (about, categories, topic homes)
├── articles/                       # Article pages grouped by category
├── content/                        # Optional markdown sources rendered inside article pages
│   ├── microeconomics/
│   ├── macroeconomics/
│   ├── development/
│   ├── econometrics/
│   └── finance/
├── data/articles/                  # Per-article metadata files + index for scalable editing
├── data/categories.json            # Category metadata
├── data/articles.json              # Backward-compatible aggregated metadata (generated)
├── js/                             # Client-side logic (homepage, category pages, navigation, pagination)
├── config/styles.css               # Global styles
├── sitemap.xml                     # Search indexing support
├── robots.txt                      # Crawl directives
└── 404.html                        # Not found page
```

## Content workflow

To add a new article:

1. Create the article HTML file under `articles/<category>/` (keep the existing `.content-card` and `.content-body` structure).
2. (Recommended) Write the article in markdown under `content/<category>/<slug>.md`.
3. Point the article container to markdown, for example: `<div class="content-body" data-markdown-src="../../content/<category>/<slug>.md"></div>`.
4. Ensure the page loads `js/article-markdown-renderer.js` after `js/article-pagination.js`.
5. Markdown supports images (`![alt](path)`), inline LaTeX (`$...$`), and display LaTeX blocks wrapped with `$$` lines.
6. Article pages automatically render a right-aligned header image beside the title (category logo by default, or `heroImage` in that article's JSON file if you want custom artwork).
7. Add/update one file at `data/articles/<article-id>.json` and reference it from `data/articles/index.json`.
8. Verify homepage/category listing behavior locally.
9. Update sitemap if required by your publishing workflow.

Suggested metadata fields in each `data/articles/<article-id>.json`:

- `id`
- `title`
- `category`
- `categoryPath`
- `path`
- `date`
- `description`
- `tags`
- `author`
- `heroImage` (optional, path from repo root for custom article header image)

## Deployment

This site is designed for static hosting (for example GitHub Pages, Netlify, Cloudflare Pages, or similar platforms).

For GitHub Pages, configure the repository to deploy from your chosen branch/folder containing the site output.

## Tech notes

- Static HTML/CSS/JavaScript architecture
- Vite-powered local development/build tooling
- Metadata-driven rendering via `data/articles/index.json` + per-article JSON files
- Compatibility fallback supported via generated `data/articles.json` (`npm run sync:data`)

---

If you are looking for an API package, backend service, or installable library, this is not that repository—this repo is the website itself.
