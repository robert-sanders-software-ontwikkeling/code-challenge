import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from './app.component';
import { ImageModule } from './components/image/image.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { BadLanguageFilter } from './services/bad-language-filter.service';
import { GyphyRating, GyphyResourceType } from './services/gyphy.model';
import { ImageRepository } from './services/image-repository';
import { RepositoryImages } from './services/image-repository.model';

describe('AppComponent', () => {
  let imageRepository: ImageRepository;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let badLanguageFilter: BadLanguageFilter;
  let searchObserver: Observable<RepositoryImages>;
  let searchSubscription: Subscription;
  let bottomSheet: MatBottomSheet;

  beforeEach(async () => {
    badLanguageFilter = {
      isBad: jest.fn()
    } as any;
    imageRepository = {
      getTotalCount: jest.fn(),
      get: jest.fn(),
    } as any;

    bottomSheet =  {
      open: jest.fn()
    } as any;


    return TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSnackBarModule,
        ImageModule,
        ToolbarModule
      ],
      providers: [
        {
          provide: BadLanguageFilter,
          useFactory: () => badLanguageFilter ,
        },
        {
          provide: ImageRepository,
          useFactory: () => imageRepository ,
        },
        {
          provide: MatBottomSheet,
          useFactory: () => bottomSheet,
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    searchObserver = new Observable<RepositoryImages>();
    searchSubscription = new Subscription();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
});

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('nnOnDestroy will cancel pending request', () => {
      const unsubsribeSpy = jest.spyOn(searchSubscription, 'unsubscribe');
      jest.spyOn(searchObserver, 'subscribe').mockReturnValue(searchSubscription);
      jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
      component.search('test');
      component.ngOnDestroy();
      expect(unsubsribeSpy).toHaveBeenCalledTimes(1);
  });


  it('search will validate on bad language', () => {
      const isBadSpy = jest.spyOn(badLanguageFilter, 'isBad').mockReturnValue(true);
      component.search('test');
      expect(isBadSpy).toHaveBeenCalledTimes(1);
      expect(isBadSpy).toHaveBeenNthCalledWith(1, 'test');
  });

  it('search will not be execute if searching in bad language', () => {
    jest.spyOn(badLanguageFilter, 'isBad').mockReturnValue(true);
    const getSpy =  jest.spyOn(imageRepository, 'get');
    component.search('test');
    expect(getSpy).not.toHaveBeenCalled();
  });

  it('search will reset currentPage', () => {
    (component as any).$currentPage = 10;
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.search('test');
    expect(component.currentPage).toEqual(0);
  });

  it('search will clear totalCount', () => {
    (component as any).$totalCount = 10;
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.search('test');
    expect(component.totalCount).toEqual(0);
  });

  it('search will clear images', () => {
    (component as any).$images = ['a', 'b'];
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.search('test');
    expect(component.images).toEqual([]);
  });

  it('search will cancel pending request', () => {
    const cancelSearchRequestSpy = jest.spyOn(component as any, 'cancelSearchRequest');
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.search('test');
    expect(cancelSearchRequestSpy).toHaveBeenCalledTimes(1);
  });

  it('onSelectedImageTypeChanged will reset currentPage', () => {
    (component as any).$currentPage = 10;
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedImageTypeChanged(GyphyResourceType.Stickers);
    expect(component.currentPage).toEqual(0);
  });

  it('onSelectedImageTypeChanged will set selectedImageType', () => {
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedImageTypeChanged(GyphyResourceType.Stickers);
    expect(component.selectedImageType).toEqual(GyphyResourceType.Stickers);
  });


  it('onSelectedImageTypeChanged will execute search', () => {
    const getSpy = jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedImageTypeChanged(GyphyResourceType.Stickers);
    component.search('test');
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('onSelectedRatingChanged will reset currentPage', () => {
    (component as any).$currentPage = 10;
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedRatingChanged(GyphyRating.Rated);
    expect(component.currentPage).toEqual(0);
  });

  it('onSelectedRatingChanged will set selectedRating', () => {
    jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedRatingChanged(GyphyRating.Rated);
    expect(component.selectedRating).toEqual(GyphyRating.Rated);
  });

  it('onSelectedRatingChanged will execute search', () => {
    const getSpy = jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
    component.onSelectedRatingChanged(GyphyRating.Rated);
    component.search('test');
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('onPageEvent will execute search', fakeAsync(() => {
      const getSpy = jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
      (component as any).searchText = 'text';
      component.onPageEvent({
        pageIndex: 2,
        pageSize: 10,
        length: 100
      });
      tick(200);
      expect(getSpy).toHaveBeenCalledTimes(1);
  }));

  it('onPageEvent will set pageSize', () => {
    component.onPageEvent({
      pageIndex: 2,
      pageSize: 10,
      length: 100
    });
    expect(component.pageSize).toEqual(10);
  });

  it('onPageEvent will set currentPage', () => {
    component.onPageEvent({
      pageIndex: 2,
      pageSize: 10,
      length: 100
    });
    expect(component.currentPage).toEqual(2);
  });

  it('ImageRepository.get will be called with correct parameters', () => {
      const getSpy = jest.spyOn(imageRepository, 'get').mockReturnValue(searchObserver);
      (component as any).$currentPage = 2;
      const expectedQuery = {
        searchText: 'test',
        count: 15,
        offset: 0,
        rating: GyphyRating.AllAge
      };
      component.search('test');
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenNthCalledWith(1, GyphyResourceType.Gifs, expectedQuery);
  });

    // TODO add binding tests
});
