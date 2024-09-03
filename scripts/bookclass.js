import { STORAGE_KEY, parseStorageKey, sampleData } from "./modalclass.js";

export class Book {
  constructor() {
    this.books = parseStorageKey();
  }

  refreshBooks() {
    this.books = parseStorageKey();
  }

  addDummyData() {
    this.books = [...this.books, ...sampleData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    this.generateBooks();
  }

  saveBook(bookData) {
    if (bookData) {
      console.log(bookData);
      this.refreshBooks(); // Ensure books are up-to-date
      this.books.push(bookData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));

      const bookAddedEvent = new CustomEvent("bookAdded", {
        detail: {
          bookId: bookData.id,
          title: bookData.title,
          author: bookData.author,
          year: bookData.year,
          isComplete: bookData.isComplete,
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
                      book.isComplete ? "pendingBtn" : "completedBtn"
                    }" data-testid="bookItemIsCompleteButton">${
          book.isComplete ? "Belum dibaca" : "Selesai dibaca"
        }</button>
                   <button data-testid="bookItemDeleteButton" id="delBtn">Hapus Buku</button>
                   <button data-testid="bookItemEditButton">Edit Buku</button>
                 </div>
               </div>`;
        if (book.isComplete) {
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
    try {
      this.books = this.books.filter((book) => {
        return book.id != bookId;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.books));
    } catch (error) {
      this.books = [];
    }
    this.generateBooks();
  }

  moveBook(bookId) {
    this.refreshBooks();
    this.books = this.books.map((book) => {
      if (book.id == bookId) {
        return { ...book, isComplete: !book.isComplete }; //this one we wanna return book while reverse the isComplete property
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
          isComplete: updateBookData.isComplete,
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
        isComplete: bookFormIsComplete.checked,
      };
      this.saveBook(book);
      this.generateBooks();
    }
  }
}
