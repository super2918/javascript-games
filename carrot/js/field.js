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
    // 어떤 클래스 안에 있는 함수를 다른 콜백으로 전달 될때 그 함수에 포함되어있는 클래스 정보가 사라진다. 그래서 클래스와 함수를 묶을 수 있는 this와 함수를 묶는 바인딩
    // this의 정보가 무시되기 때문에 this를 바인딩 한다.
    // 3가지 방법, bind(this), 또는 callback에 arrow, onclick을 멤버변수로 만들고  arrow -> this가 자동적 바인딩이 되게 한다.
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

  onClick = (event) =>  {
    const target = event.target;

    if (target.matches('.carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
      // this를
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  }
}

// static한 함수 
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}