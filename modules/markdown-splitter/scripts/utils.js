import JSZip from 'jszip';

/**
 * Splits the markdown content by the specified heading level.
 * @param {string} content - The markdown content.
 * @param {number} headingLevel - The heading level to split by.
 * @returns {Array} The list of split chapters with filenames.
 */
export function splitContentByHeading(content, headingLevel) {
    const headingPrefix = '#'.repeat(headingLevel) + ' ';
    const lines = content.split('\n');
    let chapters = [];
    let currentChapter = [];
    let currentHeading = '';

    lines.forEach(line => {
        if (line.startsWith(headingPrefix)) {
            if (currentChapter.length > 0) {
                chapters.push({ name: `${slugify(currentHeading)}.md`, content: currentChapter.join('\n') });
                currentChapter = [];
            }
            currentHeading = line.replace(headingPrefix, '').trim();
        }
        currentChapter.push(line);
    });

    if (currentChapter.length > 0) {
        chapters.push({ name: `${slugify(currentHeading)}.md`, content: currentChapter.join('\n') });
    }

    return chapters;
}

/**
 * Converts a string to a URL-friendly slug.
 * @param {string} text - The text to slugify.
 * @returns {string} The slugified text.
 */
function slugify(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}


/**
 * Displays the split chapters as downloadable links and a button to download all files as a ZIP.
 * @param {Array} chapters - The list of split chapters with filenames.
 */
export function displayResults(chapters) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    const zip = new JSZip();

    chapters.forEach((chapter, index) => {
        const blob = new Blob([chapter.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = chapter.name;
        link.textContent = `Download ${chapter.name}`;
        link.classList.add('results__file');
        results.appendChild(link);

        // Add file to the zip
        zip.file(chapter.name, chapter.content);
    });

    const downloadAllButton = document.createElement('button');
    downloadAllButton.textContent = 'Download All';
    downloadAllButton.addEventListener('click', () => {
        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'markdown_chapters.zip';
            link.click();
        });
    });

    results.appendChild(downloadAllButton);
}