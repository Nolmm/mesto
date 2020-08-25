import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._handleFormSubmit = (evt) => {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close()
}
  this._popupForm = this._popupSelector.querySelector('.popup__form');
}

_getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__item'); //достали все инпуты
    this._formValues = {}; //пустой объект
    this._inputList.forEach(input => 
    this._formValues[input.name] = input.value); //добавили в объект значение всех полей
    return this._formValues; //вернули объект
}


_setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
}

open() {
    this._setEventListeners();
    super.open();
}



close() {
    super.close();
    this._popupForm.reset();
}
}