const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template-elements').content;

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupShowCard = document.querySelector('.popup_type_show-card');

const formEditProfile = document.forms.formEditProfile;
const nameInput = formEditProfile.elements.profileName;
const jobInput = formEditProfile.elements.profileJob;
const buttonEditProfile = formEditProfile.elements.buttonSubmit;

const formAddCard = document.forms.formAddCard;
const cardNameInput = formAddCard.elements.cardName;
const cardLinkInput = formAddCard.elements.cardLink;
const buttonAddCard = formAddCard.elements.buttonSubmit;

const showCardImage = popupShowCard.querySelector('.popup__image');
const showCardCaption = popupShowCard.querySelector('.popup__caption');

function createNewCard(name, link) {
  const newCard = cardTemplate.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = link;
  cardImage.alt = name;
  newCard.querySelector('.elements__title').textContent = name;
  newCard.querySelector('.elements__button-like').addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('elements__button-like_active');
  });
  newCard.querySelector('.elements__remove').addEventListener('click', () => {
    newCard.remove();
  });
  cardImage.addEventListener('click', () => {
    showCardImage.src = cardImage.src;
    showCardImage.alt = cardImage.alt;
    showCardCaption.textContent = cardImage.alt;
    openPopup(popupShowCard);
  });
  return newCard;
}

function addCard(node, card) {
  node.prepend(card);
}

function openPopup(popup) {
  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('click', handleClose);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleEsc);
  popup.removeEventListener('click', handleClose);
  popup.classList.remove('popup_opened');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  if (evt.currentTarget.checkValidity()) {
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
  }
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  if (evt.currentTarget.checkValidity()) {
    addCard(elementsList, createNewCard(cardNameInput.value, cardLinkInput.value));
    closePopup(popupAddCard);
  }
}

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleClose(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

for (let item of initialCards)
  addCard(elementsList, createNewCard(item.name, item.link));

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  toggleButtonState(formEditProfile, buttonEditProfile, settings);
  hideInputError(formEditProfile, nameInput, settings);
  hideInputError(formEditProfile, jobInput, settings);
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  toggleButtonState(formAddCard, buttonAddCard, settings);
  hideInputError(formAddCard, cardNameInput, settings);
  hideInputError(formAddCard, cardLinkInput, settings);
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
