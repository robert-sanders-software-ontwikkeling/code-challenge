import { Inject, Injectable } from '@angular/core';
import { ApplicationSettings, applicationSettingsInjectionToken } from '../app.model';

@Injectable({
    providedIn: 'root'
})
export class BadLanguageFilter {
    constructor(@Inject(applicationSettingsInjectionToken) private readonly appSettings: ApplicationSettings) {}

    public isBad(text: string): boolean {
        return text && text
            .toLowerCase()
            .split(' ')
            .map(word => word.trim())
            .some(word => this.appSettings.badWords.includes(word));
    }
}
