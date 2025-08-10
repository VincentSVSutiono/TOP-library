const myLibrary = [];
const tbody = document.querySelector("tbody");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".addBookBtn");
const cancelBtn = document.querySelector(".modal-btn-cancel");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status");
const form = document.querySelector("form");

function Book(author, title, pages, status) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function () {
  this.status = !this.status;
};

function addBookToLibrary(author, title, pages, status) {
  // take params, create a book then store it in the array
  const newBook = new Book(author, title, pages, status);
  myLibrary.push(newBook);
}

addBtn.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    statusInput.checked
  );
  clearForm();
  dialog.close();
  displayBooks();
});

cancelBtn.addEventListener("click", () => {
  clearForm();
  dialog.close();
});

function clearForm() {
  authorInput.value = "";
  titleInput.value = "";
  pagesInput.value = "";
  statusInput.checked = false;
}

function createRow(book) {
  const trow = document.createElement("tr");
  trow.setAttribute("data-id", book.id);

  trow.appendChild(createColumns(book.author, "author"));
  trow.appendChild(createColumns(book.title, "title"));
  trow.appendChild(createColumns(book.pages, "pages"));
  trow.appendChild(createColumns(createStatusBadge(book.status), "status"));

  return trow;
}

function createColumns(item, className) {
  const tdata = document.createElement("td");
  if (className) tdata.classList.add(className);
  if (item instanceof HTMLElement) {
    tdata.appendChild(item);
  } else {
    tdata.textContent = item;
  }

  return tdata;
}

function createStatusBadge(status) {
  const badge = document.createElement("span");
  badge.classList.add("status-badge", status ? "status-read" : "status-unread");
  badge.textContent = status ? "Read" : "Unread";
  return badge;
}

function createActionsButtons(id) {
  const actionsTd = createColumns("", "actions");

  const statusBtn = document.createElement("button");
  statusBtn.classList.add("btn", "btn-status");
  statusBtn.textContent = "Change Status";
  statusBtn.addEventListener("click", () => {
    const index = myLibrary.findIndex((item) => item.id === id);
    myLibrary[index].changeStatus();
    displayBooks();
  });

  const delBtn = document.createElement("button");
  delBtn.classList.add("btn", "btn-delete");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    const index = myLibrary.findIndex((item) => item.id === id);
    myLibrary.splice(index, 1);
    displayBooks();
  });

  actionsTd.appendChild(statusBtn);
  actionsTd.appendChild(delBtn);

  return actionsTd;
}

function displayBooks() {
  tbody.textContent = "";
  myLibrary.forEach((item) => {
    const row = createRow(item);
    const actionsTd = createActionsButtons(item.id);
    row.appendChild(actionsTd);
    tbody.appendChild(row);
  });
}

addBookToLibrary("George Orwell	", "To Kill a Mockingbird", 281, true);
addBookToLibrary("George Bush	", "Slay Mockingbird", 21, false);
addBookToLibrary("George Washington	", "Spider-Man", 111, false);

displayBooks();
