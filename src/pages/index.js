
import { Card } from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'
import './index.css'
import { data } from 'autoprefixer';
import {Api} from '../components/Api.js';
import {PopupQuestion} from '../components/PopupQuestion.js';


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
//кнопки
const popupAddSaveBtn = document.querySelector('.popup__add-button');
const popupEditBtn = document.querySelector('.popup__edit-button');
//const popupQuesBtn = document.querySelector('.popup__ques-button');
const popupAvatarSave = document.querySelector('.popup__avatar-button');

const popupAdd = document.querySelector('.popup__add-card'); //попап добавления карточки
export const popupIncrease = document.querySelector('.popup__increase-img');
export const popupIncreaseTitle = document.querySelector('.popup__figcaption');
export const popupIncreaseImg = document.querySelector('.popup__img');
const cardsList = document.querySelector('.elements__list'); //куда вставляем темплейт тег
export const cardsTemplateElement = document.querySelector('.card-template'); //темплейт тег
const renderLoading = (button, isLoading, textButton) => {
  if(isLoading) {
      button.setAttribute('disabled', true)
      button.textContent = textButton
  } else {
      button.removeAttribute('disabled')
      button.textContent = textButton
  }
}
//массив карточек//
/*const initialCards = [
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
];*/

//переменные для валидации
const formElement = document.querySelectorAll('.popup__form'); //выбрали обе формы
const formElementEdit = document.querySelector('.popup__edit_form'); //получили форму редактирования профиля
const formElementAdd = document.querySelector('.popup__add-form'); //получили форму добавления новой карточки
const nameInput = document.querySelector('.popup__item_name'); //поле имя форма эдит
const jobInput = document.querySelector('.popup__item_job'); //поле работа форма эдит
const placeNameInput = document.querySelector('.popupadd__item_place-name'); //поле название форма эдд
const placeImgInput = document.querySelector('.popupadd__item_place-img'); //поле со ссылкой на картинку форма эдд
const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-15/')

const userAvatar = document.querySelector('.profile__avatar');
//форма изменения аватара
const popupAvatarEdit = document.querySelector('.popup__editavatar');
const formEditAvatar = popupAvatarEdit.querySelector('.popup__editavatar-form');
const avatarInput = formEditAvatar.querySelector('.popup__item_avatar');



const userInfo = new UserInfo({
  name: userTitle,
  job: userSubtitle,
  api: api
}, userAvatar)

//добавляем карточки 

userInfo.getProfile().then(id => {
  api.getItems('cards').then(data =>{
    const section = new Section({
      data: data,
      renderer: (item) => {
        const card = new Card({
          data: item,
          cardSelector: ('.card-template'),
          myId: id,
          api: api,
          handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        deleteCard: (cardId, element) => {
          popupQuestion.open(cardId, element, api)
        }
        });
        const cardElement = card.generateCard();
        section.addCard(cardElement);
      }
    }, '.elements__list'
    )
    section.renderItems()
    })
    .catch((err) => {
      console.log(err)
  })
  })
  .catch((err) => {
    console.log(err)
})
;

//попапы из классов
const popupWithImage = new PopupWithImage('.popup__increase-img'); //картинка
const popupQuestion = new PopupQuestion('.popup__question', renderLoading);
const popupAddform = new PopupWithForm({  //добавление картинки
  popupSelector: ('.popup__add-card'),
    formSubmit: (values) => {
      renderLoading(popupAddSaveBtn, true, 'Сохранение..')
      api.postNewCard('cards', values).then(data => {
        const section = new Section({
          data: [data],
          renderer: (item) => {
          const card = new Card ({ 
          data: item,
          api: api,
          myId: item.owner._id,
          cardSelector: ('.card-template'),
          handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        deleteCard: (cardId, element, api) => {
          popupQuestion.open(cardId, element, api)
        }
        })
        const cardElement = card.generateCard();
        section.addItem(cardElement)
      }}, 
      '.elements__list')
      section.renderItems()
    })
    .then(() => {
      popupAddform.close()
    })
    .catch((err) => {
      console.log(err)
  })
      .finally(() => {
        renderLoading(popupAddSaveBtn, false, 'Сохранить')
      })
    }
})
    
const popupEditAvatar = new PopupWithForm({
  popupSelector: ('.popup__editavatar'),
  formSubmit: (item) => {
    renderLoading(popupAvatarSave, true, 'Сохранение...')
    api.patchAvatar('users/me/avatar', item).then(data => {
      userAvatar.setAttribute('src', data.avatar) 
  })
  .then(() => {
    popupEditAvatar.close()
  })
  .catch((err) => {
    console.log(err)
})
  .finally(() => {
    renderLoading(popupAvatarSave, false,  'Сохранить')
})
  }
})

function editUserAvatar() {
  const avatar = userInfo.getUserAvatar();
  avatarInput.value = avatar.link;
  popupEditAvatarValidation.resetError();
  formEditAvatar.reset();
  popupEditAvatar.open();
}

document.querySelector('.profile__group').addEventListener('click', editUserAvatar);

//редактирование профиля
const popupEditform = new PopupWithForm({
  popupSelector: ('.popup__edit-profile'),
  formSubmit: (value) => {
    renderLoading(popupEditBtn, true, 'Сохранение...')
    api.patchUserInfo('users/me', value)
        .then((data) => {
          console.log(data)
          userInfo.setUserInfo(
            //nameInput.textContent = data.name,
            //jobInput.textContent = data.about
            {
              name: data.name,
              job: data.about
            }
          )
        })
        .then(() => {
          popupEditform.close()
        })
        .catch((err) => {
          console.log(err)
      })
        .finally(() => {
          
            renderLoading(popupEditBtn, false, 'Сохранить')
        })
}
})

//изменение данных на странице через форму//
function formSubmitHandler() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  //submitButtonSelector.setAttribute('disabled', true);
  popupEditValidation.resetError();
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
  popupAddValidation.resetError()
  formElementAdd.reset()
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
)
popupAddValidation.enableValidation(); //экземпляр для формы добавления картинки

const popupEditValidation = new FormValidator(
  objectForm,
  popupEdit
)
popupEditValidation.enableValidation(); //экземпляр для редактирования профиля

const popupEditAvatarValidation = new FormValidator( //экземпляр для изменения аватара
  objectForm,
  formEditAvatar
)
popupEditAvatarValidation.enableValidation();



