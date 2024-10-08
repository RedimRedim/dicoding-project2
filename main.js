import { ModalHandling, STORAGE_KEY } from "./scripts/modalclass.js";
import { Book } from "./scripts/bookclass.js";
const BookClass = new Book();
const ModalHandlingClass = new ModalHandling();

document.addEventListener("DOMContentLoaded", () => {
  dummyData();
  BookClass.generateBooks();
});

//CRUD CLICK HANDLING
document.addEventListener("click", (event) => {
  const bookElement = event.target.closest("[data-bookid]"); // Get closest ancestor with data-bookid
  const bookId = bookElement ? parseInt(bookElement.dataset.bookid) || 0 : 0;

  if (event.target.matches('[data-testid="bookFormSubmitButton"]')) {
    //TODO ADDING BOOK SITE
    event.preventDefault();
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
    Completed: ${event.detail.isComplete}`);
});

function dummyData() {
  const storageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storageKey == 0 || storageKey == null) {
    document.querySelector(".dummyData").innerHTML =
      'there is no data as per now <button type="submit" id="addDummyData">addDummyData</button>';
  } else {
    document.querySelector(".dummyData").innerHTML = "";
  }
  try {
    document.getElementById("addDummyData").addEventListener("click", () => {
      BookClass.addDummyData();
      document.querySelector(".dummyData").innerHTML = "";
    });
  } catch (error) {
    console.log("error");
  }
}
