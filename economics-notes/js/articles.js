/**
 * Articles Module
 * Handles rendering and displaying articles
 */

/**
 * Render the featured note
 */
function renderFeaturedNote() {
    const container = document.getElementById('featuredNote');
    if (!container) return;
    
    const featuredArticle = AppState.articles.find(article => article.featured);
    if (!featuredArticle) return;
    
    container.innerHTML = `
        <div class="featured-card">
            <div class="featured-image">
                <div class="featured-icon">📊</div>
                <div class="featured-label">Supply & Demand</div>
            </div>
            <div class="featured-content">
                <div class="meta-info">
                    <span class="badge">${featuredArticle.category}</span>
                    <span class="date">${formatDate(featuredArticle.date)}</span>
                </div>
                <h3 class="featured-title">${featuredArticle.title}</h3>
                <p class="featured-description">${featuredArticle.description}</p>
                <button class="btn-primary" onclick="navigateToArticle('${featuredArticle.id}')">
                    Read Full Note
                </button>
            </div>
        </div>
    `;
}

/**
 * Render latest insights (most recent 3 articles)
 */
function renderLatestInsights() {
    const container = document.getElementById('latestInsights');
    if (!container) return;
    
    // Get filtered articles
    let articles = getFilteredArticles();
    
    // Get latest 3 non-featured articles
    const insights = articles
        .filter(article => !article.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    
    if (insights.length === 0) {
        container.innerHTML = '<p class="no-articles">No insights found for this category.</p>';
        return;
    }
    
    container.innerHTML = insights.map(article => `
        <article class="insight-card" onclick="navigateToArticle('${article.id}')">
            <div class="insight-image ${getInsightGradientClass(article.gradient)}">
                <div class="insight-icon">💡</div>
            </div>
            <div class="card-content">
                <div class="meta-info">
                    <span class="badge">${article.category}</span>
                    <span class="date-small">${formatDate(article.date)}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description}</p>
                <a href="#" class="read-more" onclick="event.preventDefault(); navigateToArticle('${article.id}')">
                    Read more →
                </a>
            </div>
        </article>
    `).join('');
}

/**
 * Render recent notes (6 most recent non-featured articles)
 */
function renderRecentNotes() {
    const container = document.getElementById('recentNotes');
    const noResults = document.getElementById('noResults');
    if (!container) return;
    
    // Get filtered articles
    let articles = getFilteredArticles();
    
    // Get 6 most recent non-featured articles
    const recentNotes = articles
        .filter(article => !article.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    
    if (recentNotes.length === 0) {
        container.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
    
    container.innerHTML = recentNotes.map(article => `
        <article class="note-card" onclick="navigateToArticle('${article.id}')">
            <div class="note-image ${getGradientClass(article.gradient)}">
                <div class="note-icon">📈</div>
            </div>
            <div class="card-content">
                <div class="meta-info">
                    <span class="badge">${article.category}</span>
                    <span class="date-small">${formatDate(article.date)}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description}</p>
                <a href="#" class="read-more" onclick="event.preventDefault(); navigateToArticle('${article.id}')">
                    Read more →
                </a>
            </div>
        </article>
    `).join('');
}

/**
 * Get filtered articles based on current category and search term
 */
function getFilteredArticles() {
    let articles = [...AppState.articles];
    
    // Filter by category
    if (AppState.currentCategory !== 'all') {
        articles = articles.filter(article => 
            article.category.toLowerCase() === AppState.currentCategory.toLowerCase()
        );
    }
    
    // Filter by search term
    if (AppState.searchTerm) {
        const searchLower = AppState.searchTerm.toLowerCase();
        articles = articles.filter(article => 
            article.title.toLowerCase().includes(searchLower) ||
            article.description.toLowerCase().includes(searchLower) ||
            article.category.toLowerCase().includes(searchLower) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }
    
    return articles;
}

/**
 * Render all articles (for search results or category filtering)
 */
function renderAllArticles(articles) {
    const container = document.getElementById('recentNotes');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    if (articles.length === 0) {
        container.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
    
    container.innerHTML = articles.map(article => `
        <article class="note-card" onclick="navigateToArticle('${article.id}')">
            <div class="note-image ${getGradientClass(article.gradient)}">
                <div class="note-icon">📈</div>
            </div>
            <div class="card-content">
                <div class="meta-info">
                    <span class="badge">${article.category}</span>
                    <span class="date-small">${formatDate(article.date)}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description}</p>
                <a href="#" class="read-more" onclick="event.preventDefault(); navigateToArticle('${article.id}')">
                    Read more →
                </a>
            </div>
        </article>
    `).join('');
}

/**
 * Get category icon based on category name
 */
function getCategoryIcon(categoryName) {
    const icons = {
        'Microeconomics': '📊',
        'Macroeconomics': '🌍',
        'International Economics': '🌐',
        'Development Economics': '📈',
        'Behavioral Economics': '🧠',
        'Econometrics': '📉',
        'Political Economy': '🏛️',
        'Financial Economics': '💰'
    };
    return icons[categoryName] || '📚';
}