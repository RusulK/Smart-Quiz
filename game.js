/* Constants and Variable*/
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull')
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
//loaded all Question
fetch('question.json').then( res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})

.catch( err =>{

});

//Pint per score and number of questions per game
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions =[...questions];
    getNewQuestion();

};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);


        // Take the user to the end page
        return window.location.assign('./end.html');
    }
//Update the Progress Bar
questionCounter++;
progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;




// Update Questions
const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerText = currentQuestion.question;

// Setup Choices
choices.forEach ( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
});

availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        

        // Applying css styling for correct and incorrect Answers
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        };
        selectedChoice.parentElement.classList.add(classToApply);
        

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);

        });
});
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;

}



