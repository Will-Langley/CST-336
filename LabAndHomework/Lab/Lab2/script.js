let answer = Math.floor((Math.random() * 99 +1))
let win = false;
let totalWins = 0;
let totalWinsText = document.querySelector("#totalWinsText");
let totalLose = 0;
let totalLoseText = document.querySelector("#totalLoseText");
resetButton.style.display = 'none';
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
    guessMessage.textContent = "Sorry, you lose! The number was " + answer;
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

    if (guessInput.value === "" || guessInput.value === null || +guessInput.value < 1 || +guessInput.value > 99) {
        showInvalid();
        return;
    }

    if (triesLeft <= 0 || guessMessage.textContent === winMessage) {
        console.log("Sorry, you lose!");
        showLose();
        triesLeft -= 1;
        numTries.textContent = triesLeft;
        prevGuess += guessInput.value + ", ";
        prevGuessText.textContent = prevGuess;
        guessButton.style.display = 'none';
        resetButton.style.display = 'block';
        totalLose++;
        totalLoseText.textContent = totalLose;
        return;
    }
    else if (+guessInput.value === answer) {
        console.log("You Win!");
        showWin();
        win = true;
        triesLeft -= 1;
        numTries.textContent = triesLeft;
        prevGuess += guessInput.value + ", ";
        prevGuessText.textContent = prevGuess;
        guessButton.style.display = 'none';
        resetButton.style.display = 'block';
        totalWins++;
        totalWinsText.textContent = totalWins;
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

resetButton.addEventListener('click', function() {
    answer = Math.floor((Math.random() * 99 +1))
    win = false;
    triesLeft = 7;
    prevGuess = "";
    document.getElementById("guessMessage").textContent = "Message goes here";
    document.getElementById("prevGuessText").textContent = 0;
    document.getElementById("numTries").textContent = 7;
    guessButton.style.display = 'block';
    resetButton.style.display = 'none';
});


let guessInput = document.querySelector("#guessInput");