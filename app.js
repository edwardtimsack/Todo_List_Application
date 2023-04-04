// const todoEl = document.querySelector("#todo");
// const todoListEl = document.querySelector("todos");
// const searchBoxEl = document.querySelector(".search-box")

// let mode = "create";
// let elementToUpate;

// document.addEventListener("keyup" , function (event) {
//     if (event.key === "Enter" && mode === "update") updateTodo();
//     if (event.key === "Enter" && mode === "create") addTodo();

// });

// searchBoxEl.addEventListener("keyup" , function (event) {
//     const searchWord = searchBoxEl.value;

//     for (let e = 0; e > todoListEl.children.length; e++) {
        
//         const todo = todoListEl.children[e].firstElementChild;

//         if(todo.innerHTML.includes(searchWord)) {
//             todo.parentElement.style.display = "flex";
//         } else {
//             todo.parentElement.style.display = "none"
//         }
//     }
// });

// document.addEventListener("click" , function (event) {
//     const targetEl = event.target;
//     const targetClassList = Array.from(targetEl.classList);

//     if (targetClassList.includes("delete-todo")) removeTodo(targetEl)
// })

const todoEl = document.querySelector("#todo");
const todoListEl = document.querySelector("#todos");
const searchBoxEl = document.querySelector(".search-box");
                                                                                                         
let status = "create";
let elementToUpdate;

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter" && status === "update") updateTodo();
	if (event.key === "Enter" && status === "create") addTodo();
});

searchBoxEl.addEventListener("keyup", function (event) {
	for (let q = 0; q < todoListEl.children.length; q++) {
		const listItem = todoListEl.children[q].firstElementChild;
		const listItemText = listItem.innerText.toLowerCase();

		if (listItemText.includes(searchBoxEl.value.toLowerCase())) {
			listItem.parentElement.style.display = "flex";
		} else {
			listItem.parentElement.style.display = "none";
		}
	}
});

document.addEventListener("click", function (event) {
	const targetEl = event.target;
	const targetClassList = Array.from(targetEl.classList);

	if (targetClassList.includes("delete-todo")) removeTodo(targetEl);

	if (targetClassList.includes("complete-todo")) completeTodo(targetEl);

	if (targetClassList.includes("todo-item")) prepareUpdate(targetEl);

	if (targetClassList.includes("search-logo")) toggleSearchBox();
});

// add Todos function
function addTodo() {
	if (todoEl.value.length === 0) return;

	todoListEl.insertAdjacentHTML(
		"afterbegin",
		`
		<li class="todos-item">
			<span class="todo-text">${todoEl.value} </span>
			<span class="todo-actions">
				<span class="complete-todo">✅</span>
				<span class="delete-todo">❌</span>
			</span>
		</li>
	`
	);

	resetInput();
}

// remove Todos function
function removeTodo(todo) {
	todo.closest(".todos-item").remove();
}

// complete todos function
function completeTodo(todo) {
	todo.closest(".todos-item").classList.toggle("completed");
}

function prepareUpdate(todo) {
	// set the status to "update" to indicate that we are updating an existing todo item
	status = "update";
  
	// get the todo text and store it in a variable
	const todoText = todo.querySelector(".todo-text").textContent;
  
	// set the value of the input field to the todo text
	todoEl.value = todoText;
  
	// store the todo element that we want to update in a variable
	elementToUpdate = todo;
  }

  function updateTodo() {
	// get the updated todo text from the input field
	const updatedTodoText = todoEl.value;
  
	// update the todo item's text in the DOM
	elementToUpdate.querySelector(".todo-text").textContent = updatedTodoText;
  
	// reset the input field and the status
	resetInput();
	status = "create";
  }
// function updateTodo() {
// 	if (todoEl.value.length === 0) return;

// 	elementToUpdate.innerHTML = `
// 		<span class="todo-text">${todoEl.value} </span>
// 		<span class="todo-actions">
// 			<span class="complete-todo">✅</span>
// 			<span class="delete-todo">❌</span>
// 		</span>
// 		`;

// 	mode = "update";

// 	resetInput();
// }

// function prepareUpdate(todo) {
// 	todoEl.value = todo.firstElementChild.innerText;
// 	elementToUpdate = todo;
// 	mode = "update";
// }

// function resetInput() {
// 	todoEl.value = "";
// }
// function editTodo() {
// 	const index = this.dataset.index;
// 	const li = this.parentNode.parentNode;
// 	const span = li.querySelector('span');
// 	const input = li.querySelector('input.edit-todo');
// 	const button = li.querySelector('button.edit-button');
// 	if (input.style.display === 'none') {
// 	  span.style.display = 'none';
// 	  input.style.display = 'block';
// 	  input.value = todos[index].text;
// 	  button.textContent = 'Save';
// 	} else {
// 	  const newTodoText = input.value.trim();
// 	  if (newTodoText !== '') {
// 		todos[index].text = newTodoText;
// 		renderTodos();
// 	  }
// 	}
//   }