export const STORAGE_KEY = "books";
export function parseStorageKey() {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  return storedBooks ? JSON.parse(storedBooks) : [];
}
import { Book } from "./test.js";

const sampleData = [
  {
    id: "001",
    title: "1984",
    author: "George Orwell",
    year: "1949",
    isCompleted: true,
  },
  {
    id: "002",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: "1960",
    isCompleted: true,
  },
  {
    id: "003",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: "1925",
    isCompleted: true,
  },
  {
    id: "004",
    title: "Moby Dick",
    author: "Herman Melville",
    year: "1851",
    isCompleted: false,
  },
  {
    id: "005",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    isCompleted: true,
  },
  {
    id: "006",
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: "1869",
    isCompleted: false,
  },
  {
    id: "007",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: "1951",
    isCompleted: true,
  },
  {
    id: "008",
    title: "Brave New World",
    author: "Aldous Huxley",
    year: "1932",
    isCompleted: true,
  },
  {
    id: "009",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    isCompleted: true,
  },
  {
    id: "010",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: "1953",
    isCompleted: false,
  },
  {
    id: "011",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: "1890",
    isCompleted: true,
  },
  {
    id: "012",
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    year: "1939",
    isCompleted: true,
  },
  {
    id: "013",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: "1847",
    isCompleted: true,
  },
  {
    id: "014",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: "1880",
    isCompleted: false,
  },
  {
    id: "015",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: "1847",
    isCompleted: true,
  },
  {
    id: "016",
    title: "The Odyssey",
    author: "Homer",
    year: "8th century BC",
    isCompleted: false,
  },
  {
    id: "017",
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: "1988",
    isCompleted: true,
  },
  {
    id: "018",
    title: "The Road",
    author: "Cormac McCarthy",
    year: "2006",
    isCompleted: true,
  },
  {
    id: "019",
    title: "The Fault in Our Stars",
    author: "John Green",
    year: "2012",
    isCompleted: false,
  },
  {
    id: "020",
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    year: "1950",
    isCompleted: true,
  },
];

localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));

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
