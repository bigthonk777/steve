const question = document.getElementById('question');
const choice = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json").then(res => {
   return res.json();
})
.then( loadedQuestions => {
  questions = loadedQuestions;
  startGame();

});

  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     getNewQuestion();
     
};
getNewQuestion = () => {
   
  if (questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
      //Go to the end
    location.replace(window.location.href = "end.html");
    
  };
   
   
    questionCounter++;
    questionCounterText.innerText = `${questionCounter} /${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
       currentQuestion = availableQuestions[questionIndex];
       question.innerText = currentQuestion.question;

     choice.forEach(choice => {
         const number = choice.dataset['number'];
         choice.innerText = currentQuestion['choice'  + number];
         
});
availableQuestions.splice(questionIndex, 1)

acceptingAnswers = true;
};
choice.forEach(choice =>{
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAwswer = selectedChoice.dataset['number'];
       
       
     
      
       const classToApply = 
       selectedAwswer == currentQuestion.answer ? 'correct' : 'incorrect';

       if(classToApply == 'correct') {
         incrementScore(CORRECT_BONUS)
       }
       
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

 