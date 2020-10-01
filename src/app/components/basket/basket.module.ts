import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketComponent } from './basket.component';

import {OrderLineModule} from '../order-line/order-line.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        OrderLineModule,
    ],
    declarations: [BasketComponent],
    exports: [BasketComponent],
})
export class BasketModule {}
