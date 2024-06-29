import { logMessage } from './log.js';
import { showChapter } from './chapters.js';

/**
 * Generates the Table of Contents (TOC) from the markdown content.
 * @param {string} markdown - The markdown content.
 * @returns {Object} The TOC and list of chapters.
 */
export function generateTOC(markdown) {
    logMessage(`generateTOC: Generating TOC from markdown`);
    const html = marked.parse(markdown);
    logMessage(`generateTOC: Converted markdown to HTML. Length of HTML content: ${html.length}`);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const chapters = Array.from(doc.querySelectorAll('h2'));
    logMessage(`generateTOC: Found ${chapters.length} chapters`);

    const toc = chapters.map((el, index) => `
        <div>
            <a href="javascript:void(0)" data-index="${index}">${el.textContent}</a>
        </div>
    `).join('');
    logMessage(`generateTOC: Generated TOC HTML. Length of TOC content: ${toc.length}`);

    return { toc, chapters };
}

/**
 * Displays the Table of Contents (TOC) on the page.
 * @param {string} toc - The TOC HTML.
 */
export function displayTOC(toc) {
    document.getElementById('sidebar').innerHTML = toc;
    document.getElementById('sidebar').addEventListener('click', handleTOCClick);
}

/**
 * Handles TOC item clicks to show the corresponding chapter.
 * @param {Event} event - The click event.
 */
function handleTOCClick(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.hasAttribute('data-index')) {
        const index = parseInt(target.getAttribute('data-index'), 10);
        showChapter(index);
    }
}
