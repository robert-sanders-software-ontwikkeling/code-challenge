import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageComponent } from './image.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        ImageComponent
    ],
    exports: [
        ImageComponent
    ]
})
export class ImageModule {}
