import { Action, createReducer, on } from '@ngrx/store';

import { intitalOrderlineState, IOrderState, OrderLineActions } from './order-line.actions';
import { cloneDeep } from 'lodash';

const reducer = createReducer(
    intitalOrderlineState,
    on(OrderLineActions.addOrderLine, (state, product) => {
        const orderLineIndex = state.orderLines.findIndex(orderLine => orderLine.product.id === product.id);
        const newState = cloneDeep(state);
        if (orderLineIndex >= 0) {
            newState.orderLines[orderLineIndex].number++;
        } else {
            newState.orderLines.push({
                product,
                number: 1
            });
        }
        return newState;
    }),
    on(OrderLineActions.removeOrderLine,  (state, toRemoveProduct) => {
        const orderLineIndex = state.orderLines.findIndex(orderLine => toRemoveProduct.productId === orderLine.product.id);
        if (orderLineIndex < 0) {
            return state;
        }
        const newState = cloneDeep(state);
        newState.orderLines.splice(orderLineIndex, 1);
        return newState;
    }),
    on(OrderLineActions.setOrderLineNumber,  (state, newNumber) => {
        const orderLineIndex = state.orderLines.findIndex(orderLine => newNumber.productId === orderLine.product.id);
        if (orderLineIndex < 0) {
            return state;
        }

        const newState = cloneDeep(state);
        newState.orderLines[orderLineIndex].number = newNumber.number;
        return newState;
    })
);

export function orderLineReducers(state: IOrderState | undefined, action: Action): IOrderState  {
    return reducer(state, action);
}

