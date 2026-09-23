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
    console.log("New book added to library!");
}

function displayBooks() {
    myLibrary.forEach((book) => {
        const newDiv = document.createElement("div");

        const newContent = document.createTextNode((book.info()));

        newDiv.appendChild(newContent);

        const currentDiv = document.querySelector(".libraryDisplay");
        currentDiv.appendChild(newDiv);
    })
}

addBookToLibrary("The Great Gatsby", "F. Scott. Fitzgerald", 140, "reading");
addBookToLibrary("Heart of Darkness", "Joseph Conrad", 101, "not read yet");
addBookToLibrary("Treasure Island", "Robert Louis Stevenson", 225, "not read yet");
addBookToLibrary("The Aeneid", "Virgil", 422, "not read yet");

displayBooks();