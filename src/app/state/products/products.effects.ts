import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action} from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductActionTypes, ProductsActions } from './products.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
    constructor(
        private readonly actions: Actions,
        private readonly productsService: ProductService) {}

    @Effect()
    public getProducts(): Observable<Action> {
        return this.actions.pipe(
            ofType(ProductActionTypes.GetProducts),
            mergeMap(() =>
                this.productsService.getProducts().pipe(
                    map(products => ProductsActions.receivedProducts({products}))
                )
            )
        );
    }
}
