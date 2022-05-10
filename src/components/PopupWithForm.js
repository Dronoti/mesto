import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._getInputValues();
  }

  _getInputValues() {
    this.inputValuesObj = {};
    this._inputList.forEach(item => {
      this.inputValuesObj[item.name] = item;
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
