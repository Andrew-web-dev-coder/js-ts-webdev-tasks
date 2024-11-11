import { createImage } from './Image';
import { createTags } from './Tags';

export function createCard(cardData: {
    title: string;
    description: string;
    image: string;
    tags: string[];
}): HTMLElement {
    const card = document.createElement('div');
    card.className = 'works__item';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'works__item-image-container';
    const imageElement = createImage(cardData.image);
    imageContainer.appendChild(imageElement);
    
    const content = document.createElement('div');
    content.className = 'works__item-content';

    const title = document.createElement('h3');
    title.className = 'works__item-title';
    title.textContent = cardData.title;

    const description = document.createElement('p');
    description.className = 'works__item-description';
    description.textContent = cardData.description;

    const tags = createTags(cardData.tags);

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tags);

    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
}
