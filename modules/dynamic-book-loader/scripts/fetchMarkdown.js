import { logMessage } from './log.js';

/**
 * Fetches the markdown file from the server.
 * @param {string} file - The file to fetch.
 * @returns {Promise<string>} The sanitized HTML content of the markdown file.
 */
export async function fetchMarkdown(file) {
    try {
        logMessage(`fetchMarkdown: Starting fetch for file: ${file}`);
        console.log('Is marked defined in fetchMarkdown?', typeof marked);

        const response = await fetch(file);
        logMessage(`fetchMarkdown: Received response for file: ${file} with status: ${response.status}`);
        if (!response.ok) {
            const errorMessage = `fetchMarkdown: Failed to load ${file} with status: ${response.status}`;
            logMessage(errorMessage);
            throw new Error(errorMessage);
        }

        const text = await response.text();
        logMessage(`fetchMarkdown: File fetched successfully. Length of content: ${text.length}`);
        console.log('Fetched text:', text.slice(0, 100) + '...');  // Log first 100 characters of the text

        const html = marked(text); // Convert markdown to HTML
        console.log('Converted HTML:', html.slice(0, 100) + '...');  // Log first 100 characters of the HTML

        const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize HTML content
        console.log('Sanitized HTML:', sanitizedHtml.slice(0, 100) + '...');  // Log first 100 characters of the sanitized HTML

        logMessage(`fetchMarkdown: Content sanitized. Length of sanitized content: ${sanitizedHtml.length}`);
        return sanitizedHtml;
    } catch (error) {
        console.error('Error in fetchMarkdown:', error);
        throw error;
    }
}
