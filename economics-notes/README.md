# 📈 Economics Notes

A clean, professional website for publishing economics notes and articles.

## 🎯 Features

- 📚 Homepage with featured articles
- 📝 All Notes page with search and filters
- 🏷️ Categories page
- ℹ️ About page
- 🔍 Real-time search functionality
- 📱 Fully responsive (mobile-friendly)
- 🚀 Optimized for GitHub Pages

## 📂 File Structure

```
economics-notes/
├── index.html              # Homepage
├── all-notes.html         # Browse all articles
├── categories.html        # Browse by category
├── about.html            # About/Contact/FAQ
├── .nojekyll             # Required for GitHub Pages
│
├── css/
│   └── styles.css        # All styles
│
├── data/
│   └── articles.json     # Article database (EDIT THIS!)
│
└── articles/
    ├── article-template.html           # Template for new articles
    └── supply-demand-dynamics.html     # Example article
```

## 🚀 Quick Start

### Local Development

1. **Start a local server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

### GitHub Pages Deployment

1. **Upload files to GitHub repository**

2. **Make sure files are at repository root:**
   ```
   your-repo/
   ├── index.html      ← Must be here!
   ├── .nojekyll       ← Must be here!
   ├── css/
   ├── data/
   └── articles/
   ```

3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: `main` branch, `/ (root)` folder
   - Click Save

4. **Wait 2-3 minutes** and visit:
   ```
   https://yourusername.github.io/repo-name/
   ```

## ✏️ Adding New Articles

### Step 1: Create Article HTML

1. Copy `articles/article-template.html`
2. Rename it (e.g., `my-new-article.html`)
3. Edit the content:
   - Replace `[Article Title]`
   - Replace `[Category]`
   - Replace `[Date]`
   - Add your content

### Step 2: Add to Database

Edit `data/articles.json` and add your article:

```json
{
  "id": "my-new-article",
  "title": "My New Article Title",
  "description": "Brief description of the article",
  "category": "Microeconomics",
  "date": "2026-02-15",
  "featured": false,
  "tags": ["tag1", "tag2", "tag3"],
  "author": "Economics Notes",
  "readTime": "5 min read",
  "content": "articles/my-new-article.html",
  "gradient": "from-blue-500 to-purple-600"
}
```

### Step 3: Update Category Count

In `data/articles.json`, find the category and increase the count:

```json
{
  "name": "Microeconomics",
  "slug": "microeconomics",
  "count": 5     ← Increase this
}
```

### Step 4: Refresh Website

That's it! Your new article will appear automatically.

## 🎨 Customization

### Change Site Title

Edit `<h1 class="site-title">` in each HTML file:
- `index.html`
- `all-notes.html`
- `categories.html`
- `about.html`

### Change Colors

Edit `css/styles.css` - look for CSS variables at the top.

### Update About Page

Edit `about.html` to add your information:
- About section
- Contact information
- FAQ

## 📝 Article Guidelines

### Article ID Rules

- Use lowercase letters and hyphens
- No spaces or special characters
- Example: `supply-and-demand` ✅
- Example: `Supply & Demand!` ❌

### Required Fields

Every article needs:
- `id` - Unique identifier
- `title` - Article title
- `description` - Brief summary
- `category` - Must match existing category
- `date` - Format: `YYYY-MM-DD`
- `content` - Path to HTML file
- `tags` - Array of keywords
- `readTime` - e.g., "5 min read"

### Optional Fields

- `featured` - Set to `true` for homepage featured article
- `author` - Author name
- `gradient` - Color theme (see existing examples)

## 🔍 How Search Works

The search feature searches through:
- Article titles
- Descriptions
- Categories
- Tags
- Author names

Search is **real-time** with 300ms debouncing for performance.

## 📱 Responsive Design

The site automatically adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Mobile navigation uses a hamburger menu.

## ⚙️ Technical Details

- **No build process required** - Pure HTML/CSS/JSON
- **No external dependencies** - Everything self-contained
- **JavaScript inline** - No separate JS files to manage
- **SEO friendly** - Proper meta tags and semantic HTML
- **Fast loading** - Minimal, optimized code

## 🐛 Troubleshooting

### Articles not loading locally

**Problem:** Opening `index.html` directly shows empty page.

**Solution:** Use a local server (browsers block local file loading):
```bash
python -m http.server 8000
```

### GitHub Pages shows 404

**Problem:** Site not found after deployment.

**Solution:** 
1. Make sure files are at repository root (not in subfolder)
2. Check GitHub Pages is enabled
3. Wait 2-3 minutes after enabling

### Search not working

**Problem:** Search doesn't find anything.

**Solution:**
1. Make sure you're using a local server (not `file://`)
2. Check `data/articles.json` exists and is valid JSON
3. Clear browser cache

## 📖 File Explanations

| File | Purpose |
|------|---------|
| `index.html` | Homepage with featured articles |
| `all-notes.html` | List all articles with stats |
| `categories.html` | Browse articles by category |
| `about.html` | About, contact, and FAQ |
| `.nojekyll` | Tells GitHub Pages not to use Jekyll |
| `css/styles.css` | All website styles |
| `data/articles.json` | Article database (edit this to add articles!) |
| `articles/*.html` | Individual article pages |

## 💡 Tips

1. **Always test locally first** before deploying
2. **Validate JSON** after editing `articles.json` (use jsonlint.com)
3. **Use the template** when creating new articles
4. **Keep article IDs unique** to avoid conflicts
5. **Backup your data** before making major changes

## 📊 Statistics

The "All Notes" page automatically calculates:
- Total number of articles
- Number of categories
- Recent updates (last 30 days)

No configuration needed!

## 🎉 Credits

- Icons: Unicode emoji (copyright-free)
- Design: Custom CSS (no frameworks)
- Fonts: System fonts (fast loading)

100% copyright-free and ready to publish!

## 📞 Support

Having issues? Check:
1. Browser console (F12) for errors
2. Make sure using a local server
3. Validate your JSON at jsonlint.com
4. Clear browser cache

---

**Made with ❤️ for economics enthusiasts**

**License:** Free to use and modify  
**Copyright:** None - 100% copyright-free
