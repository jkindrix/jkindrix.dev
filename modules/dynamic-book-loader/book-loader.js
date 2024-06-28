document.addEventListener('DOMContentLoaded', initialize);

function logMessage(message) {
    const debugElement = document.getElementById('debug');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    debugElement.appendChild(logEntry);
    console.log(message);  // Also log to console for additional debugging
}

async function fetchMarkdown(file) {
    logMessage(`fetchMarkdown: Starting fetch for file: ${file}`);
    const response = await fetch(file);
    logMessage(`fetchMarkdown: Received response for file: ${file} with status: ${response.status}`);
    if (!response.ok) {
        const errorMessage = `fetchMarkdown: Failed to load ${file} with status: ${response.status}`;
        logMessage(errorMessage);
        throw new Error(errorMessage);
    }
    const text = await response.text();
    logMessage(`fetchMarkdown: File fetched successfully. Length of content: ${text.length}`);
    return text;
}

let chapterContents = [];

function generateTOCAndChapters(markdown) {
    logMessage(`generateTOCAndChapters: Generating TOC and chapters from markdown`);
    const html = marked.parse(markdown);
    logMessage(`generateTOCAndChapters: Converted markdown to HTML. Length of HTML content: ${html.length}`);
    
    // Log a larger snippet of the converted HTML
    logMessage(`generateTOCAndChapters: HTML snippet: ${html.substring(0, 1000)}`);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const chapters = Array.from(doc.querySelectorAll('h2'));
    logMessage(`generateTOCAndChapters: Found ${chapters.length} chapters`);

    const toc = chapters.map((el, index) => `
        <div>
            <a href="javascript:void(0)" data-index="${index}">${el.textContent}</a>
        </div>
    `).join('');
    logMessage(`generateTOCAndChapters: Generated TOC HTML. Length of TOC content: ${toc.length}`);

    chapterContents = chapters.map((el) => {
        let content = el.outerHTML;
        let sibling = el.nextElementSibling;
        while (sibling && !sibling.tagName.match(/^H2$/)) {
            content += sibling.outerHTML;
            sibling = sibling.nextElementSibling;
        }
        return content;
    });
    logMessage(`generateTOCAndChapters: Extracted content for ${chapterContents.length} chapters`);

    document.getElementById('sidebar').innerHTML = toc;
    document.querySelectorAll('#sidebar a').forEach(link => {
        link.addEventListener('click', () => showChapter(link.dataset.index));
    });
    logMessage(`generateTOCAndChapters: Added event listeners to TOC links`);

    showChapter(0);  // Show the first chapter by default
    logMessage(`generateTOCAndChapters: Displayed first chapter by default`);
}

function showChapter(index) {
    logMessage(`showChapter: Attempting to show chapter at index: ${index}`);
    if (index < 0 || index >= chapterContents.length) {
        logMessage(`showChapter: Invalid index: ${index}`);
        return;
    }
    document.getElementById('chapter-content').innerHTML = chapterContents[index];
    updateNavigation(index);
    logMessage(`showChapter: Displayed chapter ${index}`);
}

function updateNavigation(index) {
    const totalChapters = chapterContents.length;
    const navContent = `
        ${index > 0 ? `<a href="javascript:void(0)" onclick="showChapter(${index - 1})">&laquo; Previous Chapter</a>` : ''}
        ${index < totalChapters - 1 ? `<a href="javascript:void(0)" onclick="showChapter(${index + 1})">Next Chapter &raquo;</a>` : ''}
    `;
    document.getElementById('top-navigation').innerHTML = navContent;
    document.getElementById('bottom-navigation').innerHTML = navContent;
    logMessage(`updateNavigation: Updated navigation for chapter ${index}. Total chapters: ${totalChapters}`);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    sidebar.classList.toggle('visible');
    toggleButton.textContent = sidebar.classList.contains('visible') ? 'Hide Sidebar' : 'Show Sidebar';
    logMessage(`toggleSidebar: Sidebar toggled to ${sidebar.classList.contains('visible') ? 'visible' : 'hidden'}`);
}

async function initialize() {
    logMessage(`initialize: Starting initialization`);
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    logMessage(`initialize: Added click event listener to sidebar toggle button`);
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');
    logMessage(`initialize: URL parameter 'file' is ${file}`);

    if (!file) {
        const errorMessage = 'Error: No book file specified.';
        document.getElementById('chapter-content').innerHTML = `<p>${errorMessage}</p>`;
        logMessage(errorMessage);
        return;
    }

    try {
        const markdown = await fetchMarkdown(file);
        generateTOCAndChapters(markdown);
    } catch (error) {
        document.getElementById('chapter-content').innerHTML = `<p>${error.message}</p>`;
        logMessage(`initialize: Error occurred - ${error.message}`);
    }
    logMessage(`initialize: Initialization complete`);
}
