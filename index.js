// script.js

const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-item");
const addUpdateClick = document.getElementById("AddUpdateClick");
let updateText = document.getElementById("updateText");

todoValue.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
});

function CreateOrUpdateTodo() {
    const inputValue = todoValue.value.trim();

    if (inputValue === "") {
        alert("Please enter your todo text");
        todoValue.focus();
        return;
    }

    const existingItem = document.querySelector('.editing');

    if (existingItem) {
        // Update existing todo item
        existingItem.querySelector('div').innerText = inputValue;
        existingItem.classList.remove('editing');
    } else {
        // Add new todo item
        const li = document.createElement("li");
        li.innerHTML = `<div onclick="CompleteTodoItem(this)">${inputValue}</div> 
                        <div class="todo-controls">
                            <h2 class="edit" onclick="EditTodoItem(this)">📝</h2> 
                            <h2 class="delete" onclick="DeleteTodoItem(this)">🗑️</h2>
                        </div>`;
        listItems.appendChild(li);
    }

    // Clear input
    todoValue.value = "";
}

function CompleteTodoItem(e) {
    // Toggle line-through style
    e.style.textDecoration = e.style.textDecoration === "line-through" ? "" : "line-through";
}

function EditTodoItem(e) {
    // Set todo text to input for editing
    const todoText = e.parentElement.parentElement.querySelector("div");
    todoValue.value = todoText.innerText;
    todoValue.focus();

    // Mark the parent li as editing
    e.parentElement.parentElement.classList.add('editing');
}

function DeleteTodoItem(e) {
    const listItem = e.parentElement.parentElement;

    if (confirm(`Are you sure? Do you want to delete this ${listItem.innerText.trim()}`)) {
        listItem.remove();
    }
}
