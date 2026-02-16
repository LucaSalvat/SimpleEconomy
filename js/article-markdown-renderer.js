(function () {
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createMathTokenMap(text) {
    let output = text;
    const tokenMap = [];

    output = output.replace(/\$([^$\n]+?)\$/g, (_, expression) => {
      const token = `@@MATH_${tokenMap.length}@@`;
      tokenMap.push({ token, expression: expression.trim(), display: false });
      return token;
    });

    return { output, tokenMap };
  }

  function restoreMathTokens(text, tokenMap) {
    let output = text;
    tokenMap.forEach(({ token, expression, display }) => {
      const delimiterStart = display ? '\\[' : '\\(';
      const delimiterEnd = display ? '\\]' : '\\)';
      const replacement = `<span class="math-inline">${delimiterStart}${escapeHtml(expression)}${delimiterEnd}</span>`;
      output = output.replace(token, replacement);
    });
    return output;
  }

  function renderInline(text) {
    const { output: withTokens, tokenMap } = createMathTokenMap(text);

    let output = escapeHtml(withTokens);
    output = output.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)/g, (_, alt, src, title) => {
      const titleAttribute = title ? ` title="${escapeHtml(title)}"` : '';
      return `<img src="${src}" alt="${alt}"${titleAttribute}>`;
    });
    output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
    output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    output = restoreMathTokens(output, tokenMap);
    return output;
  }

  function isTableDivider(line) {
    return /^\s*\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
  }

  function parseTableRow(line) {
    return line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => renderInline(cell.trim()));
  }

  function markdownToHtml(markdown) {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n');
    const html = [];

    let inCodeBlock = false;
    let inMathBlock = false;
    let mathLines = [];
    let listType = null;

    function closeListIfOpen() {
      if (listType) {
        html.push(`</${listType}>`);
        listType = null;
      }
    }

    function closeMathBlockIfOpen() {
      if (!inMathBlock) return;
      const expression = escapeHtml(mathLines.join('\n').trim());
      html.push(`<div class="math-block">\\[${expression}\\]</div>`);
      inMathBlock = false;
      mathLines = [];
    }

    for (let index = 0; index < lines.length; index += 1) {
      const rawLine = lines[index];
      const line = rawLine.trim();

      if (line === '$$') {
        closeListIfOpen();
        if (!inMathBlock) {
          inMathBlock = true;
          mathLines = [];
        } else {
          closeMathBlockIfOpen();
        }
        continue;
      }

      if (inMathBlock) {
        mathLines.push(rawLine);
        continue;
      }

      if (line.startsWith('```')) {
        closeListIfOpen();
        if (!inCodeBlock) {
          inCodeBlock = true;
          html.push('<pre><code>');
        } else {
          inCodeBlock = false;
          html.push('</code></pre>');
        }
        continue;
      }

      if (inCodeBlock) {
        html.push(`${escapeHtml(rawLine)}\n`);
        continue;
      }

      if (!line) {
        closeListIfOpen();
        continue;
      }

      if (line.startsWith('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
        closeListIfOpen();
        const headerCells = parseTableRow(line);
        const bodyRows = [];
        index += 2;

        while (index < lines.length && lines[index].trim().startsWith('|')) {
          bodyRows.push(parseTableRow(lines[index]));
          index += 1;
        }

        index -= 1;

        html.push('<table><thead><tr>');
        headerCells.forEach((cell) => {
          html.push(`<th>${cell}</th>`);
        });
        html.push('</tr></thead><tbody>');

        bodyRows.forEach((row) => {
          html.push('<tr>');
          row.forEach((cell) => {
            html.push(`<td>${cell}</td>`);
          });
          html.push('</tr>');
        });

        html.push('</tbody></table>');
        continue;
      }

      if (/^#{1,6}\s+/.test(line)) {
        closeListIfOpen();
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#{1,6}\s+/, '');
        html.push(`<h${level}>${renderInline(text)}</h${level}>`);
        continue;
      }

      if (/^(-{3,}|\*{3,})$/.test(line)) {
        closeListIfOpen();
        html.push('<hr>');
        continue;
      }

      if (/^>\s+/.test(line)) {
        closeListIfOpen();
        html.push(`<blockquote><p>${renderInline(line.replace(/^>\s+/, ''))}</p></blockquote>`);
        continue;
      }

      if (/^[-*]\s+/.test(line)) {
        if (listType !== 'ul') {
          closeListIfOpen();
          listType = 'ul';
          html.push('<ul>');
        }
        html.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ''))}</li>`);
        continue;
      }

      if (/^\d+\.\s+/.test(line)) {
        if (listType !== 'ol') {
          closeListIfOpen();
          listType = 'ol';
          html.push('<ol>');
        }
        html.push(`<li>${renderInline(line.replace(/^\d+\.\s+/, ''))}</li>`);
        continue;
      }

      closeListIfOpen();
      html.push(`<p>${renderInline(line)}</p>`);
    }

    closeListIfOpen();
    closeMathBlockIfOpen();
    return html.join('');
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

    try {
      const response = await fetch(markdownPath);
      if (!response.ok) {
        throw new Error(`Failed to load markdown: ${response.status}`);
      }

      const markdown = await response.text();
      container.innerHTML = markdownToHtml(markdown);

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
