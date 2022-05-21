export default class Card {
  constructor(data, userId, handleCardClick, handleButtonRemove, handleButtonLike, {templateSelector}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._isRemovable = this._userId === data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleButtonRemove = handleButtonRemove;
    this._handleButtonLike = handleButtonLike.bind(this);
    this._templateSelector = templateSelector;
  }

  _updateLikes() {
    this._isLiked = this._likes.map(users => users._id).includes(this._userId);
    if (this._isLiked)
      this._buttonLike.classList.add('elements__button-like_active');
    else
      this._buttonLike.classList.remove('elements__button-like_active');
    this._likeCounter.textContent = this._likes.length;
  }

  _getTemplate() {
    return (document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true));
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleButtonLike(this._cardId, this._isLiked));

    if (this._buttonRemove)
      this._buttonRemove.addEventListener('click', () => this._handleButtonRemove(this._cardId));

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  setLikes(likes) {
    this._likes = likes
    this._updateLikes();
  }

  createNewCard() {
    this._newCard = this._getTemplate();
    this._cardImage = this._newCard.querySelector('.elements__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._newCard.querySelector('.elements__title').textContent = this._name;

    this._buttonLike = this._newCard.querySelector('.elements__button-like');
    this._likeCounter = this._newCard.querySelector('.elements__like-counter');
    this._updateLikes();

    this._buttonRemove = this._newCard.querySelector('.elements__remove');
    if (!this._isRemovable)
      this._buttonRemove.remove();

    this._setEventListeners();

    return this._newCard;
  }
}
