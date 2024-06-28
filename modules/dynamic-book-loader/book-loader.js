document.addEventListener('DOMContentLoaded', initialize);

async function fetchMarkdown(file) {
    const response = await fetch(file);
    if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
    }
    return await response.text();
}

let chapterContents = [];

function generateTOCAndChapters(markdown) {
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
}

function showChapter(index) {
    if (index < 0 || index >= chapterContents.length) return;
    document.getElementById('chapter-content').innerHTML = chapterContents[index];
    updateNavigation(index);
}

function updateNavigation(index) {
    const totalChapters = chapterContents.length;
    const navContent = `
        ${index > 0 ? `<a href="javascript:void(0)" onclick="showChapter(${index - 1})">&laquo; Previous Chapter</a>` : ''}
        ${index < totalChapters - 1 ? `<a href="javascript:void(0)" onclick="showChapter(${index + 1})">Next Chapter &raquo;</a>` : ''}
    `;
    document.getElementById('top-navigation').innerHTML = navContent;
    document.getElementById('bottom-navigation').innerHTML = navContent;
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    sidebar.classList.toggle('visible');
    toggleButton.textContent = sidebar.classList.contains('visible') ? 'Hide Sidebar' : 'Show Sidebar';
}

async function initialize() {
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');

    if (!file) {
        document.getElementById('chapter-content').innerHTML = '<p>Error: No book file specified.</p>';
        return;
    }

    try {
        const markdown = await fetchMarkdown(file);
        generateTOCAndChapters(markdown);
    } catch (error) {
        document.getElementById('chapter-content').innerHTML = `<p>${error.message}</p>`;
    }
}
