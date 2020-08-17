import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() placeholder = 'Search...';
    @Input() searchText = '';
    @Output() readonly search = new EventEmitter<string>();
    private readonly searchEmitter = new Subject<string>();
    private searchEmitterSubscription: Subscription;
    private $debounceTime = 200;

    @Input()
    public get debounceTime(): number {
        return this.$debounceTime;
    }

    public set debounceTime(value: number) {
        const normalizedValue = Math.max(0, value);
        if (this.$debounceTime !== normalizedValue) {
            this.$debounceTime = normalizedValue;
            if (this.searchEmitterSubscription) {
                this.createSearchEmitter();
            }
        }
    }

    public ngOnInit(): void {
        this.createSearchEmitter();
    }

    public ngOnDestroy(): void {
        this.unsubsribeSearchEmitter();
    }

    public onSearch(): void {
        this.searchEmitter.next(this.searchText);
    }

    public onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSearch();
        }
    }

    private unsubsribeSearchEmitter(): void {
        if (this.searchEmitterSubscription) {
            this.searchEmitterSubscription.unsubscribe();
            this.searchEmitterSubscription = null;
        }
    }

    private createSearchEmitter(): void {
       this.unsubsribeSearchEmitter();
       this.searchEmitterSubscription = this.searchEmitter.asObservable()
        .pipe(debounceTime(this.debounceTime)).subscribe((value) => this.search.emit(value));
    }
}
