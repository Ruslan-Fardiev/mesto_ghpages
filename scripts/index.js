//Редактирование данных профиля
//выборка поп-ап блока редактирования данных профиля 
const editProfileOpenButtonElement = document.querySelector('#profile-edit-button');
const popupEditProfileElement = document.querySelector('#popup-edit-profile');
const editProfileCloseButtonElement = popupEditProfileElement.querySelector('#edit-profile-close');
const editProfileFormElement = popupEditProfileElement.querySelector('#popup-edit-form');
const nameInput = editProfileFormElement.querySelector('#input-name');
const jobInput = editProfileFormElement.querySelector('#input-job');
const profileUsername = document.querySelector('.profile__username');
const profileAboutMe = document.querySelector('.profile__paragrath');

// включение поп-ап блока редактирования данных профиля
const addPopupEditProfile = function () {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    popupEditProfileElement.classList.add('popup_opened');
}

// закрытие поп-ап блока редактирования данных профиля
const removePopupEditProfile = function () {
    popupEditProfileElement.classList.remove('popup_opened');
}

// редактирование данных пользователя
const handleFormSubmit = function (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    removePopupEditProfile();
}

//обратчики событий
editProfileOpenButtonElement.addEventListener('click', addPopupEditProfile);
editProfileCloseButtonElement.addEventListener('click', removePopupEditProfile);
editProfileFormElement.addEventListener('submit', handleFormSubmit);


//Карточки с фотографиями
//поп-ап добавления карточек
//выборка поп-ап блока добавления карточек
const popupAddCardOpen = document.querySelector('#add-card-button');
const popupAddCardElement = document.querySelector('#popup-add-card');
const popupAddCardClose = popupAddCardElement.querySelector('#add-card-close');
const addCardFormElement = popupAddCardElement.querySelector('#popup-add-card-form');
const inputPlaceLink = popupAddCardElement.querySelector('#input-place-link');
const inputPlaceName = popupAddCardElement.querySelector('#input-place-name');

//включение поп-ап блока добавления карточек
const addPopupAddCard = function (evt) {
    evt.preventDefault();
    inputPlaceLink.value = ('');
    inputPlaceName.value = ('');
    popupAddCardElement.classList.add('popup_opened');
}

//выключение поп-ап блока добавления карточек
const removePopupAddCard = function () {
    popupAddCardElement.classList.remove('popup_opened');
}

//обратчики событий
popupAddCardOpen.addEventListener('click', addPopupAddCard);
popupAddCardClose.addEventListener('click', removePopupAddCard);

//массив с карточками
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

//выборка карточек
const containerCards = document.querySelector('.cards');
const template = document.querySelector('#add-card-template');
const card = template.content.querySelector('.card');

//функция создания карточек
const createCard = (item) => {
    const card = template.content.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__image').alt = item.name;

    card.querySelector('.card__like-button').addEventListener('click', likeCard);
    card.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return card;
}

const renderCard = (container, data) => {
    const card = createCard(data);
    container.prepend(card);
}

//функция добавление элементов массива в карточки
const cardList = initialCards.map(card => {
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

popupAddCardElement.addEventListener('submit', (evt) => createNewCard(evt));

//Лайк карточек
function likeCard (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__like-button_active');
}

//Удаление карточки
function deleteCard (evt) {
    evt.target.closest('.card').remove();
}
