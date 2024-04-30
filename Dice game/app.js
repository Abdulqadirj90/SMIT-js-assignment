let secretNumber;
let rounds = 1;
let correctGuesses = 0;

function startGame() {
    secretNumber = Math.floor(Math.random() * 6) + 1;
    document.getElementById('round').innerText = 'Round ' + rounds;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);

    if (isNaN(guess) || guess < 1 || guess > 6) {
        document.getElementById('message').innerText = 'Please enter a valid number between 1 and 6.';
        return;
    }

    if (guess === secretNumber) {
        correctGuesses++;
        document.getElementById('message').innerText = 'Congratulations! You guessed it right!';
    } else if (guess < secretNumber) {
        document.getElementById('message').innerText = 'Too low! Try again.';
    } else {
        document.getElementById('message').innerText = 'Too high! Try again.';
    }

    rounds++;
    if (rounds <= 10) {
        document.getElementById('round').innerText = 'Round ' + rounds;
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('guess').setAttribute('disabled', 'disabled');
    document.getElementById('message').innerText = `Game Over! You guessed correctly ${correctGuesses} out of 10 rounds.`;
    if (correctGuesses >= 3) {
        document.getElementById('message').innerText += ' Congratulations! You win!';
    } else {
        document.getElementById('message').innerText += ' Sorry, you lose. Better luck next time!';
    }
}