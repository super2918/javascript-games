(function() {
  const $startButton = document.querySelector('.button--start');
  const $carrotWrap = document.querySelector('.carrot__content');

  const textMessage = {
    start: 'START',
    restart: 'RSTART',
    win: 'YOU WON',
    lost: 'YOU LOST'
  }

  let isStart = true;
  const MIN_NUM = 10;
  const MAX_NUM= 20;

  function startGame() {
    // start Button 중복? 

    // 버튼 스타일 
    toggleButton();
    // randoms Items
    getRandomItems();
    // 클릭 이벤트 등록
    $carrotWrap.addEventListener('click', handleClickEvent);
  }

  function toggleButton() {
    if(isStart) {
      $startButton.textContent = textMessage.restart;
      $startButton.classList.add('toggle');
      isStart = false;
    } else {
      $startButton.textContent = textMessage.start;
      $startButton.classList.remove('toggle');
      isStart = true;
    }
  }

  // 아이템을 생성했어
  function createItems(item) {
    const $itemDiv = document.createElement('div');
    const $itemClass = `item item__${item}`;
 
    $itemDiv.setAttribute('class', $itemClass);

    const $itemImg = new Image();
    $itemImg.src = `./img/${item}.png`;

    $itemDiv.appendChild($itemImg);
    $carrotWrap.appendChild($itemDiv);
  
    return $itemDiv;
  }

  // 클릭이 될때 일어나는 일들
  function handleClickEvent() { 
  }

  // Random으로 아이템되는 애들 모여모여 
  function getRandomItems() {
    const carrot = createItems('carrot');
    const bug = createItems('bug');

    printItems(carrot);
    
  }

  // Random Number
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // 각각의 아이템들 출력이 되어야해 어케?
  function printItems(item) {
    // 빈 어레이 넣고 > 그걸 출력하게 한다? 그럼 그것들을 가져다 꽂으면 되는 거자나?
    const randomNum = getRandomArbitrary(MIN_NUM, MAX_NUM);
    console.log(item, randomNum);

  }

  // who is winner
  function checkWinner() {
    // when ? checking winner ?
  }

  // show modal when know winner 
  function showModal() {}

  // timer 
  function countTiemr() {}

  // count when click item - carrot
  function decreaseCount() {}
  
  // add sounds how? 
  function addSounds() {}

  // remove events 
  
  function init() {
    $startButton.addEventListener('click', startGame);
  }

  init();

})();