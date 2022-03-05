let editProfileButton = document.querySelector('.profile__edit-button');
let closeFormButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_profile_name');
let jobInput = formElement.querySelector('.popup__input_profile_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__description');

editProfileButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  popup.classList.add('popup_opened')
});
closeFormButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

function formSubmitHandler (evt) {
  evt.preventDefault();
  if (nameInput.value)
    userName.textContent = nameInput.value;
  if (jobInput.value)
    userJob.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
