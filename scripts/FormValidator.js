export default class FormValidator {
  constructor(settingsForm, form) {
    this._settingsForm = settingsForm;
    this._form = form;
    this._buttonElement = form.querySelector(settingsForm.submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(settingsForm.inputSelector));
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
  }

  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this._buttonElement.classList.add(this._settingsForm.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._settingsForm.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settingsForm.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._settingsForm.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settingsForm.inputErrorClass);
    this._errorElement.classList.remove(this._settingsForm.errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid)
      this._showInputError(inputElement);
    else
      this._hideInputError(inputElement);
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._form.addEventListener('submit', (evt) => this._handleFormSubmit(evt));
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }
}
