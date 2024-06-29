console.log("book-loader.js is executed");

import { initialize } from './initialize.js';

// Initialize the application when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing application");
    initialize();
});
