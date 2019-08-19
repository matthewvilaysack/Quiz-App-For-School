/* eslint-disable node/no-unsupported-features/es-syntax */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { loadAnimation, finalScoreAnimation } from './animations'

const start = document.querySelector('.start');
const quiz = document.querySelector('.quiz');
const question = document.querySelector('.question');
const qImg = document.querySelector('.q-img');
const counter = document.querySelector('.counter');
const timeGuage = document.querySelector('.time-guage');
const progress = document.querySelector('.progress');
const scoreDiv = document.querySelector('.score-container');

//choices
const choiceA = document.getElementById('a');
const choiceB = document.getElementById('b');
const choiceC = document.getElementById('c');

const questions = [
    {
        question: 'What street is park center located at?',
        image: 'images/logo.png',
        choiceA: '7300 Brooklyn Blvd',
        choiceB: '3000 Swindale Drive',
        choiceC: '7685 W Broadway Ave',
        correct: 'a'
    },
    {
        question: 'How many classes are there on block days?',
        image: 'images/blocks.jpg',
        choiceA: '4',
        choiceB: '5',
        choiceC: '6',
        correct: 'b'
    },
    {
        question: 'What two physical education classes are required to graduate?',
        image: 'images/health.png',
        choiceA: 'Outdoor adventures and Rollerblading',
        choiceB: 'Competitive Sports and Strength and Conditioning',
        choiceC: 'Life Fitness and Health',
        correct: 'c'
    }

]




// Declare globals
let currentQuestion = 0
let lastQuestion = questions.length - 1
let count = 0
let questionTime = 10
let timer
let score = 0
let guageWidth = 150
let guageUnit = (guageWidth / questionTime)

start.addEventListener('click', startQuiz)

function startQuiz() {
    loadAnimation()
    this.style.display = 'none'
    quiz.style.display = 'block'
    renderQuestion()
    renderCounter()
    timer = setInterval(renderCounter, 1000)
    renderProgress()

}
//Render a question
function renderQuestion() {
    let q = questions[currentQuestion]
    question.innerHTML = `<p>${q.question}</p>`
    qImg.innerHTML = `<img src=${q.image}>`
    choiceA.innerHTML = q.choiceA
    choiceB.innerHTML = q.choiceB
    choiceC.innerHTML = q.choiceC
}


//Render the green counter that matches the time left
function renderCounter() {
    if (count <= questionTime) {
        timeGuage.style.background = 'green'
        timeGuage.style.width = count * guageUnit + 'px'
        counter.innerHTML = count
        count++
    } else {
        incorrect()
        nextQuestion()
    }


}

//update progress bar
function renderProgress() {
    progress.style.display = 'inline'
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += `<div class='prog' id='${qIndex}'> </div>`
    }
}

//Check the answer
function checkAnswer(e) {
    const choice = e.target.id

    if (choice === questions[currentQuestion].correct) {
        score++
        correct()
    } else
        //Incorrect answer
        incorrect()
    nextQuestion()
}

function nextQuestion() {
    count = 0
    if (currentQuestion < lastQuestion) {
        currentQuestion++
        renderQuestion()
    } else {
        clearInterval(timer)
        renderScore()
    }
}
function correct() {
    document.getElementById(currentQuestion).style.backgroundColor = 'green'
}
function incorrect() {
    document.getElementById(currentQuestion).style.backgroundColor = 'red'

}

//render the score
function renderScore() {
    //unhide the score container
    scoreDiv.style.display = 'block'
    finalScoreAnimation()
    const scorePercent = Math.round(score / questions.length * 100)

    let img = (scorePercent >= 80) ? 'images/5.png' :
        (scorePercent >= 60) ? 'images/4.png' : (scorePercent >= 40) ? 'images/3.png' :
            (scorePercent >= 20) ? 'images/2.png' : 'images/1.png'

    scoreDiv.innerHTML = `<img src="${img}">`
    scoreDiv.innerHTML += `<p>${scorePercent}%!`
}


//Event listeners
choiceA.addEventListener('click', (e) => checkAnswer(e))
choiceB.addEventListener('click', (e) => checkAnswer(e))
choiceC.addEventListener('click', (e) => checkAnswer(e))
