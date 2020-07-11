const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit-profile');
const popupEditOpenButton = document.querySelector('.profile__edit-button'); //кнопка открытия редактирования профиля
const popupAddOpenButton = document.querySelector('.profile__add-button'); //кнопка открытия добавления карточки
const popupEditCloseButton = popup.querySelector('.popup__close'); //закрытие попап профиля
const popupAddCloseButton = document.querySelector('.popup__close-add'); //закрытие попап место
const popupIncreaseCloseButton = document.querySelector('.popup__close-img'); //закрытие попап с картинкой

const nameInput = document.querySelector('.popup__item_name'); 
const jobInput = document.querySelector('.popup__item_job');
const userTitle = document.querySelector('.profile__title');
const userSubtitle = document.querySelector('.profile__subtitle');
const popupAdd = document.querySelector('.popup__add-card'); //попап добавления карточки
const placeNameInput = document.querySelector('.popupadd__item_place-name');
const placeImgInput = document.querySelector('.popupadd__item_place-img');
const popupIncrease = document.querySelector('.popup__increase-img');
const popupIncreaseTitle = document.querySelector('.popup__figcaption');
const popupIncreaseImg = document.querySelector('.popup__img');
const cardsList = document.querySelector('.elements__list'); //куда вставляем темплейт тег
const cardsTemplateElement = document.querySelector('.card-template').content; //темплейт тег

//открытие и закрытие попап//
const popupToggle = function(selectpopup) { 
    selectpopup.classList.toggle('popup_opened');
}

popupIncreaseCloseButton.addEventListener('click', () => popupToggle(popupIncrease)); //закрытие картинки


//изменение данных на странице через форму//
const formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = jobInput.value;
    popupToggle(popupEdit);
}

//будет отправка формы//
formElement.addEventListener('submit', formSubmitHandler);
//открытие и закрытие попапов
popupEditOpenButton.addEventListener('click', function () {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = userTitle.textContent;
        jobInput.value = userSubtitle.textContent;
}
popupToggle(popupEdit);
});
popupEditCloseButton.addEventListener('click', () => popupToggle(popupEdit));
popupAddOpenButton.addEventListener('click', () => popupToggle(popupAdd)); 
popupAddCloseButton.addEventListener('click', () => popupToggle(popupAdd)); 


//массив карточек//
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];


//добавление карточек из массива при загрузке страницы//
function addCards(name, link) {
    const card = cardsTemplateElement.cloneNode(true);
    const selectCard = card.querySelector('.elements__image');
    card.querySelector('.elements__title').textContent = name;
    selectCard.src = link;
    selectCard.alt = name;
    card.querySelector('.elements__trash').addEventListener('click', deleteCard);
    
//открытие увеличения картинки//
selectCard.addEventListener('click', function(evt) {
    popupToggle(popupIncrease);
    popupIncreaseTitle.textContent = name;
    popupIncreaseImg.src = evt.target.src;
    popupIncreaseImg.alt = name;
    });
    cardsList.prepend(card);
    const addLike = document.querySelector('.elements__like');
    addLike.addEventListener('click', () => {
        addLike.classList.toggle('elements__like_active');
            });  
}

  //удаление карточки
function deleteCard(e) {
    const card = e.target.closest('.elements__list-item');
    card.remove();
  }

  //добавление карточки через форму
const formElementAdd = document.querySelector('.popup__add-form');
function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    const placeName = placeNameInput.value
    const placeImg = placeImgInput.value
    addCards(placeName, placeImg)
    placeNameInput.value = '';
    placeImgInput.value = '';
    popupToggle(popupAdd);
}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

initialCards.forEach(function(element){
    addCards(element.name, element.link)
});
