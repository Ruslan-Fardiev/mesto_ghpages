export class FormValidator {
    #config;
    #formSelector;
    #formElement;
    #inputSelector;
    #buttonSelector;
    #inActiveButtonClass;
    #inputErrorClass;

    constructor(config, formElement) {
        this.#config = config;
        this.#formSelector = config.formSelector;
        this.#inputSelector = config.inputSelector;
        this.#buttonSelector = config.buttonSelector;
        this.#inActiveButtonClass = config.inActiveButtonClass;
        this.#inputErrorClass = config.inputErrorClass;
        this.#formElement = formElement;
    }

    // Функция появления ошибки на инпутах
    #showError(inputElement, errorElement) {
        inputElement.classList.add(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // Функция удаления ошибки на инпутах
    #hideError(inputElement, errorElement) {
        inputElement.classList.remove(this.#inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    // Функция блокировки кнопки
    disabledButton() {
        this.buttonElement.disabled = 'disabled';
        this.buttonElement.classList.add(this.#inActiveButtonClass);
    }

    // Функция разблокировки кнопки
    enableButton() {
    this.buttonElement.disabled = false;
    this.buttonElement.classList.remove(this.#inActiveButtonClass);
    }

    // Функция изменения состояния кнопки
    #toggleButton(isActive) {

        if (!isActive) {
            this.disabledButton(this.buttonElement);
        } else {
            this.enableButton(this.buttonElement);
        }
    }

    // Функция изменения состояния ошибки на инпутах
    #checkInputValidity(inputElement, formElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        if (!errorElement) return;

        if (!isInputValid) {
            this.#showError(inputElement, errorElement);
        } else {
            this.#hideError(inputElement, errorElement);
        }

    }

    // Установка слушателей на сабмит и инпут
    #setEventListener(formElement) {
        const inputsList = formElement.querySelectorAll(this.#inputSelector);
        this.buttonElement = formElement.querySelector(this.#buttonSelector);

        this.#toggleButton(this.buttonElement, formElement.checkValidity());

        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        [...inputsList].forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this.#toggleButton(this.buttonElement, formElement.checkValidity());
                this.#checkInputValidity(inputItem, formElement)
            });
        })
    }

    // Находим формы и перебираем их
    enableValidation() {
        const forms = document.querySelectorAll(this.#formSelector);
        [...forms].forEach((formItem) => {
            this.#setEventListener(formItem)
        });
    }

}