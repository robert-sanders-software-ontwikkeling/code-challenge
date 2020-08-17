import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '../app.model';
import { GyphyApi } from './giphy-api.service';
import { GyphyRating, GyphyResourceType, QyphyQuery } from './gyphy.model';

describe('Gyphy api', () => {
    let httpClient: HttpClient;
    let gyphyApi: GyphyApi;
    let appSettings: ApplicationSettings;
    const emptyResponse = {
          pagination: {
            total_count: 0,
            count: 0,
            offset: 0
        },
        data: []
    };

    beforeEach(() => {
        appSettings = {
            gyphyApiKey: 'myKey',
            gyphyApiUrl: 'https://gyphy',
        };
        httpClient = {
            get: jest.fn()
        } as any;
        gyphyApi = new GyphyApi(appSettings, httpClient);

    });

    it('Search will return empty response if no query is passed in ', async () => {
        const actual = await gyphyApi.search(GyphyResourceType.Gifs, null).toPromise();
        expect(actual).toEqual(emptyResponse);
    });

    it('Search will return empty response if no search text is passed in ', async () => {
        const actual = await gyphyApi.search(GyphyResourceType.Gifs, {searchText: null}).toPromise();
        expect(actual).toEqual(emptyResponse);
    });

    it('Defaults will be used if optional paramater are not passed in', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test'
        };
        const expectedUrl = 'https://gyphy/gifs/search?api_key=myKey&rating=G&limit=50&offset=0&lang=en&q=test';
        gyphyApi.search(GyphyResourceType.Gifs, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });

    it('Rating will be used if passed in', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test',
            rating: GyphyRating.ParentalGuidance
        };
        const expectedUrl = 'https://gyphy/gifs/search?api_key=myKey&rating=PG&limit=50&offset=0&lang=en&q=test';
        gyphyApi.search(GyphyResourceType.Gifs, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });

    it('Count will be used if passed in', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test',
            count: 1000
        };
        const expectedUrl = 'https://gyphy/gifs/search?api_key=myKey&rating=G&limit=1000&offset=0&lang=en&q=test';
        gyphyApi.search(GyphyResourceType.Gifs, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });

    it('Offset will be used if passed in', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test',
            offset: 95
        };
        const expectedUrl = 'https://gyphy/gifs/search?api_key=myKey&rating=G&limit=50&offset=95&lang=en&q=test';
        gyphyApi.search(GyphyResourceType.Gifs, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });

    it('Language will be used if passed in', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test',
            language: 'nl' as any
        };
        const expectedUrl = 'https://gyphy/gifs/search?api_key=myKey&rating=G&limit=50&offset=0&lang=nl&q=test';
        gyphyApi.search(GyphyResourceType.Gifs, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });

    it('Type will be used', () => {
        const getSpy = jest.spyOn(httpClient, 'get');
        const query: QyphyQuery = {
            searchText: 'test',
        };
        const expectedUrl = 'https://gyphy/stickers/search?api_key=myKey&rating=G&limit=50&offset=0&lang=en&q=test';
        gyphyApi.search(GyphyResourceType.Stickers, query);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenNthCalledWith(1, expectedUrl);
    });
});
