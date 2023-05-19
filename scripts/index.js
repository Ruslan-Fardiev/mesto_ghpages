//выборка
const editProfileOpenButtonElement = document.querySelector('#profile-edit-button');
const popupEditProfileElement = document.querySelector('#popup-edit-profile');
const editProfileCloseButtonElement = popupEditProfileElement.querySelector('#edit-profile-close');
const editProfileFormElement = popupEditProfileElement.querySelector('#popup-edit-form');
const nameInput = editProfileFormElement.querySelector('#input-name');
const jobInput = editProfileFormElement.querySelector('#input-job');
const profileUsername = document.querySelector('.profile__username');
const profileAboutMe = document.querySelector('.profile__paragrath');
const popupAddCardOpen = document.querySelector('#add-card-button');
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupAddCardClose = popupAddCardElement.querySelector('#add-card-close');
const addCardFormElement = popupAddCardElement.querySelector('#popup-add-card-form');
const inputPlaceLink = popupAddCardElement.querySelector('#input-place-link');
const inputPlaceName = popupAddCardElement.querySelector('#input-place-name');
const containerCards = document.querySelector('.cards');
const templateCards = document.querySelector('#add-card-template');
const popupImageElement = document.querySelector('.popup-image');
const popupImageCloseButton = popupImageElement.querySelector('.popup-image__close-button')

// включение поп-ап блока редактирования данных профиля
const openPopupEditProfile = function () {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    popupEditProfileElement.classList.add('popup_opened');
}

// закрытие поп-ап блока редактирования данных профиля
const removePopupEditProfile = function () {
    popupEditProfileElement.classList.remove('popup_opened');
}

// редактирование данных пользователя
const editProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    removePopupEditProfile();
}

//включение поп-ап блока добавления карточек
const openPopupAddCard = function () {
    popupAddCardElement.classList.add('popup_opened');
}

//выключение поп-ап блока добавления карточек
const removePopupAddCard = function () {
    popupAddCardElement.classList.remove('popup_opened');
}

//функция создания карточек
const createCard = (item) => {
    const card = templateCards.content.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    cardImage.alt = item.name;

    card.querySelector('.card__like-button').addEventListener('click', handleLikeClick);
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    card.querySelector('.card__image-button').addEventListener('click', () => openImage(item))

    return card;
}

const renderCard = (container, data) => {
    const card = createCard(data);
    container.prepend(card);
}

//функция добавление элементов массива в карточки
initialCards.forEach(card => {
    renderCard(containerCards, card)
})

//функция добавления новой карточки
const createNewCard = (evt) => {
    evt.preventDefault();
    const data = {
        name: inputPlaceName.value,
        link: inputPlaceLink.value
    }

    renderCard(containerCards, data)
    removePopupAddCard();
}

//Лайк карточек
function handleLikeClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__like-button_active');
}

//Удаление карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

function createImagePopup(card) {
    const popupImage = popupImageElement.querySelector('.popup-image__image');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageElement.querySelector('.popup-image__title').textContent = card.name;
    return popupImageElement
}

//Открыть попап с картинкой
function openImage(data) {
    const card = createImagePopup(data);
    popupImageElement.classList.add('popup-image_opened');
}

//Закрыть попап с картинкой
function closePopup() {
    popupImageElement.classList.remove('popup-image_opened');
}

//обратчики событий
editProfileOpenButtonElement.addEventListener('click', openPopupEditProfile);
editProfileCloseButtonElement.addEventListener('click', removePopupEditProfile);
editProfileFormElement.addEventListener('submit', editProfileFormSubmit);
popupAddCardOpen.addEventListener('click', openPopupAddCard);
popupAddCardClose.addEventListener('click', removePopupAddCard);
popupAddCardElement.addEventListener('submit',
    (evt) => {
        createNewCard(evt);
        evt.preventDefault();
        evt.target.reset();
        evt.target.reset();
    }
);
popupImageCloseButton.addEventListener('click', closePopup)