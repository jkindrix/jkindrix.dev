import { logMessage } from './log.js';
import { updateNavigation } from './navigation.js';

let chapterContents = [];

/**
 * Generates the chapter contents from the parsed HTML.
 * @param {Array} chapters - The list of chapter elements.
 */
export function generateChapters(chapters) {
    chapterContents = chapters.map((el) => {
        let chapter = el.nextElementSibling;
        let chapterContent = '';
        while (chapter && chapter.tagName !== 'H2') {
            chapterContent += chapter.outerHTML;
            chapter = chapter.nextElementSibling;
        }
        return chapterContent;
    });
    logMessage(`generateChapters: Generated chapter contents. Number of chapters: ${chapterContents.length}`);
}

/**
 * Displays the specified chapter content.
 * @param {number} index - The index of the chapter to display.
 */
export function showChapter(index) {
    const chapterContent = chapterContents[index];
    if (!chapterContent) {
        logMessage(`showChapter: No content found for chapter index ${index}`);
        return;
    }
    document.getElementById('chapter-content').innerHTML = chapterContent;
    updateNavigation(index);
    logMessage(`showChapter: Displayed content for chapter ${index}`);
}
