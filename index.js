const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks() {
    if (myLibrary.length === 0) {
        const library = document.querySelector(".libraryDisplay");
        library.remove();
    } else {
        myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");

        const bookTitle = document.createElement("h2");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookRead = document.createElement("p");
        const removeBook = document.createElement("button");

        bookTitle.textContent = `${book.title}`;
        bookAuthor.textContent = `by ${book.author}`;
        bookPages.textContent = `page count: ${book.pages}`;
        bookRead.textContent = `${book.read}`;
        removeBook.textContent = "-";

        bookTitle.classList.add("title");
        bookAuthor.classList.add("author");
        bookPages.classList.add("pages");
        bookRead.classList.add("status");
        removeBook.classList.add("removeBookBtn");

        removeBook.dataset.btnBookId = book.id;
        removeBook.addEventListener("click", (e) => {
            const button = e.target;
            const bookId = button.dataset.btnBookId;
            const index = myLibrary.findIndex(obj => obj.id === bookId);

            myLibrary.splice(index, 1);
            myLibrary.forEach((book) => {
                const currentDiv = document.querySelector(".libraryDisplay");
                removeAllChildNodes(currentDiv);
            });
            displayBooks();
        });

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookPages);
        bookItem.appendChild(bookRead);
        bookItem.appendChild(removeBook);

        bookItem.classList.add("card")

        const currentDiv = document.querySelector(".libraryDisplay");
        currentDiv.appendChild(bookItem);
        });
    }
}

addBookToLibrary("The Great Gatsby", "E. Scott. Fitzgerald", 140, "reading");
addBookToLibrary("Heart of Darkness", "Joseph Conrad", 101, "unread");
addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 225, "unread");
addBookToLibrary("The Aeneid", "Virgil", 422, "unread");

function processNewBook() {
    const newBookTitle = document.querySelector(".bookTitle");
    const newBookAuthor = document.querySelector(".bookAuthor");
    const newBookPages = document.querySelector(".bookPages");
    const newBookStatus = document.querySelector(".status");

    newTitle = newBookTitle.value;
    newAuthor = newBookAuthor.value;
    newPages = newBookPages.value;
    newStatus = newBookStatus.textContent;

    addBookToLibrary(newTitle, newAuthor, newPages, newStatus);
}

const newBookDialog = document.querySelector(".new-book-dialog")
const newBookBtn = document.querySelector(".newBookBtn");

newBookBtn.addEventListener("click", (e) => {
    processNewBook();
    myLibrary.forEach((book) => {
        const currentDiv = document.querySelector(".libraryDisplay");
        removeAllChildNodes(currentDiv);
    });
    displayBooks();
    newBookDialog.close();
    document.querySelector(".new-book-form").reset();
});

displayBooks();