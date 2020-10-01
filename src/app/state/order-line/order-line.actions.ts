import {createAction, props} from '@ngrx/store';
import { IOrderLine, IProduct } from '../../services/order.model';



export interface IOrderState {
    orderLines: IOrderLine[];
}

export const intitalOrderlineState: IOrderState = {
    orderLines: [],
};

export enum OrderLineActionTypes {
    RemoveOrderLine = 'RemoveOrderLine',
    AddOrderLine = 'AddOrderLine',
    SetOrderLineNumber = 'SetOrderLineNumber'
}

export class OrderLineActions  {
    public static readonly setOrderLineNumber = createAction(
        OrderLineActionTypes.SetOrderLineNumber,
        props<{productId: number, number: number}>());
    public static readonly removeOrderLine = createAction(OrderLineActionTypes.RemoveOrderLine, props<{productId: number}>());
    public static readonly addOrderLine = createAction(OrderLineActionTypes.AddOrderLine, props<IProduct>());
}
