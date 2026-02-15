/**
 * Search Module
 * Handles search functionality with real-time filtering
 */

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
});

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) return;
    
    // Real-time search with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        
        // Debounce search for 300ms
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });
}

/**
 * Perform search
 */
function performSearch(searchTerm) {
    AppState.searchTerm = searchTerm.trim();
    
    console.log('Searching for:', AppState.searchTerm);
    
    // If search is empty, show all articles in current category
    if (!AppState.searchTerm) {
        renderLatestInsights();
        renderRecentNotes();
        hideSearchResults();
        return;
    }
    
    // Get search results
    const results = searchArticles(AppState.searchTerm);
    
    // Update UI
    displaySearchResults(results);
    updateArticleDisplay(results);
}

/**
 * Search articles by keyword
 */
function searchArticles(searchTerm) {
    if (!searchTerm) return AppState.articles;
    
    const searchLower = searchTerm.toLowerCase();
    
    return AppState.articles.filter(article => {
        // Search in title
        const titleMatch = article.title.toLowerCase().includes(searchLower);
        
        // Search in description
        const descriptionMatch = article.description.toLowerCase().includes(searchLower);
        
        // Search in category
        const categoryMatch = article.category.toLowerCase().includes(searchLower);
        
        // Search in tags
        const tagMatch = article.tags.some(tag => 
            tag.toLowerCase().includes(searchLower)
        );
        
        // Search in author
        const authorMatch = article.author.toLowerCase().includes(searchLower);
        
        return titleMatch || descriptionMatch || categoryMatch || tagMatch || authorMatch;
    });
}

/**
 * Display search results dropdown
 */
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) return;
    
    if (!AppState.searchTerm || results.length === 0) {
        hideSearchResults();
        return;
    }
    
    // Show top 5 results in dropdown
    const topResults = results.slice(0, 5);
    
    searchResults.innerHTML = `
        <div class="search-results-dropdown">
            <div class="search-results-header">
                <strong>${results.length} result${results.length !== 1 ? 's' : ''} found</strong>
            </div>
            ${topResults.map(article => `
                <div class="search-result-item" onclick="navigateToArticle('${article.id}')">
                    <div class="search-result-category">${article.category}</div>
                    <div class="search-result-title">${highlightText(article.title, AppState.searchTerm)}</div>
                    <div class="search-result-description">${highlightText(truncate(article.description, 100), AppState.searchTerm)}</div>
                </div>
            `).join('')}
            ${results.length > 5 ? `
                <div class="search-results-footer">
                    Showing ${topResults.length} of ${results.length} results. Scroll down to see all.
                </div>
            ` : ''}
        </div>
    `;
    
    searchResults.style.display = 'block';
}

/**
 * Hide search results dropdown
 */
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

/**
 * Update article display with search results
 */
function updateArticleDisplay(results) {
    // Hide featured and insights sections during search
    const featuredSection = document.getElementById('featuredSection');
    const insightsContainer = document.getElementById('latestInsights').parentElement;
    const topicsContainer = document.getElementById('popularTopics').parentElement;
    
    if (AppState.searchTerm) {
        if (featuredSection) featuredSection.style.display = 'none';
        if (insightsContainer) insightsContainer.style.display = 'none';
        if (topicsContainer) topicsContainer.style.display = 'none';
        
        // Show all search results
        renderAllArticles(results);
    } else {
        // Show normal view
        if (featuredSection) featuredSection.style.display = 'block';
        if (insightsContainer) insightsContainer.style.display = 'block';
        if (topicsContainer) topicsContainer.style.display = 'block';
        
        renderLatestInsights();
        renderRecentNotes();
    }
}

/**
 * Clear search
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    AppState.searchTerm = '';
    hideSearchResults();
    
    // Show normal view
    const featuredSection = document.getElementById('featuredSection');
    const insightsContainer = document.getElementById('latestInsights').parentElement;
    const topicsContainer = document.getElementById('popularTopics').parentElement;
    
    if (featuredSection) featuredSection.style.display = 'block';
    if (insightsContainer) insightsContainer.style.display = 'block';
    if (topicsContainer) topicsContainer.style.display = 'block';
    
    renderLatestInsights();
    renderRecentNotes();
}

/**
 * Highlight search term in text
 */
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Truncate text to specified length
 */
function truncate(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults && 
        !searchInput.contains(e.target) && 
        !searchResults.contains(e.target)) {
        hideSearchResults();
    }
});
