import {initialCards, settingsForm} from './data.js';
import FormValidator from "./FormValidator.js";
import Card from './Card.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');
const elementsList = document.querySelector('.elements__list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const formEditProfile = document.forms.formEditProfile;
const nameInput = formEditProfile.elements.profileName;
const jobInput = formEditProfile.elements.profileJob;

const formAddCard = document.forms.formAddCard;
const cardNameInput = formAddCard.elements.cardName;
const cardLinkInput = formAddCard.elements.cardLink;

const formList = Array.from(document.forms);

formList.forEach(form => {
  const formValidator = new FormValidator(settingsForm, form);
  formValidator.enableValidation();
});

function generateCard(name, link, templateSelector) {
  const data = {
    name: name,
    link: link,
    openPopup: openPopup
  }
  const card = new Card(data, templateSelector);
  return card.createNewCard();
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
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  addCard(elementsList, generateCard(cardNameInput.value, cardLinkInput.value, '.template-elements'));
  closePopup(popupAddCard);
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

initialCards.forEach(item => {
  addCard(elementsList, generateCard(item.name, item.link, '.template-elements'));
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  new FormValidator(settingsForm, formEditProfile).resetValidation();
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  new FormValidator(settingsForm, formAddCard).resetValidation();
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
