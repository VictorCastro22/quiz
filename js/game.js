const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
      question: "Qual é o nome de nascimento de Santo Antônio?",
      choice1: "Fernando de Bulhões",
      choice2: "Manuel de Andrade",
      choice3: "João de Sousa",
      choice4: "Rafael dos Santos",
      answer: 1
  },
  {
      question: "Santo Antônio é conhecido como o santo das ________.",
      choice1: "Flores",
      choice2: "Crianças",
      choice3: "Escolas",
      choice4: "Causas impossíveis",
      answer: 4
  },
  {
      question: "Qual era a nacionalidade de Santo Antônio?",
      choice1: "Portuguesa",
      choice2: "Espanhola",
      choice3: "Italiana",
      choice4: "Brasileira",
      answer: 1
  },
  {
      question: "Santo Antônio era membro de qual ordem religiosa?",
      choice1: "Franciscanos",
      choice2: "Jesuítas",
      choice3: "Dominicanos",
      choice4: "Agostinianos",
      answer: 1
  },
  {
      question: "Quem canonizou Santo Antônio?",
      choice1: "Papa Inocêncio III",
      choice2: "Papa Gregório IX",
      choice3: "Papa Urbano II",
      choice4: "Papa Leão X",
      answer: 2
  },
  {
      question: "Qual foi o nome que Santo Antônio escolheu ao entrar para a Ordem Franciscana?",
      choice1: "Antônio de Lisboa",
      choice2: "Antônio de Pádua",
      choice3: "Antônio de Santarém",
      choice4: "Antônio de Coimbra",
      answer: 2
  },
  {
      question: "Qual é o símbolo comumente associado a Santo Antônio?",
      choice1: "Flores",
      choice2: "Cruz",
      choice3: "Pão",
      choice4: "Livro",
      answer: 3
  },
  {
    question: "Qual data comemorativa antecede o dia de Santo Antônio no Brasil?",
    choice1: "Dia das Mães",
    choice2: "Dia dos Namorados",
    choice3: "Dia dos Pais",
    choice4: "Dia das Crianças",
    answer: 2
  },
  {
    question: "Por que Santo Antônio é chamado de 'Martelo dos Hereges'?",
    choice1: "Porque ele era conhecido por sua habilidade em forjar ferramentas",
    choice2: "Porque ele era um ferrenho defensor das causas sociais",
    choice3: "Porque ele era um pregador fervoroso que combatia e refutava heresias",
    choice4: "Porque ele era famoso por suas habilidades em carpintaria",
    answer: 3
  },
  {
    question: "Por que Santo Antônio é chamado de 'Santo Casamenteiro'?",
    choice1: "Por realizar casamentos durante sua vida",
    choice2: "Por ser padroeiro dos casais recém-casados",
    choice3: "Por ser buscado para encontrar parceiros ou abençoar o matrimônio",
    choice4: "Por realizar cerimônias de casamento milagrosas",
    answer: 3
  },
  {
    question: "Quantos anos tinha Santo Antônio quando faleceu?",
    choice1: "28 anos",
    choice2: "36 anos",
    choice3: "42 anos",
    choice4: "53 anos",
    answer: 2
  },
  {
    question: "Quanto tempo passou desde a morte de Santo Antônio até sua canonização?",
    choice1: "6 meses",
    choice2: "1 ano",
    choice3: "5 anos",
    choice4: "10 anos",
    answer: 2
  }  
];

  
  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('../html/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerHTML = currentQuestion['choice' + (index + 1)];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
