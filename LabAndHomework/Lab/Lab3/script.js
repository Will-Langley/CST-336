document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);
let totalScore = 0;
let attempts = Number(localStorage.getItem("total_attempts")) || 0;


displayQ1Choices();
displayAttempts();

function displayQ1Choices() {
    let q1Choices = ["select", "dropdown", "option", "menu"];
    q1Choices = shuffle(q1Choices);

    let container = document.querySelector("#q1Choices");
    for (let choice of q1Choices) {
        let label = document.createElement("label");
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "q1";
        radio.value = choice;
        label.appendChild(radio);
        label.append(" " + choice.charAt(0).toUpperCase() + choice.slice(1));
        container.appendChild(label);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayAttempts() {
    document.querySelector("#totalAttempts").textContent =
        "Total times quiz taken: " + attempts;
}


function gradeQuiz(){
    totalScore = 0;
    gradeq1();
    gradeq2();
    gradeq3();
    gradeq4();
    gradeq5();

    document.querySelector("#totalScore").textContent = "Total Score: " + totalScore + "/100";

    let congrats = document.querySelector("#congrats");
    if (totalScore > 80) {
        congrats.textContent = "Congratulations! You did great!";
    } else {
        congrats.textContent = "";
    }

    attempts++;
    localStorage.setItem("total_attempts", attempts);
    displayAttempts();
}

function rightAnswer(questionNum) {
    let feedback = document.querySelector("#q" + questionNum + "Feedback");
    feedback.innerHTML = "<img src='images/checkmark.png' alt = 'checkmark'> Correct!";
    feedback.className = "feedback correct";
    totalScore += 20;
}

function wrongAnswer(questionNum) {
    let feedback = document.querySelector("#q" + questionNum + "Feedback");
    feedback.innerHTML = "<img src='images/xmark.png' alt = 'xmark'> Incorrect!";
    feedback.className = "feedback incorrect";
}


function gradeq1(){
    let q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer != null && q1Answer.value == "select") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }
}

function gradeq2(){
    let q2Answer = document.querySelector("#q2").value.trim().toLowerCase();
    if (q2Answer == "color") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }
}

function gradeq3(){
    let q3Answer = document.querySelector("#q3").value;
    if (q3Answer == "a") {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }
}

function gradeq4(){
    let q4Answer = document.querySelector("#q4").value;
    if (q4Answer == 6) {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }
}

function gradeq5(){
    let select = document.querySelector("#q5Select").checked;
    let dropdown = document.querySelector("#q5Dropdown").checked;
    let radio = document.querySelector("#q5Radio").checked;
    let menu = document.querySelector("#q5Menu").checked;
    if (select && radio && !dropdown && !menu) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }
}