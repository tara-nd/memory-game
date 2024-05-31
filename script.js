// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const currentScoreElement = document.getElementById('current-score');
    const highScoreElement = document.getElementById('high-score');
    const restartButton = document.getElementById('restart-button');
    const gameOverMessage = document.getElementById('game-over-message');
    const finalScoreElement = document.getElementById('final-score');
    const playAgainButton = document.getElementById('play-again-button');

    let cards = [];
    let flippedCards = [];
    let currentScore = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let matches = 0;

    highScoreElement.textContent = highScore;

    function initializeGame() {
        cards = [];
        matches = 0;
        for (let i = 1; i <= 8; i++) {
            cards.push(i, i);
        }
        cards.sort(() => 0.5 - Math.random());

        gameBoard.innerHTML = '';
        cards.forEach((number) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.number = number;
            card.addEventListener('click', onCardClick);
            gameBoard.appendChild(card);
        });

        currentScore = 0;
        currentScoreElement.textContent = currentScore;
        gameOverMessage.classList.add('hidden');
    }

    function onCardClick(event) {
        const card = event.target;
        if (card.classList.contains('flipped') || flippedCards.length === 2) {
            return;
        }

        card.classList.add('flipped');
        card.textContent = card.dataset.number;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.number === card2.dataset.number) {
            flippedCards = [];
            currentScore += 1;
            matches += 1;
            currentScoreElement.textContent = currentScore;

            if (currentScore > highScore) {
                highScore = currentScore;
                highScoreElement.textContent = highScore;
                localStorage.setItem('highScore', highScore);
            }

            if (matches === 8) {
                gameOver();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }

    function gameOver() {
        gameOverMessage.classList.remove('hidden');
        finalScoreElement.textContent = currentScore;
    }

    restartButton.addEventListener('click', initializeGame);
    playAgainButton.addEventListener('click', initializeGame);

    initializeGame();
});
