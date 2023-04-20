const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__container')
let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');
let profileUsername = document.querySelector('.profile__username');
let profileAboutMe = document.querySelector('.profile__paragrath');

const addPopup = function() {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    popupElement.classList.add('popup_opened');
    return undefined;
}

const removePopup = function() {
    popupElement.classList.remove('popup_opened');
    return undefined;
}

const handleFormSubmit = function(evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    removePopup();
    return undefined;
}

popupOpenButtonElement.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);
formElement.addEventListener('submit', handleFormSubmit);

