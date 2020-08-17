
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApplicationSettings, applicationSettingsInjectionToken } from '../app.model';
import { GyphyResourceType, GyphySearchResponse, queryParameters, QyphyQuery } from './gyphy.model';


@Injectable({
    providedIn: 'root'
})
export class GyphyApi {
    constructor(
        @Inject(applicationSettingsInjectionToken)
        private readonly appSettings: ApplicationSettings,
        private readonly http: HttpClient) {
    }

    public search(type: GyphyResourceType, query: QyphyQuery): Observable<GyphySearchResponse> {
        if (!query || !query.searchText) {
            return of({
                pagination: {
                    total_count: 0,
                    count: 0,
                    offset: 0
                },
                data: []
            });
        }
        const appSettings = this.appSettings;
        const queryString = this.buildQuery(query);
        const url = `${appSettings.gyphyApiUrl}/${type}/search?api_key=${appSettings.gyphyApiKey}&${queryString}`;
        return this.http.get<GyphySearchResponse>(url);
    }

    private buildQuery(query: QyphyQuery): string {
        return Object.keys(queryParameters)
            .map(key => {
                const queryParameter = queryParameters[key];
                const value = query[key] || queryParameter.default;
                return `${queryParameter.name}=${value}`;
            })
            .join('&');
    }
}
