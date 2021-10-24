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

let questions =[
    {
        question: "In which country is the Taj Mahal?",
        choice1:"India",
        choice2:"United Kingdom",
        choice3:"Morocco",
        answer: 1
    },
    {
        question: "How many sides does a hexagon have?",
        choice1:"2",
        choice2:"5",
        choice3:"6",
        answer: 3
    },
    {
        question: "What is the highest mountain in Great Britian?",
        choice1:"Snowdon",
        choice2:"Ben Nevis",
        choice3:"Sca Fell",
        answer: 2
    },
    {
        question: "What is the name of the organ that pumps blood around the body?",
        choice1:"Heart",
        choice2:"Brain",
        choice3:"Liver",
        answer: 1
    },
    {
        question: "How many hours are there in two days?",
        choice1:"24h",
        choice2:"48h",
        choice3:"72h",
        answer: 2
    },
    {
        question: "What kind of food is pawpaw?",
        choice1:"Fruit",
        choice2:"Meat",
        choice3:"Vegetable",
        answer: 1
    },
    {
        question: "What colour are sapphires?",
        choice1:"Red",
        choice2:"White",
        choice3:"Blue",
        answer: 3
    },
    {
        question: "What are the two longest rivers in the world?",
        choice1:"The Nile and The Thames",
        choice2:"Amazon and Niger",
        choice3:"The Nile and Amazon",
        answer: 3
    },
    {
        question: "How many days are there in June?",
        choice1:"31 days",
        choice2:"30 days",
        choice3:"28 days",
        answer: 2
    },
    {
        question: "What is the female swan called?",
        choice1:"Lilli",
        choice2:"Julia",
        choice3:"Pen",
        answer: 3
    },


];

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

startGame();

