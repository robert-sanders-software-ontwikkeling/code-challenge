import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GyphyApi } from './giphy-api.service';
import { GyphyData, GyphyResourceType, QyphyQuery } from './gyphy.model';
import { RepositoryImage, RepositoryImages } from './image-repository.model';

// For now this class is just simple abstraction layer on top of the glyph api
// It simplifies the output. Later on we can add prefetching logic to improve
// performance and user experience
@Injectable({
    providedIn: 'root'
})
export class ImageRepository {
    constructor(private readonly gyphyApi: GyphyApi) {}

    public get(type: GyphyResourceType, query: QyphyQuery): Observable<RepositoryImages> {
        return this.gyphyApi.search(type, query).pipe(map(result => {
            return {
                images:  result.data.map(mapImage),
                totalCount: result.pagination.total_count
            };
        }));
    }
}


function mapImage(image: GyphyData): RepositoryImage {
    return {
        title: image.title,
        type: image.type,
        rating: image.rating,
        url: image.images.fixed_height_small.url,
        orginalUrl: image.images.original.url,
        sourceUrl: image.source_post_url
    };
}
