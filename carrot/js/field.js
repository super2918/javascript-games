'use strict';

// 필드 init 하고 아이템을 추가시키는 역할만 한다.

const CARROT_SIZE = 80;

export default class Field {
  constructor( carrotCount, bugCount ) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick );
  }

  init() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, './img/carrot.png');
    this._addItem('bug', this.bugCount, './img/bug.png');
  }

  // callback 함수를 등록
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem = (className, count, imgPath) => {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
  
    for( let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
  
      item.style.position = 'absolute';
  
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
  
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      
      this.field.appendChild(item);
    }
  }

  onClick(event) {
    const target = event.target;
    console.log(target);
    if (target.matches('.carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }
}

// static한 함수 
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}