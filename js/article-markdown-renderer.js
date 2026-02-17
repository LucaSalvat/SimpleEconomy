(function () {
  function stripScriptTags(html) {
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  function ensureMarkdownIt() {
    if (window.markdownit) {
      return Promise.resolve(window.markdownit);
    }

    if (window.__markdownItLoadingPromise) {
      return window.__markdownItLoadingPromise;
    }

    window.__markdownItLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14/dist/markdown-it.min.js';
      script.async = true;
      script.onload = () => {
        if (window.markdownit) {
          resolve(window.markdownit);
        } else {
          reject(new Error('markdown-it loaded but is unavailable on window'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load markdown-it'));
      document.head.appendChild(script);
    });

    return window.__markdownItLoadingPromise;
  }

  function ensureMathJax() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      return Promise.resolve(window.MathJax);
    }

    if (window.__mathJaxLoadingPromise) {
      return window.__mathJaxLoadingPromise;
    }

    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)'], ['$', '$']],
        displayMath: [['\\[', '\\]'], ['$$', '$$']],
      },
      svg: { fontCache: 'global' },
    };

    window.__mathJaxLoadingPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
      script.async = true;
      script.onload = () => resolve(window.MathJax);
      script.onerror = () => reject(new Error('Failed to load MathJax'));
      document.head.appendChild(script);
    });

    return window.__mathJaxLoadingPromise;
  }

  async function renderMarkdownArticle() {
    const container = document.querySelector('.content-body[data-markdown-src]');
    if (!container) return;

    const markdownPath = container.getAttribute('data-markdown-src');
    if (!markdownPath) return;

    container.classList.add('markdown-body');

    try {
      const response = await fetch(markdownPath);
      if (!response.ok) {
        throw new Error(`Failed to load markdown: ${response.status}`);
      }

      const markdown = await response.text();
      await ensureMarkdownIt();

      const md = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
      });

      const renderedHtml = md.render(markdown);
      container.innerHTML = stripScriptTags(renderedHtml);

      if (/\$/.test(markdown)) {
        try {
          await ensureMathJax();
          await window.MathJax.typesetPromise([container]);
        } catch (mathError) {
          console.warn('MathJax could not render equations:', mathError);
        }
      }
    } catch (error) {
      container.innerHTML = '<p>We could not load this article right now.</p>';
      console.error(error);
    }
  }

  renderMarkdownArticle();
})();
