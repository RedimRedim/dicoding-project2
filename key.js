export const STORAGE_KEY = "books";
export function parseStorageKey() {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  return storedBooks ? JSON.parse(storedBooks) : [];
}
import { Book } from "./test.js";

// const sampleData = [
//   { id: "123", title: "C1", author: "John", year: 1997, isCompleted: true },
//   { id: "456", title: "C2", author: "John", year: 1937, isCompleted: true },
//   { id: "789", title: "C3", author: "John", year: 1957, isCompleted: true },
//   { id: "011", title: "P1", author: "John", year: 1947, isCompleted: false },
//   { id: "055", title: "P2", author: "John", year: 1977, isCompleted: false },
// ];

// localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));

//modal handling js function
export class ModalHandling extends Book {
  constructor() {
    super();
    this.myModal = new bootstrap.Modal(document.getElementById("myModal"));
    this.submitEventListener();
  }

  showModal(event) {
    const bookItem = event.target.closest('[data-testid="bookItem"]'); // Get the closest book item

    const bookData = {
      id: bookItem.dataset.bookid,
      title: bookItem
        .querySelector('[data-testid="bookItemTitle"]')
        .textContent.trim(),
      author: bookItem
        .querySelector('[data-testid="bookItemAuthor"]')
        .textContent.trim(),
      year: bookItem.querySelector('[data-testid="bookItemYear"]').textContent,
      isCompleted: bookItem
        .querySelector('[data-testid="bookItemIsCompleteButton"]')
        .textContent.toLowerCase()
        .includes("belum")
        ? true
        : false,
    };
    this.modalData(bookData);
  }

  modalData(bookData) {
    this.myModal.show();
    document.querySelector(".modal-bookid").textContent = bookData.id;
    document.getElementById("changeTitle").value = bookData.title;
    document.getElementById("changeAuthor").value = bookData.author;
    document.getElementById("changeYear").value = bookData.year;
    const trueModalElement = document.querySelector(
      'input[name="flexRadioDefault"][value="true"]'
    );
    const falseModalElement = document.querySelector(
      'input[name="flexRadioDefault"][value="false"]'
    );

    if (bookData.isCompleted) {
      trueModalElement.checked = true;
      falseModalElement.checked = false;
    } else {
      trueModalElement.checked = false;
      falseModalElement.checked = true;
    }
  }

  submitEventListener() {
    const modalSubmitEvent = document.getElementById("saveBook");
    modalSubmitEvent.addEventListener("click", (event) => {
      const updateBookData = this.getData();
      if (updateBookData) {
        this.updateBook(updateBookData);
        alert("Finished updating book!");
      }
    });
  }

  getData() {
    const updateBookData = {
      id: document.querySelector(".modal-bookid").textContent,
      title: document.getElementById("changeTitle").value,
      author: document.getElementById("changeAuthor").value,
      year: parseInt(document.getElementById("changeYear").value),
      isCompleted:
        document.querySelector('input[name="flexRadioDefault"]:checked')
          .value === "true",
    };

    this.myModal.hide();

    return updateBookData;
  }
}

//searchSubmit when clicked ->
// find book title if existing in our data
// if yes then showing all the book in the list
// otherwise not showing anything
// if nothing is being inputted means that showing all
// we need book id to process
