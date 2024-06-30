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

        // Clone and add event listener for the bottom navigation
        const prevButtonBottom = prevButton.cloneNode(true);
        prevButtonBottom.addEventListener('click', () => showChapter(index - 1));
        bottomNav.appendChild(prevButtonBottom);
    }

    if (index < totalChapters - 1) {
        const nextButton = document.createElement('a');
        nextButton.href = "javascript:void(0)";
        nextButton.innerHTML = 'Next Chapter &raquo;';
        nextButton.addEventListener('click', () => showChapter(index + 1));
        topNav.appendChild(nextButton);

        // Clone and add event listener for the bottom navigation
        const nextButtonBottom = nextButton.cloneNode(true);
        nextButtonBottom.addEventListener('click', () => showChapter(index + 1));
        bottomNav.appendChild(nextButtonBottom);
    }

    logMessage(`updateNavigation: Updated navigation for chapter ${index}. Total chapters: ${totalChapters}`);
}
