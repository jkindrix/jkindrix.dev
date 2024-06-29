import { logMessage } from './log.js';
import { fetchMarkdown } from './fetchMarkdown.js';
import { generateTOC, displayTOC } from './toc.js';
import { generateChapters, showChapter } from './chapters.js';
import { toggleSidebar } from './sidebar.js';

console.log("initialize.js is loaded");

export async function initialize() {
    try {
        console.log("initialize: Starting initialization");
        logMessage(`initialize: Starting initialization`);
        
        document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
        console.log("initialize: Added click event listener to sidebar toggle button");
        logMessage(`initialize: Added click event listener to sidebar toggle button`);

        const urlParams = new URLSearchParams(window.location.search);
        const file = urlParams.get('file');
        console.log(`initialize: URL parameter 'file' is ${file}`);
        logMessage(`initialize: URL parameter 'file' is ${file}`);
        
        if (!file) {
            const errorMessage = 'Error: No book file specified.';
            document.getElementById('chapter-content').innerHTML = `<p>${errorMessage}</p>`;
            console.log(errorMessage);
            logMessage(errorMessage);
            return;
        }

        console.log('initialize: About to fetch markdown for file:', file);
        logMessage(`initialize: About to fetch markdown for file: ${file}`);
        const sanitizedHtml = await fetchMarkdown(file); // Fetch and sanitize markdown content
        console.log('initialize: Fetched and sanitized HTML:', sanitizedHtml.slice(0, 100) + '...');  // Log first 100 characters of the sanitized HTML
        logMessage(`initialize: Fetched and sanitized HTML. Length: ${sanitizedHtml.length}`);
        document.getElementById('chapter-content').innerHTML = sanitizedHtml; // Inject sanitized HTML content

        const { toc, chapters } = generateTOC(sanitizedHtml);
        displayTOC(toc);
        generateChapters(chapters);
        if (chapters.length > 0) {
            showChapter(0);
        }
        hljs.highlightAll();  // Apply syntax highlighting

        console.log("initialize: Initialization complete");
        logMessage(`initialize: Initialization complete`);
    } catch (error) {
        console.error('Error in initialize:', error);
        document.getElementById('chapter-content').innerHTML = `<p>${error.message}</p>`;
        logMessage(`initialize: Error occurred - ${error.message}`);
    }
}
