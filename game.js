const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
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

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions =[...questions];
    console.log(availableQuestions);
    getNewQuestion();

};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('./end.html');
    }
questionCounter++;
questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerText = currentQuestion.question;

choices.forEach ( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
})
availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;

};
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct' ;
        };
        selectedChoice.parentElement.classlist.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classlist.remove(classToApply);
            getNewQuestion();

        }, 1000);

        });
});

startGame();

