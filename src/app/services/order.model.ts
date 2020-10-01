export interface IProduct {
    id: number;
    title: string;
    price: number;
}

export interface IOrderLine {
    product: IProduct;
    number: number;
}

export interface IOrder {
    orderLines: IOrderLine[];
}
