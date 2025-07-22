const board = document.getElementById('game-board');
const fruits = ['🍎', '🍌', '🍇', '🍊', '🍎', '🍌', '🍇', '🍊'];
let cards = [];
let flipped = [];
let matched = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  cards = shuffle([...fruits]);
  board.innerHTML = '';
  cards.forEach((fruit, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  const index = this.dataset.index;
  if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
    this.textContent = cards[index];
    flipped.push(index);

    if (flipped.length === 2) {
      setTimeout(checkMatch, 700);
    }
  }
}

function checkMatch() {
  const [first, second] = flipped;
  const firstCard = document.querySelector(`.card[data-index="${first}"]`);
  const secondCard = document.querySelector(`.card[data-index="${second}"]`);

  if (cards[first] === cards[second]) {
    matched.push(first, second);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
  } else {
    firstCard.textContent = '?';
    secondCard.textContent = '?';
  }
  flipped = [];

  if (matched.length === cards.length) {
    setTimeout(() => alert("YOU WINNER 🎉"), 300);
  }
}

createBoard();