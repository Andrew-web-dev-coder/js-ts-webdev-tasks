import "./hero.css";

export function HeroComponent(): HTMLElement {
    const head = document.createElement('div');
    head.setAttribute('class', 'head');

    head.innerHTML = `
        <header class="header">
            <div class="header__container">
                <div class="header__logo" data-i18n="partyTime">Party Time!</div>
                <nav class="header__nav nav">
                    <ul class="nav__list">
                        <li class="nav__item"><a href="#" id="home" class="nav__link" data-i18n="home">Home</a></li>
                        <li class="nav__item"><a href="#" id="gallery" class="nav__link" data-i18n="gallery">Gallery</a></li>
                        <li class="nav__item"><a href="#" id="aboutParty" class="nav__link" data-i18n="aboutParty">About Party</a></li>
                        <li class="nav__item"><a href="#" id="reservation" class="nav__link" data-i18n="reservation">Reservation</a></li>
                        <li class="nav__item"><a href="#" id="contacts" class="nav__link" data-i18n="contacts">Contacts</a></li>
                        <li class="nav__item"><a href="#" id="changeLang" class="nav__link" data-i18n="languageToggle">EN عرب</a></li>
                    </ul>
                </nav>
                <div class="header__button">
                    <a href="#" class="button button--reservation" data-i18n="reservation">Reservation</a>
                </div>
            </div>
        </header>

        <main class="hero">
            <section class="party">
                <div class="party__date">
                    <div class="party__date-text">
                        <img src="assets/images/calendar.png" class="calendar" alt="Calendar">
                        <span data-i18n="reservationDate">31 Octobr 2023</span>
                    </div>
                    <h2 class="party__title" data-i18n="halloweenPartyTitle">It's Halloween Party O'Clock!</h2>
                </div>
                <div class="arrow-down">
                    <img src="./assets/images/arrow-down.png"
                </div>
            </section>
        </main>

    
    `;

    return head;
}
