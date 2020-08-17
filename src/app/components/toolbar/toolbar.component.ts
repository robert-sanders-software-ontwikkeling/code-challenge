import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: [ './toolbar.component.scss']
})
export class ToolbarComponent  {
    @Input() imageTypes: string[];
    @Input() selectedImageType: string;
    @Input() ratings: string[];
    @Input() selectedRating: string;
    @Input() columnCounts: number[];
    @Input() selectedColumnCount: number;
    @Output() readonly search = new EventEmitter<string>();
    @Output() readonly imageTypeChanged = new EventEmitter<string>();
    @Output() readonly ratingChanged = new EventEmitter<string>();
    @Output() readonly columnCountChanged = new EventEmitter<number>();

    public emitSearch(searchText: string): void {
        this.search.emit(searchText);
    }

    public emitImageTypeChanged(): void {
        this.imageTypeChanged.emit(this.selectedImageType);
    }

    public emitRatingChanged(): void {
        this.ratingChanged.emit(this.selectedRating);
    }

    public emitColumnCountChanged(): void {
        this.columnCountChanged.emit(this.selectedColumnCount);
    }
}
