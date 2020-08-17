import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ImageModule } from '../image/image.module';
import { ImageCardComponent } from './image-card.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        ImageModule
    ],
    declarations: [
        ImageCardComponent
    ],
    exports: [
        ImageCardComponent
    ]
})
export class ImageCardModule {}
