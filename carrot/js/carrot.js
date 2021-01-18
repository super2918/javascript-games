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
  const BUG_NUM = 10;
  const CARROT_NUM = 10;

  function startGame() {
    /*if(isStart) {
      // 버튼 스타일 
      toggleButton();
      // randoms Items
      getRandomItems();
      // 클릭 이벤트 등록
      $carrotWrap.addEventListener('click', handleClickEvent);
    } */

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

  function createItems(item) {
    const $itemDiv = document.createElement('div');
    const $itemClass = `item item__${item}`;
 
    $itemDiv.setAttribute('class', $itemClass);

    const $itemImg = new Image();
    $itemImg.src = `../img/${item}.png`;

    $itemDiv.appendChild($itemImg);
    $carrotWrap.appendChild($itemDiv);
  
    return item;
  }

  function handleClickEvent() { 
    // winner and lost status function 
    // count
    // sounds
  }

  function getRandomItems() {
    const carrot = createItems('carrot');
    const bug = createItems('bug');

    const random = Math.random();
    
  }

  // winner

  // show modal 

  // timer 
  function countTiemr() {}

  // count 

  // sounds
  
  function init() {
    $startButton.addEventListener('click', startGame);
  }

  init();

})();