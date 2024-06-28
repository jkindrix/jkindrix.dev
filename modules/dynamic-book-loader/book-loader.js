document.addEventListener('DOMContentLoaded', initialize);

function logMessage(message) {
    const debugElement = document.getElementById('debug');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    debugElement.appendChild(logEntry);
}

async function fetchMarkdown(file) {
    logMessage(`Fetching file: ${file}`);
    const response = await fetch(file);
    if (!response.ok) {
        const errorMessage = `Failed to load ${file}`;
        logMessage(errorMessage);
        throw new Error(errorMessage);
    }
    const text = await response.text();
    logMessage(`File fetched successfully`);
    return text;
}

let chapterContents = [];

function generateTOCAndChapters(markdown) {
    logMessage(`Generating TOC and chapters`);
    const html = marked.parse(markdown);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const chapters = Array.from(doc.querySelectorAll('h1'));

    const toc = chapters.map((el, index) => `
        <div>
            <a href="javascript:void(0)" data-index="${index}">${el.textContent}</a>
        </div>
    `).join('');

    chapterContents = chapters.map((el) => {
        let content = el.outerHTML;
        let sibling = el.nextElementSibling;
        while (sibling && !sibling.tagName.match(/^H1$/)) {
            content += sibling.outerHTML;
            sibling = sibling.nextElementSibling;
        }
        return content;
    });

    document.getElementById('sidebar').innerHTML = toc;
    document.querySelectorAll('#sidebar a').forEach(link => {
        link.addEventListener('click', () => showChapter(link.dataset.index));
    });

    showChapter(0);  // Show the first chapter by default
    logMessage(`TOC and chapters generated`);
}

function showChapter(index) {
    if (index < 0 || index >= chapterContents.length) return;
    document.getElementById('chapter-content').innerHTML = chapterContents[index];
    updateNavigation(index);
    logMessage(`Showing chapter ${index}`);
}

function updateNavigation(index) {
    const totalChapters = chapterContents.length;
    const navContent = `
        ${index > 0 ? `<a href="javascript:void(0)" onclick="showChapter(${index - 1})">&laquo; Previous Chapter</a>` : ''}
        ${index < totalChapters - 1 ? `<a href="javascript:void(0)" onclick="showChapter(${index + 1})">Next Chapter &raquo;</a>` : ''}
    `;
    document.getElementById('top-navigation').innerHTML = navContent;
    document.getElementById('bottom-navigation').innerHTML = navContent;
    logMessage(`Navigation updated for chapter ${index}`);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    sidebar.classList.toggle('visible');
    toggleButton.textContent = sidebar.classList.contains('visible') ? 'Hide Sidebar' : 'Show Sidebar';
    logMessage(`Sidebar toggled to ${sidebar.classList.contains('visible') ? 'visible' : 'hidden'}`);
}

async function initialize() {
    logMessage(`Initializing`);
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');

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
        logMessage(error.message);
    }
    logMessage(`Initialization complete`);
}
