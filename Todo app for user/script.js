document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check for the special email address
    if (email === 'admin@gmail.com' && password) {
        document.querySelector('.login-content').classList.add('hidden');
        document.getElementById('todo-list').classList.remove('hidden');

        // Create and append logout button
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.id = 'logout-button';
        logoutButton.addEventListener('click', function() {
            document.querySelector('.login-content').classList.remove('hidden');
            document.getElementById('todo-list').classList.add('hidden');
            logoutButton.remove(); // Remove the logout button
        });
        document.querySelector('.login-container').appendChild(logoutButton);
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('add-todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTodoText = document.getElementById('new-todo').value;
    const newTodoItem = document.createElement('li');
    newTodoItem.textContent = newTodoText;

    // Create and append delete button to new todo item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        newTodoItem.remove();
    });
    newTodoItem.appendChild(deleteButton);

    document.getElementById('todos').appendChild(newTodoItem);
    document.getElementById('new-todo').value = '';
});

// Add delete button functionality to existing todo items
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        button.parentElement.remove();
    });
});