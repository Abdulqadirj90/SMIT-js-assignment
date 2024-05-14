const counter = document.getElementById("counter");
const counterInfo = document.getElementById("counter-info");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.getElementById("reset-btn");
const historyBtn = document.getElementById("history-btn");
const history = document.getElementById("history");
const historyList = document.getElementById("history-list");
let historyItems = [];

let count = 0;

const updateCounter = () => {
  counter.textContent = count;
  counterInfo.textContent = count % 2 === 0 ? "Even" : "Odd";

  if (count % 2 === 0) {
    counter.style.color = "green";
  } else {
    counter.style.color = "red";
  }
};

const addToHistory = () => {
  historyItems.push(count);
  historyList.innerHTML = "";
  historyItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
};

incrementBtn.addEventListener("click", () => {
  count++;
  updateCounter();
  addToHistory();
});

decrementBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    updateCounter();
    addToHistory();
  }
});

resetBtn.addEventListener("click", () => {
  count = 0;
  updateCounter();
  historyItems = [];
  historyList.innerHTML = "";
});

historyBtn.addEventListener("click", () => {
  history.style.display = history.style.display === "none" ? "block" : "none";
});

updateCounter();