/**
 * Fetches the list of books from the server.
 * @returns {Promise<Array>} A promise that resolves to the list of books.
 */
export async function fetchBooks() {
    const response = await fetch('/books.json');
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
}
