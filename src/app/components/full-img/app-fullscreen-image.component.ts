import template from './app-fullscreen-image.component.html?raw';
import styles from './app-fullscreen-image.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';

class AppFullscreenImageComponent implements AppComponent {
  onInit(): DocumentFragment {
    return getHtml(template, styles);
  }

  openImage(imgPath: string): void {
    const container = document.createElement('app-fullscreen-image');
    container.innerHTML = `
    <div class="${styles.fullscreen}">
      <img class="${styles.fullscreen__image}" src="${imgPath}">
      <div class="icon ${styles.fullscreen__cross}" id="close-fullscreen-image">&#xe903;</div>
    </div>
    `;
    document.querySelector('#app')?.appendChild(container);
    document
      .querySelector('#close-fullscreen-image')
      ?.addEventListener('click', () => {
        document.querySelector('app-fullscreen-image')?.remove();
      });
  }
}

export const appFullscreenImage = new AppFullscreenImageComponent();
