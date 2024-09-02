import { ModalHandling, STORAGE_KEY } from "./scripts/modalclass.js";
import { Book } from "./scripts/bookclass.js";
const BookClass = new Book();
const ModalHandlingClass = new ModalHandling();

document.addEventListener("DOMContentLoaded", () => {
  BookClass.generateBooks();
});

//CRUD CLICK HANDLING
document.addEventListener("click", (event) => {
  const bookId = parseInt(
    event.target.parentElement.parentElement.dataset.bookid
  );
  if (event.target.matches('[data-testid="bookFormSubmitButton"]')) {
    //TODO ADDING BOOK SITE
    BookClass.formSubmitBook();
  } else if (event.target.matches('[data-testid="bookItemDeleteButton"]')) {
    //TODO DELETE BOOK SITE
    console.log(bookId);
    BookClass.deleteBook(bookId);
  } else if (event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
    //TODO MOVE BOOK SITE
    BookClass.moveBook(bookId);
  } else if (event.target.matches('[data-testid="bookItemEditButton"]')) {
    ModalHandlingClass.showModal(event);
  } else if (event.target.matches("#searchSubmit")) {
    event.preventDefault();
    const title = event.target.parentElement.searchBookTitle.value;
    BookClass.findBook(title);
  }
});

//LEARNING CUSTOM EVENT BY LISTEN WHEN BOOK IS BEING ADDED
document.addEventListener("bookAdded", (event) => {
  window.alert(`A new book was added:
    ID: ${event.detail.bookId}
    Title: ${event.detail.title}
    Author: ${event.detail.author}
    Year: ${event.detail.year}
    Completed: ${event.detail.isCompleted}`);
});
