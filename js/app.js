
/*-------------------------------- Constants --------------------------------*/
const cards = document.querySelectorAll('.pic-card');
const board = document.querySelectorAll('.game-board');
const correctElement = document.querySelector('#correct');
const wrongElement = document.querySelector('#wrong');
const displayElement = document.querySelector('#display');


/*---------------------------- Variables (state) ----------------------------*/
let isRevealedCard = false;
let firstChoice;
let secondChoice;
let lockChoices = false;
let correctChoices = 0;
let wrongChoices = 0;
const maxWrongChoices = 6;
const allCorrectChoices = 6;

/*------------------------ Cached Element References ------------------------*/
const startMemory = document.querySelector('#startGame');
const resetBtnElm = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

function flipCard() {
    if(lockChoices) return;
    if(this === firstChoice) return;
this.classList.toggle('flip');
    if (!isRevealedCard) {
         isRevealedCard = true;
         firstChoice = this;
       } else {
        isRevealedCard = false;
        secondChoice = this;
       checkForMatch();
}}

function checkForMatch() {
    if (firstChoice.dataset.utility === secondChoice.dataset.utility) {
        correctChoices++;
        correctElement.textContent = `Correct Choices: ${correctChoices}`;
    if (correctChoices >= allCorrectChoices) {
            winGame("You Won!");
        }
        firstChoice.removeEventListener('click', flipCard);
        secondChoice.removeEventListener('click', flipCard);
        resetBoard();
    } else {
        wrongChoices++;
        wrongElement.textContent = `Wrong Choices: ${wrongChoices}`;
        if (wrongChoices >= maxWrongChoices) {
            gameOver();
        } else {
        lockChoices = true;
        setTimeout(() => {
            firstChoice.classList.remove('flip');
            secondChoice.classList.remove('flip');
            resetBoard();
        }, 1100);
    }}}

function resetBoard() {
    isRevealedCard = lockChoices = false;
    firstChoice = secondChoice = null
  }

function shuffleCards() {
cards.forEach(card => {
    const randomPic = Math.floor(Math.random() * cards.length); 
    card.style.order = randomPic;
});
}

function startGame() {
    shuffleCards();
    cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard)
    });
    correctChoices = 0; 
    wrongChoices = 0;
    correctElement.textContent = `Correct Choices: ${correctChoices}`;
    wrongElement.textContent = `Wrong Choices: ${wrongChoices}`;
    displayElement.textContent = "Memory Progress...";
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    isRevealedCard = false;
    lockChoices = false;
    firstChoice = '';
    secondChoice = '';
    shuffleCards();
    correctChoices = 0;
    wrongChoices = 0;
    correctElement.textContent = `Correct Choices: ${correctChoices}`;
    wrongElement.textContent = `Wrong Choices: ${wrongChoices}`;
    displayElement.textContent = "Memory in Progress...";
}

function gameOver() {
    cards.forEach(card => {
        card.removeEventListener('click', flipCard);
    });
    displayElement.textContent = "Game Over! Back to Incarnation";
}

function winGame() {
    cards.forEach(card => {
        card.removeEventListener('click', flipCard);
    });
    displayElement.textContent = "You Won! Ready to Asscend.!";
}


/*----------------------------- Event Listeners -----------------------------*/

cards.forEach((card) => {card.addEventListener('click', flipCard)});
startMemory.addEventListener('click', startGame);
resetBtnElm.addEventListener('click', resetGame);

resetGame();
