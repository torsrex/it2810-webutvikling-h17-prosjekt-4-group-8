import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { ProductsComponent } from './products.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ToastComponent } from '../shared/toast/toast.component';


import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardAdmin } from '../services/auth-guard-admin.service';

import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ProductsComponent],
      providers: [
        UserService,
        ProductService,
        MessageService,
        AuthService,
        AuthGuardAdmin,
        ProductDetailsComponent,
        ToastComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should have isLoading set to true upon pageload', () => {
    expect(component.isLoading).toBe(true);
  });
  it('Should show BestProducts Shopping in h2', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(el.textContent).toContain('BestProducts Shopping');
  });
  it('Should show 3 input forms', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('input'));
    expect(el.length).toBe(3);
  });
  it('Search input should successfully update query', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('input'));
    const inputEl = el[0].nativeElement;
    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.query).toEqual('test');
  });
  it('Minprice input should successfully update minprice variable', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('input'));
    const inputEl = el[1].nativeElement;
    inputEl.value = 3;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.minPrice).toEqual(3);
  });
  it('Maxprice input should successfully update maxprice variable', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('input'));
    const inputEl = el[2].nativeElement;
    inputEl.value = 99;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.componentInstance.maxPrice).toEqual(99);
  });
  it('Category selection should successfully update selectedCategory', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(fixture.componentInstance.selectedCategory).toEqual('default');
  });
  it('Search should call search function', () => {
    component.isLoading = false;
    spyOn(component, 'changedQuery');
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('.searchFields input'));
    const query = el[0].nativeElement;
    query.value = 'test';
    query.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.changedQuery).toHaveBeenCalled();
  });
  it('Should set ascName and sortingParam correctly', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('.productsColumn .clickable'));
    el[0].triggerEventHandler('click', null);
    expect(component.ascName).toBeTruthy();
    expect(component.sortingParam).toContain('name');
  });
  it('Should set ascPrice and sortingParam correctly', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('.productsColumn .clickable'));
    el[1].triggerEventHandler('click', null);
    expect(component.ascPrice).toBeTruthy();
    expect(component.sortingParam).toContain('price');
  });
  it('Should call sortBy function with name', () => {
    component.isLoading = false;
    fixture.detectChanges();
    spyOn(component, 'sortBy');
    const el = fixture.debugElement.queryAll(By.css('.productsColumn .clickable'));
    el[0].triggerEventHandler('click', null);
    expect(component.sortBy).toHaveBeenCalledWith('name');
  });
  it('Should call sortBy function with price', () => {
    component.isLoading = false;
    fixture.detectChanges();
    spyOn(component, 'sortBy');
    const el = fixture.debugElement.queryAll(By.css('.productsColumn .clickable'));
    el[1].triggerEventHandler('click', null);
    expect(component.sortBy).toHaveBeenCalledWith('price');
  });
  it('Should call search function and set query correctly', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('.searchFields input'));
    el[0].nativeElement.value = 'test';
    el[1].nativeElement.value = 20;
    el[2].nativeElement.value = 500;
    el[0].nativeElement.dispatchEvent(new Event('input'));
    el[1].nativeElement.dispatchEvent(new Event('input'));
    el[2].nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(el.length).toBe(3);
    expect(component.query).toContain('test');
    expect(component.minPrice).toEqual(20);
    expect(component.maxPrice).toEqual(500);
    expect(component.pageNum).toEqual(1);
  });
});
