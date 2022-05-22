import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  settingsForm,
  selectors,
  buttons,
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

const popupUpdateAvatar = new PopupWithForm(selectors.popupUpdateAvatar, handlerAvatarSubmit)
popupUpdateAvatar.setEventListeners();

const popupShowCard = new PopupWithImage(selectors.popupShowCard);
popupShowCard.setEventListeners();

const popupConfirm = new PopupWithConfirmation(selectors.popupConfirm, handleConfirmSubmit);
popupConfirm.setEventListeners();
popupConfirm.showLoading = popupEditProfile.showLoading;

const userInfo = new UserInfo(selectors);

function renderUserInfo(info) {
  userInfo.setUserInfo({
    profileName: info.name,
    profileJob: info.about
  });
}

function createCard(item) {
  const card = new Card(
    item,
    userInfo.getUserId(),
    popupShowCard.open.bind(popupShowCard),
    popupConfirm.open.bind(popupConfirm),
    handleButtonLike,
    selectors
  );
  return card.createNewCard();
}

function renderInitialCards(initialCards) {
  cardsList = new Section({
    items: initialCards.reverse(),
    renderer: item => cardsList.addItem(createCard(item))
  }, selectors.cardListSelector);
  cardsList.renderItems();
}

function handlerProfileSubmit(evt) {
  evt.preventDefault();
  popupEditProfile.showLoading('Сохранение...');
  api.patchUserInfo(this.inputValuesObj)
    .then(info => {
      renderUserInfo(info);
      popupEditProfile.close();
    })
    .catch(err => alert(err))
    .finally(() => popupEditProfile.showLoading('Сохранить'));
}

function handlerAddCardSubmit(evt) {
  evt.preventDefault();
  popupAddCard.showLoading('Создание...');
  api.postNewCard(this.inputValuesObj)
    .then(() => api.getInitialCards())
    .then(cards => {
      cardsList.updateSection(cards.reverse());
      popupAddCard.close();
    })
    .catch(err => alert(err))
    .finally(() => popupAddCard.showLoading('Создать'));
}

function handleConfirmSubmit(evt) {
  evt.preventDefault();
  popupConfirm.showLoading('Удаление...');
  api.deleteCard(popupConfirm.getDataToSend())
    .then(() => api.getInitialCards())
    .then(cards => {
      cardsList.updateSection(cards.reverse());
      popupConfirm.close();
    })
    .catch(err => alert(err))
    .finally(() => popupConfirm.showLoading('Да'));
}

function handleButtonLike(cardId, isLiked) {
  const promise = isLiked ? api.deleteLike(cardId) : api.addLike(cardId);
  promise
    .then(res => this.setLikes(res.likes))
    .catch(err => alert(err));
}

function handlerAvatarSubmit(evt) {
  evt.preventDefault();
  popupUpdateAvatar.showLoading('Сохранение...');
  api.patchUserAvatar(this.inputValuesObj)
    .then(info => {
      userInfo.setUserAvatar(info.avatar);
      popupUpdateAvatar.close();
    })
    .catch(err => alert(err))
    .finally(() => popupUpdateAvatar.showLoading('Сохранить'));
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

    buttons.editProfileButton.addEventListener('click', () => {
      popupEditProfile.setInputValues(userInfo.getUserInfo());
      formValidatorsObj.formEditProfile.resetValidation();
      popupEditProfile.open();
    });

    buttons.addCardButton.addEventListener('click', () => {
      formValidatorsObj.formAddCard.resetValidation();
      popupAddCard.open();
    });

    buttons.editAvatarButton.addEventListener('click', () => {
      formValidatorsObj.formUpdAvatar.resetValidation();
      popupUpdateAvatar.open();
    });
  })
  .catch(err => alert(err));
