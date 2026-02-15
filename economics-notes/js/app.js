/**
 * Main Application Logic
 * Handles initialization and coordination between modules
 */

// Global state
const AppState = {
    articles: [],
    categories: [],
    popularTopics: [],
    currentCategory: 'all',
    searchTerm: ''
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Economics Notes App initialized');
    
    // Load data and initialize components
    loadData();
    
    // Setup event listeners
    setupEventListeners();
});

/**
 * Load all data from JSON file
 */
async function loadData() {
    try {
        const response = await fetch('data/articles.json');
        const data = await response.json();
        
        // Store in global state
        AppState.articles = data.articles;
        AppState.categories = data.categories;
        AppState.popularTopics = data.popularTopics;
        
        // Initialize UI components
        renderCategories();
        renderPopularTopics();
        renderFeaturedNote();
        renderLatestInsights();
        renderRecentNotes();
        
        // Render category cards if on categories page
        if (typeof renderCategoryCards === 'function') {
            renderCategoryCards();
        }
        
        // Render all notes if on all-notes page
        if (typeof renderAllNotes === 'function') {
            renderAllNotes();
        }
        
        console.log('Data loaded successfully:', data);
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Failed to load articles. Please refresh the page.');
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Render categories
 */
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    
    container.innerHTML = AppState.categories.map((category, index) => `
        <button class="category-pill ${index === 0 ? 'active' : ''}" 
                data-category="${category.slug}"
                onclick="filterByCategory('${category.slug}', this)">
            ${category.name}
        </button>
    `).join('');
}

/**
 * Render popular topics
 */
function renderPopularTopics() {
    const container = document.getElementById('popularTopics');
    if (!container) return;
    
    container.innerHTML = AppState.popularTopics.map(topic => `
        <div class="topic-card ${topic.gradient}">
            <h3 class="topic-title">${topic.title}</h3>
            <p class="topic-count">${topic.noteCount} notes</p>
        </div>
    `).join('');
}

/**
 * Filter articles by category
 */
function filterByCategory(categorySlug, element) {
    AppState.currentCategory = categorySlug;
    AppState.searchTerm = ''; // Clear search when filtering by category
    
    // Update active state on category pills
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // Re-render articles
    renderLatestInsights();
    renderRecentNotes();
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get gradient class based on gradient string
 */
function getGradientClass(gradient) {
    // Convert gradient string to class name
    // e.g., "from-blue-200 to-cyan-200" -> "note-bg-blue"
    if (gradient.includes('blue')) return 'note-bg-blue';
    if (gradient.includes('purple') || gradient.includes('violet')) return 'note-bg-purple';
    if (gradient.includes('green') || gradient.includes('emerald')) return 'note-bg-green';
    if (gradient.includes('orange') || gradient.includes('amber')) return 'note-bg-orange';
    if (gradient.includes('pink') || gradient.includes('rose')) return 'note-bg-pink';
    if (gradient.includes('cyan') || gradient.includes('teal')) return 'note-bg-cyan';
    return 'note-bg-blue';
}

/**
 * Get insight gradient class
 */
function getInsightGradientClass(gradient) {
    if (gradient.includes('indigo')) return 'insight-indigo';
    if (gradient.includes('purple')) return 'insight-purple';
    if (gradient.includes('green') || gradient.includes('teal')) return 'insight-teal';
    return 'insight-indigo';
}

/**
 * Show error message
 */
function showError(message) {
    const main = document.querySelector('.main-content .container');
    if (main) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p>⚠️ ${message}</p>
        `;
        main.insertBefore(errorDiv, main.firstChild);
    }
}

/**
 * Navigate to article page
 */
function navigateToArticle(articleId) {
    const article = AppState.articles.find(a => a.id === articleId);
    if (article && article.content) {
        window.location.href = article.content;
    } else {
        alert('Article content coming soon!');
    }
}