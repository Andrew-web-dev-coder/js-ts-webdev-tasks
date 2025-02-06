import Navigo from "navigo";
import { getCategoryPage, getHomePage, getProductPage } from '../view/index';

(() => {
  window.addEventListener('load', () => {
    const router = new Navigo('/');

    router
      .on('/', function () {
        return getHomePage();
      })
      .on({
        '/category': function () {
          return getCategoryPage();
        },
        '/:categoryId': function (params: any) {
          return getCategoryPage(params.data.categoryId);
        },
        '/:categoryId/:productId': function (params: any) {
          return getProductPage(params.data.productId);
        },
      })
      .resolve();
  });
})();
