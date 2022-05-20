export const settingsForm = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_status_error',
  errorClass: 'popup__input-error_active'
}

export const selectors = {
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
  cardListSelector: '.elements__list',
  templateSelector: '.template-elements',
  popupEditProfile: '.popup_type_edit-profile',
  popupAddCard: '.popup_type_add-card',
  popupShowCard: '.popup_type_show-card',
  popupConfirm: '.popup_type_confirm'
}

export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');
export const formList = Array.from(document.forms);
