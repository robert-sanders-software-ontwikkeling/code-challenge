import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../../services/order.model';
import { OrderLineActions } from '../../state/order-line/order-line.actions';
import { IShopState } from '../../state/state';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() product: IProduct;

    constructor(private readonly store: Store<IShopState>) {}

    public addToCard(): void {
        this.store.dispatch(OrderLineActions.addOrderLine(this.product));
    }
}
