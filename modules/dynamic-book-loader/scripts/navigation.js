import { logMessage } from './log.js';
import { showChapter } from './chapters.js';
import { chapterContents } from './shared.js';

/**
 * Updates the chapter navigation.
 * @param {number} index - The index of the current chapter.
 */
export function updateNavigation(index) {
    const totalChapters = chapterContents.length;

    const topNav = document.getElementById('top-navigation');
    const bottomNav = document.getElementById('bottom-navigation');

    // Clear previous navigation content
    topNav.innerHTML = '';
    bottomNav.innerHTML = '';

    if (index > 0) {
        const prevButton = document.createElement('a');
        prevButton.href = "javascript:void(0)";
        prevButton.innerHTML = '&laquo; Previous Chapter';
        prevButton.addEventListener('click', () => showChapter(index - 1));
        topNav.appendChild(prevButton);
        bottomNav.appendChild(prevButton.cloneNode(true));
    }

    if (index < totalChapters - 1) {
        const nextButton = document.createElement('a');
        nextButton.href = "javascript:void(0)";
        nextButton.innerHTML = 'Next Chapter &raquo;';
        nextButton.addEventListener('click', () => showChapter(index + 1));
        topNav.appendChild(nextButton);
        bottomNav.appendChild(nextButton.cloneNode(true));
    }

    logMessage(`updateNavigation: Updated navigation for chapter ${index}. Total chapters: ${totalChapters}`);
}
