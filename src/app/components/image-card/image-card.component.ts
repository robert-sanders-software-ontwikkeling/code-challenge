import { Component, Input } from '@angular/core';
import {RepositoryImage} from '../../services/image-repository.model';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html',
    styleUrls: [ './image-card.component.scss']
})
export class ImageCardComponent {
    @Input() image: RepositoryImage;
}
