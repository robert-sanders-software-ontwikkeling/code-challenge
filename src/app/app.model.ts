export interface ApplicationSettings {
    readonly gyphyApiKey: string;
    readonly gyphyApiUrl: string;
    readonly badWords?: readonly string[];
}

export const applicationSettingsInjectionToken = 'ApplicationSettings';
