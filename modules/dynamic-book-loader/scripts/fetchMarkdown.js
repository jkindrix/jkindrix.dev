import { logMessage } from './log.js';
import { marked } from 'marked'

console.log("fetchMarkdown.js is loaded");

/**
 * Fetches the markdown file from the server.
 * @param {string} file - The file to fetch.
 * @returns {Promise<string>} The sanitized HTML content of the markdown file.
 */
export async function fetchMarkdown(file) {
    try {
        console.log(`fetchMarkdown: Starting fetch for file: ${file}`);
        logMessage(`fetchMarkdown: Starting fetch for file: ${file}`);
        
        // Remove .md extension from the file path if present
        const filePath = file.endsWith('.md') ? file.slice(0, -3) : file;
        console.log(`fetchMarkdown: Adjusted file path: ${filePath}`);
        logMessage(`fetchMarkdown: Adjusted file path: ${filePath}`);
        
        console.log('Is marked defined in fetchMarkdown?', typeof marked);
        
        const response = await fetch(filePath);
        console.log(`fetchMarkdown: Received response for file: ${filePath} with status: ${response.status}`);
        logMessage(`fetchMarkdown: Received response for file: ${filePath} with status: ${response.status}`);
        
        if (!response.ok) {
            const errorMessage = `fetchMarkdown: Failed to load ${filePath} with status: ${response.status}`;
            console.error(errorMessage);
            logMessage(errorMessage);
            throw new Error(errorMessage);
        }

        const text = await response.text();
        console.log(`fetchMarkdown: File fetched successfully. Length of content: ${text.length}`);
        logMessage(`fetchMarkdown: File fetched successfully. Length of content: ${text.length}`);
        console.log('Fetched text:', text.slice(0, 100) + '...');  // Log first 100 characters of the text

        console.log('Is marked defined before conversion?', typeof marked);
        const html = marked(text); // Convert markdown to HTML
        console.log('Converted HTML:', html.slice(0, 100) + '...');  // Log first 100 characters of the HTML

        console.log('Is DOMPurify defined before sanitization?', typeof DOMPurify);
        const sanitizedHtml = DOMPurify.sanitize(html); // Sanitize HTML content
        console.log('Sanitized HTML:', sanitizedHtml.slice(0, 100) + '...');  // Log first 100 characters of the sanitized HTML

        console.log(`fetchMarkdown: Content sanitized. Length of sanitized content: ${sanitizedHtml.length}`);
        logMessage(`fetchMarkdown: Content sanitized. Length of sanitized content: ${sanitizedHtml.length}`);
        return sanitizedHtml;
    } catch (error) {
        console.error('Error in fetchMarkdown:', error);
        logMessage(`fetchMarkdown: Error occurred - ${error.message}`);
        throw error;
    }
}
