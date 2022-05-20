export default class Card {
  constructor(data, handleCardClick, {templateSelector}, api) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._api = api;
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

  _handleButtonRemove() {
    this._api.deleteCard(this._id)
      .then(() => {
        this._newCard.remove();
        this._newCard = null;
      })
      .catch(err => console.log(err));
  }

  _setEventListeners() {
    this._newCard
      .querySelector('.elements__button-like')
      .addEventListener('click', (evt) => this._handleButtonLike(evt));

    this._newCard
      .querySelector('.elements__remove')
      .addEventListener('click', () => this._handleButtonRemove());

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

    this._setEventListeners();

    return this._newCard;
  }
}
