# Economics Notes (GitHub Pages Ready)

This repository is now organized as a **clean static site** so it works directly on GitHub Pages.

## Structure

- `index.html` → homepage
- `homes/` → category, all notes, and about pages
- `articles/<category>/` → article pages
- `data/articles.json` → single source of truth for article metadata
- `js/` → shared scripts (homepage rendering, category pages, routing, pagination)
- `config/styles.css` → global styles
- `.nojekyll` → required for GitHub Pages static serving

## Local development

You can open `index.html` directly, or run a local server:

```bash
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. In **Settings → Pages**, set source to `Deploy from a branch`.
3. Choose your default branch and root folder (`/`).
4. Save.

Because this is static HTML/CSS/JS with `.nojekyll`, it renders directly.

## How to add a new article

1. Create an HTML file under the correct category folder in `articles/`.
2. Add/update an entry in `data/articles.json`:
   - `id`, `title`, `category`, `categoryPath`, `path`, `date`, `description`, `tags`
3. The homepage, category pages, and all-notes page will use that data.

