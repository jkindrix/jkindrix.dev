import { logMessage } from './log.js';

/**
 * Fetches the markdown file from the server.
 * @param {string} file - The file to fetch.
 * @returns {Promise<string>} The sanitized HTML content of the markdown file.
 */
export async function fetchMarkdown(file) {
    logMessage(`fetchMarkdown: Starting fetch for file: ${file}`);
    const response = await fetch(file);
    logMessage(`fetchMarkdown: Received response for file: ${file} with status: ${response.status}`);
    if (!response.ok) {
        const errorMessage = `fetchMarkdown: Failed to load ${file} with status: ${response.status}`;
        logMessage(errorMessage);
        throw new Error(errorMessage);
    }
    const text = await response.text();
    logMessage(`fetchMarkdown: File fetched successfully. Length of content: ${text.length}`);
    const html = marked(text); // Convert markdown to HTML
    const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize HTML content
    logMessage(`fetchMarkdown: Content sanitized. Length of sanitized content: ${sanitizedHtml.length}`);
    return sanitizedHtml;
}
