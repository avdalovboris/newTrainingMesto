//  
//function showInputError(formElement, inputElement, errorMessage, config) {
//  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
//  inputElement.classList.add(config.inputError);
//  errorElement.textContent = errorMessage
//  errorElement.classList.add(config.errorSpanActive)
//}
//
//function hideInputError(formElement, inputElement, config) {
//  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
//
//  inputElement.classList.remove(config.inputError);
//  errorElement.classList.remove(config.errorSpanActive);
//  errorElement.textContent = ''
//}
//
//const checkInputValidity = (formElement, inputElement, config) => {
//  if (!inputElement.validity.valid) {
//    showInputError(formElement, inputElement, inputElement.validationMessage, config)
//  } else {
//    hideInputError(formElement, inputElement, config)
//  }
//};
//
//const setEventListeners = (formElement, config) => {
//  const inputList = Array.from(formElement.querySelectorAll(config.input));
//  const buttonElement = formElement.querySelector(config.button)
//  
//  toggleButtonState(inputList, buttonElement, config)
//  inputList.forEach((inputElement) => {
//    inputElement.addEventListener('input', () =>{
//      checkInputValidity(formElement, inputElement, config);
//      toggleButtonState(inputList, buttonElement, config)
//    });
//  }); 
//}
//
//const enableValidation = (config) => {
//  const formList = Array.from(document.querySelectorAll(config.form));
//  formList.forEach((formElement) => {
//    formElement.addEventListener('submit', (evt) => {
//      evt.preventDefault();
//    })
//    setEventListeners(formElement, config)
//  })
//}
//
//const hasInvalidInput = (inputList) => {
//  return inputList.some((inputElement) => {
//    return !inputElement.validity.valid;
//  }); 
//}
//
//const toggleButtonState = (inputList, buttonElement, config) => {
//  if (hasInvalidInput(inputList)) {
//    buttonElement.classList.add(config.buttonActive);
//    buttonElement.setAttribute(config.disabled[0],[1])
//  } else {
//    buttonElement.removeAttribute(config.disabled[0]);
//    buttonElement.classList.remove(config.buttonActive);
//  } 
//}
//
//enableValidation({
//  form: '.popup__form',
//  input: '.popup__field',
//  inputError: 'popup__field_error',
//  button: '.popup__button',
//  buttonActive: 'popup__button_inactive',
//  disabled: ['disabled', 'true'],
//  errorSpanActive: 'error__active'
//})
//


class FormValidator {
  constructor(object, modal) {
    this._modal = modal;
    this._form = this._modal.querySelector(object.form);
    this._input = object.input;
    this._inactiveButtonClass = object.buttonInActive;
    this._buttonDisabled = object.disabled;
    this._inputErrorClass = object.inputError;
    this._formButton = object.formButton,
    this._errorSpanActive = object.errorSpanActive

  }

  enableValidation() {
    this._modal.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._input))
    this._buttonElement = this._modal.querySelector(this._formButton)

    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._isValid(evt)
        this._toggleButtonState()
      })
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute(this._buttonDisabled[0],[1]);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute(this._buttonDisabled[0]);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorSpanActive)
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorSpanActive)
  }

}

export default FormValidator;