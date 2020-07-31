
export class FormValidator {
  constructor (object, form) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._form = form;
  };

//показывает ошибку
_showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const formError = this._form.querySelector(`#${input.id}-error`);
  input.classList.add(this._inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(this._errorClass);
};

//скрывает ошибку
_hideInputError = (form, input, inputErrorClass, errorClass) => {
  // Выбираем элемент ошибки на основе id 
  const formError = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
_isValid = (form, input, inputErrorClass, errorClass) => {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    this._showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    // Если проходит, скроем
    this._hideInputError(form, input, inputErrorClass, errorClass);
  }
};

_hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

//делает кнопку неактивной
_toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//слушатель
_setEventListeners = (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Найдём все поля формы и сделаем из них массив
const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  // Найдём в текущей форме кнопку отправки
const buttonElement = this._form.querySelector(this._submitButtonSelector);
this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
inputList.forEach((input) => {
  input.addEventListener('input', () => {
    this._isValid(form, input, inputErrorClass, errorClass);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
});
}

enableValidation() {
  this._form.addEventListener('submit', (evt) => evt.preventDefault);//отмена стандартного поведения
  this._setEventListeners();
}
}
