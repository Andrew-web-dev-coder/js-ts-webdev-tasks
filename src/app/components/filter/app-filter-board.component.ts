import template from './app-filter-board.component.html?raw';
import styles from './app-filter-board.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';
import { appProductsBoard } from '../index';
import { productService } from '../../public/services/product.service';
import noUiSlider from 'nouislider';

class AppFilterBoardComponent implements AppComponent {
  onInit(): DocumentFragment {
    const filterBoard = getHtml(template, styles);
    this.getFilterBoard(filterBoard);
    this.getSlider(filterBoard);
    return filterBoard;
  }

  async getFilterBoard(template: DocumentFragment) {
    const sortOptions = template.querySelectorAll('#sort-button');

    sortOptions.forEach((option) => {
      option.addEventListener('click', (event) => {
        sortOptions.forEach((el) => {
          el.classList.remove(styles.selected);
        });
        const button = event.target as HTMLElement;
        button.classList.add(styles.selected);
        button.id = 'selected';
      });
    });

    const form = template.querySelector('#board-filters');
    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const clickedButtonId = (event as SubmitEvent).submitter?.id;
      const selectedType = form
        .querySelector(`.${styles.selected}`)?.innerHTML.toLowerCase();
      const type = selectedType ? selectedType : '';

      if (clickedButtonId === 'filter-apply') {
        const category = appProductsBoard.categoryId || '';
        const min = Number(
          document.querySelectorAll('.noUi-tooltip')[0].innerHTML.replace('$', '')
        );
        const max = Number(
          document.querySelectorAll('.noUi-tooltip')[1].innerHTML.replace('$', '')
        );
        const newProductList = await productService.getSortedProducts(
          category, type, min, max
        );
        appProductsBoard.renderProducts(newProductList);
      } else if (clickedButtonId === 'filter-reset') {
        sortOptions[0].classList.add(styles.selected);
        sortOptions[1].classList.remove(styles.selected);

        const oldProducts = appProductsBoard.categoryId
          ? await productService.getProductsByCategory(appProductsBoard.categoryId)
          : await productService.getAllProducts();
        appProductsBoard.renderProducts(oldProducts);
      }
    });

    template.querySelector('#close-filters')?.addEventListener('click', () => {
      const filters = document.querySelector('#board-filters') as HTMLElement;
      filters.classList.remove('open');
      filters.classList.add('close');
      filters.style.display = 'none';
    });
  }

  async getSlider(template: DocumentFragment) {
    const priceSlider = template.querySelector('#price-range-slider') as HTMLElement;

    noUiSlider.create(priceSlider, {
      start: [10, 2000], 
      connect: true,
      range: {
        min: 10,
        max: 2000,
      },
      tooltips: {
        to: function (value) {
          return '$' + value.toFixed(2);
        },
      },
    });
  }
}

export const appFilterBoard = new AppFilterBoardComponent();
