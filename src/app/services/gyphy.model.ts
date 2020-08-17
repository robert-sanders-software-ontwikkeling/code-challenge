export enum GyphyResourceType {
    Gifs = 'gifs',
    Stickers = 'stickers',
    Text = 'text'
}

export enum GyphyLanguage {
    English = 'en'
}

export enum GyphyRating {
    AllAge = 'G',
    ParentalGuidance = 'PG',
    ParentalGuidance13 = 'PG-13',
    Rated = 'R'
}

export interface QyphyQuery {
    rating?: GyphyRating;
    count?: number;
    offset?: number;
    language?: GyphyLanguage;
    searchText: string;
}

export const queryParameters = {
    rating: {
        name: 'rating',
        default: GyphyRating.AllAge
    },
    count: {
        name: 'limit',
        default: 50
    },
    offset: {
        name: 'offset',
        default: 0
    },
    language: {
        name: 'lang',
        default: GyphyLanguage.English
    },
    searchText: {
        name: 'q',
        default: ''
    },
};

export interface GyphyImage {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

export interface GyphyPreview {
    url: string;
}

export interface GiphyMp4 {
    mp4: string;
}

export interface GyphyImages {
    fixed_height: GyphyImage;
    fixed_height_still: GyphyImage;
    fixed_height_downsampled: GyphyImage;
    fixed_width: GyphyImage;
    fixed_width_still: GyphyImage;
    fixed_width_downsampled: GyphyImage;
    fixed_height_small: GyphyImage;
    fixed_height_small_still: GyphyImage;
    fixed_width_small: GyphyImage;
    fixed_width_small_still: GyphyImage;
    downsized: GyphyImage;
    downsized_still: GyphyImage;
    downsized_large: GyphyImage;
    downsized_medium: GyphyImage;
    downsized_small: GyphyImage;
    original: GyphyImage;
    original_still: GyphyImage;
    looping: GiphyMp4;
    preview: GyphyImage;
    preview_gif: GyphyPreview;
    width: string;
    height: string;
}

export interface GyphyData {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    rating: GyphyRating;
    source_tld: string;
    source_post_url: string;
    update_datetime: string;
    create_datetime: string;
    import_datetime: string;
    trending_datetime: string;
    images: GyphyImages;
    title: string;
}

export interface GyphyPagination  {
    offset: number;
    count: number;
    total_count: number;
}

export interface GyphySearchResponse {
    data: GyphyData[];
    pagination: GyphyPagination;
}
