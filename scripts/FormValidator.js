export class FormValidator {
    #config;

    constructor(config) {
        this.#config = config;
    }

    // // Функция появления ошибки на инпутах
    #showError(inputElement, errorElement, config) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // // Функция удаления ошибки на инпутах
    #hideError(inputElement, errorElement, config) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // // Функция блокировки кнопки
    #disabledButton(buttonElement, config) {
        buttonElement.disabled = 'disabled';
        buttonElement.classList.add(config.inActiveButtonClass);
    }

    // // Функция разблокировки кнопки
    #enableButton(buttonElement, config) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inActiveButtonClass);
    }

    // // Функция изменения состояния кнопки
    #toggleButton(buttonElement, isActive, config) {
        if (!isActive) {
            this.#disabledButton(buttonElement, config);
        } else {
            this.#enableButton(buttonElement, config);
        }
    }

    // Функция изменения состояния ошибки на инпутах
    #checkInputValidity(inputElement, formElement, config) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        if (!errorElement) return;

        if (!isInputValid) {
            this.#showError(inputElement, errorElement, config);
        } else {
            this.#hideError(inputElement, errorElement, config);
        }

    }

    // Установка слушателей на сабмит и инпут
    #setEventListener(formElement, config) {
        const inputsList = formElement.querySelectorAll(config.inputSelector);
        const buttonElement = formElement.querySelector(config.buttonSelector);

        this.#toggleButton(buttonElement, formElement.checkValidity(), config);

        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        [...inputsList].forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this.#toggleButton(buttonElement, formElement.checkValidity(), config);
                this.#checkInputValidity(inputItem, formElement, config)
            });
        })
    }

    // Находим формы и перебираем их
    enableValidation(config) {
        const forms = document.querySelectorAll(config.formSelector);
        [...forms].forEach((formItem) => {
            this.#setEventListener(formItem, config)
        });
    }

}