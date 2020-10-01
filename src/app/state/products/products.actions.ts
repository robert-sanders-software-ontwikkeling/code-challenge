import {createAction, props} from '@ngrx/store';
import { IProduct } from 'src/app/services/order.model';

export interface IProductsState {
    products: IProduct[];
}

export const intitalProductsState: IProductsState = {
    products: [],
};

export enum ProductActionTypes {
    GetProducts = 'GetProducts',
    ReceivedProducts = 'ReceivedProducts',
}

export class ProductsActions  {
    public static readonly getProducts = createAction(ProductActionTypes.GetProducts);
    public static readonly receivedProducts = createAction(ProductActionTypes.ReceivedProducts, props<IProductsState>());
}

