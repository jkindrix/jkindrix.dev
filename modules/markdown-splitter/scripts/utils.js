/**
 * Splits the markdown content by the specified heading level.
 * @param {string} content - The markdown content.
 * @param {number} headingLevel - The heading level to split by.
 * @returns {Array} The list of split chapters.
 */
export function splitContentByHeading(content, headingLevel) {
    const headingPrefix = '#'.repeat(headingLevel) + ' ';
    const lines = content.split('\n');
    let chapters = [];
    let currentChapter = [];

    lines.forEach(line => {
        if (line.startsWith(headingPrefix)) {
            if (currentChapter.length > 0) {
                chapters.push(currentChapter.join('\n'));
                currentChapter = [];
            }
        }
        currentChapter.push(line);
    });

    if (currentChapter.length > 0) {
        chapters.push(currentChapter.join('\n'));
    }

    return chapters;
}

/**
 * Displays the split chapters as downloadable links.
 * @param {Array} chapters - The list of split chapters.
 */
export function displayResults(chapters) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const blob = new Blob([chapter], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chapter_${index + 1}.md`;
        link.textContent = `Download Chapter ${index + 1}`;
        link.classList.add('results__file');
        results.appendChild(link);
    });
}
