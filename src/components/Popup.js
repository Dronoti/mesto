export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup'))
      this.close();
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
    this._popup.classList.remove('popup_opened');
  }
}
