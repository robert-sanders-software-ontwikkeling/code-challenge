
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IProduct } from './order.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public getProducts(): Observable<IProduct[]> {
        const products = [
            {
                id: 1 ,
                title: 'Mac book pro',
                price: 4500,
            },
            {
                id: 2 ,
                title: 'IPad',
                price: 4500,
            },
            {
                id: 3 ,
                title: 'IPhone 11',
                price: 900,
            },
            {
                id: 4 ,
                title: '34 inch LG monitor',
                price: 1100,
            },
        ];
        return of(products).pipe(delay(200));
    }
}




