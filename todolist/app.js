// ----------------selectors--------------------
const todoInput = document.querySelector(".task__input");
const modaltodoInput = document.querySelector(".modal__input");
const addInput = document.querySelector(".task__icon");
const todoList = document.querySelector(".todo__ul");
const todoForm = document.querySelector(".task__form");
const noTodo = document.querySelector(".todo__no-todo");
const filterOption = document.querySelector(".header__list-container");
const modalOpener = document.querySelector(".task__upArrow-icon");
const modalCloser = document.querySelector(".modal__close");
const modalCloserCancel = document.querySelector(".modal__close-cancel");
const modal = document.querySelector(".modal");
const modalAddTask = document.querySelector(".modal__add-task");
const modalForm = document.querySelector(".modal__form");
const headerButtonOpenModal = document.querySelector(".header__button");
const textAreaInput = document.querySelector(".modal__textarea");
const searchInput = document.querySelector(".main__form");
const searchKey = document.querySelector(".main__search-input");

//--------------------functions----------------------
const addTodo = (event) => {
  event.preventDefault();

  //removing no todo section

  noTodo.remove();

  //adding todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__div");

  //adding li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo__list");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  //adding checkBox
  const completeButton = document.createElement("button");
  completeButton.innerHTML = `<i class="fa-solid fa-user-check fa-xl todo__complete-icon"></i>`;
  completeButton.classList.add("todo__complete-btn");
  todoDiv.appendChild(completeButton);

  //   completeButton.classList.add("todo__completeButton");

  todoList.appendChild(todoDiv);

  //clearing the value of input field on submit
  todoInput.value = " ";
};

//checkmark function

const check = (event) => {
  const item = event.target;
  console.log("Inside check fuction");

  if (item.classList[0] === "todo__complete-btn" || "todo__complete-icon") {
    if (item.classList[0] === "todo__complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed-todo");
    } else {
      let todo = item.parentElement.parentElement;
      todo.classList.toggle("completed-todo");
    }
  }
};

//filter completed and incomplete

function filterTodo(e) {
  const todos = todoList.childNodes;

  if (!todos || todos.length === 0) {
    console.error("No todos found or todoList is not defined properly.");
    return;
  }

  todos.forEach(function (todo) {
    // Check if todo is an element node
    if (todo.nodeType === 1) {
      if (e.target.innerText === "Home") {
        todo.style.display = "flex";
      } else if (e.target.innerText === "Completed") {
        if (todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      } else if (e.target.innerText === "Remaining") {
        if (!todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
    }
  });
}

//----------open modal-----------------
const openModal = (event) => {
  modal.style.top = "150%";
};
//--------------open modal from header button--------------
const openModalFromHeader = (event) => {
  modal.style.top = "150%";
};
//---------------close modal--------------------
const closeModal = (event) => {
  console.log("from close modal");
  modal.style.top = "-150%";
};
// -----------------------cancal modal ------------------------
const cancelModal = (event) => {
  console.log("from cancel modal");
  modal.style.top = "-150%";
};

//------------------adding todo from modal---------------
function addTodoFromModal(event) {
  event.preventDefault();
  console.log("from modal add todo");

  //removing no todo section

  noTodo.remove();

  //adding todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__div");

  //adding li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo__list");
  newTodo.innerText = modaltodoInput.value;
  todoDiv.appendChild(newTodo);

  const newDesc = document.createElement("span");
  newDesc.classList.add("todo__desc");
  newDesc.innerText = textAreaInput.value;
  newTodo.appendChild(newDesc);

  //adding checkBox
  const completeButton = document.createElement("button");
  completeButton.innerHTML = `<i class="fa-solid fa-user-check fa-xl todo__complete-icon"></i>`;
  completeButton.classList.add("todo__complete-btn");
  todoDiv.appendChild(completeButton);

  //   completeButton.classList.add("todo__completeButton");

  todoList.appendChild(todoDiv);

  //clearing the value of input field on submit
  modaltodoInput.value = " ";
  textAreaInput.value = " ";
  modal.style.top = "-150%";
}

//searching input
const searchKeyword = (event) => {
  event.preventDefault();
  const todos = todoList.childNodes;
  if (!todos || todos.length === 0) {
    console.error("No todos found or todoList is not defined properly.");
    return;
  }
  todos.forEach((todo) => {
    if (todo.nodeType === 1) {
      if (
        !todo.innerText.toLowerCase().includes(searchKey.value.toLowerCase())
      ) {
        todo.classList.add("not-matched");
      }
    }
  });
};

//removing class when search input is cleared
const removeNotMatched = (event) => {
  const todos = todoList.childNodes;
  if (!todos || todos.length === 0) {
    console.error("No todos found or todoList is not defined properly.");
    return;
  }

  console.log(searchKey.value);
  event.preventDefault();

  if (searchKey.value === "") {
    todos?.forEach((todo) => {
      todo?.classList?.remove("not-matched");
    });
  }
};

//-------------- event listners---------------------
todoForm.addEventListener("submit", addTodo);
addInput.addEventListener("click", addTodo); //for add button
todoList.addEventListener("click", check); // for creating even when we click completed icon
filterOption.addEventListener("click", filterTodo); // for filtering
modalOpener.addEventListener("click", openModal);
modalCloser.addEventListener("click", closeModal);
modalCloserCancel.addEventListener("click", cancelModal);
modalAddTask.addEventListener("click", addTodoFromModal); //for add button
headerButtonOpenModal.addEventListener("click", openModalFromHeader); //for opening modal from header icon
modalForm.addEventListener("submit", addTodoFromModal);
searchInput.addEventListener("submit", searchKeyword);
searchKey.addEventListener("change", removeNotMatched);
