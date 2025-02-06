import { ICategory } from '../interfaces/category/ICategory';
import { IProduct } from '../interfaces/product/IProduct';

class ProductService {
  async getProductCategoryList(): Promise<string[]> {
    const response = await fetch(
      'https://dummyjson.com/c/c8fa-a855-43bb-a24f',
    );
    const data = await response.json();
    return data;
  }

  async getAllProductCategories(): Promise<ICategory[]> {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products;
  }

  async getProductsByCategory(category: string): Promise<IProduct[]> {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    const data = await response.json();
    return data.products;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  }

  async getSortedProducts(
    categoryId: string,
    type: string,
    minPrice: number,
    maxPrice: number,
  ): Promise<IProduct[]> {
    const response =
      categoryId == ''
        ? await this.getAllProducts()
        : await this.getProductsByCategory(categoryId);

    const sortedByPriceItems = response.filter((a) => {
      return a.price >= minPrice && a.price <= maxPrice;
    });

    console.log(minPrice, maxPrice);

    switch (type) {
      case 'ascending': {
        return sortedByPriceItems.sort((a, b) => {
          return a.price - b.price;
        });
      }
      case 'descending': {
        return sortedByPriceItems.sort((a, b) => {
          return b.price - a.price;
        });
      }
      default: {
        console.log(sortedByPriceItems);
        return sortedByPriceItems;
      }
    }
  }
}

export const productService = new ProductService();
