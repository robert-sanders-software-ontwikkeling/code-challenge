import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderLine, IProduct } from '../../services/order.model';
import { ProductsActions } from '../../state/products/products.actions';
import { IShopState } from '../../state/state';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public readonly products: Observable<IProduct[]>;
    public readonly orderLines: Observable<IOrderLine[]>;
    public readonly numberOfOrderedProducts: Observable<number>;

    constructor(private readonly store: Store<IShopState>) {
        this.products = store.select(state => state.productsState.products);
        this.orderLines = store.select(state => state.orderState.orderLines);
        this.numberOfOrderedProducts = store.select(state => state.orderState.orderLines).pipe(
            map(orderlines => orderlines.reduce((a, b) => a + b.number, 0))
        );
    }

    public ngOnInit(): void {
        this.store.dispatch(ProductsActions.getProducts());
    }
}
