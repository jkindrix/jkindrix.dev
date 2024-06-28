document.addEventListener('DOMContentLoaded', () => {
    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
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
            console.error('Error loading books:', error);
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '<li>Error loading book list. Please try again later.</li>';
        });
});
