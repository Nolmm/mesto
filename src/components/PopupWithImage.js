import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
}

open(name, link){
  this._popupIncreaseImg = this._popupSelector.querySelector('.popup__img');
  this._popupIncreaseImg.setAttribute('src', link);
  this._popupIncreaseImg.setAttribute('alt', name);
  this._popupSelector.querySelector('.popup__figcaption').textContent = name;
  super.open();
}
}