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

function createNewCard(name, link) {
  const newCard = cardTemplate.firstElementChild.cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');
  cardImage.src = link;
  cardImage.alt = name;
  newCard.querySelector('.elements__title').textContent = name;
  newCard.querySelector('.elements__button-like').addEventListener('click', (evt) => {
    evt.currentTarget.classList.toggle('elements__button-like_active');
  });
  newCard.querySelector('.elements__remove').addEventListener('click', () => {
    newCard.remove();
  });
  cardImage.addEventListener('click', () => {
    showCardImage.src = cardImage.src;
    showCardImage.alt = cardImage.alt;
    showCardCaption.textContent = cardImage.alt;
    openPopup(popupShowCard);
  });
  return newCard;
}

function addCard(node, card) {
  node.prepend(card);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  if (nameInput.value)
    userName.textContent = nameInput.value;
  if (jobInput.value)
    userJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  if (cardNameInput.value && cardLinkInput.value)
    addCard(elementsList, createNewCard(cardNameInput.value, cardLinkInput.value));
  closePopup(popupAddCard);
}

for (let item of initialCards)
  addCard(elementsList, createNewCard(item.name, item.link));

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  openPopup(popupAddCard);
});

closeFormButtons.forEach(item => item.addEventListener('click', (evt) => {
  closePopup(evt.currentTarget.closest('.popup'));
}));

formEditProfile.addEventListener('submit', handleProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
