let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*if(!score)
{
  score = {
  wins: 0,
  losses: 0,
  ties: 0
  }
};
*/

function pickComputerMove() {

  let computerMove = '';

  const randomNumber = Math.random();

  if(randomNumber >=0 && randomNumber < 1/3)
    computerMove = 'rock';
  else if(randomNumber >= 1/3 && randomNumber < 2/3)
    computerMove = 'paper';
  else if(randomNumber >= 2/3 && randomNumber < 1)
    computerMove = 'scissors';

  return computerMove;
}

let isAutoPlay = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlay) {
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    document.querySelector('.js-auto-play-button').classList.add("stop-playing-button");
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    document.querySelector('.js-auto-play-button').classList.remove("stop-playing-button");
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

function isResetScore() {
  document.querySelector('.js-reset-option').innerHTML = `
  <span class="reset-message">Are you sure you want to reset the score?</span>
  <button class="js-yes-button yes-button">Yes</button>
  <button class="js-no-button no-button">No</button>`;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    hideResetOption();
  });

  document.querySelector('.js-no-button').addEventListener('click', () => hideResetOption());
}

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  isResetScore();
});

function hideResetOption() {
  document.querySelector('.js-reset-option').innerHTML = '';
}

document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));

document.querySelector('.js-auto-play-button').addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'a') {
    autoPlay();
  }
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Backspace') {
    isResetScore();
  }
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {

  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors')
  {
    if(computerMove === 'rock')
      result = 'Lose.';
    else if(computerMove === 'paper')
      result = 'Win.';
    else if(computerMove === 'scissors')
      result = 'Tie.';
  }
  else if(playerMove === 'paper') {
    if(computerMove === 'rock')
      result = 'Win.';
    else if(computerMove === 'paper')
      result = 'Tie.';
    else if(computerMove === 'scissors')
      result = 'Lose.';
  }
  else if(playerMove === 'rock')
  {
    if(computerMove === 'rock')
      result = 'Tie.';
    else if(computerMove === 'paper')
      result = 'Lose.';
    else if(computerMove === 'scissors')
      result = 'Win.';
  }

  if(result === 'Win.')
    score.wins += 1;
  else if(result === 'Lose.')
    score.losses += 1;
  else if(result === 'Tie.')
    score.ties += 1;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}`;

  document.querySelector('.js-moves').innerHTML = `You
<img class="move-icon" src="images/${playerMove}-emoji.png">
<img class="move-icon" src="images/${computerMove}-emoji.png">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}