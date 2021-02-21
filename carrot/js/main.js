'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefreshButton = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3'); 
const alertSound = new Audio('./sound/alert.wav'); 
const bgSound = new Audio('./sound/bg.mp3'); 
const bugSound = new Audio('./sound/bug_pull.mp3'); 
const winSound = new Audio('./sound/game_win.mp3'); 

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);
gameButton.addEventListener('click', () => {
  if(started) { // 게임이 시작되었다면 중지
    stopGame();
  } else { // 게임이 시작하지 않았다면 시작
    startGame();
  }
});

popUpRefreshButton.addEventListener('click', () => {
  startGame();
  hidePopUp();
})

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
  showPopupWithText('REPLAY');
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
    stopSound(bgSound);
  }

  stopGameTimer();
  showPopupWithText(win ? 'YOU WON 🎉' :'YOU LOST 😫');
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

function showPopupWithText(text) {
  popUpText.textContent = text;
  popUp.classList.add('pop-up--show');
}

function hidePopUp() {
  popUp.classList.remove('pop-up--show');
}

function initGame() {
  // reset
  field.innerHTML = '';
  // score
  gameScore.textContent = CARROT_COUNT;

  addItem('carrot', CARROT_COUNT, './img/carrot.png');
  addItem('bug', BUG_COUNT, './img/bug.png');
}

function onFieldClick(event) {

  if(!started) { // 게임이 시작하지 않았을 경우 리턴 
    return;
  }

  const target = event.target; 

  if (target.matches('.carrot')) {
    // carrot 일경우
    target.remove();
    score++;
    updateScoreBoard();
    playSound(carrotSound);
    
    if (score === CARROT_COUNT) {
      // socre 와 carrot의 숫자가 같을 경우도 게임이 끝나는
      finishGame(true);
    }

  } else if (target.matches('.bug')) {
    // bug일 경우
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTiem = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for( let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);

    item.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    console.log(x, y);

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
