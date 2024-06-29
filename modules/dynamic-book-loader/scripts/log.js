/**
 * Logs a message to the debug element and the console.
 * @param {string} message - The message to log.
 */
export function logMessage(message) {
    const debugElement = document.getElementById('debug');
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    debugElement.appendChild(logEntry);
    console.log(message);  // Also log to console for additional debugging
}
