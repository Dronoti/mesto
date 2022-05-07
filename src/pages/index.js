import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  settingsForm,
  editProfileButton,
  addCardButton,
  userName,
  userJob,
  elementsList,
  popupEditProfile,
  popupAddCard,
  formEditProfile,
  nameInput,
  jobInput,
  formAddCard,
  cardNameInput,
  cardLinkInput,
  formList,
  formValidatorsObj
} from '../utils/constants.js';

formList.forEach(form => {
  const formValidator = new FormValidator(settingsForm, form);
  formValidator.enableValidation();
  formValidatorsObj[form.name] = formValidator;
});

function generateCard(name, link, templateSelector='.template-elements') {
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
  popup.addEventListener('mousedown', handleClose);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleEsc);
  popup.removeEventListener('mousedown', handleClose);
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
  addCard(elementsList, generateCard(cardNameInput.value, cardLinkInput.value));
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
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
    closePopup(evt.currentTarget);
}

initialCards.forEach(item => {
  addCard(elementsList, generateCard(item.name, item.link));
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  formValidatorsObj.formEditProfile.resetValidation();
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  formAddCard.reset();
  formValidatorsObj.formAddCard.resetValidation();
  openPopup(popupAddCard);
});

formEditProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
