import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductModule } from '../product/product.module';
import { ProductsComponent } from './products.component';

@NgModule({
    imports: [
        CommonModule,
        ProductModule
    ],
    declarations: [ProductsComponent],
    exports: [ProductsComponent],
})
export class ProductsModule {}
