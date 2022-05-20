export default class Card {
  constructor(data, isRemovable, handleCardClick, handleButtonRemove, {templateSelector}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._isRemovable = isRemovable;
    this._handleCardClick = handleCardClick;
    this._handleButtonRemove = handleButtonRemove;
    this._templateSelector = templateSelector;
  }

  _updateLikes() {
    this._likeCounter.textContent = this._likes.length;
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

  _setEventListeners() {
    this._newCard
      .querySelector('.elements__button-like')
      .addEventListener('click', (evt) => this._handleButtonLike(evt));

    if (this._buttonRemove)
      this._buttonRemove.addEventListener('click', () => this._handleButtonRemove(this._cardId));

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  createNewCard() {
    this._newCard = this._getTemplate();
    this._cardImage = this._newCard.querySelector('.elements__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._newCard.querySelector('.elements__title').textContent = this._name;

    this._likeCounter = this._newCard.querySelector('.elements__like-counter');
    this._updateLikes();

    this._buttonRemove = this._newCard.querySelector('.elements__remove');
    if (!this._isRemovable)
      this._buttonRemove.remove();

    this._setEventListeners();

    return this._newCard;
  }
}
