import { logMessage } from './log.js';
import { showChapter } from './chapters.js';
import { chapterContents } from './shared.js';

/**
 * Updates the chapter navigation.
 * @param {number} index - The index of the current chapter.
 */
export function updateNavigation(index) {
    const totalChapters = chapterContents.length;
    
    const prevButton = document.createElement('a');
    prevButton.href = "javascript:void(0)";
    prevButton.innerHTML = '&laquo; Previous Chapter';
    prevButton.addEventListener('click', () => showChapter(index - 1));

    const nextButton = document.createElement('a');
    nextButton.href = "javascript:void(0)";
    nextButton.innerHTML = 'Next Chapter &raquo;';
    nextButton.addEventListener('click', () => showChapter(index + 1));

    const navContent = `
        ${index > 0 ? prevButton.outerHTML : ''}
        ${index < totalChapters - 1 ? nextButton.outerHTML : ''}
    `;
    
    document.getElementById('top-navigation').innerHTML = navContent;
    document.getElementById('bottom-navigation').innerHTML = navContent;

    if (index > 0) {
        document.getElementById('top-navigation').appendChild(prevButton);
        document.getElementById('bottom-navigation').appendChild(prevButton.cloneNode(true));
    }

    if (index < totalChapters - 1) {
        document.getElementById('top-navigation').appendChild(nextButton);
        document.getElementById('bottom-navigation').appendChild(nextButton.cloneNode(true));
    }
    
    logMessage(`updateNavigation: Updated navigation for chapter ${index}. Total chapters: ${totalChapters}`);
}
