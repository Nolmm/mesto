import {Popup} from './Popup.js';

export class PopupQuestion extends Popup {
  constructor(popupSelector, renderLoading) {
    super(popupSelector);
    this._popupquesButton = this._popupSelector.querySelector('.popup__ques-button');
    this._renderLoading = renderLoading;
    //this._formSubmit = formSubmit;
    /*this._handleFormSubmit = (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close()
  }*/
}


open(cardId, element, api) {
  this._cardId = cardId;
  this._popupquesButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        this._renderLoading(this._popupquesButton, true, 'Удаление...')
        api.deleteItems(`cards/${cardId}`)
        .then(() => {
          element.remove()
      })
      .finally(() => {
        this.close()
        this._renderLoading(this._popupquesButton, false, 'Удалить')
    })
})
  super.open();
}


close() {
  super.close();
  //this._popupquesButton.removeEventListener('click', this._handleFormSubmit);
}
}