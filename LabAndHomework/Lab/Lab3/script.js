console.log("hi")

document.querySelector("button").addEventListener("click", gradeQuiz);
let totalScore = 0;


//<label></label>
//<input name="q1" type="radio" value="dropdown"> Dropdown


function gradeQuiz(){
    gradeq1();
    gradeq2();
    gradeq3();
    gradeq4();
    gradeq5();

    console.log("hi")
    alert("Your score is: " + totalScore + "/100");
}

function gradeq1(){
    let q1Answer = document.querySelector('input[name="q1"]').value
    if (q1Answer == "Dropdown")
        totalScore+= 20;
}

function gradeq2(){
    let q2Answer = document.querySelector('input[name="q2"]').value
    if (q2Answer == "Dropdown")
        totalScore+= 20;
}

function gradeq3(){
    let q3Answer = document.querySelector("#q3").value
    if (q3Answer == "Dropdown")
        totalScore+= 20;
}

function gradeq4(){
    let q4Answer = document.querySelector('input[name="q4"]').value
    if (q4Answer == 3)
        totalScore+= 20;
}

function gradeq5(){
    const q5Answers = document.querySelectorAll('input[name="q5"]')
    const checkbox2 = q5Answers[1]
    const checkbox3 = q5Answers[2]
    if (checkbox2.checked && checkbox3.checked)
        totalScore+= 20;
}