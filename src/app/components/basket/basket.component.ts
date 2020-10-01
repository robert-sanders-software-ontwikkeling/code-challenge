import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderLine } from 'src/app/services/order.model';
import { IShopState } from 'src/app/state/state';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
    @Input() orderLines$: Observable<IOrderLine[]>;
    @Input() total$: Observable<number>;

    constructor(private readonly store: Store<IShopState>) {
        this.orderLines$ = this.store.select(state => state.orderState.orderLines);
        this.total$ = this.store.select(state => state.orderState.orderLines).pipe(
            map(orderLines => orderLines.reduce((a, b) => a + b.number * b.product.price, 0))
        );
    }
}
