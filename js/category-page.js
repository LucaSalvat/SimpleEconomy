// Category Page Manager
// Loads category data once, then renders core readings, recent notes, and stats.

let articlesData = [];
let currentCategory = '';
let dataLoaded = false;

const CARD_BG_COLORS = ['note-bg-blue', 'note-bg-purple', 'note-bg-green', 'note-bg-orange', 'note-bg-pink', 'note-bg-cyan'];
const CARD_ICONS = ['📊', '💡', '📈', '🎯', '💼', '🔍'];

const keyArticlesFramework = {
  microeconomics: [
    { title: 'Supply and Demand Fundamentals', description: 'Market equilibrium, shifts, and elasticity concepts' },
    { title: 'Consumer Theory & Utility', description: 'Budget constraints, preferences, and utility maximization' },
    { title: 'Production & Costs', description: 'Production functions, cost structures, and economies of scale' },
    { title: 'Perfect Competition', description: 'Market characteristics and long-run equilibrium' },
    { title: 'Monopoly & Market Power', description: 'Price discrimination and welfare implications' },
    { title: 'Externalities & Public Goods', description: 'Market failures and government intervention' },
  ],
  macroeconomics: [
    { title: 'GDP & National Accounts', description: 'Measuring economic output and income' },
    { title: 'Inflation & Price Indices', description: 'CPI, deflators, and purchasing power' },
    { title: 'Unemployment & Labor Markets', description: 'Types of unemployment and natural rate' },
    { title: 'AD-AS Model', description: 'Aggregate demand and supply framework' },
    { title: 'Monetary Policy & Central Banking', description: 'Interest rates and money supply control' },
    { title: 'Fiscal Policy', description: 'Government spending, taxation, and deficits' },
    { title: 'Economic Growth Theory', description: 'Solow model and endogenous growth' },
  ],
  econometrics: [
    { title: 'Simple Linear Regression', description: 'OLS estimation and properties' },
    { title: 'Multiple Regression', description: 'Multivariate analysis and interpretation' },
    { title: 'Hypothesis Testing', description: 'Statistical inference and t-tests' },
    { title: 'Model Specification', description: 'Variable selection and functional forms' },
    { title: 'Heteroskedasticity & Autocorrelation', description: 'Violations of classical assumptions' },
    { title: 'Time Series Analysis', description: 'Stationarity, trends, and forecasting' },
  ],
  finance: [
    { title: 'Time Value of Money', description: 'Present value, future value, and discounting' },
    { title: 'Risk & Return', description: 'Portfolio theory and CAPM' },
    { title: 'Asset Pricing Models', description: 'CAPM, APT, and factor models' },
    { title: 'Fixed Income Securities', description: 'Bonds, duration, and yield curves' },
    { title: 'Derivatives & Options', description: 'Hedging and pricing strategies' },
    { title: 'Corporate Finance', description: 'Capital structure and valuation' },
  ],
  development: [
    { title: 'Poverty Measurement', description: 'Poverty lines and multidimensional indicators' },
    { title: 'Growth & Development', description: 'Distinguishing growth from development' },
    { title: 'Human Capital', description: 'Education, health, and productivity' },
    { title: 'Institutions & Governance', description: 'Role of institutions in development' },
    { title: 'Agricultural Economics', description: 'Rural development and food security' },
    { title: 'Development Policy', description: 'Aid, trade, and development strategies' },
  ],
};

function normalize(text) {
  return (text || '').toLowerCase().trim();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

async function loadArticles() {
  if (dataLoaded) return;

  try {
    const response = await fetch('../data/articles.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    articlesData = data.articles || [];
    dataLoaded = true;
  } catch (error) {
    console.error('Error loading articles:', error);
    articlesData = [];
  }
}

function getCategoryArticles() {
  return articlesData.filter((article) =>
    article.categoryPath === currentCategory || normalize(article.category) === currentCategory,
  );
}

function findMatchingArticle(categoryArticles, topicTitle) {
  const normalizedTopic = normalize(topicTitle);
  const topicTokens = normalizedTopic.split(/\s+/).filter((token) => token.length > 3);

  return categoryArticles.find((article) => {
    const normalizedTitle = normalize(article.title);
    if (normalizedTitle.includes(normalizedTopic)) return true;

    return topicTokens.some((token) => normalizedTitle.includes(token));
  });
}

function displayKeyArticles() {
  const container = document.getElementById('keyArticlesGrid');
  if (!container) return;

  const framework = keyArticlesFramework[currentCategory] || [];
  const categoryArticles = getCategoryArticles();

  container.innerHTML = framework
    .map((keyArticle, index) => {
      const matchingArticle = findMatchingArticle(categoryArticles, keyArticle.title);
      const hasArticle = Boolean(matchingArticle);

      const wrapperTag = hasArticle ? 'a' : 'div';
      const href = hasArticle ? ` href="../${matchingArticle.path}"` : '';

      return `
        <${wrapperTag} class="key-article-card ${hasArticle ? 'has-article' : ''}"${href}>
          <div class="key-article-number">${index + 1}</div>
          <h4 class="key-article-title">${keyArticle.title}</h4>
          <p class="key-article-description">${keyArticle.description}</p>
          <div class="key-article-status">${hasArticle ? '✓ Available' : '⧗ Coming Soon'}</div>
        </${wrapperTag}>
      `;
    })
    .join('');
}

function displayLatestNotes() {
  const container = document.getElementById('latestNotes');
  const noNotes = document.getElementById('noNotes');
  if (!container) return;

  const latestArticles = getCategoryArticles()
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (latestArticles.length === 0) {
    container.style.display = 'none';
    if (noNotes) noNotes.style.display = 'block';
    return;
  }

  if (noNotes) noNotes.style.display = 'none';
  container.style.display = 'grid';

  container.innerHTML = latestArticles
    .map(
      (article, index) => `
        <article class="note-card">
          <a href="../${article.path}" class="note-image ${CARD_BG_COLORS[index % CARD_BG_COLORS.length]}" aria-label="${article.title}">
            <span class="note-icon">${CARD_ICONS[index % CARD_ICONS.length]}</span>
          </a>
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
        </article>
      `,
    )
    .join('');
}

function updateStats() {
  const categoryArticles = getCategoryArticles();

  const articleCountEl = document.getElementById('articleCount');
  if (articleCountEl) {
    articleCountEl.textContent = String(categoryArticles.length);
  }

  const readTimeEl = document.getElementById('readTime');
  if (readTimeEl) {
    const totalMinutes = categoryArticles.reduce((sum, article) => {
      if (!article.readTime) return sum + 5;
      const minutes = parseInt((article.readTime.match(/\d+/) || [0])[0], 10);
      return sum + (Number.isNaN(minutes) ? 5 : minutes);
    }, 0);

    readTimeEl.textContent = String(totalMinutes);
  }
}

async function initCategoryPage(category) {
  currentCategory = normalize(category);
  await loadArticles();
  displayKeyArticles();
  displayLatestNotes();
  updateStats();
}

if (typeof window !== 'undefined') {
  window.initCategoryPage = initCategoryPage;
}
