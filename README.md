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
│   ├── microeconomics/
│   ├── macroeconomics/
│   ├── development/
│   ├── econometrics/
│   └── finance/
├── data/articles.json              # Canonical article metadata used by page scripts
├── js/                             # Client-side logic (homepage, category pages, navigation, pagination)
├── config/styles.css               # Global styles
├── sitemap.xml                     # Search indexing support
├── robots.txt                      # Crawl directives
└── 404.html                        # Not found page
```

## Content workflow

To add a new article:

1. Create the article HTML file under the relevant folder in `articles/<category>/`.
2. Add or update the article entry in `data/articles.json`.
3. Verify homepage/category listing behavior locally.
4. Update sitemap if required by your publishing workflow.

Suggested metadata fields in `data/articles.json`:

- `id`
- `title`
- `category`
- `categoryPath`
- `path`
- `date`
- `description`
- `tags`

## Deployment

This site is designed for static hosting (for example GitHub Pages, Netlify, Cloudflare Pages, or similar platforms).

For GitHub Pages, configure the repository to deploy from your chosen branch/folder containing the site output.

## Tech notes

- Static HTML/CSS/JavaScript architecture
- Vite-powered local development/build tooling
- Metadata-driven rendering via `data/articles.json`

---

If you are looking for an API package, backend service, or installable library, this is not that repository—this repo is the website itself.
