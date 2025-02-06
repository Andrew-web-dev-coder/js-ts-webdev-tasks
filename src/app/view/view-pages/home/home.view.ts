import {
    appHero,
    appHeader,
    appFooter,
    appCategoryBoard,
    appPromo,
  } from '../../../components/index';
  import { getPage } from '../../../public/utilities/index';
  
  export function getHomePage() {
    getPage('app-home', '#app', [
      appPromo,
      appHeader,
      appHero,
      appCategoryBoard,
      appFooter,
    ]);
  }
  