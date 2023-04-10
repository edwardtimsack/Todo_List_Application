const todoList = document.getElementById('todo-list');
const searchInput = document.getElementById('search');
const addTodoButton = document.getElementById('add-todo');
const newTodoInput = document.getElementById('new-todo');
let todos = [];

function displayTodos() {
  todoList.innerHTML = '';
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const todoItem = document.createElement('li');
    const todoText = document.createTextNode(todo.title);

    todoItem.appendChild(todoText);

    if (todo.completed) {
      todoItem.classList.add('completed');
    }

    todoItem.addEventListener('click', function() {
      todo.completed = !todo.completed;
      displayTodos();
    });

    todoItem.addEventListener('dblclick', function() {
      const newTitle = prompt('Enter new title', todo.title);
      if (newTitle !== null && newTitle !== '') {
        todo.title = newTitle;
        displayTodos();
      }
    });

// implementation of removing Todos
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function() {
      todos.splice(i, 1);
      displayTodos();
    });

    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  }
}

// implementation of adding Todos
function addTodo() {
  const newTodoTitle = newTodoInput.value;
  if (newTodoTitle !== '') {
    todos.push({ title: newTodoTitle, completed: false });
    newTodoInput.value = '';
    displayTodos();
  }
}

// implementation of searching Todos
function searchTodos() {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredTodos = todos.filter(function(todo) {
    return todo.title.toLowerCase().includes(searchQuery);
  });
  todos = filteredTodos;
  displayTodos();
}

addTodoButton.addEventListener('click', addTodo);
searchInput.addEventListener('input', searchTodos);

// Initialize the application
displayTodos();
