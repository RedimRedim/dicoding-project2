import { STORAGE_KEY, parseStorageKey, ModalHandling } from "./key.js";
import { Book } from "./test.js";
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
    event.preventDefault();
    const bookData = Book.getBook();
    BookClass.saveBook(bookData);
  } else if (event.target.matches('[data-testid="bookItemDeleteButton"]')) {
    //TODO DELETE BOOK SITE
    console.log(bookId);
    BookClass.deleteBook(bookId);
  } else if (event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
    //TODO MOVE BOOK SITE
    BookClass.moveBook(bookId);
  } else if (event.target.matches('[data-testid="bookItemEditButton"]')) {
    ModalHandlingClass.modalBookData(event);
    //modalSubmitListener(myModal, bookId); //UPDATE the latest title
  }
  BookClass.generateBooks();
});
