import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import {
  initialCards,
  settingsForm,
  editProfileButton,
  addCardButton,
  userName,
  userJob,
  elementsListSelector,
  popupEditProfile,
  popupAddCard,
  formEditProfile,
  nameInput,
  jobInput,
  formAddCard,
  cardNameInput,
  cardLinkInput,
  formList,
  formValidatorsObj,
  showCardImage,
  showCardCaption,
  popupShowCard
} from '../utils/constants.js';

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, handleCardClick, '.template-elements');
    cardsList.addItem(card.createNewCard());
  }
}, elementsListSelector);

formList.forEach(form => {
  const formValidator = new FormValidator(settingsForm, form);
  formValidator.enableValidation();
  formValidatorsObj[form.name] = formValidator;
});

function handleCardClick(name, link) {
  showCardImage.src = link;
  showCardImage.alt = name;
  showCardCaption.textContent = name;
  openPopup(popupShowCard);
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

  const data = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  const card = new Card(data, handleCardClick, '.template-elements');
  cardsList.addItem(card.createNewCard());
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

cardsList.renderItems();
