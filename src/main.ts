import "../style.css"; 
import cardsData from "./db/cards.json";
import { createCard } from "./components/Card";

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    if (app) {
        const section = document.createElement('section');
        section.className = 'works';

        const header = document.createElement('div');
        header.className = 'works__header';

        const title = document.createElement('h2');
        title.className = 'works__title';
        title.textContent = 'Our Works';

        const description = document.createElement('p');
        description.className = 'works__description';
        description.innerHTML = 'The most important part of the Startup Framework is the samples. The<br>samples form a set of 20 usable pages you can use as is or you can add<br>new blocks from UI Kit.';

        header.appendChild(title);
        header.appendChild(description);
        section.appendChild(header);

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'works__items';

        cardsData.forEach(cardData => {
            const card = createCard(cardData);
            itemsContainer.appendChild(card);
        });

        section.appendChild(itemsContainer);
        app.appendChild(section);
    }
});
