import { fetchBooks } from './fetchBooks.js';
import { displayBooks } from './displayBooks.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');

    fetchBooks().then(books => {
        displayBooks(bookList, books);
    }).catch(error => {
        bookList.innerHTML = `<li>Error loading books: ${error.message}</li>`;
    });
});
