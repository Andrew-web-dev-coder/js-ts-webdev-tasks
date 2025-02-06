import template from './app-promo.component.html?raw';
import styles from './app-promo.component.module.scss';
import { AppComponent } from './../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';

class AppPromoComponent implements AppComponent {
  onInit(): DocumentFragment {
    const promo: DocumentFragment = getHtml(template, styles);
    this.closeBannerFucntion(promo);
    return promo;
  }

  closeBannerFucntion(template: DocumentFragment): void {
    template.querySelector('#close')?.addEventListener('click', () => {
      document.querySelector('#banner')?.remove();
    });
  }
}

export const appPromo = new AppPromoComponent();
