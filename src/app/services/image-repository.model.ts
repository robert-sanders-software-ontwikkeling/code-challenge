import { GyphyRating } from './gyphy.model';

export interface RepositoryImage {
    url: string;
    orginalUrl: string;
    sourceUrl: string;
    title: string;
    rating: GyphyRating;
    type: string;
}


export interface RepositoryImages {
    images: RepositoryImage[];
    totalCount: number;
}
