// выборка
const editProfileOpenButtonElement = document.querySelector('#profile-edit-button');
const popupEditProfileElement = document.querySelector('#popup-edit-profile');
const closeButtonElement = popupEditProfileElement.querySelector('.popup__close-button');
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
const popupImageElement = document.querySelector('#popup-image');
const popupImageCloseButton = popupImageElement.querySelector('#image-close-button')

// добавить значения элементов данных пользователя в поля ввода блока редактирования данных пользователя
const addProfileData = () => {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    return editProfileFormElement
}

// включение поп-ап блоков
const openPopup = function (popup, profile) {
    const profileData = addProfileData(profile);
    popup.classList.add('popup_opened');
}

// закрытие поп-ап блоков
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
}

// редактирование данных пользователя
const editProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    closePopup();
}

// создание карточек
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

// добавление элементов массива в карточки
initialCards.forEach(card => {
    renderCard(containerCards, card)
})

// добавление новой карточки
const handleNewCard = (evt) => {
    evt.preventDefault();
    const data = {
        name: inputPlaceName.value,
        link: inputPlaceLink.value
    }

    renderCard(containerCards, data)
    removePopupAddCard();
    evt.target.reset();
}

// лайк карточек
function handleLikeClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__like-button_active');
}

// удаление карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// создание попап с картинкой
function createImagePopup(card) {
    const popupImage = popupImageElement.querySelector('.popup__image');
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageElement.querySelector('.popup__image-title').textContent = card.name;
    return popupImageElement
}

// открытие попап с картинкой
function openImage(data) {
    const card = createImagePopup(data);
    popupImageElement.classList.add('popup_opened');
}

// обратчики событий
editProfileOpenButtonElement.addEventListener('click', () => openPopup(popupEditProfileElement));
closeButtonElement.addEventListener('click', () => closePopup(popupEditProfileElement));
editProfileFormElement.addEventListener('submit', editProfileFormSubmit);
popupAddCardOpen.addEventListener('click', () => openPopup(popupAddCardElement));
popupAddCardClose.addEventListener('click', () => closePopup(popupAddCardElement));
popupAddCardElement.addEventListener('submit',
    (evt) => {
        handleNewCard(evt);
    }
);
popupImageCloseButton.addEventListener('click', () => closePopup(popupImageElement))