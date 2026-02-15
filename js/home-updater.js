// Homepage rendering for categories, topics, and latest insights.
(function () {
  function countByCategory(articles) {
    return articles.reduce((acc, article) => {
      acc[article.categoryPath] = (acc[article.categoryPath] || 0) + 1;
      return acc;
    }, {});
  }

  function renderCategories(categories, counts) {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;

    const pills = [
      '<button class="category-pill active" data-category="all">All Notes</button>',
      ...categories.map(
        (category) =>
          `<button class="category-pill" data-category="${category.slug}">${category.name} (${counts[category.slug] || 0})</button>`,
      ),
    ];

    container.innerHTML = pills.join('');
  }

  function renderPopularTopics(articles) {
    const container = document.getElementById('popularTopics');
    if (!container) return;

    const topicCounts = {};
    articles.forEach((article) => {
      (article.tags || []).forEach((tag) => {
        topicCounts[tag] = (topicCounts[tag] || 0) + 1;
      });
    });

    const top = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    container.innerHTML = top
      .map(
        ([tag, count]) =>
          `<div class="topic-card"><h3>${tag}</h3><p>${count} note${count === 1 ? '' : 's'}</p></div>`,
      )
      .join('');
  }

  function renderLatestInsights(articles) {
    const container = document.getElementById('latestInsights');
    if (!container) return;

    container.innerHTML = articles
      .slice(0, 3)
      .map(
        (article) => `
          <article class="insight-card">
            <div class="card-content">
              <div class="meta-info">
                <span class="badge">${article.category}</span>
                <span class="date-small">${window.EconomicsData.formatDate(article.date)}</span>
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

  async function initHomeUpdater() {
    const { articles, categories } = await window.EconomicsData.loadData();
    const sorted = window.EconomicsData.sortByDateDesc(articles);
    const counts = countByCategory(articles);

    renderCategories(categories, counts);
    renderPopularTopics(sorted);
    renderLatestInsights(sorted);
  }

  window.initHomeUpdater = initHomeUpdater;
})();
