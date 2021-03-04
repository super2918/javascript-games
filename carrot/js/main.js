'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import Sound from './sound.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// const carrotSound = new Audio('./sound/carrot_pull.mp3'); 
// const alertSound = new Audio('./sound/alert.wav'); 
// const bgSound = new Audio('./sound/bg.mp3'); 
// const bugSound = new Audio('./sound/bug_pull.mp3'); 
// const winSound = new Audio('./sound/game_win.mp3'); 

let started = false;
let score = 0;
let timer = undefined;

const gameFinshBanner = new PopUp;
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
const gameSound = new Sound();

gameFinshBanner.setClickListener(() => {
  startGame();
});

gameField.setClickListener(onItemClick);

gameButton.addEventListener('click', () => {
  if( started ) { 
    stopGame();
  } else { 
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinshBanner.showWithText('REPLAY');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();

  if(win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }

  stopGameTimer();
  stopSound(bgSound);
  gameFinshBanner.showWithText(win ? 'YOU WON 🎉' :'YOU LOST 😫');
}

function showStopButton() {
  const icon = gameButton.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameButton.style.visibility = 'visible';
}

function hideGameButton() {
  gameButton.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return
    } 
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(timer) {
  console.log(timer);
  const minutes = Math.floor(timer/ 60);
  const seconds = timer % 60;

  gameTimer.textContent = `${minutes} : ${seconds}`;
}

function initGame() {
  score = 0;
  gameScore.textContent = CARROT_COUNT;
  gameField.init();
}

function onItemClick(item) {
  console.log(item)
  if(!started) { // 게임이 시작하지 않았을 경우 리턴 
    return;
  }

  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    playSound(carrotSound);
    
    if (score === CARROT_COUNT) {
      // socre 와 carrot의 숫자가 같을 경우도 게임이 끝나는
      finishGame(true);
    }

  } else if (item === 'bug') {
    // bug일 경우
    finishGame(false);
  }
}


function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
}
