
import { BadLanguageFilter } from './bad-language-filter.service';

describe('Image repository', () => {
    let badLanguageFilter: BadLanguageFilter;

    beforeEach(() => {
        badLanguageFilter = new BadLanguageFilter({
            badWords: ['bad']
        }as any);

    });

    it('calling isBad with bad word returns true', () => {
        expect(badLanguageFilter.isBad('bad')).toBeTruthy();
    });

    it('calling isBad with sentence containing bad word returns true', () => {
        expect(badLanguageFilter.isBad('I am bad')).toBeTruthy();
    });

    it('calling isBad with empty text returns false', () => {
        expect(badLanguageFilter.isBad(null)).toBeFalsy();
    });

    it('calling isBad with only good word returns false', () => {
        expect(badLanguageFilter.isBad('I am good')).toBeFalsy();
    });
});

