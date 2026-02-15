# ⚡ Quick Start Guide

## 🎯 Add Your First Article in 3 Steps

### **STEP 1: Edit the JSON** (2 minutes)

Open `data/articles.json` and add this at the end of the `articles` array:

```json
{
  "articles": [
    ...existing articles...,
    
    {
      "id": "my-first-article",
      "title": "My First Economics Article",
      "description": "This is a test article to see how the system works.",
      "category": "Microeconomics",
      "date": "2026-02-16",
      "featured": false,
      "tags": ["test", "example", "economics"],
      "author": "Economics Notes",
      "readTime": "5 min read",
      "content": "articles/my-first-article.html",
      "gradient": "from-green-200 to-blue-200"
    }
  ]
}
```

**⚠️ Important:** Add a comma before your new article!

---

### **STEP 2: Create the HTML** (3 minutes)

1. Copy `articles/sample-article.html`
2. Rename it to `my-first-article.html`
3. Open it and change:
   - The title
   - The content
   - The category badge

**Minimal example:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Economics Article - Economics Notes</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <div style="max-width: 800px; margin: 0 auto; padding: 3rem 1rem;">
        <a href="../index.html" style="color: #2563eb; text-decoration: none;">← Back to all notes</a>
        
        <article>
            <h1 style="font-size: 2.5rem; margin: 2rem 0 1rem;">My First Economics Article</h1>
            
            <p style="font-size: 1.125rem; line-height: 1.8; color: #374151;">
                This is my first article. I can write anything here about economics!
            </p>
            
            <h2 style="font-size: 1.875rem; margin-top: 2rem;">Introduction</h2>
            <p style="font-size: 1.125rem; line-height: 1.8; color: #374151;">
                Here's where I explain the topic in detail...
            </p>
        </article>
    </div>
</body>
</html>
```

---

### **STEP 3: Test It** (10 seconds)

1. Open `index.html` in your browser
2. Press **F5** to refresh
3. **Your article appears!** 🎉

---

## ✨ What You'll See

✅ **Your article in "Recent Notes"** section  
✅ **Search for it** - type "my first" in the search bar  
✅ **Filter it** - click "Microeconomics" category  
✅ **Click it** - opens your article page  

---

## 🧪 Test the Search

1. Type "test" in the search bar
2. Your article appears in the dropdown!
3. Click it to open

---

## 🔄 Add More Articles

Just repeat Steps 1-3 for each new article!

**Example: Add 3 articles in 15 minutes:**

1. Add 3 entries to `articles.json`
2. Create 3 HTML files in `articles/` folder
3. Refresh browser
4. All 3 appear automatically!

---

## 💡 Pro Tips

### Make an Article Featured
```json
{
  "featured": true  // ← Shows in big featured section
}
```

### Change the Color Gradient
```json
{
  "gradient": "from-purple-200 to-pink-200"  // ← Try different colors
}
```

Available gradients:
- `from-blue-200 to-cyan-200` (Blue)
- `from-purple-200 to-pink-200` (Purple/Pink)
- `from-green-200 to-emerald-200` (Green)
- `from-orange-200 to-red-200` (Orange/Red)
- `from-indigo-200 to-blue-200` (Indigo)

### Add More Tags for Better Search
```json
{
  "tags": ["supply", "demand", "equilibrium", "markets", "price"]
}
```

---

## 🎯 Next Steps

1. ✅ Add your first test article (follow steps above)
2. ✅ Test search and filtering
3. ✅ Delete the test article
4. ✅ Add your real articles
5. ✅ Customize colors in `css/styles.css`
6. ✅ Deploy to your web hosting

---

## 🆘 Troubleshooting

### Article not showing?
- Check `articles.json` for syntax errors (missing comma, bracket)
- Use a JSON validator: https://jsonlint.com/

### Can't find the article?
- Check the `date` field - older articles appear lower
- Try searching for it using the search bar

### Click does nothing?
- Make sure the `content` path matches your HTML filename
- Check browser console (F12) for JavaScript errors

---

## 📖 Learn More

- **Full Documentation:** See `README.md`
- **How It Works:** See `HOW-IT-WORKS.md`
- **Examples:** Check existing articles in `articles.json`

---

**Ready to publish your economics knowledge?** Start with Step 1! 🚀
