import template from './app-breadcrumbs.component.html?raw';
import styles from './app-breadcrumbs.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';
import { productService } from '../../public/services/product.service';

class AppBreadcrumbsComponent implements AppComponent {
  onInit(): DocumentFragment {
    const breadcrumbsComponent: DocumentFragment = getHtml(template, styles);
    this.getPath(breadcrumbsComponent);
    return breadcrumbsComponent;
  }

  async getPath(template: DocumentFragment): Promise<void> {
    const breadcrumbs = template.querySelector('#breadcrumbs');
    const path = window.location.pathname.split('/').splice(1);

    path.forEach(async (pathPart: string, i: number) => {
      let pathName =
        pathPart.charAt(0).toUpperCase() +
        pathPart.slice(1).toLocaleLowerCase();
      if (i == 1) {
        const productName = await productService.getProduct(pathPart);
        pathName = productName.title;
      }

      const pathItemTemplate = `
        <a class="${styles.breadcrumbs__container__item} ${
          i != path.length - 1 ? styles.gray : ''
        }" href="${'/' + path.slice(0, i + 1).join('/')}">${
          pathName == 'Category' ? 'All products' : pathName
        }</a>
      `;

      const template = document.createElement('template');
      template.innerHTML = pathItemTemplate;
      const newItem = template.content;

      breadcrumbs?.appendChild(newItem);
    });
  }
}

export const appBreadcrumbs = new AppBreadcrumbsComponent();
