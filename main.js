const bookFormSumitButton = document.getElementById("bookFormSubmit");
const COMPLETED_BOOKS_KEY = "completed_books";
const PENDING_BOOKS_KEY = "pending_books";

// function generateBookId() {
//   const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

//   if (storedData === null || storedData === undefined) {
//     return 1;
//   } else {
//     console.log(storedData.length);
//     return storedData.length + 1;
//   }
// }

class Book {
  constructor(book) {
    this.book = book;
  }

  save() {
    console.log(this.book[0].isCompleted);
    if (this.book) {
      //save to finished/completed book
      localStorage.setItem(COMPLETED_BOOKS_KEY, JSON.stringify(this.book));
    } else {
      // save to pending book
      localStorage.setItem(PENDING_BOOKS_KEY, JSON.stringify(this.book));
    }
  }

  static getBook() {
    const bookFormTitle = document.getElementById("bookFormTitle");
    const bookFormAuthor = document.getElementById("bookFormAuthor");
    const bookFormYear = document.getElementById("bookFormYear");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");

    const book = [
      {
        id: "1",
        title: bookFormTitle.value,
        author: bookFormAuthor.value,
        year: parseInt(bookFormYear.value),
        isCompleted: bookFormIsComplete.checked,
      },
    ];

    return book;
  }
}

// // Store the book in local storage
// function storeBook(book) {
//   if (
//     localStorage.getItem(STORAGE_KEY) == null ||
//     localStorage.getItem(STORAGE_KEY) == undefined
//   ) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
//   } else {
//     //condition when localstorage have
//     const returnBooks = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     returnBooks.unshift();
//     returnBooks.push(book);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(returnBooks));
//   }
// }

bookFormSumitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newbookData = Book.getBook();
  const book = new Book(newbookData);
  console.log(book);
  book.save();
});

// {
//     id: 3657848524,
//     title: 'Harry Potter and the Philosopher\'s Stone',
//     author: 'J.K Rowling',
//     year: 1997,
//     isComplete: false,
//   }
