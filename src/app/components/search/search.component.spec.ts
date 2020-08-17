import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { changeComponent, getChildElements } from '../../testing/utility';
import { SearchComponent } from './search.component';

describe('Search field', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(() => {
        return TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatIconModule,
            ],
            declarations: [
                SearchComponent,
            ]
        })
        .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('Can create without errors', () => {
        expect(component).toBeTruthy();
    });

    it('placeholder will be bound to input placeholder attribute', async () => {
        await changeComponent(fixture, () => component.placeholder = 'Hello');
        const inputElement = getInputElement();
        expect(inputElement.placeholder).toEqual(component.placeholder);
    });

    it('searchText will be bound to input value attribute', async () => {
        await changeComponent(fixture, () => component.searchText = 'Hi');
        const inputElement = getInputElement();
        expect(inputElement.value).toEqual(component.searchText);
    });

    it('debounceTime has default value 200', () => {
        expect(component.debounceTime).toEqual(200);
    });

    it('debounceTime can not be set to a value lesser than 0', () => {
        component.debounceTime = -1;
        expect(component.debounceTime).toEqual(0);
    });

    it('debounceTime can be set to a value greater or equal to 0', () => {
        component.debounceTime = 0;
        expect(component.debounceTime).toEqual(0);
        component.debounceTime = 1;
        expect(component.debounceTime).toEqual(1);
    });

    it('Changing debounce time will unsubscribe search emitter' , () => {
        const unsubscribeSpy = jest.spyOn((component as any).searchEmitterSubscription, 'unsubscribe');
        component.debounceTime = 400;
        expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('Set debounce time to the same value will not unsubscribe search emitter' , () => {
        const unsubscribeSpy = jest.spyOn((component as any).searchEmitterSubscription, 'unsubscribe');
        component.debounceTime = component.debounceTime;
        expect(unsubscribeSpy).not.toHaveBeenCalled();
    });

    it('ngOnDestroy will unsubscribe search emitter' , () => {
        const unsubscribeSpy = jest.spyOn((component as any).searchEmitterSubscription, 'unsubscribe');
        component.ngOnDestroy();
        component.ngOnDestroy();
        expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });

    it('Changing debounce time wil resubscribe to search emitter', () => {
        const asObservableSpy = jest.spyOn((component as any).searchEmitter, 'asObservable');
        component.debounceTime = 400;
        expect(asObservableSpy).toHaveBeenCalledTimes(1);
    });

    it('Clicking on buttom element will call onSearch', () => {
        const onSearchSpy = jest.spyOn(component, 'onSearch');
        const buttonElement = getButtonElement();
        buttonElement.click();
        expect(onSearchSpy).toHaveBeenCalledTimes(1);
    });

    it('calling onSearch will emit search event', fakeAsync(() => {
        const emitSpy = jest.spyOn(component.search, 'emit');
        component.searchText = 'hi';
        component.onSearch();
        tick(component.debounceTime);
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenNthCalledWith(1, 'hi');
    }));

    it('Pressing enter will call on search', () => {
        const onSearchSpy = jest.spyOn(component, 'onSearch');
        const event: any = {
            key: 'Enter'
        };
        component.onKeydown(event);
        expect(onSearchSpy).toHaveBeenCalledTimes(1);
    });

    it('keydown event will call onKeydown', () => {
        const onKeydownSpy = jest.spyOn(component, 'onKeydown');
        const inputElement = getInputElement();
        inputElement.dispatchEvent(new Event('keydown'));
        expect(onKeydownSpy).toHaveBeenCalledTimes(1);
    });

    function getInputElement(): HTMLInputElement {
        return  getChildElements<HTMLInputElement>(fixture.debugElement, 'input')[0];
    }

    function getButtonElement(): HTMLInputElement {
        return  getChildElements<HTMLInputElement>(fixture.debugElement, '.c-search__button')[0];
    }
});
