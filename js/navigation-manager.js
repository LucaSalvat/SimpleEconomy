// Navigation Manager - Handles smooth transitions and browser history
// Manages page navigation, transitions, and state

class NavigationManager {
    constructor() {
        this.currentPage = window.location.pathname;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                this.navigateWithoutPush(event.state.page);
            }
        });

        // Add initial state
        history.replaceState({ page: this.currentPage }, '', this.currentPage);

        // Set up smooth scroll
        this.setupSmoothScroll();

        // Highlight active navigation
        this.updateActiveNav();

        // Set up link interception for smooth transitions
        this.interceptLinks();
    }

    // Intercept internal links for smooth transitions
    interceptLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Only intercept internal links (not external, not anchors, not downloads)
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.startsWith('#') &&
                !link.hasAttribute('download') &&
                !link.hasAttribute('target')) {
                
                // Check if it's a same-page anchor
                if (href.includes('#') && href.split('#')[0] === '') {
                    return; // Let default behavior handle anchor links
                }

                e.preventDefault();
                this.navigateTo(href);
            }
        });
    }

    // Navigate to a new page with smooth transition
    async navigateTo(url) {
        if (this.isTransitioning) return;
        
        // Don't navigate if we're already on this page
        if (url === this.currentPage) return;

        this.isTransitioning = true;

        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease-out';

        // Wait for fade out
        await this.wait(200);

        // Navigate to new page
        window.location.href = url;
        
        // Update history
        history.pushState({ page: url }, '', url);
        this.currentPage = url;
    }

    // Navigate without adding to history (for back/forward)
    async navigateWithoutPush(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;

        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease-out';

        await this.wait(200);

        // Navigate
        window.location.href = url;
        this.currentPage = url;
    }

    // Smooth scroll to top on page load
    setupSmoothScroll() {
        // Fade in on page load
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 0.3s ease-in';
                document.body.style.opacity = '1';
            });
        });

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

    // Update active navigation state
    updateActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
            
            // Special case for home page
            if (currentPath === '/' || currentPath === '/index.html') {
                if (href === 'index.html' || href === '/index.html' || href === '/') {
                    link.classList.add('active');
                }
            }
        });
    }

    // Helper: Wait for specified milliseconds
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Scroll to top smoothly
    scrollToTop(smooth = true) {
        if (smooth) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, 0);
        }
    }

    // Get current page info
    getCurrentPage() {
        return {
            path: this.currentPage,
            title: document.title,
            url: window.location.href
        };
    }
}

// Initialize navigation manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navManager = new NavigationManager();
    });
} else {
    window.navManager = new NavigationManager();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}
