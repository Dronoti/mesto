import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__save');
  }

  open(dataToSend) {
    this._dataToSend = dataToSend;
    super.open();
  }

  getDataToSend() {
    return this._dataToSend;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handlerFormSubmit(evt));
  }
}
