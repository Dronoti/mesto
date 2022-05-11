import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  settingsForm,
  selectors,
  editProfileButton,
  addCardButton,
  formList
} from '../utils/constants.js';

const formValidatorsObj = {};

const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, handlerProfileSubmit);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(selectors.popupAddCard, handlerAddCardSubmit);
popupAddCard.setEventListeners();

const popupShowCard = new PopupWithImage(selectors.popupShowCard);
popupShowCard.setEventListeners();

const userInfo = new UserInfo(selectors);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, popupShowCard.open.bind(popupShowCard), selectors);
    cardsList.addItem(card.createNewCard());
  }
}, selectors.cardListSelector);

function handlerProfileSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(this.inputValuesObj);
  popupEditProfile.close();
}

function handlerAddCardSubmit(evt) {
  evt.preventDefault();
  const card = new Card(this.inputValuesObj, popupShowCard.open.bind(popupShowCard), selectors);
  cardsList.addItem(card.createNewCard());
  popupAddCard.close();
}

formList.forEach(form => {
  const formValidator = new FormValidator(settingsForm, form);
  formValidator.enableValidation();
  formValidatorsObj[form.name] = formValidator;
});

editProfileButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidatorsObj.formEditProfile.resetValidation();
  popupEditProfile.open();
});

addCardButton.addEventListener('click', () => {
  formValidatorsObj.formAddCard.resetValidation();
  popupAddCard.open();
});

cardsList.renderItems();
