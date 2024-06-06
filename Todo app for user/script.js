document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check for the special email address
    if (email === 'special@gmail.com' && password) {
        document.querySelector('.login-content').classList.add('hidden');
        document.getElementById('todo-list').classList.remove('hidden');
    } else {
        alert('Invalid email or password');
    }
});

document.getElementById('add-todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTodoText = document.getElementById('new-todo').value;
    const newTodoItem = document.createElement('li');
    newTodoItem.textContent = newTodoText;
    document.getElementById('todos').appendChild(newTodoItem);
    document.getElementById('new-todo').value = '';
});