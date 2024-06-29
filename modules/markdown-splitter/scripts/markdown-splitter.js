import { splitContentByHeading, displayResults } from './utils.js';

document.getElementById('splitButton').addEventListener('click', splitMarkdown);

/**
 * Splits the uploaded markdown file by the specified heading level.
 */
function splitMarkdown() {
    const fileInput = document.getElementById('fileInput');
    const headingLevel = document.getElementById('headingLevel').value;
    const results = document.getElementById('results');

    if (fileInput.files.length === 0) {
        alert('Please upload a markdown file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const content = event.target.result;
        const chapters = splitContentByHeading(content, headingLevel);
        displayResults(chapters);
    };

    reader.readAsText(file);
}
