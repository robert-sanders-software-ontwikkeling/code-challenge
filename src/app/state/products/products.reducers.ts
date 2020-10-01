import { intitalProductsState, IProductsState, ProductsActions } from './products.actions';
import { Action, createReducer, on} from '@ngrx/store';

const reducer = createReducer(
    intitalProductsState,
    on(ProductsActions.getProducts, state => state),
    on(ProductsActions.receivedProducts, (_, payload) => {
        return {
            products: payload.products
        };
    })
);

export function productsReducers(state: IProductsState | undefined, action: Action): IProductsState  {
    return reducer(state, action);
}
