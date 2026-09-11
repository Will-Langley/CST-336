let answer = 48;
let guesses;
let triesLeft = 7;
let numTries = document.querySelector("#numTries");
const winMessage = "Congratulations you guessed it";
let guessMessage = document.querySelector("#guessMessage");
let guessButton = document.querySelector("#guessButton");
let prevGuess = "";
let prevGuessText = document.querySelector("#prevGuessText");

function showWin() {
    guessMessage.textContent = winMessage;
    guessMessage.style.color = "green";
}

function showLose() {
    guessMessage.textContent = "Sorry, you lose!";
    guessMessage.style.color = "red";
}

function showInvalid() {
    guessMessage.textContent = "Input a number between 1 and 100";
    guessMessage.style.color = "red";
}

function showHigh() {
    guessMessage.textContent = "Your guess is too high!";
    guessMessage.style.color = "orange";
}

function showLow() {
    guessMessage.textContent = "Your guess is too low!";
    guessMessage.style.color = "orange";
}


guessButton.addEventListener('click', function () {
    guessMessage.style.color = "red";
    console.log(triesLeft);

    if (guessInput.value === "" || guessInput.value === null || +guessInput.value < 1 || +guessInput.value > 100) {
        showInvalid();
        return;
    }

    if (triesLeft <= 0 || guessMessage.textContent === winMessage) {
        console.log("Sorry, you lose!");
        showLose();
        return;
    }
    else if (+guessInput.value === answer) {
        console.log("You Win!");
        showWin();
        return;
    } else if (+guessInput.value > answer) {
        console.log("Your guess is too high!");
        showHigh();
    } else if (+guessInput.value < answer) {
        console.log("Your guess is too low!");
        showLow();
    }

    triesLeft -= 1;
    numTries.textContent = triesLeft;
    prevGuess += guessInput.value + ", ";
    prevGuessText.textContent = prevGuess;

});


let guessInput = document.querySelector("#guessInput");