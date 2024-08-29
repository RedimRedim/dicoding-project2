import { STORAGE_KEY, parseStorageKey } from "./key.js";
import { Book } from "./test.js";
const BookClass = new Book();

document.addEventListener("DOMContentLoaded", () => {
  BookClass.generateBooks();
  setupListeners();
});

function setupListeners() {
  // Listen for form submission
  bookFormSubmitListeners();

  // Listen for delete button clicks
  deleteButtonListeners();
}

function bookFormSubmitListeners() {
  const bookFormSumitButton = document.getElementById("bookFormSubmit");
  bookFormSumitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const bookData = Book.getBook();
    BookClass.saveBook(bookData);
    BookClass.generateBooks();
  });
}

function deleteButtonListeners() {
  const deleteButton = document.querySelectorAll(
    '[data-testid="bookItemDeleteButton"]'
  );
  deleteButton.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let bookId = event.target.closest("[data-bookid]").dataset.bookid;
      BookClass.deleteBook(bookId);
    });
  });
  //listen deleteListener function
}

//BUTTON WHEN PRESSED COMPLETED AND HAVENT COMPLETED
// CHANGE THE STATUS OF ISCOMPLETE IN LOCALSTORAGE
// UPDATE THE DIV ELEMENT AND RE-SHOWING IN HTML
