import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products/products.effects';
import { productsReducers } from './products/products.reducers';
import { orderLineReducers } from './order-line/order-line.reducers';
import { StoreModule } from '@ngrx/store';

export const ShoppingEffectsModule = EffectsModule.forRoot([
    ProductsEffects
]);

export const ShoppingReducersModule = StoreModule.forRoot({
    productsState: productsReducers,
    orderState: orderLineReducers
});
