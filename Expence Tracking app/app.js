document.getElementById("expense-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    const totalExpenses = document.getElementById("total-expenses");
    const expenseList = document.getElementById("expense-list");
  
    if (!isNaN(expenseAmount)) {
      const newExpense = document.createElement("li");
      newExpense.textContent = `${expenseName}: $${expenseAmount}`;
      expenseList.appendChild(newExpense);
      totalExpenses.textContent = parseFloat(totalExpenses.textContent) + expenseAmount;
      document.getElementById("expense-name").value = "";
      document.getElementById("expense-amount").value = "";
    }
  });