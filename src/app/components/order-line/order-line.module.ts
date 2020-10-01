import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderLineComponent } from './order-line.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [OrderLineComponent],
    exports: [OrderLineComponent],
})
export class OrderLineModule {}
