import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  settingsForm,
  selectors,
  editProfileButton,
  addCardButton,
  editAvatarButton,
  formList
} from '../utils/constants.js';

let cardsList = {};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'b1568769-e5c9-45d8-96dd-c3a661412496',
    'Content-Type': 'application/json'
  }
});

const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, handlerProfileSubmit);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(selectors.popupAddCard, handlerAddCardSubmit);
popupAddCard.setEventListeners();

const popupShowCard = new PopupWithImage(selectors.popupShowCard);
popupShowCard.setEventListeners();

const popupConfirm = new PopupWithSubmit(selectors.popupConfirm, handleConfirmSubmit);
popupConfirm.setEventListeners();

const userInfo = new UserInfo(selectors);

function renderUserInfo(info) {
  userInfo.setUserInfo({
    profileName: info.name,
    profileJob: info.about
  });
}

function renderInitialCards(initialCards) {
  cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      const card = new Card(
        item,
        userInfo.getUserId() === item.owner._id,
        popupShowCard.open.bind(popupShowCard),
        popupConfirm.open.bind(popupConfirm),
        selectors
      );
      cardsList.addItem(card.createNewCard());
    }
  }, selectors.cardListSelector);
  cardsList.renderItems();
}

function handlerProfileSubmit(evt) {
  evt.preventDefault();
  popupEditProfile.showLoading(true);
  api.patchUserInfo(this.inputValuesObj)
    .then(renderUserInfo)
    .catch(err => console.log(err))
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.showLoading(false);
    });
}

function handlerAddCardSubmit(evt) {
  evt.preventDefault();
  popupAddCard.showLoading(true);
  api.postNewCard(this.inputValuesObj)
    .then(() => api.getInitialCards())
    .then((cards) => cardsList.updateSection(cards.reverse()))
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.close();
      popupAddCard.showLoading(false);
    });
}

function handleConfirmSubmit(evt) {
  evt.preventDefault();
  api.deleteCard(popupConfirm.getDataToSend())
    .then(() => api.getInitialCards())
    .then((cards) => cardsList.updateSection(cards.reverse()))
    .catch(err => console.log(err))
    .finally(() => {
      popupConfirm.close();
    })
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    renderUserInfo(info);
    userInfo.setUserAvatar(info.avatar);
    userInfo.setUserId(info._id);
    renderInitialCards(initialCards);

    const formValidatorsObj = {};

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
  })
  .catch(err => console.log(err));
