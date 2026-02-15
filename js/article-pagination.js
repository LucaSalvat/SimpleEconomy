// Article Pagination Manager
// Handles prev/next navigation between articles

class ArticlePagination {
    constructor() {
        this.articles = [];
        this.currentArticle = null;
        this.init();
    }

    async init() {
        await this.loadArticles();
        this.detectCurrentArticle();
        this.renderPagination();
    }

    // Load articles from JSON
    async loadArticles() {
        try {
            // Determine correct path to data file
            const depth = this.getDepthFromRoot();
            const dataPath = '../'.repeat(depth) + 'data/articles.json';
            
            const response = await fetch(dataPath);
            const data = await response.json();
            this.articles = data.articles || [];
            
            // Sort by date (newest first)
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Error loading articles for pagination:', error);
            this.articles = [];
        }
    }

    // Detect current article from URL
    detectCurrentArticle() {
        const currentPath = window.location.pathname;
        
        // Extract article identifier from path
        // e.g., /articles/microeconomics/supply-demand.html
        this.currentArticle = this.articles.find(article => {
            return currentPath.includes(article.path) || 
                   currentPath.includes(article.id);
        });
    }

    // Get navigation depth from root
    getDepthFromRoot() {
        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p && p !== 'index.html');
        return parts.length;
    }

    // Find previous article (older)
    getPreviousArticle() {
        if (!this.currentArticle) return null;
        
        const currentIndex = this.articles.findIndex(a => a.id === this.currentArticle.id);
        if (currentIndex === -1 || currentIndex === this.articles.length - 1) return null;
        
        return this.articles[currentIndex + 1];
    }

    // Find next article (newer)
    getNextArticle() {
        if (!this.currentArticle) return null;
        
        const currentIndex = this.articles.findIndex(a => a.id === this.currentArticle.id);
        if (currentIndex === -1 || currentIndex === 0) return null;
        
        return this.articles[currentIndex - 1];
    }

    // Get articles in same category
    getCategoryArticles() {
        if (!this.currentArticle) return [];
        
        return this.articles.filter(a => 
            a.category === this.currentArticle.category ||
            a.categoryPath === this.currentArticle.categoryPath
        );
    }

    // Get previous article in same category
    getPreviousInCategory() {
        const categoryArticles = this.getCategoryArticles();
        const currentIndex = categoryArticles.findIndex(a => a.id === this.currentArticle.id);
        
        if (currentIndex === -1 || currentIndex === categoryArticles.length - 1) return null;
        return categoryArticles[currentIndex + 1];
    }

    // Get next article in same category
    getNextInCategory() {
        const categoryArticles = this.getCategoryArticles();
        const currentIndex = categoryArticles.findIndex(a => a.id === this.currentArticle.id);
        
        if (currentIndex === -1 || currentIndex === 0) return null;
        return categoryArticles[currentIndex - 1];
    }

    // Render pagination UI
    renderPagination() {
        const container = document.getElementById('articlePagination');
        if (!container || !this.currentArticle) return;

        const prev = this.getPreviousInCategory();
        const next = this.getNextInCategory();

        const depth = this.getDepthFromRoot();
        const prefix = '../'.repeat(depth);

        container.innerHTML = `
            <div class="article-pagination">
                ${prev ? `
                    <a href="${prefix}${prev.path}" class="pagination-link pagination-prev">
                        <div class="pagination-direction">← Previous Article</div>
                        <div class="pagination-title">${prev.title}</div>
                        <div class="pagination-category">${prev.category}</div>
                    </a>
                ` : '<div class="pagination-placeholder"></div>'}
                
                <a href="${prefix}homes/${this.currentArticle.categoryPath}.html" class="pagination-category-link">
                    <div class="pagination-icon">📚</div>
                    <div>Back to ${this.currentArticle.category}</div>
                </a>
                
                ${next ? `
                    <a href="${prefix}${next.path}" class="pagination-link pagination-next">
                        <div class="pagination-direction">Next Article →</div>
                        <div class="pagination-title">${next.title}</div>
                        <div class="pagination-category">${next.category}</div>
                    </a>
                ` : '<div class="pagination-placeholder"></div>'}
            </div>
        `;
    }

    // Render related articles
    renderRelatedArticles() {
        const container = document.getElementById('relatedArticles');
        if (!container || !this.currentArticle) return;

        const categoryArticles = this.getCategoryArticles()
            .filter(a => a.id !== this.currentArticle.id)
            .slice(0, 3);

        if (categoryArticles.length === 0) return;

        const depth = this.getDepthFromRoot();
        const prefix = '../'.repeat(depth);

        container.innerHTML = `
            <div class="related-articles-section">
                <h3 class="related-title">Related Articles in ${this.currentArticle.category}</h3>
                <div class="related-articles-grid">
                    ${categoryArticles.map(article => `
                        <a href="${prefix}${article.path}" class="related-article-card">
                            <h4>${article.title}</h4>
                            <p>${article.description || 'Read more...'}</p>
                            <div class="related-meta">
                                <span class="related-date">${this.formatDate(article.date)}</span>
                                ${article.readTime ? `<span class="related-time">${article.readTime}</span>` : ''}
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Navigate to previous article
    goToPrevious() {
        const prev = this.getPreviousInCategory();
        if (prev) {
            const depth = this.getDepthFromRoot();
            const prefix = '../'.repeat(depth);
            window.location.href = prefix + prev.path;
        }
    }

    // Navigate to next article
    goToNext() {
        const next = this.getNextInCategory();
        if (next) {
            const depth = this.getDepthFromRoot();
            const prefix = '../'.repeat(depth);
            window.location.href = prefix + next.path;
        }
    }

    // Keyboard navigation
    enableKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            // Left arrow or 'p' for previous
            if (e.key === 'ArrowLeft' || e.key === 'p') {
                if (!this.isInputFocused()) {
                    this.goToPrevious();
                }
            }
            // Right arrow or 'n' for next
            if (e.key === 'ArrowRight' || e.key === 'n') {
                if (!this.isInputFocused()) {
                    this.goToNext();
                }
            }
        });
    }

    // Check if input is focused (don't trigger keyboard nav)
    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
    }
}

// Auto-initialize if we're on an article page
function initArticlePagination() {
    const pathname = window.location.pathname;
    
    // Check if we're on an article page (in /articles/ directory)
    if (pathname.includes('/articles/')) {
        const pagination = new ArticlePagination();
        pagination.enableKeyboardNav();
        
        // Expose globally
        window.articlePagination = pagination;
        
        // Also render related articles if container exists
        setTimeout(() => {
            pagination.renderRelatedArticles();
        }, 100);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArticlePagination);
} else {
    initArticlePagination();
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticlePagination;
}
