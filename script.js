const myLibrary = [];
const tbody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".addBookBtn");
const submitBtn = document.querySelector(".modal-btn-submit");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");

function Book(author, title, pages, status) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(author, title, pages, status) {
  // take params, create a book then store it in the array
  const newBook = new Book(author, title, pages, status);
  myLibrary.push(newBook);
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    statusInput.checked
  );
  dialog.close();
});

function displayBooks() {
  tbody.textContent = "";
  myLibrary.forEach((item) => {
    const columns = ["author", "title", "pages", "status"];
    const trow = document.createElement("tr");

    columns.forEach((column) => {
      const tdata = document.createElement("td");
      tdata.classList.add(column);

      if (column === "status") {
        const span = document.createElement("span");
        span.classList.add(
          "status-badge",
          item[column] ? "status-read" : "status-unread"
        );
        span.textContent = item[column] ? "Read" : "Unread";
        tdata.appendChild(span);
      } else {
        tdata.textContent = item[column];
      }

      trow.appendChild(tdata);
    });

    const actionsTd = document.createElement("td");
    actionsTd.classList.add("actions");

    const statusBtn = document.createElement("button");
    statusBtn.classList.add("btn", "btn-status");
    statusBtn.textContent = "Read";

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-delete");
    delBtn.textContent = "Delete";

    actionsTd.appendChild(statusBtn);
    actionsTd.appendChild(delBtn);
    trow.appendChild(actionsTd);

    tbody.appendChild(trow);
  });
}

addBookToLibrary("George Orwell	", "To Kill a Mockingbird", 281, true);
addBookToLibrary("George Bush	", "Slay Mockingbird", 21, false);
addBookToLibrary("George Washington	", "Spider-Man", 111, false);

displayBooks();
