//Редактирование данных профиля
//выборка поп-ап блока редактирования данных профиля 
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.popup__edit-form');
const nameInput = formElement.querySelector('#input-name');
const jobInput = formElement.querySelector('#input-job');
const profileUsername = document.querySelector('.profile__username');
const profileAboutMe = document.querySelector('.profile__paragrath');

// включение поп-ап блока редактирования данных профиля
const addPopup = function () {
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileAboutMe.textContent;
    popupElement.classList.add('popup_opened');
}

// закрытие поп-ап блока редактирования данных профиля
const removePopup = function () {
    popupElement.classList.remove('popup_opened');
}

// редактирование данных пользователя
const handleFormSubmit = function (evt) {
    evt.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileAboutMe.textContent = jobInput.value;
    removePopup();
}

//обратчики событий
popupOpenButtonElement.addEventListener('click', addPopup);
popupCloseButtonElement.addEventListener('click', removePopup);
formElement.addEventListener('submit', handleFormSubmit);


//Карточки с фотографиями
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
const cards = document.querySelector('.cards');
const template = document.querySelector('#add-card-template');

//функция создания карточек
const createCards = function addCard(item) {
    const card = template.content.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = item.link;
    card.querySelector('.card__title').textContent = item.name;
    card.querySelector('.card__image').alt = item.name;
    cards.append(card);

    //Лайк карточек
    card.querySelector('.card__like-button')
        .addEventListener('click', function (evt) {
            evt.preventDefault();
            evt.target.classList.toggle('card__like-button_active');
        });
    //Удаление карточки
    card.querySelector('.card__delete-button')
        .addEventListener('click', function () {
            card.remove();
        });
}

//функция добавление элементов массива в карточки
const cardList = initialCards.map(addCard => {
    const cardElement = createCards(addCard);
})



