export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
          this.close();
      }
  }
  }

  open() {
    this.setEventListener();
    this._popupSelector.classList.add('popup_opened');
    window.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    window.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListener() {
    this._popupSelector.querySelector('.popup__close-btn').addEventListener('click', () => {
    this.close()
    })
}

}