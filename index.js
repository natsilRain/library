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

function displayBooks() {
    myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");

        const title = document.createElement("h2");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const read = document.createElement("p");

        title.textContent = `${book.title}`;
        author.textContent = `by ${book.author}`;
        pages.textContent = `page count: ${book.pages}`;
        read.textContent = `${book.read}`;

        title.classList.add("title");
        author.classList.add("author");
        pages.classList.add("pages");
        read.classList.add("status");

        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(pages);
        bookItem.appendChild(read);

        bookItem.classList.add("card")

        const currentDiv = document.querySelector(".libraryDisplay");
        currentDiv.appendChild(bookItem);
    });
}

addBookToLibrary("The Great Gatsby", "E. Scott. Fitzgerald", 140, "reading");
addBookToLibrary("Heart of Darkness", "Joseph Conrad", 101, "unread");
addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 225, "unread");
addBookToLibrary("The Aeneid", "Virgil", 422, "unread");

displayBooks();