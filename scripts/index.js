const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.popup__container')
let nameInput = formElement.querySelector('#input-name');
let jobInput = formElement.querySelector('#input-job');
let profileUsername = document.querySelector('.profile__username');
let profileAboutMe = document.querySelector('.profile__paragrath');

// включение поп-апа
const addPopup = function() {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    popupElement.classList.add('popup_opened');
}

// закрытие поп-апа
const removePopup = function() {
    popupElement.classList.remove('popup_opened');
}

// редактирование данных пользователя
const handleFormSubmit = function(evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    removePopup();
}

popupOpenButtonElement.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);
formElement.addEventListener('submit', handleFormSubmit);

