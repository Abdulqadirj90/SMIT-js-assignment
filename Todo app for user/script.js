document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check for the specific email address and password, or allow any other email with any non-empty password
    if ((email === "user@example.com" && password === "admin1") || (email !== "user@example.com" && password)) {
        document.querySelector(".login-content").classList.add("hidden");
        document.getElementById("todo-list").classList.remove("hidden");

        // Save current email to local storage
        localStorage.setItem("currentUser", email);

        // Load existing todos for the current user from local storage
        loadTodos(email);

        // Create and append logout button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.id = "logout-button";
        logoutButton.addEventListener("click", function () {
            document.querySelector(".login-content").classList.remove("hidden");
            document.getElementById("todo-list").classList.add("hidden");
            logoutButton.remove(); // Remove the logout button
            localStorage.removeItem("currentUser"); // Remove current user from local storage
            window.location.reload(); // Redirect to home page
        });
        document.querySelector(".login-container").appendChild(logoutButton);
    } else {
        alert("Invalid email or password");
    }
});

document.getElementById("add-todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const newTodoText = document.getElementById("new-todo").value;
    const newTodoItem = document.createElement("li");
    const date = new Date().toLocaleDateString(); // Get the current date

    newTodoItem.innerHTML = `${newTodoText} <span class="date">(${date})</span>`;

    // Create and append delete button to new todo item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
        newTodoItem.remove();
        saveTodos(localStorage.getItem("currentUser")); // Save todos when an item is deleted
    });
    newTodoItem.appendChild(deleteButton);

    document.getElementById("todos").appendChild(newTodoItem);
    document.getElementById("new-todo").value = "";

    // Save todos to local storage
    saveTodos(localStorage.getItem("currentUser"));
});

// Add delete button functionality to existing todo items
document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
        button.parentElement.remove();
        saveTodos(localStorage.getItem("currentUser")); // Save todos when an item is deleted
    });
});

document.getElementById("delete-all-button").addEventListener("click", function () {
    const todosList = document.getElementById("todos");
    while (todosList.firstChild) {
        todosList.removeChild(todosList.firstChild);
    }
    saveTodos(localStorage.getItem("currentUser")); // Save the empty list to local storage
});

function chooseCategory(select) {
    const category = select.value;
    const todoItems = document.querySelectorAll("#todos li");

    todoItems.forEach((todoItem) => {
        const itemCategory = todoItem.getAttribute("data-category");
        if (category === "all" || category === itemCategory) {
            todoItem.style.display = "flex";
        } else {
            todoItem.style.display = "none";
        }
    });
}

// Function to save todos to local storage
function saveTodos(email) {
    const todos = [];
    document.querySelectorAll("#todos li").forEach((todoItem) => {
        todos.push({
            text: todoItem.childNodes[0].nodeValue.trim(),
            date: todoItem.querySelector(".date").textContent,
            category: todoItem.getAttribute("data-category")
        });
    });
    localStorage.setItem(email + "-todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodos(email) {
    const todos = JSON.parse(localStorage.getItem(email + "-todos")) || [];
    const todoList = document.getElementById("todos");
    todoList.innerHTML = ''; // Clear current todos

    todos.forEach((todo) => {
        const newTodoItem = document.createElement("li");
        newTodoItem.innerHTML = `${todo.text} <span class="date">${todo.date}</span>`;
        newTodoItem.setAttribute("data-category", todo.category);

        // Create and append delete button to new todo item
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            newTodoItem.remove();
            saveTodos(email); // Save todos when an item is deleted
        });
        newTodoItem.appendChild(deleteButton);

        todoList.appendChild(newTodoItem);
    });
}