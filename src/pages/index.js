import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  settingsForm,
  editProfileButton,
  addCardButton,
  formList,
  formValidatorsObj
} from '../utils/constants.js';

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', handleAddCardSubmit);
popupAddCard.setEventListeners();

const popupShowCard = new PopupWithImage('.popup_type_show-card');
popupShowCard.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__description'
});

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
  userInfo.setUserInfo(popupEditProfile.inputValuesObj);
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
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfile.inputValuesObj.profileName.value = currentUserInfo.profileName;
  popupEditProfile.inputValuesObj.profileJob.value = currentUserInfo.profileJob;
  formValidatorsObj.formEditProfile.resetValidation();
  popupEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  formValidatorsObj.formAddCard.resetValidation();
  popupAddCard.open();
});

cardsList.renderItems();
