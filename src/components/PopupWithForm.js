import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popup.querySelector('.popup__save');
    this.inputValuesObj = {};
  }

  showLoading(text) {
    this._buttonSubmit.textContent = text;
  }

  _getInputValues() {
    this._inputList.forEach(item => {
      this.inputValuesObj[item.name] = item.value;
    })
  }

  setInputValues(inputValues) {
    this._inputList.forEach(item => {
      item.value = inputValues[item.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._handlerFormSubmit(evt);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
