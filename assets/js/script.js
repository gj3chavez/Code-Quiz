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

let initialsSeciton = document.getElementById('initials-submit');
let allDone = document.getElementById('done');
let finalScore = document.getElementById('final-score');
let initialsEl = document.getElementById('your-initials');
let submitScore = document.getElementById('score');
let highScore = document.getElementById('theScores');
let listScores = document.getElementById('highScoreList');

let goBackButton = document.getElementById('go-back');
let clearHsButton = document.getElementById('clear-hs');
let finishButton = document.querySelector('#score');

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


startBtnEl.addEventListener('click', startQuiz)
answer1El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer2El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer3El.addEventListener('click', (e) => checkAnswer(e.target.value));
answer4El.addEventListener('click', (e) => checkAnswer(e.target.value));
finishButton.addEventListener('click', showScore);

function startQuiz(){
    introSection.style.display ='none';
    questionsSection.style.display ='block';
    questionCount = 0
    countdown();
    displayQuestion(questionCount);
}


let timeEl = document.getElementById('time');

let secondsLeft = 30;
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
    console.log('checkAnswer is being called...')
    feedbackEl.style.display = 'block';
    setTimeout(function(){
        feedbackEl.style.display = 'none';
    }, 1000);

    if (questions[questionCount].answer == userAnswer) {
        
            feedbackEl.textContent = "Correct!";
             theScore = theScore + 1;
    }
    else {
    secondsLeft = secondsLeft - 20;
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
        initialsSeciton.style.display ='block';
        finalScore.textContent = 'Your final score is :' + theScore;
        timeEl.style.display = 'none';
    };


    function score(){
        let scoreList = localStorage.getItem('ScoreList');
        if (scoreList !== null){
            cleanList = JSON.parse(scoreList);
            return cleanList;
        }else{
            cleanList = [];
        }
        return cleanList;
    };


    function showScore(){
        let initials = initialsEl.value;
        console.log('initials', initials)
        // scoreData.innerHTML = '';
        // scoreData.style.display = 'block';
        // let highScore = results();

        // let 
    }