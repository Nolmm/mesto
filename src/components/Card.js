import {
  cardsTemplateElement
} from '../pages/index.js';
export class Card {
  //заготовка для карточки
  constructor({name, link, cardSelector, handleCardClick}) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();
    return this._element;
  }
  //добавляем или убираем лайк
  _addLike() {
    this._element
      .querySelector('.elements__like')
      .classList.toggle('elements__like_active');
  }
  //удаляем карточку
  _deleteCard() {
    this._element.remove();
  }

  //слушатели
  _setEventListeners() {
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', () => this._addLike());
    this._element
      .querySelector('.elements__trash')
      .addEventListener('click', () => this._deleteCard());
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
    })
    }}
