const editProfileButton = document.querySelector('.profile__edit-button');
const closeFormButtons = document.querySelectorAll('.popup__close');
const addCardButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.template-elements').content;

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupShowCard = document.querySelector('.popup_type_show-card');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_profile_name');
const jobInput = formEditProfile.querySelector('.popup__input_profile_job');

const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddCard.querySelector('.popup__input_card_name');
const cardLinkInput = formAddCard.querySelector('.popup__input_card_link');

const showCardImage = popupShowCard.querySelector('.popup__image');
const showCardCaption = popupShowCard.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addNewCard(name, link) {
  const newCard = cardTemplate.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = link;
  cardImage.alt = name;
  newCard.querySelector('.elements__title').textContent = name;
  elementsList.prepend(newCard);
}

function toggleOpenPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function formProfileHandler(evt) {
  evt.preventDefault();
  if (nameInput.value)
    userName.textContent = nameInput.value;
  if (jobInput.value)
    userJob.textContent = jobInput.value;
  toggleOpenPopup(popupEditProfile);
}

function formAddCardHandler(evt) {
  evt.preventDefault();
  if (cardNameInput.value && cardLinkInput.value)
    addNewCard(cardNameInput.value, cardLinkInput.value);
  toggleOpenPopup(popupAddCard);
}

for (let item of initialCards)
  addNewCard(item.name, item.link);

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  toggleOpenPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  toggleOpenPopup(popupAddCard);
});

closeFormButtons.forEach(item => item.addEventListener('click', (evt) => {
  toggleOpenPopup(evt.target.closest('.popup'));
}));

elementsList.addEventListener('click', (evt) => {
  const like = evt.target.closest('.elements__button-like');
  const remove = evt.target.closest('.elements__remove');
  const show = evt.target.closest('.elements__image');
  if (like)
    like.classList.toggle('elements__button-like_active');
  else if (remove)
    remove.closest('.elements__item').remove();
  else if (show) {
    showCardImage.src = show.src;
    showCardImage.alt = show.alt;
    showCardCaption.textContent = show.alt;
    toggleOpenPopup(popupShowCard);
  }
});

formEditProfile.addEventListener('submit', formProfileHandler);
formAddCard.addEventListener('submit', formAddCardHandler);
