'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefreshButton = document.querySelector('.pop-up__refresh');
    this.popUpRefreshButton.addEventListener('click', this.onClick);
  }

  setClickListener(onClick) {
    // 팝업에서 등록된 콜백이 있다면 멤버변수에 할당을 한다.
    this.onClick = onClick;
  }

  onClick = () => {
    this.onClick && this.onClick;
    this.hide();
  }

  showWithText(text) {
    this.popUpText.textContent = text;
    this.popUp.classList.add('pop-up--show');
  }

  hide() {
    this.popUp.classList.remove('pop-up--show');
  }
}
