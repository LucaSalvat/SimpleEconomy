# How the Automatic Article System Works

## 🎯 Overview

This website uses **JavaScript + JSON** to automatically load and display articles. You never need to edit `index.html` manually!

## 🔄 The Automatic Flow

```
1. User opens index.html
   ↓
2. JavaScript loads (app.js, articles.js, search.js)
   ↓
3. app.js fetches data/articles.json
   ↓
4. JavaScript reads all articles from JSON
   ↓
5. JavaScript dynamically creates HTML for each article
   ↓
6. Articles appear on the homepage automatically!
```

## 📝 Step-by-Step: Adding a New Article

### **STEP 1: Add Article Data to JSON** (5 minutes)

Open `data/articles.json` and add your new article to the `"articles"` array:

```json
{
  "articles": [
    {
      "id": "supply-demand-dynamics",
      "title": "Understanding Supply and Demand Dynamics",
      ...existing article...
    },
    
    // ADD YOUR NEW ARTICLE HERE ↓
    {
      "id": "keynesian-economics",
      "title": "Introduction to Keynesian Economics",
      "description": "Exploring how government intervention can stabilize the economy during recessions and booms.",
      "category": "Macroeconomics",
      "date": "2026-02-16",
      "featured": false,
      "tags": ["keynesian", "government spending", "fiscal policy", "aggregate demand"],
      "author": "Economics Notes",
      "readTime": "10 min read",
      "content": "articles/keynesian-economics.html",
      "gradient": "from-blue-200 to-cyan-200"
    }
  ],
  "categories": [...],
  "popularTopics": [...]
}
```

**Important:** Don't forget the comma before your new article!

### **STEP 2: Create the Article HTML Page** (10 minutes)

1. **Copy** the template:
   ```
   articles/sample-article.html  →  articles/keynesian-economics.html
   ```

2. **Edit** the new file and update:
   - Page title
   - Category badge
   - Date
   - Article title
   - Description
   - Full content (paragraphs, headings, lists)

3. **Save** the file

### **STEP 3: Refresh the Homepage** (1 second)

1. Open `index.html` in your browser
2. Press **F5** or **Ctrl+R** to refresh
3. **Your new article appears automatically!** 🎉

## ✨ What Happens Automatically

When you refresh the page:

### ✅ **Featured Section**
- If you set `"featured": true`, it appears in the Featured Note section
- JavaScript finds the featured article and displays it

### ✅ **Latest Insights** 
- Your article appears in "Latest Insights" (if it's one of the 3 most recent)
- Sorted by date automatically

### ✅ **Recent Notes**
- Your article appears in "Recent Notes" (if it's one of the 6 most recent)
- Sorted by date automatically

### ✅ **Search**
- Your article is automatically searchable by:
  - Title
  - Description
  - Category
  - Tags
  - Author

### ✅ **Category Filter**
- Clicking the category pill filters to show your article
- Category counts update automatically

## 🔍 Behind the Scenes: The Code

### **1. Loading Data (app.js)**
```javascript
async function loadData() {
    // Fetch the JSON file
    const response = await fetch('data/articles.json');
    const data = await response.json();
    
    // Store articles in memory
    AppState.articles = data.articles;
    
    // Render everything automatically
    renderFeaturedNote();
    renderLatestInsights();
    renderRecentNotes();
}
```

### **2. Rendering Articles (articles.js)**
```javascript
function renderRecentNotes() {
    // Get the container
    const container = document.getElementById('recentNotes');
    
    // Get filtered articles
    const articles = getFilteredArticles();
    
    // Create HTML for each article
    container.innerHTML = articles.map(article => `
        <article class="note-card">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            ...
        </article>
    `).join('');
}
```

### **3. Search (search.js)**
```javascript
function searchArticles(searchTerm) {
    return AppState.articles.filter(article => {
        // Check if search term matches
        return article.title.includes(searchTerm) ||
               article.description.includes(searchTerm) ||
               article.tags.some(tag => tag.includes(searchTerm));
    });
}
```

## 📊 Example Workflow

Let's say you want to add an article about "Inflation Targeting":

1. **Edit `data/articles.json`:**
   ```json
   {
     "id": "inflation-targeting",
     "title": "Inflation Targeting by Central Banks",
     "description": "How central banks use inflation targets...",
     "category": "Macroeconomics",
     "date": "2026-02-20",
     "featured": false,
     "tags": ["inflation", "central banks", "monetary policy"],
     "author": "Economics Notes",
     "readTime": "8 min read",
     "content": "articles/inflation-targeting.html",
     "gradient": "from-orange-200 to-red-200"
   }
   ```

2. **Create `articles/inflation-targeting.html`:**
   - Copy sample-article.html
   - Rename to inflation-targeting.html
   - Write your content about inflation targeting

3. **Refresh browser:**
   - Article appears in Recent Notes
   - Searchable by "inflation", "central banks", "monetary"
   - Filterable by "Macroeconomics" category

## 🎨 Advanced: Making an Article Featured

To make your article appear in the big Featured section:

1. Set `"featured": true` in the JSON
2. Only 1 article should be featured at a time
3. The JavaScript will automatically display it in the Featured section

```json
{
  "id": "your-article",
  "featured": true,  // ← Change this
  ...
}
```

## 🔧 Updating Article Counts

After adding articles, update the category counts in `articles.json`:

```json
"categories": [
  {
    "name": "Macroeconomics",
    "slug": "macroeconomics",
    "count": 5  // ← Update this number
  }
]
```

## 🚀 Publishing Workflow

For regular publishing:

1. **Write article** → Create HTML in `articles/` folder
2. **Add metadata** → Add entry to `articles.json`
3. **Test locally** → Refresh browser to preview
4. **Upload to server** → Upload both JSON and HTML files
5. **Done!** → Article is live automatically

## ⚡ Why This is Better Than Manual HTML

### ❌ **Manual HTML (Old Way)**
- Edit index.html for every new article
- Copy/paste article cards manually
- Update search manually
- Risk breaking the layout
- Hard to maintain consistency

### ✅ **JSON + JavaScript (Our Way)**
- Edit only JSON file
- JavaScript generates HTML automatically
- Search works automatically
- Layout always consistent
- Easy to add 100+ articles

## 🎯 Key Takeaway

**You never touch `index.html` again!**

Just edit:
1. `data/articles.json` (add article metadata)
2. `articles/your-article.html` (write article content)

Everything else happens **automatically**! 🎉

---

## 📚 Quick Reference

| Task | File to Edit | What to Do |
|------|-------------|------------|
| Add new article | `data/articles.json` | Add article object to array |
| Write article content | `articles/your-article.html` | Create HTML page |
| Change colors | `css/styles.css` | Edit color values |
| Add category | `data/articles.json` | Add to `categories` array |
| Feature article | `data/articles.json` | Set `featured: true` |

---

**Need help?** Check the code comments in each `.js` file for detailed explanations!
