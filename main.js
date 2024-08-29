import { STORAGE_KEY, parseStorageKey } from "./key.js";
import { Book } from "./test.js";

const bookFormSumitButton = document.getElementById("bookFormSubmit");
const bookData = Book.getBook();
Book.saveBook(bookData);
Book.generateBooks();


document.addEventListener("DOMContentLoaded", () => {
  Book.generateBooks();
});

bookFormSumitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const bookData = Book.getBook();
  Book.saveBook(bookData);
  Book.generateBooks();
});

const incompleteBookList = document.getElementById("incompleteBookList");

incompleteBookList.addEventListener("click", (event) => {
  const eventBtn = event.target.getAttribute("data-testid");

  if (eventBtn === "bookItemDeleteButton") {
    const bookItem = event.target.closest("[data-bookid]");
    const bookId = bookItem.getAttribute("data-bookid");
    Book.deleteBook(bookId);
    book.generateBooks();
  }
});

//BUTTON WHEN PRESSED COMPLETED AND HAVENT COMPLETED
// CHANGE THE STATUS OF ISCOMPLETE IN LOCALSTORAGE
// UPDATE THE DIV ELEMENT AND RE-SHOWING IN HTML
