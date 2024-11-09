const cardsData = [
    {
        title: "Startup Framework",
        description: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
        background: "light",
        buttonColor: ""
    },
    {
        title: "Web Generator",
        description: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements.",
        background: "light-web",
        buttonColor: "green"
    },
    {
        title: "Slides 4",
        description: "All of these components are made in the same style, and can easily be integrated into projects, allowing you to create hundreds of solutions for your future projects.",
        background: "purple",
        buttonColor: ""
    },
    {
        title: "Postcards",
        description: "All frequently used elements are now in symbols. Use them to create interfaces really fast. Easily change icons, colors and text. Add new symbols to customize your design.",
        background: "image",
        buttonColor: ""
    }
];

function createButton(text, colorClass) {
    const button = document.createElement('button');
    button.className = 'last-works__item-button';
    if (colorClass) {
        button.classList.add(`last-works__item-button--${colorClass}`);
    }
    button.textContent = text;
    return button;
}

function createCard(cardData) {
    const card = document.createElement('div');
    card.className = `last-works__item last-works__item--${cardData.background}`;

    const title = document.createElement('h3');
    title.className = 'last-works__item-title';
    title.textContent = cardData.title;

    const description = document.createElement('p');
    description.className = 'last-works__item-description';
    description.textContent = cardData.description;

    const button = createButton('Explore', cardData.buttonColor);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

function createLastWorksSection() {
    const section = document.createElement('section');
    section.className = 'last-works';

    const header = document.createElement('div');
    header.className = 'last-works__header';

    const title = document.createElement('h2');
    title.className = 'last-works__title';
    title.textContent = 'Last works';

    const showcaseButton = createButton('Explore Showcase');
    showcaseButton.className = 'last-works__showcase-button';

    header.appendChild(title);
    header.appendChild(showcaseButton);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'last-works__items';


    cardsData.forEach(cardData => {
        const card = createCard(cardData);
        itemsContainer.appendChild(card);
    });

    section.appendChild(header);
    section.appendChild(itemsContainer);

    return section;
}

function renderApp() {
    const app = document.getElementById('app');
    const lastWorksSection = createLastWorksSection();
    app.appendChild(lastWorksSection);
}

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
