import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { BadLanguageFilter } from './services/bad-language-filter.service';
import { GyphyResourceType, QyphyQuery, GyphyRating } from './services/gyphy.model';
import { ImageRepository } from './services/image-repository';
import { RepositoryImage, RepositoryImages } from './services/image-repository.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {ImageCardSheetComponent} from './components/image-card-sheet/image-card-sheet.component';

const snackbarDuration = 5000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public readonly pageSizeOptions = [5, 10, 15, 20, 25, 50];
  public readonly imageTypes = Object.keys(GyphyResourceType).map(key => GyphyResourceType[key]);
  public readonly ratings = Object.keys(GyphyRating).map(key => GyphyRating[key]);
  public selectedImageType = GyphyResourceType.Gifs;
  public selectedColumnCount = 3;
  public columnCounts = [1, 2, 3, 4, 5, 6, 7];
  public selectedRating = GyphyRating.AllAge;
  private readonly pageChangeEmitter = new Subject<void>();
  private readonly pagerChangeEmitterSubscription: Subscription;
  private searchSubscription: Subscription;
  private $currentPage = 0;
  private $pageSize = 15;
  private $totalCount = 0;
  private $images: RepositoryImage[];
  private searchText: string;

  constructor(
    private readonly bottomSheet: MatBottomSheet,
    private readonly badLanguageFilter: BadLanguageFilter,
    private readonly snackBar: MatSnackBar,
    private readonly imageRepository: ImageRepository) {
      // Just to protect  against a monkey tester how is going crazy on the next/previous button
      this.pagerChangeEmitterSubscription = this.pageChangeEmitter
        .asObservable()
        .pipe(debounceTime(200))
        .subscribe(this.executeSearch);
    }

  public get images(): RepositoryImage[] {
    return this.$images;
  }

  public get pageSize(): number {
    return this.$pageSize;
  }

  public get currentPage(): number {
    return this.$currentPage;
  }

  public get totalCount(): number {
    return this.$totalCount;
  }

  public ngOnDestroy(): void {
    this.pagerChangeEmitterSubscription.unsubscribe();
    this.cancelSearchRequest();
  }

  public onSelectedImageTypeChanged(selectedImageType: GyphyResourceType): void {
    this.selectedImageType = selectedImageType;
    this.$currentPage = 0;
    this.executeSearch();
  }

  public onSelectedRatingChanged(selectedRating: GyphyRating): void {
    this.selectedRating = selectedRating;
    this.$currentPage = 0;
    this.executeSearch();
  }

  public setColumnCount(columnCount: number): void {
    this.selectedColumnCount = columnCount;
  }

  public onPageEvent(pageEvent: PageEvent): void {
    this.$pageSize = pageEvent.pageSize;
    this.$currentPage = pageEvent.pageIndex;
    this.pageChangeEmitter.next();
  }

  public search(searchText: string): void {
    if (this.badLanguageFilter.isBad(searchText)) {
      this.snackBar.open('Bad language is not allowed', 'Please try to search on something else', {
        duration: snackbarDuration
      });
      return;
    }
    this.searchText = searchText;
    this.clear();
    this.executeSearch();
  }

  public showImageDetails(image: RepositoryImage): void {
    this.bottomSheet.open(ImageCardSheetComponent, { data: image});
  }

  private executeSearch = () => {
    this.cancelSearchRequest();
    if (!this.searchText) {
      return;
    }
    const query: QyphyQuery = {
      searchText: this.searchText,
      count: this.pageSize,
      offset: this.currentPage * this.pageSize,
      rating: this.selectedRating
    };

    this.searchSubscription = this.imageRepository.get(this.selectedImageType, query).subscribe(this.onImagesLoaded, this.onError);
  }

  private cancelSearchRequest(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = null;
    }
  }

  private clear(): void {
    this.$totalCount = 0;
    this.$currentPage = 0;
    this.$images = [];
  }

  private onImagesLoaded = (result: RepositoryImages)  => {
    this.$totalCount = result.totalCount;
    this.$images = result.images;
    this.searchSubscription  = null;
  }

  private onError = () => {
    this.snackBar.open('Oops something went wrong.', 'Please try to search again', {
      duration: snackbarDuration
    });
  }
}
