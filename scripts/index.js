const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSubmitButton = popup.querySelector('.popup__submit-button');
let nameInput = document.querySelector('.popup__item_name');
let jobInput = document.querySelector('.popup__item_job');
let userTitle = document.querySelector('.profile__title');
let userSubtitle = document.querySelector('.profile__subtitle');

//открытие и закрытие попап//
const popupToggle = function() { 
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = userTitle.textContent;
    jobInput.value = userSubtitle.textContent;
  }
  popup.classList.toggle('popup_opened')
  
}

//изменение данных на странице через форму//
let formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = jobInput.value;
    popupToggle ();
}

//будет отправка формы//
formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);