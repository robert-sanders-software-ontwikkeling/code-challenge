import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrderLineActions } from 'src/app/state/order-line/order-line.actions';
import { IShopState } from 'src/app/state/state';
import { changeComponent, getChildElements } from '../../testing/utility';
import { OrderLineComponent } from './order-line.component';

describe('Signup component', () => {
  let component: OrderLineComponent;
  let fixture: ComponentFixture<OrderLineComponent>;
  let store: Store<IShopState>;

  beforeEach(() => {
    store = {
      dispatch: jest.fn()
    } as any;


    return TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [
        {
          provide: Store,
          useFactory: () => store,
        },
      ],
      declarations: [
        OrderLineComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(OrderLineComponent);
    component = fixture.componentInstance;

    component.orderLine = {
      product: {
        id: 1,
        price: 15,
        title: 'test'
      },
      number: 6
    };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('can create order line  component', () => {
    expect(component).toBeTruthy();
  });

  it('Product title is shown', () => {
    const titleElement = getTitleElement();
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent.trim()).toEqual('test');
  });

  it('number is bound to numver input value', () => {
    const numberInputElement = getNumberInputElement();
    expect(numberInputElement).toBeTruthy();
    expect(numberInputElement.value).toEqual('6');
  });

  it('amount is shown', () => {
    const amountElement = getAmountElement();
    expect(amountElement).toBeTruthy();
    expect(amountElement.textContent.trim()).toEqual('€90.00');
  });

  it('updating number input valye will dispatch correct message to ngrx store', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action: any = {};
    const setOrderLineNumberSpy = jest.spyOn(OrderLineActions, 'setOrderLineNumber').mockReturnValue(action);

    await changeComponent(fixture, () => {
        const inputElement = getNumberInputElement();
        inputElement.value = '7';
        inputElement.dispatchEvent(new Event('input'));
    });

    expect(setOrderLineNumberSpy).toHaveBeenCalledTimes(1);
    expect(setOrderLineNumberSpy).toHaveBeenNthCalledWith(1, {productId: 1, number: 7});
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, action);
    expect(component.number).toEqual(7);
  });

  it('calling removeLine will dispatch correct message to ngrx store', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const action: any = {};
    const removeOrderLineSpy = jest.spyOn(OrderLineActions, 'removeOrderLine').mockReturnValue(action);

    component.removeLine();

    expect(removeOrderLineSpy).toHaveBeenCalledTimes(1);
    expect(removeOrderLineSpy).toHaveBeenNthCalledWith(1, {productId: 1});
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, action);
  });

  it('clicking on remove button will call removeLine' , () => {
    const removeLineSpy = jest.spyOn(component, 'removeLine');
    const removeButtonElement = getRemoveButtonElement();
    removeButtonElement.click();
    expect(removeLineSpy).toHaveBeenCalledTimes(1);
  });

  function getNumberInputElement(): HTMLInputElement {
    return getChildElements<HTMLInputElement>(fixture.debugElement, '.c-order-line__number')[0];
  }

  function getTitleElement(): HTMLElement {
    return getChildElements(fixture.debugElement, '.c-order-line__title')[0];
  }

  function getAmountElement(): HTMLElement {
    return getChildElements(fixture.debugElement, '.c-order-line__amount')[0];
  }

  function getRemoveButtonElement(): HTMLElement {
    return getChildElements(fixture.debugElement, '.c-order-line__remove')[0];
  }

});
