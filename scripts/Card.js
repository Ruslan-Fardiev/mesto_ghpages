
export class Card {
    #data;
    #card;
    #templateSelector;
    #openImage;

    #getTemplate() {
        return document.querySelector(this.#templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }
    constructor({ data, openImage }, templateSelector) {
        this.#data = data;
        this.#templateSelector = templateSelector;
        this.#openImage = openImage;
    }

    // лайк карточек
    #handleLikeClick(evt) {
        evt.preventDefault();
        evt.target.classList.toggle('card__like-button_active');
    }

    // удаление карточки
    #deleteCard = () => {
        this.#card.remove();
    } 

    createCard() {
        this.#card = this.#getTemplate();
        const cardImage = this.#card.querySelector('.card__image');
        cardImage.src = this.#data.link;
        cardImage.alt = this.#data.name;
        this.#card.querySelector('.card__title').textContent = this.#data.name;

        this.#card.querySelector('.card__like-button').addEventListener('click', this.#handleLikeClick);
        this.#card.querySelector('.card__delete-button').addEventListener('click', this.#deleteCard);
        this.#card.querySelector('.card__image-button').addEventListener('click', () => this.#openImage(this.#data))

        return this.#card;
    }

}