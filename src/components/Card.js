import {
  cardsTemplateElement
} from '../pages/index.js';

export class Card {
  //заготовка для карточки
  constructor({items, cardSelector, handleCardClick, deleteCard, idMy}) {
    this._name = items.name;
    this._link = items.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._like = items.like;
    this._idCard = items._id;
    this._deleteCard =  deleteCard;
    this._idMaster = items.Master._id;;
    this._idMy = idMy;
    this._api = api;
    this._element = this.generateCard();
  }
  //получаем темплейт элемент
  _getTemplate() {
    const cardElement = cardsTemplateElement.content
      .querySelector('.elements__list-item')
      .cloneNode(true);
    return cardElement;
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.elements__image');
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like_number').textContent = this._like.length;
    this._setEventListeners();
    if (this._idMaster === this._idMy) {
      this._element.querySelector('.elements__trash').classList.add('.elements__trash_active')
  }
      this._like.some(item => {
      if (item._id === this._idMy) {
          this._element.querySelector('.elements__like').classList.add('elements__like_active')
      }
  })
    return this._element;

  }
  //добавляем или убираем лайк
  /*_addLike() {
    this._element
      .querySelector('.elements__like')
      .classList.toggle('elements__like_active');
  }
*/

_likeToggle(data) {
  this._element.querySelector('.elements__like_number').textContent = data.like.length;
  this._element.querySelector('.elements__like').classList.toggle('elements__like_active')
}

  _addLike(evt) {
    if(!evt.target.classList.contains('elements__like_active')) {
        this._api.put(`cards/likes/${this._cardId}`)
            .then(data => {
               this._likeToggle(data)
            })
    } else {
        this._api.delete(`cards/likes/${this._cardId}`).then(data => {
          this._likeToggle(data)
        })
    }
  }
  //удаляем карточку
  /*_deleteCard() {
    this._element.remove();
  }
*/
  //слушатели
  _setEventListeners() {
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', (evt) => this._addLike(evt));
    this._element
      .querySelector('.elements__trash')
      .addEventListener('click', () => this._deleteCard(this._idCard, this._element, this._api));
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
    })
    }}