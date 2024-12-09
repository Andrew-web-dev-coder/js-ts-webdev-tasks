import { HeroComponent } from "./sections/Hero/hero";
import { createGallery } from "./sections/Gallery/gallery";
import { FooterComponent } from "./sections/Footer/footer";
import locales from "./localization.json";

let currentLocale: "en" | "ar" = "en";

// Имитация запроса на бэкенд для загрузки локализаций
function fetchLocales(locale: "en" | "ar"): Promise<{ [key: string]: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(locales[locale]);
        }, 500); 
    });
}

// Функция перевода текста
async function translateAllTextOnPage(): Promise<void> {
    const localeMessages = await fetchLocales(currentLocale);
    const elements = document.querySelectorAll<HTMLElement>("[data-i18n]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (key && localeMessages[key]) {
            element.innerText = localeMessages[key];
        }
    });
}

// Функция изменения локализации
async function changeLocale(): Promise<void> {
    currentLocale = currentLocale === "en" ? "ar" : "en";
    await translateAllTextOnPage();
    updatePageDirection();
}

// Обновление направления текста
function updatePageDirection(): void {
    const body = document.body;

    if (currentLocale === "ar") {
        body.setAttribute("dir", "rtl");
        body.style.textAlign = "right";
    } else {
        body.setAttribute("dir", "ltr");
        body.style.textAlign = "left";
    }
}

// Создание страницы
document.addEventListener("DOMContentLoaded", async () => {
    const hero = HeroComponent();
    document.body.append(hero);

    const gallery = createGallery();
    document.body.append(gallery);

    const footerData = FooterComponent({
        phoneText: locales[currentLocale].phoneText,
        socials: [
            { href: "#", src: "assets/images/behance.png", alt: "Behance", label: "Behance" },
            { href: "#", src: "assets/images/Figma.png", alt: "Figma", label: "Figma" },
            { href: "#", src: "assets/images/LinkedIn.png", alt: "LinkedIn", label: "LinkedIn" },
            { href: "#", src: "assets/images/instagram.png", alt: "Instagram", label: "Instagram" },
            { href: "#", src: "assets/images/youtube.png", alt: "YouTube", label: "YouTube" },
        ],
    });

    document.body.appendChild(footerData);

    // Настройка кнопки изменения языка
    const langButton = document.querySelector<HTMLButtonElement>("#changeLang");

    langButton?.addEventListener("click", async (event) => {
        event.preventDefault();
        await changeLocale();
    });

    // Инициализация локализации
    await translateAllTextOnPage();
    updatePageDirection();
});
