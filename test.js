import { STORAGE_KEY, parseStorageKey } from "./key.js";

export class Book {
  constructor() {
    this.books = parseStorageKey() || []; //getData from local storage
  }
  saveBook(bookData) {
    let booksArray = [];

    if (
      localStorage.getItem(STORAGE_KEY) == null ||
      localStorage.getItem(STORAGE_KEY) == undefined
    ) {
      // Create storage if not yet existing
      booksArray = [];
    } else {
      booksArray = this.books;
    }

    booksArray.push(bookData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksArray));

    const bookAddedEvent = new CustomEvent("bookAdded", {
      detail: {
        bookId: bookData.id,
        title: bookData.title,
        author: bookData.author,
        year: bookData.year,
        isCompleted: bookData.isCompleted,
      },
    });
    document.dispatchEvent(bookAddedEvent);
  }

  generateBooks() {
    const allBooks = parseStorageKey();
    if (allBooks) {
      let completedBooks = [];
      let pendingBooks = [];
      allBooks.forEach((book) => {
        let divBook = `<div data-bookid="${book.id}" data-testid="bookItem">
                  <h3 data-testid="bookItemTitle">${book.title}
                  </h3>
                  
                 <p data-testid="bookItemAuthor">${book.author}</p>
                 <p data-testid="bookItemYear">${book.year}</p>
                 <div>
                    <button data-testid="bookItemIsCompleteButton">${
                      book.isCompleted ? "Belum dibaca" : "Selesai dibaca"
                    }</button>
                   <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                   <button data-testid="bookItemEditButton">Edit Buku</button>
                 </div>
               </div>`;
        if (book.isCompleted) {
          completedBooks.push(divBook);
        } else {
          pendingBooks.push(divBook);
        }
      });
      this.addBookHtml(completedBooks, pendingBooks);
    }
  }

  addBookHtml(completedBooks, pendingBooks) {
    const completedBooksElement = document.getElementById("completeBookList");
    const pendingBooksElement = document.getElementById("incompleteBookList");
    pendingBooksElement.innerHTML = pendingBooks.join("");
    completedBooksElement.innerHTML = completedBooks.join("");
  }

  static getBook() {
    const bookFormTitle = document.getElementById("bookFormTitle");
    const bookFormAuthor = document.getElementById("bookFormAuthor");
    const bookFormYear = document.getElementById("bookFormYear");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");

    const book = {
      id: new Date().getTime(),
      title: bookFormTitle.value,
      author: bookFormAuthor.value,
      year: parseInt(bookFormYear.value),
      isCompleted: bookFormIsComplete.checked,
    };

    return book;
  }

  deleteBook(bookId) {
    this.books = this.books.filter((book) => {
      return book.id != bookId;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  moveBook(bookId) {
    this.books = this.books.map((book) => {
      if (book.id == bookId) {
        return { ...book, isCompleted: !book.isCompleted }; //this one we wanna return book while reverse the isCompleted property
      }
      return book;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  updateBook(bookId, title, author, year, isCompleted) {
    console.log(bookId, title, author, year, isCompleted);
    // const bookData = {
    //   id: bookId,
    //   title: title,
    //   author: author,
    //   year: parseInt(year),
    //   isCompleted: false, // default to false when updating book
    // };
    //console.log(bookData);
  }
}
