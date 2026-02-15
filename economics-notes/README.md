# Economics Notes Website

A professional, clean website for publishing economics notes with dynamic article loading, search functionality, and category filtering.

## 📁 File Structure

```
economics-notes/
├── index.html              # Main homepage
├── README.md              # This file
│
├── css/
│   └── styles.css         # All CSS styles
│
├── js/
│   ├── app.js            # Main application logic
│   ├── articles.js       # Article rendering functions
│   └── search.js         # Search functionality
│
├── data/
│   └── articles.json     # Article database (JSON)
│
├── articles/
│   └── sample-article.html  # Example article page
│
└── assets/
    └── images/           # Future images (optional)
```

## 🚀 Getting Started

### Option 1: Open Locally
1. Download all files maintaining the folder structure
2. Open `index.html` in your web browser
3. No server required! Works offline

### Option 2: Deploy to Web Server
1. Upload all files to your web hosting
2. Ensure folder structure is maintained
3. Access via your domain

### Option 3: Use Local Server (Recommended for Development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Then open: http://localhost:8000
```

## ✨ Features

- ✅ **Dynamic Article Loading** - Articles loaded from JSON
- ✅ **Real-time Search** - Search by title, description, category, or tags
- ✅ **Category Filtering** - Filter articles by economics category
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **No Dependencies** - Pure HTML, CSS, and JavaScript
- ✅ **Copyright Free** - Uses only gradients and emojis

## 📝 Adding New Articles

### Step 1: Add Article Data to JSON

Edit `data/articles.json` and add your article to the `articles` array:

```json
{
  "id": "your-article-slug",
  "title": "Your Article Title",
  "description": "Brief description of your article",
  "category": "Microeconomics",
  "date": "2026-02-15",
  "featured": false,
  "tags": ["keyword1", "keyword2", "keyword3"],
  "author": "Your Name",
  "readTime": "5 min read",
  "content": "articles/your-article-slug.html",
  "gradient": "from-blue-200 to-cyan-200"
}
```

### Step 2: Create Article HTML Page

1. Copy `articles/sample-article.html`
2. Rename it to match your article slug (e.g., `your-article-slug.html`)
3. Edit the content with your article text
4. Save in the `articles/` folder

### Step 3: Test

1. Refresh `index.html`
2. Your article will appear automatically
3. Search and filters will work immediately

## 🎨 Customization

### Colors
Edit `css/styles.css` to change colors:
- Primary color: `#2563eb` (blue)
- Search for color values and replace

### Categories
Edit `data/articles.json` → `categories` array:
```json
{
  "name": "Your Category",
  "slug": "your-category",
  "count": 0
}
```

### Layout
- Modify grid layouts in `css/styles.css`
- Search for `grid-template-columns` to adjust card layouts

## 🔍 How Search Works

The search functionality:
1. Searches in: title, description, category, tags, and author
2. Shows live results as you type (300ms debounce)
3. Highlights matching text
4. Updates article display in real-time

**Search Examples:**
- "inflation" - finds all articles about inflation
- "macro" - finds all macroeconomics articles
- "regression" - finds articles with regression tag

## 📊 Article Data Structure

Each article has these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique identifier (slug) |
| `title` | string | ✅ | Article title |
| `description` | string | ✅ | Short description |
| `category` | string | ✅ | Category name |
| `date` | string | ✅ | Date (YYYY-MM-DD) |
| `featured` | boolean | ✅ | Show as featured? |
| `tags` | array | ✅ | Keywords for search |
| `author` | string | ✅ | Author name |
| `readTime` | string | ✅ | Reading time |
| `content` | string | ✅ | Path to HTML file |
| `gradient` | string | ✅ | Color gradient |

## 🎯 Best Practices

### Adding Articles
1. Always use unique `id` values
2. Use descriptive tags for better search
3. Keep descriptions under 200 characters
4. Use YYYY-MM-DD date format

### File Organization
1. Keep article HTML files in `articles/` folder
2. Name files using the article `id`
3. Update category counts when adding articles

### Performance
1. Keep `articles.json` under 1MB for fast loading
2. Use descriptive but concise descriptions
3. Limit featured articles to 1-2 at a time

## 🔧 JavaScript API

### Global Functions

```javascript
// Filter by category
filterByCategory('microeconomics', element)

// Navigate to article
navigateToArticle('article-id')

// Perform search
performSearch('search term')

// Clear search
clearSearch()
```

### State Management

```javascript
// Access current state
AppState.articles       // All articles
AppState.categories     // All categories
AppState.currentCategory // Current filter
AppState.searchTerm     // Current search
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📱 Mobile Support

Fully responsive design with:
- Mobile navigation menu
- Touch-friendly buttons
- Optimized layouts for small screens

## 🆘 Troubleshooting

### Articles not loading?
- Check browser console for errors
- Verify `articles.json` has valid JSON syntax
- Ensure file paths are correct

### Search not working?
- Check that JavaScript is enabled
- Verify `js/search.js` is loaded
- Check browser console for errors

### Styling issues?
- Verify `css/styles.css` is linked correctly
- Clear browser cache
- Check CSS file for syntax errors

## 📄 License

This project is copyright-free and can be used for personal or commercial purposes.

## 🎓 Credits

Created for publishing economics notes online. Feel free to customize and extend!

---

**Need Help?** Check the code comments in each JavaScript file for detailed documentation.
