import template from './app-products-board.component.html?raw';
import styles from './app-products-board.component.module.scss';
import { AppComponent, IProduct } from '../../public/interfaces/index';
import { productService } from '../../public/services/product.service';
import { appFilterBoard } from '../index';
import { importComponent, getHtml } from '../../public/utilities/index';
class AppProductsBoardComponent implements AppComponent {
  categoryId: string = '';
  onInit(): DocumentFragment {
    const productsBoard: DocumentFragment = getHtml(template, styles);

    importComponent(productsBoard, [
      { imports: [appFilterBoard], directory: '#board-filters' },
    ]);

    return productsBoard;
  }

  async updateProductsBoard(categoryId: string): Promise<void> {
    this.categoryId = categoryId;
    let products = categoryId
      ? await productService.getProductsByCategory(categoryId)
      : await productService.getAllProducts();

    this.renderProducts(products);
  }

  renderProducts(products: IProduct[]): void {
    const board = document.querySelector('#products-board');
    board!.innerHTML = '';
    if (products.length > 0) {
      for (let product of products) {
        const productTemplate = `
        <a href ="/${product.category}/${product.id}">
        <div class="${styles.board__products__item}">
          <div class="${styles.board__products__item__image}">
            <img src="${product.images[0]}" alt="" id="product-image">
          </div>
          <div class="${styles.board__products__item__description}">
            <div class="product-text" id="product-title">${product.title}</div>
            <div class="${styles.board__products__item__description__rating}">
              <div class="icon ${
                styles.board__products__item__description__rating__stars
              }" id="product-rating-stars">${'<img src="/src/assets/icons/star.png" alt="">'.repeat(
                Math.round(product.rating),
              )}</div>
              <div id="product-rating">${Math.round(
                product.rating,
              )}/<span style="color: #676767">5</span></div>
            </div>
            <div class="${styles.board__products__item__description__price}">
              <div class="body-1" id="product-price"></div>
              <div class="body-1 ${
                styles.board__products__item__description__oldprice
              }" id="product-old-price"></div>
              <div class="product-discount-badge" id="product-discount"></div>
            </div>
          </div>
        </div>`;

        const template = document.createElement('template');
        template.innerHTML = productTemplate;
        const newItem = template.content;

        if (newItem) {
          if (
            product.discountPercentage &&
            Math.round(product.discountPercentage) > 4
          ) {
            newItem.querySelector('#product-price')!.innerHTML = `$${(
              product.price *
              (1 - product.discountPercentage / 100)
            ).toFixed()}`;
            newItem.querySelector('#product-old-price')!.innerHTML =
              `$${Math.round(product.price)}`;
            newItem.querySelector('#product-discount')!.innerHTML =
              `-${Math.round(product.discountPercentage)}%`;
          } else {
            newItem.querySelector('#product-price')!.innerHTML = `$${Math.round(
              product.price,
            )}`;
            newItem.querySelector('#product-discount')!.remove();
            newItem.querySelector('#product-old-price')!.remove();
          }

          board?.appendChild(newItem);
        }
      }
    } else {
      board!.innerHTML = `
      <div class="${styles.board__products__empty}">
        <h2>There are no products :( .</h2></div>
      </div>
      `;
    }
    document.querySelector('#category-name')!.innerHTML = this.categoryId
      ? this.categoryId.slice(0, 1).toUpperCase() +
        this.categoryId.slice(1).toLowerCase()
      : 'All products';

    document.querySelector('#show-filters')?.addEventListener('click', () => {
      const filters = document.querySelector('#board-filters')! as HTMLElement;

      filters.style.display = 'flex';
      filters.classList.remove('close');
      filters.classList.add('open');
    });
  }
}

export const appProductsBoard = new AppProductsBoardComponent();
