export class FormValidator {
    #config;
    #formElement;
    #buttonSelector;
    #inActiveButtonClass;
    #inputErrorClass;
    #inputList;
    #buttonElement

    constructor(config, formElement) {
        this.#config = config;
        this.#buttonSelector = config.buttonSelector;
        this.#inActiveButtonClass = config.inActiveButtonClass;
        this.#inputErrorClass = config.inputErrorClass;
        this.#formElement = formElement;
        this.#inputList = Array.from(formElement.querySelectorAll(this.#config.inputSelector));
        this.#buttonElement = this.#formElement.querySelector(this.#buttonSelector);
    }

    // Функция появления ошибки на инпутах
    #showError(inputElement) {
        const errorElement = this.#formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // Функция удаления ошибки на инпутах
    #hideError(inputElement) {
        const errorElement = this.#formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // Функция блокировки кнопки
    #disabledButton() {
        this.#buttonElement.disabled = 'disabled';
        this.#buttonElement.classList.add(this.#inActiveButtonClass);
    }

    // Функция разблокировки кнопки
    #enableButton() {
        this.#buttonElement.disabled = false;
        this.#buttonElement.classList.remove(this.#inActiveButtonClass);
    }

    #hasInvalidInput() {
        return this.#inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    // Функция изменения состояния кнопки
    #toggleButton() {
        if (this.#hasInvalidInput()) {
            this.#disabledButton(this.#buttonElement);
        } else {
            this.#enableButton(this.#buttonElement);
        }
    }

    // Функция изменения состояния ошибки на инпутах
    #checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;

        if (!isInputValid) {
            this.#showError(inputElement);
        } else {
            this.#hideError(inputElement);
        }
    }

    // Установка слушателей на сабмит и инпут
    #setEventListener() {
        this.#toggleButton();

        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.#toggleButton();
                this.#checkInputValidity(inputElement)
            });
        })
    }

    enableValidation() {
        this.#setEventListener()
    }

    resetValidation() {
        this.#toggleButton();
        this.#inputList.forEach((inputElement) => {
            this.#hideError(inputElement);
        });
    }

}
