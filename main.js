
// Array to store to-do items
let todos = [];

// Function to add new to-do item
function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(todo);
        todoInput.value = "";
        renderTodos(todos);
    }
}

// Function to render the to-do list
function renderTodos(todosToRender) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todosToRender.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        if (todo.completed) {
            todoItem.classList.add("completed");
        }
        todoItem.innerHTML = `
                <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleCompletion(${todo.id})">
                <span>${todo.text}</span>   
                <button class="delete-button" onclick="deleteTodo(${todo.id})">Delete</button>
            `;
        todoList.appendChild(todoItem);
    });
}

// Function to toggle completion status of a to-do item
function toggleCompletion(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    renderTodos(todos);
}

// Function to delete a to-do item
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos(todos);
}

// Function to filter the to-do list based on completion status
function filterTodos(filter) {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'active') {
            return !todo.completed;
        } else if (filter === 'completed') {
            return todo.completed;
        }
    });
    renderTodos(filteredTodos);
}

// Function to search the to-do list
function searchTodos() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchInput));
    renderTodos(filteredTodos);
}

// Initial rendering of the to-do list
renderTodos(todos);
