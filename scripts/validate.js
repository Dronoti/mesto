function handleFormSubmit(evt) {
  evt.preventDefault();
}

function toggleButtonState(formElement, buttonElement, {inactiveButtonClass}) {
  if (!formElement.checkValidity())
    buttonElement.classList.add(inactiveButtonClass);
  else
    buttonElement.classList.remove(inactiveButtonClass);
}

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(inputElement, formElement, rest) {
  if (!inputElement.validity.valid)
    showInputError(formElement, inputElement, rest);
  else
    hideInputError(formElement, inputElement, rest);
}

function setInputsListeners(formElement, buttonElement, {inputSelector, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement, rest);
      toggleButtonState(formElement, buttonElement, rest);
    });
  });
}

function enableValidation({formSelector, submitButtonSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', handleFormSubmit);
    const buttonElement = formElement.querySelector(submitButtonSelector);
    setInputsListeners(formElement, buttonElement, rest);
  });
}

enableValidation(settings);
