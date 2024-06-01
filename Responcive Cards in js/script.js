function updateCard(cardId) {
    const card = document.getElementById(cardId);
    const description = card.querySelector('p');
    const newText = prompt("Enter new description:");
    if (newText !== null) {
        description.textContent = newText;
    }
}

function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    card.remove();
}