const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer-text"));
const questionCounterText = document.getElementById("counter");
const restart = document.getElementById("restart");
const scoreText = document.getElementById("score");

let questionCounter;
let score;
const MAX_QUESTIONS = 13;

let acceptingAnswers;

function loadFromFile() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "js.json", false);

  xhr.send();

  xhr.unload = function () {
    if (this.status == 200) {
    } else {
      console.log("oops something wetn wrong");
    }
  };
  return xhr.response;
}

let questions = JSON.parse(loadFromFile());

startGame = () => {
  questionCounter = 0;
  score = 0;
  scoreText.innerText = `${score}`;
  acceptingAnswers = true;
  avaliableQuestions = getRandomQuestions(questions, MAX_QUESTIONS);
  getNewQuestion();
};

const getRandomQuestions = (arr, n) => {
  let len = arr.length;
  if (n > len) {
    throw new RangeError(
      "getRandomQuestions: more elements taken than avaliable"
    );
  }

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return (selected = shuffled.slice(0, n));
};

const getNewQuestion = () => {
  if (avaliableQuestions.length === 0 && score == 13) {
    acceptingAnswers = false;
    displayResults1();
    console.log("Secret");
    console.log(acceptingAnswers);
    return;
  } else if (avaliableQuestions.length === 0) {
    acceptingAnswers = false;
    displayResults();
    console.log(acceptingAnswers);
    return;
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  currentQuestion = avaliableQuestions[0];
  question.innerText = currentQuestion.question;

  answers.forEach((answer) => {
    answer.innerText = currentQuestion[answer.dataset["answer"]];
  });

  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      if (!acceptingAnswers) {
        return;
      }
      acceptingAnswers = false;
      const clickedAnswer = e.target;

      const answerLetter = clickedAnswer.dataset["answer"];

      let classToApply = "incorrect";

      if (answerLetter === currentQuestion.answer) {
        score++;
        scoreText.innerText = score;
        classToApply = "correct";
      }

      clickedAnswer.parentElement.classList.add(classToApply);

      if (avaliableQuestions.length == 0) {
        setTimeout(() => {
          console.log("No questions left");
          clickedAnswer.parentElement.classList.remove(classToApply);
          getNewQuestion();
          return;
        });
        return;
      }

      setTimeout(() => {
        console.log(avaliableQuestions.length);
        clickedAnswer.parentElement.classList.remove(classToApply);
        getNewQuestion();
        acceptingAnswers = true;
      }, 1000);
    });
  });

  avaliableQuestions.shift();
};

displayResults = () => {
  acceptingAnswers = false;
  const myModalEl = document.getElementById("myModal");
  const modal = new mdb.Modal(endGameModal);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `Punkty: ${score}/${MAX_QUESTIONS} <br> Sprobuj ponownie!`;
  modal.show();
};

displayResults1 = () => {
  acceptingAnswers = false;
  const myModalEl = document.getElementById("myModal");
  const modal = new mdb.Modal(finalModal);
  const modalBody = document.getElementById("final-body");
  modalBody.innerHTML = `000.000.000.000:12321 <br> 1.19.2`;
  modal.show();
};

restart.addEventListener("click", startGame);

startGame();
