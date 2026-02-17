// Shared data and rendering helpers for static SimpleEconomy pages.
(function () {
  const state = {
    loaded: false,
    articles: [],
    categories: [],
    basePath: '',
  };

  async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Could not load ${path} (${response.status})`);
    }
    return response.json();
  }

  async function loadStructuredData(basePath = '') {
    const normalizedBasePath = basePath ? `${basePath.replace(/\/$/, '')}/` : '';

    try {
      const [indexData, categoriesData] = await Promise.all([
        fetchJson(`${normalizedBasePath}data/articles/index.json`),
        fetchJson(`${normalizedBasePath}data/categories.json`),
      ]);

      const articleEntries = indexData.articles || [];
      const articles = await Promise.all(
        articleEntries.map((entry) => fetchJson(`${normalizedBasePath}data/articles/${entry.file || `${entry.id}.json`}`)),
      );

      return {
        articles,
        categories: categoriesData.categories || [],
      };
    } catch (structuredError) {
      const fallback = await fetchJson(`${normalizedBasePath}data/articles.json`);
      return {
        articles: fallback.articles || [],
        categories: fallback.categories || [],
      };
    }
  }

  async function loadData(basePath = '') {
    const normalizedBasePath = basePath || '';
    if (state.loaded && state.basePath === normalizedBasePath) return state;

    const data = await loadStructuredData(normalizedBasePath);
    state.articles = data.articles.slice();
    state.categories = data.categories.slice();
    state.basePath = normalizedBasePath;
    state.loaded = true;
    return state;
  }

  function sortByDateDesc(articles) {
    return articles.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  function createNoteCard(article, index = 0) {
    const bgColors = ['note-bg-blue', 'note-bg-purple', 'note-bg-green', 'note-bg-orange', 'note-bg-pink', 'note-bg-cyan'];
    const icons = ['📊', '💡', '📈', '🎯', '💼', '🔍'];

    return `
      <article class="note-card" data-category="${article.categoryPath}">
        <a href="${article.path}" class="note-image ${bgColors[index % bgColors.length]}" aria-label="${article.title}">
          <span class="note-icon">${icons[index % icons.length]}</span>
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
    `;
  }

  window.EconomicsData = {
    loadData,
    loadStructuredData,
    sortByDateDesc,
    formatDate,
    createNoteCard,
  };
})();
