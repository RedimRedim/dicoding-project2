import { STORAGE_KEY, parseStorageKey } from "./modalclass.js";

export class Book {
  constructor() {
    this.books = parseStorageKey();
  }

  refreshBooks() {
    this.books = parseStorageKey();
  }

  saveBook(bookData) {
    if (bookData) {
      this.refreshBooks(); // Ensure books are up-to-date
      this.books.push(bookData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));

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
  }

  generateBooks(filteredBooks) {
    this.refreshBooks(); // Ensure books are up-to-date
    const allBooks = filteredBooks ? filteredBooks : this.books;
    console.log(allBooks);
    if (allBooks) {
      let completedBooks = [];
      let pendingBooks = [];
      allBooks.forEach((book) => {
        let divBook = `<div data-bookid="${
          book.id
        }" data-testid="bookItem" class="itemContent">
        <div class="itemDetails">
                  <p data-testid="bookItemTitle">${book.title}
                  </p>
                  
                 <p data-testid="bookItemAuthor">${book.author}</p>
                 <p data-testid="bookItemYear">${book.year}</p>
        </div>                 
                 <div class="buttonContent">
                    <button id="${
                      book.isCompleted ? "pendingBtn" : "completedBtn"
                    }" data-testid="bookItemIsCompleteButton">${
          book.isCompleted ? "Belum dibaca" : "Selesai dibaca"
        }</button>
                   <button data-testid="bookItemDeleteButton" id="delBtn">Hapus Buku</button>
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

  findBook(bookTitle) {
    if (bookTitle) {
      console.log(this.books);
      const filteredBooks = this.books.filter((book) => {
        return book.title.toLowerCase().includes(bookTitle.toLowerCase());
      });

      this.generateBooks(filteredBooks);
    } else {
      this.generateBooks();
    }
  }

  deleteBook(bookId) {
    this.refreshBooks();
    this.books = this.books.filter((book) => {
      return book.id != bookId;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  moveBook(bookId) {
    this.refreshBooks();
    this.books = this.books.map((book) => {
      if (book.id == bookId) {
        return { ...book, isCompleted: !book.isCompleted }; //this one we wanna return book while reverse the isCompleted property
      }
      return book;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  updateBook(updateBookData) {
    this.refreshBooks();
    this.books = this.books.map((book) => {
      if (book.id == updateBookData.id) {
        console.log(updateBookData);
        return {
          ...book,
          id: updateBookData.id,
          title: updateBookData.title,
          author: updateBookData.author,
          year: updateBookData.year,
          isCompleted: updateBookData.isCompleted,
        };
      }
      return book;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  formSubmitBook() {
    const bookFormTitle = document.getElementById("bookFormTitle");
    const bookFormAuthor = document.getElementById("bookFormAuthor");
    const bookFormYear = document.getElementById("bookFormYear");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");

    if (bookFormTitle.value && bookFormAuthor.value && bookFormYear.value) {
      const book = {
        id: new Date().getTime(),
        title: bookFormTitle.value,
        author: bookFormAuthor.value,
        year: parseInt(bookFormYear.value),
        isCompleted: bookFormIsComplete.checked,
      };
      this.saveBook(book);
      this.generateBooks();
    }
  }
}
