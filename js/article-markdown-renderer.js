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

  function normalizeStandaloneMedia(container) {
    container.querySelectorAll('p').forEach((paragraph) => {
      if (paragraph.children.length !== 1) return;

      const child = paragraph.children[0];
      if (!child || child.tagName !== 'IMG') return;

      const figure = document.createElement('figure');
      figure.className = 'markdown-media';
      figure.appendChild(child);

      const captionText = child.getAttribute('title') || child.getAttribute('alt');
      if (captionText) {
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = captionText;
        figure.appendChild(figcaption);
      }

      paragraph.replaceWith(figure);
    });
  }

  function transformCalloutBlocks(container) {
    container.querySelectorAll('blockquote').forEach((quote) => {
      const firstParagraph = quote.querySelector('p');
      if (!firstParagraph) return;

      const rawText = firstParagraph.textContent.trim();
      const match = rawText.match(/^(definition|example)\s*[:\-]\s*/i);
      if (!match) return;

      const kind = match[1].toLowerCase();
      firstParagraph.textContent = rawText.replace(/^(definition|example)\s*[:\-]\s*/i, '').trim();

      const callout = document.createElement('div');
      callout.className = `markdown-callout markdown-callout--${kind}`;

      const title = document.createElement('div');
      title.className = 'markdown-callout-title';
      title.textContent = kind === 'definition' ? 'Definition' : 'Example';

      const body = document.createElement('div');
      body.className = 'markdown-callout-body';
      while (quote.firstChild) {
        body.appendChild(quote.firstChild);
      }

      callout.appendChild(title);
      callout.appendChild(body);
      quote.replaceWith(callout);
    });
  }

  function enhanceMarkdownContent(container) {
    normalizeStandaloneMedia(container);
    transformCalloutBlocks(container);
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
      enhanceMarkdownContent(container);

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
