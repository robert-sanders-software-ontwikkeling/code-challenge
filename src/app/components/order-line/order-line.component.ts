import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IOrderLine } from '../../services/order.model';
import { OrderLineActions } from '../../state/order-line/order-line.actions';
import { IShopState } from '../../state/state';

@Component({
    selector: 'app-order-line',
    templateUrl: './order-line.component.html',
    styleUrls: ['./order-line.component.scss']
})
export class OrderLineComponent {
    private $number: number;
    @Input() orderLine: IOrderLine;

    constructor(private readonly store: Store<IShopState>) {}

    public get number(): number {
        if (!this.$number) {
            this.$number = this.orderLine?.number;
        }
        return this.$number;
    }

    public set number(value: number) {
        if (value > 0) {
            this.$number = value;
            this.store.dispatch(OrderLineActions.setOrderLineNumber({productId: this.orderLine.product.id, number: value}));
        }
    }

    public removeLine(): void {
        this.store.dispatch(OrderLineActions.removeOrderLine({productId: this.orderLine.product.id}));
    }
}
