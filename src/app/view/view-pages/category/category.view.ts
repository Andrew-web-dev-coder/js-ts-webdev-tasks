import {
    appHeader,
    appFooter,
    appProductsBoard,
    appBreadcrumbs,
    appPromo,
  } from '../../../components/index';
  import { getPage } from '../../../public/utilities/index';
  
  export function getCategoryPage(categoryId?: any) {
    getPage('app-category', '#app', [
      appPromo,
      appHeader,
      appBreadcrumbs,
      appProductsBoard,
      appFooter,
    ]);
    appProductsBoard.updateProductsBoard(categoryId);
  }
  