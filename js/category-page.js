// Category Page Manager
// Handles loading and displaying category-specific content

let articlesData = [];
let currentCategory = '';

// Key articles framework for each category
const keyArticlesFramework = {
    microeconomics: [
        { title: 'Supply and Demand Fundamentals', description: 'Market equilibrium, shifts, and elasticity concepts' },
        { title: 'Consumer Theory & Utility', description: 'Budget constraints, preferences, and utility maximization' },
        { title: 'Production & Costs', description: 'Production functions, cost structures, and economies of scale' },
        { title: 'Perfect Competition', description: 'Market characteristics and long-run equilibrium' },
        { title: 'Monopoly & Market Power', description: 'Price discrimination and welfare implications' },
        { title: 'Externalities & Public Goods', description: 'Market failures and government intervention' }
    ],
    macroeconomics: [
        { title: 'GDP & National Accounts', description: 'Measuring economic output and income' },
        { title: 'Inflation & Price Indices', description: 'CPI, deflators, and purchasing power' },
        { title: 'Unemployment & Labor Markets', description: 'Types of unemployment and natural rate' },
        { title: 'AD-AS Model', description: 'Aggregate demand and supply framework' },
        { title: 'Monetary Policy & Central Banking', description: 'Interest rates and money supply control' },
        { title: 'Fiscal Policy', description: 'Government spending, taxation, and deficits' },
        { title: 'Economic Growth Theory', description: 'Solow model and endogenous growth' }
    ],
    econometrics: [
        { title: 'Simple Linear Regression', description: 'OLS estimation and properties' },
        { title: 'Multiple Regression', description: 'Multivariate analysis and interpretation' },
        { title: 'Hypothesis Testing', description: 'Statistical inference and t-tests' },
        { title: 'Model Specification', description: 'Variable selection and functional forms' },
        { title: 'Heteroskedasticity & Autocorrelation', description: 'Violations of classical assumptions' },
        { title: 'Time Series Analysis', description: 'Stationarity, trends, and forecasting' }
    ],
    finance: [
        { title: 'Time Value of Money', description: 'Present value, future value, and discounting' },
        { title: 'Risk & Return', description: 'Portfolio theory and CAPM' },
        { title: 'Asset Pricing Models', description: 'CAPM, APT, and factor models' },
        { title: 'Fixed Income Securities', description: 'Bonds, duration, and yield curves' },
        { title: 'Derivatives & Options', description: 'Hedging and pricing strategies' },
        { title: 'Corporate Finance', description: 'Capital structure and valuation' }
    ],
    development: [
        { title: 'Poverty Measurement', description: 'Poverty lines and multidimensional indicators' },
        { title: 'Growth & Development', description: 'Distinguishing growth from development' },
        { title: 'Human Capital', description: 'Education, health, and productivity' },
        { title: 'Institutions & Governance', description: 'Role of institutions in development' },
        { title: 'Agricultural Economics', description: 'Rural development and food security' },
        { title: 'Development Policy', description: 'Aid, trade, and development strategies' }
    ]
};

// Initialize category page
async function initCategoryPage(category) {
    currentCategory = category;
    await loadArticles();
    displayKeyArticles();
    displayLatestNotes();
    updateStats();
}

// Load articles data
async function loadArticles() {
    try {
        const response = await fetch('../data/articles.json');
        const data = await response.json();
        articlesData = data.articles || [];
    } catch (error) {
        console.error('Error loading articles:', error);
        articlesData = [];
    }
}

// Get articles for current category
function getCategoryArticles() {
    return articlesData.filter(article => 
        article.categoryPath === currentCategory ||
        article.category.toLowerCase() === currentCategory.toLowerCase()
    );
}

// Display key articles framework
function displayKeyArticles() {
    const container = document.getElementById('keyArticlesGrid');
    if (!container) return;

    const framework = keyArticlesFramework[currentCategory] || [];
    const categoryArticles = getCategoryArticles();
    
    container.innerHTML = framework.map((keyArticle, index) => {
        // Check if we have an actual article matching this key topic
        const matchingArticle = categoryArticles.find(article => 
            article.title.toLowerCase().includes(keyArticle.title.toLowerCase().split(' ')[0])
        );

        const hasArticle = matchingArticle !== undefined;
        
        return `
            <div class="key-article-card ${hasArticle ? 'has-article' : ''}" 
                 ${hasArticle ? `onclick="window.location.href='../${matchingArticle.path}'"` : ''}>
                <div class="key-article-number">${index + 1}</div>
                <h4 class="key-article-title">${keyArticle.title}</h4>
                <p class="key-article-description">${keyArticle.description}</p>
                <div class="key-article-status">
                    ${hasArticle ? '✓ Available' : '⧗ Coming Soon'}
                </div>
            </div>
        `;
    }).join('');
}

// Display latest notes in category
function displayLatestNotes() {
    const container = document.getElementById('latestNotes');
    const noNotes = document.getElementById('noNotes');
    if (!container) return;

    const categoryArticles = getCategoryArticles();
    
    // Sort by date (most recent first)
    const sortedArticles = categoryArticles.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );

    // Take latest 6 articles
    const latestArticles = sortedArticles.slice(0, 6);

    if (latestArticles.length === 0) {
        container.style.display = 'none';
        if (noNotes) noNotes.style.display = 'block';
        return;
    }

    if (noNotes) noNotes.style.display = 'none';
    container.style.display = 'grid';

    const bgColors = ['note-bg-blue', 'note-bg-purple', 'note-bg-green', 'note-bg-orange', 'note-bg-pink', 'note-bg-cyan'];
    const icons = ['📊', '💡', '📈', '🎯', '💼', '🔍'];

    container.innerHTML = latestArticles.map((article, index) => `
        <div class="note-card" onclick="window.location.href='../${article.path}'">
            <div class="note-image ${bgColors[index % bgColors.length]}">
                <div class="note-icon">${icons[index % icons.length]}</div>
            </div>
            <div class="card-content">
                <div class="meta-info">
                    <span class="badge">${article.category}</span>
                    <span class="date-small">${formatDate(article.date)}</span>
                </div>
                <h3 class="card-title">${article.title}</h3>
                <p class="card-description">${article.description || 'Click to read more...'}</p>
                <div class="card-footer">
                    <a href="../${article.path}" class="read-more">Read more →</a>
                    ${article.readTime ? `<span class="read-time">${article.readTime}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Update statistics
function updateStats() {
    const categoryArticles = getCategoryArticles();
    
    // Update article count
    const articleCountEl = document.getElementById('articleCount');
    if (articleCountEl) {
        articleCountEl.textContent = categoryArticles.length;
    }

    // Update total read time
    const readTimeEl = document.getElementById('readTime');
    if (readTimeEl) {
        const totalMinutes = categoryArticles.reduce((sum, article) => {
            if (article.readTime) {
                const minutes = parseInt(article.readTime.match(/\d+/));
                return sum + (minutes || 0);
            }
            return sum + 5; // Default 5 minutes if not specified
        }, 0);
        readTimeEl.textContent = totalMinutes;
    }
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.initCategoryPage = initCategoryPage;
}
