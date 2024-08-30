export const STORAGE_KEY = "books";
export function parseStorageKey() {
  const storedBooks = localStorage.getItem(STORAGE_KEY);
  return storedBooks ? JSON.parse(storedBooks) : [];
}

//modal handling js function
export class ModalHandling {
  showModal(bookData) {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();

    document.getElementById("changeTitle").value = bookData.title;
    document.getElementById("changeAuthor").value = bookData.author;
    document.getElementById("changeYear").value = bookData.year;
  }
  modalBookData(event) {
    const bookItem = event.target.closest('[data-testid="bookItem"]'); // Get the closest book item

    const bookData = {
      id: bookItem.dataset.bookid,
      title: bookItem.querySelector('[data-testid="bookItemTitle"]')
        .textContent,
      author: bookItem.querySelector('[data-testid="bookItemAuthor"]')
        .textContent,
      year: bookItem.querySelector('[data-testid="bookItemYear"]').textContent,
      isCompleted: bookItem
        .querySelector('[data-testid="bookItemIsCompleteButton"]')
        .textContent.toLowerCase()
        .includes("belum")
        ? true
        : false,
    };
    console.log(bookData);
    this.showModal(bookData);
  }
}
