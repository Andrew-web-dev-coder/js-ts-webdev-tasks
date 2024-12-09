import "./gallery.css";

export function createGallery(): HTMLElement {
    
    const gallerySection = document.createElement('section');
    gallerySection.setAttribute('class', 'memories');

    
    const title = document.createElement('h2');
    title.textContent = 'Halloween Memories';
    title.setAttribute('class', 'memories__title');
    title.setAttribute('data-i18n', 'galleryTitle'); 
    gallerySection.appendChild(title);

   
    const galleryContainer = document.createElement('div');
    galleryContainer.setAttribute('class', 'memories__gallery');

    
    const images = [
        { src: 'assets/images/image01.jpg', alt: 'Halloween Memory 1', altKey: 'memoryAlt1' },
        { src: 'assets/images/image02.jpg', alt: 'Halloween Memory 2', altKey: 'memoryAlt2' },
        { src: 'assets/images/image03.jpg', alt: 'Halloween Memory 3', altKey: 'memoryAlt3' },
        { src: 'assets/images/image04.jpg', alt: 'Halloween Memory 4', altKey: 'memoryAlt4' },
        { src: 'assets/images/image05.jpg', alt: 'Halloween Memory 5', altKey: 'memoryAlt5' },
        { src: 'assets/images/image06.jpg', alt: 'Halloween Memory 6', altKey: 'memoryAlt6' },
        { src: 'assets/images/image07.jpg', alt: 'Halloween Memory 7', altKey: 'memoryAlt7' },
        { src: 'assets/images/image08.jpg', alt: 'Halloween Memory 8', altKey: 'memoryAlt8' },
        { src: 'assets/images/image09.jpg', alt: 'Halloween Memory 9', altKey: 'memoryAlt9' },
        { src: 'assets/images/image10.jpg', alt: 'Halloween Memory 10', altKey: 'memoryAlt10' },
    ];

   
    images.forEach((image) => {
        const galleryItem = document.createElement('div');
        galleryItem.setAttribute('class', 'memories__item');

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.setAttribute('class', 'memories__image');

        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });

    gallerySection.appendChild(galleryContainer);

    return gallerySection;
}
