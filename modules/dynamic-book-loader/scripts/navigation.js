import { logMessage } from './log.js';
import { showChapter } from './chapters.js';

/**
 * Updates the chapter navigation.
 * @param {number} index - The index of the current chapter.
 */
export function updateNavigation(index) {
    const totalChapters = chapterContents.length;
    const navContent = `
        ${index > 0 ? `<a href="javascript:void(0)" onclick="showChapter(${index - 1})">&laquo; Previous Chapter</a>` : ''}
        ${index < totalChapters - 1 ? `<a href="javascript:void(0)" onclick="showChapter(${index + 1})">Next Chapter &raquo;</a>` : ''}
    `;
    document.getElementById('top-navigation').innerHTML = navContent;
    document.getElementById('bottom-navigation').innerHTML = navContent;
    logMessage(`updateNavigation: Updated navigation for chapter ${index}. Total chapters: ${totalChapters}`);
}
