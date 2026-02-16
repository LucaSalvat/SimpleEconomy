// Homepage Manager
// Consolidates homepage rendering, filtering, and data access in one place.
(function () {
  const state = {
    articles: [],
    categories: [],
    selectedCategory: 'all',
    query: '',
  };

  const HOME_COLORS = ['note-bg-blue', 'note-bg-purple', 'note-bg-green', 'note-bg-orange', 'note-bg-pink', 'note-bg-cyan'];
  const HOME_ICONS = ['📊', '💡', '📈', '🎯', '💼', '🔍'];
  const TOPIC_COLORS = ['topic-blue', 'topic-purple', 'topic-green', 'topic-orange'];

  const getEl = (id) => document.getElementById(id);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  async function loadSiteData() {
    const response = await fetch('data/articles.json');
    if (!response.ok) {
      throw new Error(`Unable to load site data (${response.status})`);
    }

    const data = await response.json();
    state.articles = (data.articles || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    state.categories = (data.categories || []).slice();
  }

  function buildCategoryPills() {
    const categoriesContainer = getEl('categoriesContainer');
    if (!categoriesContainer) return;

    const counts = state.articles.reduce((acc, article) => {
      acc[article.categoryPath] = (acc[article.categoryPath] || 0) + 1;
      return acc;
    }, {});

    const pills = [
      '<button class="category-pill active" data-category="all">All Notes</button>',
      ...state.categories.map(
        (category) =>
          `<button class="category-pill" data-category="${category.slug}">${category.name} (${counts[category.slug] || 0})</button>`,
      ),
    ];

    categoriesContainer.innerHTML = pills.join('');
  }

  function getFilteredArticles() {
    return state.articles.filter((article) => {
      const categoryMatch = state.selectedCategory === 'all' || article.categoryPath === state.selectedCategory;
      if (!categoryMatch) return false;

      if (!state.query) return true;

      const searchable = [article.title, article.description, article.category, ...(article.tags || [])]
        .join(' ')
        .toLowerCase();
      return searchable.includes(state.query);
    });
  }

  function renderPopularTopics(articles) {
    const container = getEl('popularTopics');
    if (!container) return;

    const topicCounts = {};
    articles.forEach((article) => {
      (article.tags || []).forEach((tag) => {
        topicCounts[tag] = (topicCounts[tag] || 0) + 1;
      });
    });

    const topTags = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    if (topTags.length === 0) {
      container.innerHTML = '<p class="empty-message">No popular topics available for this selection.</p>';
      return;
    }

    container.innerHTML = topTags
      .map(
        ([tag, count], index) =>
          `<article class="topic-card ${TOPIC_COLORS[index % TOPIC_COLORS.length]}"><h3 class="topic-title">${tag}</h3><p class="topic-count">${count} note${count === 1 ? '' : 's'}</p></article>`,
      )
      .join('');
  }

  function renderFeaturedAndRecent(articles) {
    const featured = getEl('featuredNote');
    const recent = getEl('recentNotes');
    const noResults = getEl('noResults');

    if (!featured || !recent) return;

    if (articles.length === 0) {
      featured.innerHTML = '<p class="empty-message">No featured note found for this filter.</p>';
      recent.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    const featuredArticle = articles[0];
    featured.innerHTML = `
      <article class="featured-card">
        <div class="featured-content">
          <div class="meta-info">
            <span class="badge">${featuredArticle.category}</span>
            <span class="date-small">${formatDate(featuredArticle.date)}</span>
          </div>
          <h3 class="featured-title">${featuredArticle.title}</h3>
          <p class="featured-description">${featuredArticle.description}</p>
          <p class="article-author featured-author">✍️ ${featuredArticle.author || 'SimpleEconomy'}</p>
          <a href="${featuredArticle.path}" class="btn-primary">Read Full Note</a>
        </div>
      </article>
    `;

    recent.innerHTML = articles
      .slice(0, 6)
      .map(
        (article, index) => `
          <article class="note-card" data-category="${article.categoryPath}">
            <a href="${article.path}" class="note-image ${HOME_COLORS[index % HOME_COLORS.length]}" aria-label="${article.title}">
              <span class="note-icon">${HOME_ICONS[index % HOME_ICONS.length]}</span>
            </a>
            <div class="card-content">
              <div class="meta-info">
                <span class="badge">${article.category}</span>
                <span class="date-small">${formatDate(article.date)}</span>
              </div>
              <h3 class="card-title">${article.title}</h3>
              <p class="card-description">${article.description || ''}</p>
              <p class="article-author">✍️ ${article.author || 'SimpleEconomy'}</p>
              <div class="card-footer">
                <a href="${article.path}" class="read-more">Read more →</a>
                ${article.readTime ? `<span class="read-time">${article.readTime}</span>` : ''}
              </div>
            </div>
          </article>
        `,
      )
      .join('');
  }

  function renderLatestInsights(articles) {
    const insightsContainer = getEl('latestInsights');
    if (!insightsContainer) return;

    insightsContainer.innerHTML = articles
      .slice(0, 3)
      .map(
        (article) => `
          <article class="insight-card">
            <div class="card-content">
              <div class="meta-info">
                <span class="badge">${article.category}</span>
                <span class="date-small">${formatDate(article.date)}</span>
              </div>
              <h3 class="card-title">${article.title}</h3>
              <p class="card-description">${article.description}</p>
              <a href="${article.path}" class="read-more">Read more →</a>
            </div>
          </article>
        `,
      )
      .join('');
  }

  function renderAll() {
    const filtered = getFilteredArticles();
    renderFeaturedAndRecent(filtered);
    renderPopularTopics(filtered);
    renderLatestInsights(filtered.length ? filtered : state.articles);
  }

  function bindEvents() {
    const searchInput = getEl('searchInput');
    const categoriesContainer = getEl('categoriesContainer');
    const mobileMenuBtn = getEl('mobileMenuBtn');
    const mainNav = getEl('mainNav');

    searchInput?.addEventListener('input', (event) => {
      state.query = (event.target.value || '').toLowerCase().trim();
      renderAll();
    });

    categoriesContainer?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;

      state.selectedCategory = button.getAttribute('data-category') || 'all';
      categoriesContainer.querySelectorAll('.category-pill').forEach((pill) => pill.classList.remove('active'));
      button.classList.add('active');
      renderAll();
    });

    mobileMenuBtn?.addEventListener('click', () => {
      mainNav?.classList.toggle('active');
    });
  }

  async function initHomepage() {
    await loadSiteData();
    buildCategoryPills();
    bindEvents();
    renderAll();
  }

  window.initHomepage = initHomepage;
})();
