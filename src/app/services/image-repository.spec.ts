import { of } from 'rxjs';
import { GyphyApi } from './giphy-api.service';
import { GyphyResourceType, QyphyQuery, GyphyRating } from './gyphy.model';
import { ImageRepository } from './image-repository';

describe('Image repository', () => {
    const images = [
        {
            title: 'Image 1',
            type: 'gif',
            rating: GyphyRating.AllAge,
            source_post_url: 'source-1',
            images: {
                fixed_height_small: {
                    url: '1'
                },
                original: {
                    url: 'original-1'
                }
            }
        },
        {
            title: 'Image 2',
            type: 'jpeg',
            rating: GyphyRating.Rated,
            source_post_url: 'source-2',
            images: {
                fixed_height_small: {
                    url: '2'
                },
                original: {
                    url: 'original-2'
                }
            }
        }
    ];
    let imageRepository: ImageRepository;
    let gyphyApi: GyphyApi;

    beforeEach(() => {
        gyphyApi = {
            search: jest.fn()
        } as any;
        imageRepository = new ImageRepository(gyphyApi);
    });

    it('get will call search ', async () => {
        const searchSpy = jest.spyOn(gyphyApi, 'search').mockReturnValue(of(
            {
                data: images,
                pagination: {
                    total_count: 1000
                }
            } as any
        ));

        const query: QyphyQuery = {
            searchText: 'hi',
            count: 2,
            offset: 0
        };

        const expectedImages = {
            images: [
                {
                    title: 'Image 1',
                    type: 'gif',
                    rating: GyphyRating.AllAge,
                    url: '1',
                    orginalUrl: 'original-1',
                    sourceUrl: 'source-1'
                },
                {
                    title: 'Image 2',
                    type: 'jpeg',
                    rating: GyphyRating.Rated,
                    url: '2',
                    orginalUrl: 'original-2',
                    sourceUrl: 'source-2'
                }
            ],
            totalCount: 1000
        };

        const actualImages = await imageRepository.get(GyphyResourceType.Gifs, query).toPromise();
        expect(searchSpy).toHaveBeenCalledTimes(1);
        expect(searchSpy).toHaveBeenNthCalledWith(1, GyphyResourceType.Gifs, query);
        expect(actualImages).toEqual(expectedImages);
    });
});

