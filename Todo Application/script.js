document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.getElementById('date');
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = `Today's Date: ${currentDate}`;
});

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${todoText}</span>
            <button onclick="deleteTodo(this)">Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function deleteTodo(button) {
    const li = button.parentElement;
    li.remove();
}