import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IShopState } from 'src/app/state/state';
import { ProductComponent } from './product.component';
import { Store } from '@ngrx/store';

describe('Product component', () => {
  let component: ProductComponent;
  let store: Store<IShopState>;

  beforeEach(() => {
    store = {
      dispatch: jest.fn()
    } as any;

    return TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: Store,
          useFactory: () => store,
        },
      ],
      declarations: [
        ProductComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    const fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('can create product component', () => {
    expect(component).toBeTruthy();
  });

});
