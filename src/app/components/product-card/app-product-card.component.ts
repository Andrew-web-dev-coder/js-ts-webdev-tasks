import template from './app-product-card.component.html?raw';
import styles from './app-product-card.component.module.scss';
import { AppComponent } from '../../public/interfaces/index';
import { getHtml } from '../../public/utilities/index';
import { productService } from '../../public/services/product.service';
import { appFullscreenImage } from '../index';

class AppProductCardComponent implements AppComponent {
  count: number = 0;
  onInit(): DocumentFragment {
    return getHtml(template, styles);
  }

  async getProduct(productId: string): Promise<void> {
    const product = await productService.getProduct(productId);
    const productCard = document.querySelector('#product-card');
    const productCardTemplate = `
    <div class="${styles.product}">
      <div class="${styles.product__images}">
        <div class="${styles.product__images__main}"><img id="big-image" src="${
          product.images[0]
        }" alt=""></div>
        <div class="${styles.product__images__additional}">
          <div class="${styles.product__images__additional__image} ${
            styles.selected
          }"><img id="small-image" src="${product.images[0]}" alt=""></div>
          <div class="${
            styles.product__images__additional__image
          }"><img id="small-image" src="${product.images[1]}" alt=""></div>
          <div class="${
            styles.product__images__additional__image
          }"><img id="small-image" src="${product.images[2]}" alt=""></div>
        </div>
      </div>
      <div class="${styles.product__info}">
        <div class="${styles.product__info__details}">
          <h3 class="${styles.product__info__details__title}">${
            product.title
          }</h3>
          <div class="${styles.product__info__details__rating}">
            <div id="stars" class="${
              styles.product__info__details__rating__stars
            }"></div>
            <div class="${
              styles.product__info__details__rating__number
            }">${Math.round(
              product.rating,
            )}/<span style="color: var(--text-gray)">5</span></div>
          </div>
          <div class="${styles.product__info__details__price}">
            <div class="body-1" id="product-price"></div>
            <div class="body-1 ${
              styles.product__info__details__price__oldprice
            }" id="product-old-price"></div>
            <div class="product-discount-badge" id="product-discount"></div>
          </div>
          <p class="${styles.product__info__details__description}">${
            product.description
              ? product.description
              : 'There is no description.'
          }</p>
        </div>
        <div class="${styles.product__info__brand}">
          <p class="font-400">Brand</p>
          <div class="product-card-text">${
            product.brand ? product.brand : 'Unknown brand'
          }</div>
        </div>
        <div class="${styles.product__info__instock}">
          <p class="font-400">${product.availabilityStatus}</p>
          <div class="product-card-text">${
            product.availabilityStatus == 'In Stock'
              ? product.stock + ' items'
              : 'This product is out of stock.'
          }</div>
        </div>
        <form class="${styles.product__info__buttons}" id="add-to-cart">
          <div class="counter">
            <div id="decrease" class="icon counter__button">&#xe908;</div>
            <span id="count">0</span>
            <div id="increase" class="icon counter__button">&#xe909;</div>
          </div>
          <input type= "submit" value="Add to Cart" theme="dark">
        </form>
      </div>
    </div>`;

    const template = document.createElement('template');
    template.innerHTML = productCardTemplate;
    const newItem = template.content;

    newItem.querySelectorAll('#small-image').forEach((image) => {
      image.addEventListener('click', (event) => {
        const smallImage = event.target as HTMLImageElement;
        const container = smallImage.parentElement as HTMLElement;
        const bigImage = document.querySelector(
          '#big-image',
        ) as HTMLImageElement;

        if (bigImage!.src != smallImage!.src) {
          document.querySelectorAll('#small-image').forEach((el) => {
            el.parentElement!.classList.remove(styles.selected);
          });

          bigImage.src = smallImage!.src;
          container!.classList.add(styles.selected);
        }
      });
    });

    newItem.querySelector('#big-image')?.addEventListener('click', (image) => {
      appFullscreenImage.openImage((image.target! as HTMLImageElement).src);
    });

    for (let star = 1; star <= 5; star++) {
      newItem.querySelector('#stars')!.innerHTML +=
        `<input type="radio" id="star${star}" name="rating" value="${star}"><label class="icon" for="star${star}" title="${star} stars"></label>`;
    }

    if (
      product.discountPercentage &&
      Math.round(product.discountPercentage) > 4
    ) {
      newItem.querySelector('#product-price')!.innerHTML = `$${(
        product.price *
        (1 - product.discountPercentage / 100)
      ).toFixed(2)}`;
      newItem.querySelector('#product-old-price')!.innerHTML =
        `$${product.price}`;
      newItem.querySelector('#product-discount')!.innerHTML = `-${Math.round(
        product.discountPercentage,
      )}%`;
    } else {
      newItem.querySelector('#product-price')!.innerHTML = `$${product.price}`;
      newItem.querySelector('#product-discount')!.remove();
      newItem.querySelector('#product-old-price')!.remove();
    }
    newItem
      .querySelector('#add-to-cart')
      ?.addEventListener('submit', (event) => {
        event.preventDefault();
      });

    const countElement = newItem.querySelector('#count') as HTMLElement;
    this.count = Number(countElement!.textContent);

    newItem.querySelector('#decrease')!.addEventListener('click', () => {
      if (this.count >= 1) {
        this.count--;
        countElement.textContent = this.count.toString();
      }
    });

    newItem.querySelector('#increase')!.addEventListener('click', () => {
      this.count++;
      countElement.textContent = this.count.toString();
    });

    if (productCard) {
      productCard.appendChild(newItem);
    }
    const starsNodes = document.querySelectorAll('input[type="radio"]');
    const stars = [...starsNodes];
    stars.reverse();
    (stars[Math.round(product.rating) - 1] as HTMLInputElement).checked = true;
  }
}

export const appProductCard = new AppProductCardComponent();
