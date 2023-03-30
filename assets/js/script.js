let introQuiz = document.getElementById('quiz');
let startBtnEl = document.getElementById('startBtn');
let introSection = document.querySelector('#introSection');
let questionsSection = document.getElementById('theQuestions');

let quizSection = document.querySelector('#displayQuestions');
let allButtons = document.querySelectorAll('.options');

let answer1El = document.getElementById('btnAnswer1');
let answer2El = document.getElementById('btnAnswer2');
let answer3El = document.getElementById('btnAnswer3');
let answer4El = document.getElementById('btnAnswer4');

let feedbackEl = document.getElementById('feedback');

let initialsSection = document.getElementById('initials-submit');
let allDone = document.getElementById('done');
let finalScore = document.getElementById('final-score');
let initialsEl = document.getElementById('your-initials');
let submitScore = document.getElementById('score');
let highscores = document.getElementById('highscores');
let listScores = document.getElementById('highScoreList');

let goBackButton = document.getElementById('go-back');
let clearHsButton = document.getElementById('clear-hs');
let finishButton = document.querySelector('#score');
let scoresSection = document.getElementById('scoresSection');
let score = 0
// test
let questions = [
    {
        question: "Commonly used data types DO NOT Include:",
        options: ["booleans", "strings", "numbers", "alerts"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within____.",
        options: ["quotes", "curly brackets", "parenthesis", "square backets"],
        correctAnswer: "curly brackets"

    },
    {
        question: "Arrays in JavaScript can be used to store:",
        options: ["booleans", "numbers and strings", "other arrays", "all of the avobe"],
        correctAnswer: "all of the avobe"
    },
    {
        question: "String values must be enclosed within_____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
]


questionsSection.style.display = 'none';
startBtnEl.addEventListener('click', startQuiz)
answer1El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer2El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer3El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer4El.addEventListener('click', (e) => checkAnswer(e.target.value));
finishButton.addEventListener('click', showScore);
highscores.addEventListener('click', displayScores);
clearHsButton.addEventListener('click', () => {
    localStorage.removeItem('scoreList');
    listScores.innerHTML = '';
});
goBackButton.addEventListener('click', () => location.reload());

function startQuiz(){
    introSection.style.display ='none';
    questionsSection.style.display ='block';
    questionCount = 0
    countdown();
    displayQuestion(questionCount);
}


let timeEl = document.getElementById('time');

let secondsLeft = 40;
let questionCount = 0;
let currentQuestion = 1;
let theScore = 0

function countdown(){
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "" + secondsLeft + "s";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            allDone.textContent = "All Done!"
          
            endQuiz();
        
        } 
        else if(currentQuestion === questions.length){
            
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}


function displayQuestion (){
    quizSection.textContent = questions[questionCount].question;

    answer1El.textContent = questions[questionCount].options[0];
    answer2El.textContent = questions[questionCount].options[1];
    answer3El.textContent = questions[questionCount].options[2];
    answer4El.textContent = questions[questionCount].options[3];

    answer1El.value = questions[questionCount].options[0];
    answer2El.value = questions[questionCount].options[1];
    answer3El.value = questions[questionCount].options[2];
    answer4El.value = questions[questionCount].options[3];
}


function checkAnswer(userAnswer){
    feedbackEl.style.display = 'block';
    setTimeout(function(){
        feedbackEl.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer == userAnswer) {
        
            feedbackEl.textContent = "Correct!";
             score = score + 1;
    }
    else {
    secondsLeft = secondsLeft - 10;
        feedbackEl.textContent = "Wrong!";
    
    }

    questionCount++;
    if(questionCount < questions.length){
        displayQuestion();
    }else{
    endQuiz();
    
    }
}


    function endQuiz(){
        questionsSection.style.display ='none';
        initialsSection.style.display ='block';
        finalScore.textContent = 'Your final score is :' + score;
        timeEl.style.display = 'none';
    };


    function addScore(initials){
        let scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];
       scoreList.push({
        score,
        initials
       })
       localStorage.setItem('scoreList', JSON.stringify(scoreList))
    };


    function showScore(){
        let initials = initialsEl.value;
        addScore(initials)
    }

function displayScores() {
    initialsSection.style.display = 'none';
    scoresSection.style.display = 'block';

    let scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];

    scoreList.forEach(record => {
        let li = document.createElement('li');
        li.innerHTML = `${record.initials}: ${record.score}`;
        listScores.appendChild(li);
    })
}