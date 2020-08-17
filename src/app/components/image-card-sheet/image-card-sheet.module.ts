import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCardModule } from '../image-card/image-card.module';
import { ImageCardSheetComponent } from './image-card-sheet.component';

@NgModule({
    imports: [
        CommonModule,
        ImageCardModule
    ],
    declarations: [
        ImageCardSheetComponent
    ],
    exports: [
        ImageCardSheetComponent
    ]
})
export class ImageCardSheetModule {}
