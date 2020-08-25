
import { Card } from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'
import './index.css'
import { data } from 'autoprefixer';
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
const popupAddSaveBtn = document.querySelector('.popup__add-button')
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

const userInfo = new UserInfo({
  name: nameInput,
  job: jobInput
})
function newCard (item) {
  const card = new Card({
    name: item.name, 
    link: item.link,
    cardsTemplateElement,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
  }}
    ); 
  // Создаём карточку и возвращаем наружу 
  const cardElement = card.generateCard(); 
  // Добавляем в DOM 
  section.addItem(cardElement);
} 

//добавляем карточки 
const section = new Section ({
  items: initialCards, //массив карточке
  renderer: (item) => {
    // Создадим экземпляр карточки
    newCard(item)
}
  },
  cardsList,
   //куда вставляем темплейт = контейнерселектор
);
section.render();

//попапы из классов
const popupWithImage = new PopupWithImage('.popup__increase-img'); //картинка

const popupAddform = new PopupWithForm({  //добавление картинки
  popupSelector: ('.popup__add-card'),
  formSubmit: (data) => {
    const dataObj = { 
      name: data.placename, //имена полей
      link: data.placeimg}
    newCard(dataObj)
   
    /*const card = new Card({
      name: data.placename, //имена полей
      link: data.placeimg,
      cardSelector: cardsTemplateElement,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      }});
  const cardElement = card.generateCard();
  section.addItem(cardElement);
} */
}});
//редактирование профиля
const popupEditform = new PopupWithForm({
  popupSelector: ('.popup__edit-profile'),
  formSubmit: (value) => {
    userInfo.setUserInfo(value);
}
})

//изменение данных на странице через форму//
function formSubmitHandler() {
  userInfo.getUserInfo();
  submitButtonSelector.setAttribute('disabled', true);
  popupEditform.open()
  
}

popupEditOpenButton.addEventListener('click', formSubmitHandler);

//закрытия всех попапов при клике вне области(на фон)
//нашла более простое решение, вроде ьы работает
popupDarkBackground.forEach(background => {
  background.addEventListener('click', (evt) => {               
    evt.target.classList.remove('popup_opened');   
});
});


//добавление карточки через форму
function formSubmitHandlerAdd() {
  popupAddform.open();
}

popupAddOpenButton.addEventListener('click', formSubmitHandlerAdd);

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
