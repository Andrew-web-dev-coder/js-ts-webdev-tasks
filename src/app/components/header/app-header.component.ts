import template from './app-header.component.html?raw';
import styles from './app-header.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';

class AppHeaderComponent implements AppComponent {
  onInit(): DocumentFragment {
    return getHtml(template, styles);
  }
}

export const appHeader = new AppHeaderComponent();
