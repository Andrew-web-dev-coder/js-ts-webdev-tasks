import {
    appHeader,
    appFooter,
    appProductCard,
    appBreadcrumbs,
    appPromo,
  } from '../../../components/index';
  import { getPage } from '../../../public/utilities/index';
  
  export function getProductPage(productId: string) {
    getPage('app-product', '#app', [
      appPromo,
      appHeader,
      appBreadcrumbs,
      appProductCard,
      appFooter,
    ]);
    appProductCard.getProduct(productId);
  }
  