import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { RepositoryImage } from '../../services/image-repository.model';


@Component({
    selector: 'app-image-card-sheet',
    templateUrl: './image-card-sheet.component.html'
})
export class ImageCardSheetComponent {
   constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA)
        public  readonly image: RepositoryImage) {
   }
}
