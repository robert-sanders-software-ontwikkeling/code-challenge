import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { Store } from '@ngrx/store';

import {OrderLineModule} from '../order-line/order-line.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IShopState } from 'src/app/state/state';
import { of } from 'rxjs';

describe('Basket component', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: Store<IShopState>;
  let state: IShopState;

  beforeEach(() => {
    state = {
      orderState: {
        orderLines: []
      },
      productsState: {products: []}
    };
    store = {
      select: () => of(state)
    } as any;

    return TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        OrderLineModule
      ],
      providers: [
        {
          provide: Store,
          useFactory: () => store,
        },
      ],
      declarations: [
        BasketComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('can create Bbsket component', () => {
    expect(component).toBeTruthy();
  });

});
