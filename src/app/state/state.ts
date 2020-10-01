import { IOrderLine } from '../services/order.model';
import { IOrderState } from './order-line/order-line.actions';
import { IProductsState } from './products/products.actions';

export interface IShopState {
    productsState: IProductsState;
    orderState: IOrderState;
}
