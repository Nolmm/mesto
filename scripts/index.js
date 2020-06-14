const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__open-popup');
const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function() {
  popup.classList.toggle('popup_opened')
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

let nameInput = document.querySelector('.popup__item-name');
let jobInput = document.querySelector('.popup__item-job');
let userTitle = document.querySelector('.profile__title-user');
let userSubtitle = document.querySelector('.profile__subtitle-user');
nameInput.value = userTitle.textContent;
jobInput.value = userSubtitle.textContent;


let formElement = document.querySelector('.popup__form');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__item-name');
    let jobInput = document.querySelector('.popup__item-job');
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);