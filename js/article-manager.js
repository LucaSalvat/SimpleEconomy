// Shared data and rendering helpers for static Economics Notes pages.
(function () {
  const state = {
    loaded: false,
    articles: [],
    categories: [],
  };

  async function loadData() {
    if (state.loaded) return state;

    const response = await fetch('data/articles.json');
    if (!response.ok) {
      throw new Error(`Could not load articles.json (${response.status})`);
    }

    const data = await response.json();
    state.articles = (data.articles || []).slice();
    state.categories = (data.categories || []).slice();
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
          <p class="article-author">✍️ ${article.author || 'Economics Notes'}</p>
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
    sortByDateDesc,
    formatDate,
    createNoteCard,
  };
})();
