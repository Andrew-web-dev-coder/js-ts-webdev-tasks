import template from './app-footer.component.html?raw';
import styles from './app-footer.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';

class AppFooterComponent implements AppComponent {
  onInit(): DocumentFragment {
    return getHtml(template, styles);
  }
}

export const appFooter = new AppFooterComponent();
