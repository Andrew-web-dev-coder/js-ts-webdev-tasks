import template from './app-hero.component.html?raw';
import styles from './app-hero.component.module.scss';
import { AppComponent } from '../../public/interfaces/index'
import { getHtml } from '../../public/utilities/index';

class AppHeroComponent implements AppComponent {
  onInit(): DocumentFragment {
    return getHtml(template, styles);
  }
}

export const appHero = new AppHeroComponent();
