// Card values
const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

// Game state
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

// DOM elements
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const newGameButton = document.getElementById('new-game-button');
const gameMessage = document.getElementById('game-message');
const playerCards = document.getElementById('player-cards');
const dealerCards = document.getElementById('dealer-cards');
const playerScore = document.getElementById('player-score');
const dealerScore = document.getElementById('dealer-score');

// Event listeners
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
newGameButton.addEventListener('click', newGame);

// Initialize the game
newGame();

function newGame() {
    // Reset game state
    deck = createDeck();
    playerHand = [];
    dealerHand = [];
    gameOver = false;

    // Deal initial cards
    playerHand.push(drawCard(), drawCard());
    dealerHand.push(drawCard(), drawCard());

    // Update UI
    updateUI();
    enableButtons();
    gameMessage.textContent = '';
}

function hit() {
    playerHand.push(drawCard());
    if (calculateScore(playerHand) > 21) {
        endGame('You busted! Dealer wins.');
    }
    updateUI();
}

function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }
    
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    if (dealerScore > 21) {
        endGame('Dealer busted! You win!');
    } else if (playerScore > dealerScore) {
        endGame('You win!');
    } else if (playerScore < dealerScore) {
        endGame('Dealer wins!');
    } else {
        endGame('It\'s a tie!');
    }
}

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }

    return shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawCard() {
    return deck.pop();
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (const card of hand) {
        score += cardValues[card.value];
        if (card.value === 'A') {
            aceCount++;
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

function updateUI() {
    playerCards.innerHTML = renderHand(playerHand);
    dealerCards.innerHTML = renderHand(dealerHand, true);
    playerScore.textContent = calculateScore(playerHand);
    dealerScore.textContent = gameOver ? calculateScore(dealerHand) : '?';
}

function renderHand(hand, hideFirst = false) {
    return hand.map((card, index) => {
        if (hideFirst && index === 0) {
            return '<div class="card back"></div>';
        }
        return `<div class="card ${card.suit}">${card.value}${card.suit}</div>`;
    }).join('');
}

function endGame(message) {
    gameOver = true;
    gameMessage.textContent = message;
    disableButtons();
    updateUI();
}

function enableButtons() {
    hitButton.disabled = false;
    standButton.disabled = false;
}

function disableButtons() {
    hitButton.disabled = true;
    standButton.disabled = true;
}
