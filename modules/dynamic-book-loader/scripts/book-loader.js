console.log("book-loader.js is executed");

import { initialize } from './initialize.js';

// Initialize the application when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired - Initializing application");
    try {
        initialize();
        console.log("Initialization called successfully");
    } catch (error) {
        console.error("Error during initialization:", error);
    }
});
