import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: [ './image.component.scss']
})
export class ImageComponent {
    @Input() showSpinnerWhenLoading = false;
    @Input() src: string;
    private $isLoaded = false;

    public get isLoaded(): boolean {
        return this.$isLoaded;
    }

    public get showSpinner(): boolean {
        return this.showSpinnerWhenLoading && !this.isLoaded;
    }

    public onLoaded(): void {
        this.$isLoaded = true;
        console.log(true);
    }
}
