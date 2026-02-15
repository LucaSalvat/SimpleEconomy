// Homepage filtering (search + category pills)
(function () {
  const pageState = {
    selectedCategory: 'all',
    query: '',
    articles: [],
  };

  function normalize(value) {
    return (value || '').toLowerCase();
  }

  function matchesQuery(article, query) {
    if (!query) return true;
    const haystack = [
      article.title,
      article.description,
      article.category,
      ...(article.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  }

  function applyFilters() {
    return pageState.articles.filter((article) => {
      const categoryMatch =
        pageState.selectedCategory === 'all' || article.categoryPath === pageState.selectedCategory;
      return categoryMatch && matchesQuery(article, pageState.query);
    });
  }

  function updateResults(articles) {
    const featured = document.getElementById('featuredNote');
    const recent = document.getElementById('recentNotes');
    const noResults = document.getElementById('noResults');

    if (!featured || !recent) return;

    if (typeof window.renderPopularTopics === 'function') {
      window.renderPopularTopics(articles);
    }

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
          <span class="badge">${featuredArticle.category}</span>
          <h3>${featuredArticle.title}</h3>
          <p>${featuredArticle.description}</p>
          <div class="featured-meta">${window.EconomicsData.formatDate(featuredArticle.date)} · ${featuredArticle.readTime || '5 min read'}</div>
          <a href="${featuredArticle.path}" class="btn-primary">Read Full Note</a>
        </div>
      </article>
    `;

    recent.innerHTML = articles
      .slice(0, 6)
      .map((article, index) => window.EconomicsData.createNoteCard(article, index))
      .join('');
  }

  function wireSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (event) => {
      pageState.query = normalize(event.target.value);
      updateResults(applyFilters());
    });
  }

  function wireCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    container.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category]');
      if (!button) return;

      pageState.selectedCategory = button.getAttribute('data-category') || 'all';
      container.querySelectorAll('.category-pill').forEach((pill) => pill.classList.remove('active'));
      button.classList.add('active');
      updateResults(applyFilters());
    });
  }

  async function initPageSelector() {
    const { articles } = await window.EconomicsData.loadData();
    pageState.articles = window.EconomicsData.sortByDateDesc(articles);
    wireSearch();
    wireCategories();
    updateResults(pageState.articles);
  }

  window.initPageSelector = initPageSelector;
})();
