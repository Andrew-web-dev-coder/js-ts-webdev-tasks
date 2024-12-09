import './footer.css';

export function FooterComponent(data: { phoneText: string; socials: { href: string; src: string; alt: string; label: string }[] }): DocumentFragment {
    // Получаем шаблон footer
    const template = document.querySelector<HTMLTemplateElement>('#footer-template');
    if (!template) {
        throw new Error("Footer template is not found");
    }

    // Клонируем содержимое шаблона
    const clone = template.content.cloneNode(true) as DocumentFragment;

    // Настраиваем текст телефона
    const phoneContent = clone.querySelector<HTMLDivElement>('.footer__phone-content');
    if (phoneContent) {
        phoneContent.setAttribute('data-i18n', 'phoneText'); // Добавляем атрибут для локализации
        phoneContent.textContent = data.phoneText;
    }

    // Добавляем социальные ссылки
    const socialList = clone.querySelector<HTMLUListElement>('.footer__social-list');
    if (socialList) {
        data.socials.forEach((social, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add('footer__social-item');

            const link = document.createElement('a');
            link.href = social.href;
            link.setAttribute('aria-label', social.label);
            

            const img = document.createElement('img');
            img.src = social.src;
            img.alt = social.alt;
            

            link.appendChild(img);
            listItem.appendChild(link);
            socialList.appendChild(listItem);
        });
    }

    return clone;
}
