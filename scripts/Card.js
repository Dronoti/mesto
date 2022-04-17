export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._openPopup = data.openPopup;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return (document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true));
  }

  _handleButtonLike(evt) {
    evt.currentTarget.classList.toggle('elements__button-like_active');
  }

  _handleButtonRemove() {
    this._newCard.remove();
  }

  _handleOpenShowCard() {
    this._popupShowCard = document.querySelector('.popup_type_show-card');
    this._showCardImage = this._popupShowCard.querySelector('.popup__image');
    this._showCardCaption = this._popupShowCard.querySelector('.popup__caption');

    this._showCardImage.src = this._cardImage.src;
    this._showCardImage.alt = this._cardImage.alt;
    this._showCardCaption.textContent = this._cardImage.alt;
    this._openPopup(this._popupShowCard);
  }

  _setEventListeners() {
    this._newCard
      .querySelector('.elements__button-like')
      .addEventListener('click', (evt) => this._handleButtonLike(evt));

    this._newCard
      .querySelector('.elements__remove')
      .addEventListener('click', () => this._handleButtonRemove());

    this._cardImage.addEventListener('click', () => this._handleOpenShowCard());
  }

  createNewCard() {
    this._newCard = this._getTemplate();
    this._cardImage = this._newCard.querySelector('.elements__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._newCard.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();

    return this._newCard;
  }
}
