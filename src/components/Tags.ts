export function createTags(tags: string[]): HTMLElement {
    const tagContainer = document.createElement('div');
    tagContainer.className = 'works__item-tags';

    tags.forEach((tagText, index) => {
        const tag = document.createElement('span');
        tag.className = 'works__item-tag';
        tag.textContent = tagText;
        tagContainer.appendChild(tag);
        if (index < tags.length - 1) {
            tagContainer.appendChild(document.createTextNode(' '));
        }
    });

    return tagContainer;
}
