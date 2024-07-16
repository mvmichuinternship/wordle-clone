const WORD_LIST = ["apple", "grape", "peach", "mango", "lemon"];
const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const MAX_ATTEMPTS = 6;
let attempts = 0;

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const guessInput = document.getElementById("guess-input");
    const submitGuessButton = document.getElementById("submit-guess");
    const message = document.getElementById("message");

    // Create the empty grid
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            gameBoard.appendChild(cell);
        }
    }

    submitGuessButton.addEventListener("click", () => {
        const guess = guessInput.value.toLowerCase();

        if (guess.length !== 5 || !WORD_LIST.includes(guess)) {
            message.textContent = "Please enter a valid 5-letter word.";
            return;
        }

        if (attempts >= MAX_ATTEMPTS) {
            message.textContent = "You've used all attempts!";
            return;
        }

        displayGuess(guess);
        evaluateGuess(guess);

        attempts++;
        guessInput.value = "";

        if (guess === TARGET_WORD) {
            message.textContent = "Congratulations! You've guessed the word!";
            submitGuessButton.disabled = true;
        } else if (attempts === MAX_ATTEMPTS) {
            message.textContent = `Game over! The word was: ${TARGET_WORD}`;
            submitGuessButton.disabled = true;
        }
    });

    function displayGuess(guess) {
        const cells = gameBoard.getElementsByClassName("cell");
        const startIdx = attempts * 5;

        for (let i = 0; i < 5; i++) {
            cells[startIdx + i].textContent = guess[i];
        }
    }

    function evaluateGuess(guess) {
        const cells = gameBoard.getElementsByClassName("cell");
        const startIdx = attempts * 5;

        for (let i = 0; i < 5; i++) {
            const cell = cells[startIdx + i];
            const letter = guess[i];
            if (TARGET_WORD[i] === letter) {
                cell.classList.add("correct");
            } else if (TARGET_WORD.includes(letter)) {
                cell.classList.add("present");
            } else {
                cell.classList.add("absent");
            }
        }
    }
});
