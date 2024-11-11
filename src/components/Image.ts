export function createImage(imageName: string): HTMLImageElement {
    const img = document.createElement('img');
    img.src = new URL(`../assets/images/${imageName}`, import.meta.url).href;
    img.alt = imageName;
    img.className = 'works__item-image';
    return img;
}
