import { STORAGE_KEY, parseStorageKey } from "./key.js";

export class Book {
  static saveBook(bookData) {
    let booksArray = [];

    if (
      localStorage.getItem(STORAGE_KEY) == null ||
      localStorage.getItem(STORAGE_KEY) == undefined
    ) {
      // Create storage if not yet existing
      booksArray = [];
    } else {
      booksArray = parseStorageKey;
    }

    booksArray.push(bookData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booksArray));
  }

  static generateBooks() {
    const allBooks = parseStorageKey;
    if (allBooks) {
      let completedBooks = [];
      let pendingBooks = [];
      allBooks.forEach((book) => {
        let divBook = `<div data-bookid="${book.id}" data-testid="bookItem">
                  <h3 data-testid="bookItemTitle">${book.title}</h3>
                 <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
                 <p data-testid="bookItemYear">Tahun: ${book.year}</p>
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
    pendingBooksElement.innerHTML = pendingBooks;

    completedBooksElement.innerHTML = completedBooks;
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
}

//UPDATE
//DELETE
//MODIFY
// deleteBook(bookId) {
//     const booksArray = parseStorageKey;
//     booksArray.forEach((book, index) => {
//       if (book.id === bookId) {
//         booksArray.splice(index, 1);
//       }
//     });
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(booksArray));
//   }
