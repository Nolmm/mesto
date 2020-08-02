import {
  popupToggle,
  popupIncrease,
  popupIncreaseTitle,
  popupIncreaseImg,
  cardsTemplateElement,
} from './index.js';
export class Card {
  //заготовка для карточки
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = item.cardSelector;
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
    this._element.querySelector('.elements__image').src = this._link;
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

  //открываем картинку с подписью
  _popupIncreaseOpen() {
    popupToggle(popupIncrease);
    popupIncreaseTitle.textContent = this._name;
    popupIncreaseImg.src = this._link;
    popupIncreaseImg.alt = this._name;
  }
  //слушатели
  _setEventListeners() {
    this._element
      .querySelector('.elements__like')
      .addEventListener('click', () => this._addLike());
    this._element
      .querySelector('.elements__trash')
      .addEventListener("click", () => this._deleteCard());
    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => this._popupIncreaseOpen());
  }
}
