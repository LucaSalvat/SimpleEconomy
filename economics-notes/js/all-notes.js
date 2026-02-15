// All Notes Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupMobileMenu();
});

// Render all notes in the grid
function renderAllNotes() {
    const grid = document.getElementById('allNotesGrid');
    const articles = getFilteredArticles();
    
    if (articles.length === 0) {
        document.getElementById('noResults').style.display = 'block';
        grid.innerHTML = '';
        updateStats(0);
        return;
    }
    
    document.getElementById('noResults').style.display = 'none';
    
    // Sort by date (newest first)
    const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    grid.innerHTML = sortedArticles.map(article => {
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
    
    updateStats(sortedArticles.length);
}

// Update stats bar
function updateStats(showing) {
    document.getElementById('totalArticles').textContent = AppState.articles.length;
    document.getElementById('totalCategories').textContent = AppState.categories.length;
    document.getElementById('showingCount').textContent = showing;
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
