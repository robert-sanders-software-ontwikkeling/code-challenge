import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

import { ProductsModule } from '../products/products.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ProductsModule,
        RouterModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}

