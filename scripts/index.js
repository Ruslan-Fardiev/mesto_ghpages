import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { config } from './constants.js';
import { FormValidator } from './FormValidator.js';

const formValidator = new FormValidator(config)
formValidator.enableValidation(config)

// выборка
const buttonOpenPopupProfile = document.querySelector('#profile-edit-button');
const popupEditProfileElement = document.querySelector('#popup-edit-profile');
const buttonClosePopup = popupEditProfileElement.querySelector('.popup__close-button');
const formProfileElement = popupEditProfileElement.querySelector('#popup-edit-form');
const nameInput = formProfileElement.querySelector('#input-name');
const jobInput = formProfileElement.querySelector('#input-job');
const profileUsername = document.querySelector('.profile__username');
const profileAboutMe = document.querySelector('.profile__paragrath');
const popupAddCardOpen = document.querySelector('#add-card-button');
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupAddCardClose = popupAddCardElement.querySelector('#add-card-close');
const placeInputLink = popupAddCardElement.querySelector('#input-place-link');
const placeInputName = popupAddCardElement.querySelector('#input-place-name');
const containerCards = document.querySelector('.cards');
const popupImageElement = document.querySelector('#popup-image');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageTitle = popupImageElement.querySelector('.popup__image-title');
const popupImageCloseButton = popupImageElement.querySelector('#image-close-button');

// добавить значения элементов данных пользователя в поля ввода блока редактирования данных пользователя
const openPropfilePopup = () => {
    const event = new Event('input');
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    openPopup(popupEditProfileElement);
    nameInput.dispatchEvent(event);
}

// открытие поп-ап блоков
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    addEventListener('keydown', keyHandler);
}

// закрытие поп-ап блоков
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    removeEventListener('keydown', keyHandler);
}

// закрытие поп-ап кнопкой ESC
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};


// закрытие поп-ап блоков нажатием на overlay
function closePopupWithOverlay() {
    const popupOverlayElement = document.querySelectorAll('.popup__overlay');

    [...popupOverlayElement].forEach((overlayItem) => {
        overlayItem.addEventListener('click', () => closePopup(popupEditProfileElement));
        overlayItem.addEventListener('click', () => closePopup(popupAddCardElement));
        overlayItem.addEventListener('click', () => closePopup(popupImageElement));
    })
}

closePopupWithOverlay()

// редактирование данных пользователя
const editProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    closePopup(popupEditProfileElement);
}

// рендеринг карточек
const renderCard = (data, container) => {
    const cardsElement = new Card({ data, openImage }, '#add-card-template').createCard();
    const card = cardsElement;
    container.prepend(card);
}

// добавление элементов массива в карточки
initialCards.forEach(card => {
    renderCard(card, containerCards)
})

// добавление новой карточки
const handleNewCard = (evt) => {
    evt.preventDefault();
    const data = {
        name: placeInputName.value,
        link: placeInputLink.value
    }

    renderCard(data, containerCards)
    closePopup(popupAddCardElement);
    evt.target.reset();
}

// создание попап с картинкой
function openImagePopup(data) {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupImageTitle.textContent = data.name;
}

// открытие попап с картинкой
function openImage(data) {
    const card = openImagePopup(data);
    openPopup(popupImageElement);
}

// обратчики событий
buttonOpenPopupProfile.addEventListener('click', openPropfilePopup);
buttonClosePopup.addEventListener('click', () => closePopup(popupEditProfileElement));
formProfileElement.addEventListener('submit', editProfileFormSubmit);
popupAddCardOpen.addEventListener('click', () => openPopup(popupAddCardElement));
popupAddCardClose.addEventListener('click', () => closePopup(popupAddCardElement));
popupAddCardElement.addEventListener('submit',
    (evt) => {
        handleNewCard(evt);
    }
);
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageElement));
