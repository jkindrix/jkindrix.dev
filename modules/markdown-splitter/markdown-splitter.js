document.getElementById('splitButton').addEventListener('click', splitMarkdown);

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

function splitContentByHeading(content, headingLevel) {
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

function displayResults(chapters) {
    const results = document.getElementById('results');
    results.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const blob = new Blob([chapter], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `chapter_${index + 1}.md`;
        link.textContent = `Download Chapter ${index + 1}`;
        link.classList.add('result-file');
        results.appendChild(link);
    });
}
