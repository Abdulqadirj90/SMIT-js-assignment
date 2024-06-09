document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check for the special email address
  if (email === "admin@gmail.com" && password) {
      document.querySelector(".login-content").classList.add("hidden");
      document.getElementById("todo-list").classList.remove("hidden");

      // Create and append logout button
      const logoutButton = document.createElement("button");
      logoutButton.textContent = "Logout";
      logoutButton.id = "logout-button";
      logoutButton.addEventListener("click", function () {
          document.querySelector(".login-content").classList.remove("hidden");
          document.getElementById("todo-list").classList.add("hidden");
          logoutButton.remove(); // Remove the logout button
          window.location.reload(); // Redirect to home page
      });
      document.querySelector(".login-container").appendChild(logoutButton);

      // Add delete buttons and dates to existing todo items
      const existingTodos = document.querySelectorAll("#todos li");
      existingTodos.forEach((todoItem) => {
          const dateSpan = document.createElement("span");
          const date = new Date().toLocaleDateString();
          dateSpan.className = "date";
          dateSpan.textContent = `(${date})`;
          todoItem.appendChild(dateSpan);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.className = "delete-button";
          deleteButton.addEventListener("click", function () {
              todoItem.remove();
          });
          todoItem.appendChild(deleteButton);
      });
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
  });
  newTodoItem.appendChild(deleteButton);

  document.getElementById("todos").appendChild(newTodoItem);
  document.getElementById("new-todo").value = "";
});

// Add delete button functionality to existing todo items
document.querySelectorAll(".delete-button").forEach((button) => {
  button.addEventListener("click", function () {
      button.parentElement.remove();
  });
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