import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupsList = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit-profile');
const popupEditOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия редактирования профиля
const popupAddOpenButton = document.querySelector('.profile__add-button'); //кнопка открытия добавления карточки
const popupEditCloseButton = popupsList.querySelector('.popup__close'); //закрытие попап профиля
const popupAddCloseButton = document.querySelector('.popup__close-add'); //закрытие попап место
const popupIncreaseCloseButton = document.querySelector('.popup__close-img'); //закрытие попап с картинкой
const popupDarkBackground = document.querySelectorAll('.popup');
const userTitle = document.querySelector('.profile__title');
const userSubtitle = document.querySelector('.profile__subtitle');
const submitButtonSelector = document.querySelector('.popup__submit-button');

const popupAdd = document.querySelector('.popup__add-card'); //попап добавления карточки
export const popupIncrease = document.querySelector('.popup__increase-img');
export const popupIncreaseTitle = document.querySelector('.popup__figcaption');
export const popupIncreaseImg = document.querySelector('.popup__img');
const cardsList = document.querySelector('.elements__list'); //куда вставляем темплейт тег
export const cardsTemplateElement = document.querySelector('.card-template'); //темплейт тег
//массив карточек//
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
     'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
     'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
     'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//переменные для валидации
const formElement = document.querySelectorAll('.popup__form'); //выбрали обе формы
const formElementEdit = document.querySelector('.popup__edit_form'); //получили форму редактирования профиля
const formElementAdd = document.querySelector('.popup__add-form'); //получили форму добавления новой карточки
const nameInput = document.querySelector('.popup__item_name'); //поле имя форма эдит
const jobInput = document.querySelector('.popup__item_job'); //поле работа форма эдит
const placeNameInput = document.querySelector('.popupadd__item_place-name'); //поле название форма эдд
const placeImgInput = document.querySelector('.popupadd__item_place-img'); //поле со ссылкой на картинку форма эдд

//открытие и закрытие попап//
export const popupToggle = function (selectpopup) {
  window.addEventListener('keydown', closePopupEsc); //добавляет слушатель для закрытия по esc
  if (selectpopup.classList.contains('popup_opened')) {
    window.removeEventListener('keydown', closePopupEsc);
  }
  selectpopup.classList.toggle('popup_opened');
};

popupIncreaseCloseButton.addEventListener('click', () =>
  popupToggle(popupIncrease)
); //закрытие картинки

//изменение данных на странице через форму//
function formSubmitHandler(evt) {
  evt.preventDefault(); //отменили стандартное поведение
  userTitle.textContent = nameInput.value;
  userSubtitle.textContent = jobInput.value;
  submitButtonSelector.setAttribute('disabled', true);
  popupToggle(popupEdit);
}

//будет отправка формы//
formElementEdit.addEventListener('submit', formSubmitHandler);
//открытие и закрытие попапов
popupEditOpenButton.addEventListener('click', function () {
  if (!popupsList.classList.contains('popup_opened')) {
    nameInput.value = userTitle.textContent;
    jobInput.value = userSubtitle.textContent;
  }
  popupToggle(popupEdit);
});
popupEditCloseButton.addEventListener('click', () => popupToggle(popupEdit));
popupAddOpenButton.addEventListener('click', () => popupToggle(popupAdd));
popupAddCloseButton.addEventListener('click', () => popupToggle(popupAdd));

//закрытиe всех попапов по клавише esc

function closePopupEsc(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpen) {
    popupToggle(popupOpen); //выбрала первый вариант предложенной Вами реализации, тк при втором - разделить popuptoggle на 2 функции
                            //пришлось бы многое в проекте переделать, боюсь ошибиться, а итерация последняя..
  }
}

//закрытия всех попапов при клике вне области(на фон)
popupDarkBackground.forEach((background) => {
  const currentPopup = background.closest('.popup');
  background.addEventListener('mousedown', (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    {
      currentPopup.classList.remove('popup_opened');
    }
  });
});

//добавление карточки через форму
function formSubmitHandlerAdd(evt) {
  evt.preventDefault(); //отменили стандартное поведение
  submitButtonSelector.disabled = true;
  const objectCard = {};
  objectCard.link = placeImgInput.value;
  objectCard.name = placeNameInput.value;
  renderCard(objectCard, cardsTemplateElement);
  placeNameInput.value = '';
  placeImgInput.value = '';
  popupToggle(popupAdd);
}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

function renderCard(item) {
  // Создадим экземпляр карточки
  const card = new Card(item, cardsTemplateElement);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  cardsList.prepend(cardElement);
}
initialCards.forEach(renderCard); //перебираем массив и каждую добавляем
const objectForm = {
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__item', //инпуты
  submitButtonSelector: '.popup__submit-button', //кнопки
  inactiveButtonClass: 'popup__button_disabled', //неактивные кнопки
  inputErrorClass: 'popup__input_type_error', //подчеркивает красным незаполненные поля
  errorClass: 'popup__input-error_visible', //делает сообщение об ошибке видимым
};
const popupAddValidation = new FormValidator(
  objectForm,
  popupAdd
).enableValidation(); //экземпляр для формы добавления картинки
const popupEditValidation = new FormValidator(
  objectForm,
  popupEdit
).enableValidation(); //экземпляр для редактирования профиля
