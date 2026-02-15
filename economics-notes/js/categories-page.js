// Categories Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupMobileMenu();
});

// Category icons mapping
const categoryIcons = {
    'Microeconomics': '📊',
    'Macroeconomics': '🌍',
    'International Economics': '🌐',
    'Development Economics': '📈',
    'Behavioral Economics': '🧠',
    'Econometrics': '📉',
    'Political Economy': '🏛️',
    'Financial Economics': '💰'
};

// Category descriptions
const categoryDescriptions = {
    'Microeconomics': 'Study of individual agents and market mechanisms',
    'Macroeconomics': 'Analysis of economy-wide phenomena and policies',
    'International Economics': 'Trade, finance, and global economic interactions',
    'Development Economics': 'Economic growth and development strategies',
    'Behavioral Economics': 'Psychology, decision-making, and economic behavior',
    'Econometrics': 'Statistical methods for economic data analysis',
    'Political Economy': 'Intersection of politics and economics',
    'Financial Economics': 'Financial markets, instruments, and institutions'
};

// Render category cards
function renderCategoryCards() {
    const grid = document.getElementById('categoryCardsGrid');
    
    const cards = AppState.categories.map(category => {
        const icon = categoryIcons[category.name] || '📚';
        const description = categoryDescriptions[category.name] || 'Explore articles in this category';
        
        return `
            <div class="category-card" onclick="showCategoryArticles('${category.slug}')">
                <div class="category-icon">${icon}</div>
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${description}</p>
                <span class="category-count">${category.count} ${category.count === 1 ? 'article' : 'articles'}</span>
            </div>
        `;
    }).join('');
    
    grid.innerHTML = cards;
}

// Show articles for a specific category
function showCategoryArticles(categorySlug) {
    const category = AppState.categories.find(c => c.slug === categorySlug);
    if (!category) return;
    
    // Filter articles by category
    const articles = AppState.articles.filter(article => 
        article.category.toLowerCase() === category.name.toLowerCase()
    );
    
    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update UI
    document.getElementById('categoryTitle').textContent = category.name;
    document.getElementById('categoryCardsGrid').parentElement.style.display = 'none';
    document.getElementById('categoryArticlesSection').style.display = 'block';
    
    // Render articles
    const grid = document.getElementById('categoryArticlesGrid');
    grid.innerHTML = articles.map(article => {
        const gradientClass = getGradientClass(article.gradient);
        
        return `
            <article class="note-card" onclick="window.location.href='${article.content}'">
                <div class="note-image ${gradientClass}">
                    <span class="note-icon">${getCategoryIcon(article.category)}</span>
                </div>
                <div class="card-content">
                    <div class="meta-info">
                        <span class="badge">${article.category}</span>
                        <span class="date-small">${formatDate(article.date)}</span>
                    </div>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-description">${article.description}</p>
                    <div class="meta-info">
                        <span class="date-small">📚 ${article.readTime}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    
    // Setup back button
    document.getElementById('backButton').addEventListener('click', function() {
        document.getElementById('categoryArticlesSection').style.display = 'none';
        document.getElementById('categoryCardsGrid').parentElement.style.display = 'block';
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
}

// Export function for use in app.js
window.renderCategoryCards = renderCategoryCards;
