import { logMessage } from './log.js';
import { fetchMarkdown } from './fetchMarkdown.js';
import { generateTOC, displayTOC } from './toc.js';
import { generateChapters, showChapter } from './chapters.js';
import { toggleSidebar } from './sidebar.js';

/**
 * Initializes the application.
 */
export async function initialize() {
    logMessage(`initialize: Starting initialization`);
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    logMessage(`initialize: Added click event listener to sidebar toggle button`);
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');
    logMessage(`initialize: URL parameter 'file' is ${file}`);
    console.log('Is DOMPurify defined?', typeof DOMPurify);

    if (!file) {
        const errorMessage = 'Error: No book file specified.';
        document.getElementById('chapter-content').innerHTML = `<p>${errorMessage}</p>`;
        logMessage(errorMessage);
        return;
    }

    try {
        const sanitizedHtml = await fetchMarkdown(file); // Fetch and sanitize markdown content
        document.getElementById('chapter-content').innerHTML = sanitizedHtml; // Inject sanitized HTML content
        const { toc, chapters } = generateTOC(sanitizedHtml);
        displayTOC(toc);
        generateChapters(chapters);
        if (chapterContents.length > 0) {
            showChapter(0);
        }
        hljs.highlightAll();  // Apply syntax highlighting
    } catch (error) {
        document.getElementById('chapter-content').innerHTML = `<p>${error.message}</p>`;
        logMessage(`initialize: Error occurred - ${error.message}`);
    }
    logMessage(`initialize: Initialization complete`);
}
