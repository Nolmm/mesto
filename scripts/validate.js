

//показывает ошибку
const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const formError = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
}

//скрывает ошибку
const hideInputError = (form, input, inputErrorClass, errorClass) => {
  // Выбираем элемент ошибки на основе id 
  const formError = form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    // Если проходит, скроем
    hideInputError(form, input, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

//делает кнопку неактивной
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//слушатель
const setEventListeners = (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Найдём все поля формы и сделаем из них массив
const inputList = Array.from(form.querySelectorAll(inputSelector));
  // Найдём в текущей форме кнопку отправки
const buttonElement = form.querySelector(submitButtonSelector);
toggleButtonState(inputList, buttonElement, inactiveButtonClass);
inputList.forEach((input) => {
  input.addEventListener('input', () => {
    isValid(form, input, inputErrorClass, errorClass);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
});
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отмена стандартного поведения
    });
      setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}



enableValidation({
  formSelector: '.popup__form', //формы
  inputSelector: '.popup__item', //инпуты
  submitButtonSelector: '.popup__submit-button', //кнопки
  inactiveButtonClass: 'popup__button_disabled', //неактивные кнопки
  inputErrorClass: 'popup__input_type_error', //подчеркивает красным незаполненные поля
  errorClass: 'popup__input-error_visible' //делает сообщение об ошибке видимым
});