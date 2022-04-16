import {initialCards, settings} from './data.js';
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
const buttonEditProfile = formEditProfile.elements.buttonSubmit;

const formAddCard = document.forms.formAddCard;
const cardNameInput = formAddCard.elements.cardName;
const cardLinkInput = formAddCard.elements.cardLink;
const buttonAddCard = formAddCard.elements.buttonSubmit;

function generateCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  return card.createNewCard();
}

function addCard(node, card) {
  node.prepend(card);
}

export function openPopup(popup) {
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
  const userInput = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }
  addCard(elementsList, generateCard(userInput, '.template-elements'));
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
  addCard(elementsList, generateCard(item, '.template-elements'));
});

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
