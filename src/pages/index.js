import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  settingsForm,
  editProfileButton,
  addCardButton,
  userName,
  userJob,
  formList,
  formValidatorsObj
} from '../utils/constants.js';

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', handleAddCardSubmit);
popupAddCard.setEventListeners();

const popupShowCard = new PopupWithImage('.popup_type_show-card');
popupShowCard.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, popupShowCard.open.bind(popupShowCard), '.template-elements');
    cardsList.addItem(card.createNewCard());
  }
}, '.elements__list');

formList.forEach(form => {
  const formValidator = new FormValidator(settingsForm, form);
  formValidator.enableValidation();
  formValidatorsObj[form.name] = formValidator;
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupEditProfile.inputValuesObj.profileName.value;
  userJob.textContent = popupEditProfile.inputValuesObj.profileJob.value;
  popupEditProfile.close();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: popupAddCard.inputValuesObj.cardName.value,
    link: popupAddCard.inputValuesObj.cardLink.value
  };
  const card = new Card(data, popupShowCard.open.bind(popupShowCard), '.template-elements');
  cardsList.addItem(card.createNewCard());
  popupAddCard.close();
}

editProfileButton.addEventListener('click', () => {
  popupEditProfile.inputValuesObj.profileName.value = userName.textContent;
  popupEditProfile.inputValuesObj.profileJob.value = userJob.textContent;
  formValidatorsObj.formEditProfile.resetValidation();
  popupEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  formValidatorsObj.formAddCard.resetValidation();
  popupAddCard.open();
});

cardsList.renderItems();
