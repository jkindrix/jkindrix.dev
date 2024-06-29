/**
 * Displays the list of books on the page.
 * @param {HTMLElement} bookList - The element to display the books in.
 * @param {Array} books - The list of books to display.
 */
export function displayBooks(bookList, books) {
    bookList.innerHTML = ''; // Clear the loading message
    books.forEach(book => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `modules/dynamic-book-loader/index.html?file=${book.file}`;
        link.textContent = book.title;
        listItem.appendChild(link);
        bookList.appendChild(listItem);
    });
}

/**
 * Handles errors by displaying an error message on the page.
 * @param {HTMLElement} bookList - The element to display the error message in.
 * @param {Error} error - The error to display.
 */
export function handleError(bookList, error) {
    bookList.innerHTML = `<li>Error loading books: ${error.message}</li>`;
}
