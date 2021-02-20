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

let started = false;
let socre = 0;
let timer = undefined;

gameButton.addEventListener('click', () => {
  if(started) { // 게임이 시작되었다면 중지
    stopGame();
  } else { // 게임이 시작하지 않았다면 시작
    startGame();
  }
  started = !started; 
  /*
  게임이 진행중이라면(started 는 true로), 게임을 중지하는 함수를 호출하고,
  started의 반대값인 false를 started에 할당해 줘서, 다음에 버튼이 클릭 된다면 started는 false가 되므로 시작하는 함수를 호출한다.
  */
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}
function stopGame() {}

function showStopButton() {
  const icon = gameButton.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
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
      return
    } 
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(timer) {
  console.log(timer);
  const minutes = Math.floor(timer/ 60);
  const seconds = timer % 60;

  gameTimer.textContent = `${minutes} : ${seconds}`;
}

function initGame() {
  // reset
  field.innerHTML = '';
  // score
  gameScore.textContent = CARROT_COUNT;

  addItem('carrot', CARROT_COUNT, './img/carrot.png');
  console.log(addItem)
  addItem('bug', BUG_COUNT, './img/bug.png')
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