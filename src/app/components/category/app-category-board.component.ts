import template from './app-category-board.component.html?raw';
import styles from './app-category-board.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';
import { productService } from '../../public/services/product.service';

class AppCategoryBoardComponent implements AppComponent {
  onInit() {
    const categoryBoard: DocumentFragment = getHtml(template, styles);
    this.getBoard();
    return categoryBoard;
  }

  async getBoard() {
    try {
      const categories = await productService.getProductCategoryList();
      const board = document.querySelector('#board');

      board?.classList.add(styles.board);
      for (const category of categories) {
        const tileTemplate = `
          <a href="/${category}">
            <div class="${styles.board__tile}">
              <h1 class="${styles.board__tile__category}">${category}</h1>
            </div>
          </a>
        `;
        const template = document.createElement('template');
        template.innerHTML = tileTemplate;
        const newItem = template.content;

        board?.appendChild(newItem);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
}

export const appCategoryBoard = new AppCategoryBoardComponent();
