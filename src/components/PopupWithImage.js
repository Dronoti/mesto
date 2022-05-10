import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._showCardImage = this._popup.querySelector('.popup__image');
    this._showCardCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._showCardImage.src = link;
    this._showCardImage.alt = name;
    this._showCardCaption.textContent = name;
    super.open();
  }
}
