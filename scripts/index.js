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
const popupAdd = document.querySelector('.popup__add-card'); //попап добавления карточки
const popupIncrease = document.querySelector('.popup__increase-img');
const popupIncreaseTitle = document.querySelector('.popup__figcaption');
const popupIncreaseImg = document.querySelector('.popup__img');
const cardsList = document.querySelector('.elements__list'); //куда вставляем темплейт тег
const cardsTemplateElement = document.querySelector('.card-template').content; //темплейт тег
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


//переменные для валидации
const formElement = document.querySelectorAll('.popup__form'); //выбрали обе формы
const formElementEdit = document.querySelector('.popup__edit_form'); //получили форму редактирования профиля
const formElementAdd = document.querySelector('.popup__add-form');  //получили форму добавления новой карточки
const nameInput = document.querySelector('.popup__item_name'); //поле имя форма эдит
const jobInput = document.querySelector('.popup__item_job'); //поле работа форма эдит
const placeNameInput = document.querySelector('.popupadd__item_place-name'); //поле название форма эдд
const placeImgInput = document.querySelector('.popupadd__item_place-img'); //поле со ссылкой на картинку форма эдд


//открытие и закрытие попап//
const popupToggle = function(selectpopup) { 
    selectpopup.classList.toggle('popup_opened');
}

popupIncreaseCloseButton.addEventListener('click', () => popupToggle(popupIncrease)); //закрытие картинки


//изменение данных на странице через форму//
function formSubmitHandler (evt) {
    evt.preventDefault(); //отменили стандартное поведение
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = jobInput.value;
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



//слушатель закрытия всех попапов по клавише esc
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popupsList.forEach( (selectpopup) => {
            selectpopup.classList.remove('popup_opened');
        })
    }
})

//закрытия всех попапов при клике вне области(на фон)
popupDarkBackground.forEach((background) => {
    const currentPopup = background.closest('.popup');
    background.addEventListener('mousedown', (event) => {
        if  (event.target !== event.currentTarget) { return } {
            currentPopup.classList.remove('popup_opened')
        }
    })
})


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
    
    //лайк
    const addLike = card.querySelector('.elements__like');
    addLike.addEventListener('click', () => {
        addLike.classList.toggle('elements__like_active');
            });
            cardsList.prepend(card);
}

  //удаление карточки
function deleteCard(e) {
    const card = e.target.closest('.elements__list-item');
    card.remove();
  }

  //добавление карточки через форму
function formSubmitHandlerAdd (evt) {
    evt.preventDefault(); //отменили стандартное поведение
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
