document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');

    fetch('/books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(books => {
            bookList.innerHTML = ''; // Clear the loading message
            books.forEach(book => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `modules/dynamic-book-loader/book-loader.html?file=${book.file}`;
                link.textContent = book.title;
                listItem.appendChild(link);
                bookList.appendChild(listItem);
            });
        })
        .catch(error => {
            bookList.innerHTML = `<li>Error loading books: ${error.message}</li>`;
        });
});
