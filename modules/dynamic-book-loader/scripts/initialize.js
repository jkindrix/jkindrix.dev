import { logMessage } from './log.js';
import { fetchMarkdown } from './fetchMarkdown.js';
import { generateTOC, displayTOC } from './toc.js';
import { generateChapters, showChapter } from './chapters.js';
import { toggleSidebar } from './sidebar.js';

/**
 * Initializes the application.
 */
export async function initialize() {
    try {
        logMessage(`initialize: Starting initialization`);
        document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
        logMessage(`initialize: Added click event listener to sidebar toggle button`);
        const urlParams = new URLSearchParams(window.location.search);
        const file = urlParams.get('file');
        logMessage(`initialize: URL parameter 'file' is ${file}`);
        console.log('Is DOMPurify defined in initialize?', typeof DOMPurify);

        if (!file) {
            const errorMessage = 'Error: No book file specified.';
            document.getElementById('chapter-content').innerHTML = `<p>${errorMessage}</p>`;
            logMessage(errorMessage);
            return;
        }

        const sanitizedHtml = await fetchMarkdown(file); // Fetch and sanitize markdown content
        console.log('Sanitized HTML in initialize:', sanitizedHtml.slice(0, 100) + '...');  // Log first 100 characters of the sanitized HTML
        document.getElementById('chapter-content').innerHTML = sanitizedHtml; // Inject sanitized HTML content

        const { toc, chapters } = generateTOC(sanitizedHtml);
        displayTOC(toc);
        generateChapters(chapters);
        if (chapterContents.length > 0) {
            showChapter(0);
        }
        hljs.highlightAll();  // Apply syntax highlighting

        logMessage(`initialize: Initialization complete`);
    } catch (error) {
        console.error('Error in initialize:', error);
        document.getElementById('chapter-content').innerHTML = `<p>${error.message}</p>`;
        logMessage(`initialize: Error occurred - ${error.message}`);
    }
}
