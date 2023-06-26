// Объект с селекторами и классами
const configFormSelector = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inActiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input_invalid'

}

// Функция появления ошибки на инпутах
function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Функция удаления ошибки на инпутах
function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

// Функция блокировки кнопки
function disabledButton(buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inActiveButtonClass);
}

// Функция разблокировки кнопки
function enableButton(buttonElement, config) {
    buttonElement.disabled = 'enable';
    buttonElement.classList.remove(config.inActiveButtonClass);
}

// Функция изменения состояния кнопки
function toggleButton(buttonElement, isActive, config) {
    if (!isActive) {
        disabledButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}

// Функция изменения состояния ошибки на инпутах
function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!errorElement) return;

    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }

}

// Установка слушателей на сабмит и инпут
function setEventListener(formElement, config) {
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    const buttonElement = formElement.querySelector(config.buttonSelector);

    toggleButton(buttonElement, formElement.checkValidity(), config);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    [...inputsList].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            toggleButton(buttonElement, formElement.checkValidity(), config);
            checkInputValidity(inputItem, formElement, config)
        });
    })
}

// Находим формы и перебираем их
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    [...forms].forEach((formItem) => {
        setEventListener(formItem, config)
    });
}

enableValidation(configFormSelector);