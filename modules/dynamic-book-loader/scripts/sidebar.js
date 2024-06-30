import { logMessage } from './log.js';

/**
 * Toggles the visibility of the sidebar.
 */
export function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    const content = document.getElementById('content');
    
    sidebar.classList.toggle('visible');
    content.classList.toggle('sidebar-visible');
    toggleButton.textContent = sidebar.classList.contains('visible') ? 'Hide Sidebar' : 'Show Sidebar';
    logMessage(`toggleSidebar: Sidebar toggled to ${sidebar.classList.contains('visible') ? 'visible' : 'hidden'}`);
}
