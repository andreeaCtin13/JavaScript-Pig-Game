'use strict';
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const ply1 = document.querySelector('.player--0');
const ply2 = document.querySelector('.player--1');

let doPlay = 1;
const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden');

function switchPlayer() {
  ply1.classList.toggle('player--active');
  ply2.classList.toggle('player--active');
  //toggle - daca clasa e acolo imi scoate clasa, daca nu i acolo o adauga

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //retine ca e misto faza asta lol

  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;
}

const displayDiceRoll = function () {
  if (doPlay) {
    let randomDice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    let srcNou = 'dice-' + String(randomDice) + '.png';
    dice.src = srcNou;
    dice.classList.remove('hidden');
    if (randomDice != 1) {
      //add the dice to the current score
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      score[activePlayer] = currentScore;
      console.log(score1);
      switchPlayer();
    }
  } else {
    console.log('ho bre');
  }
};

const init = function () {
  ply1.classList.add('player--active');
  ply1.classList.remove('player--winner');
  ply2.classList.remove('player--active');
  ply2.classList.remove('player--winner');

  score1.textContent = 0;
  score2.textContent = 0;
  currentScore = 0;
  score[0] = score[1] = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  activePlayer = 1;
  doPlay = 1;
  dice.classList.add('hidden');
};

btnRoll.addEventListener('click', displayDiceRoll);
btnHold.addEventListener('click', function () {
  if (doPlay) {
    //1. add current score to the score of the active playes's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    console.log(score[activePlayer]);

    //2. check if player's score is >= 100
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      doPlay = 0;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
