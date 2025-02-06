import {IProduct} from '../product/IProduct';
export interface IProductServiceResponse {
    products: IProduct[];
    total: number;
    limit: number;
    skip: number;
}