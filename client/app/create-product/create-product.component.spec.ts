import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { CreateProductComponent } from './create-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ToastComponent } from '../shared/toast/toast.component';


import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';


describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [CreateProductComponent],
      providers: [
        UserService,
        ProductService,
        MessageService,
        AuthService,
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
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should display a form if authenticated, not loading and in editing mode', () => {
    component.isEditing = true;
    component.isLoading = false;
    component.authenticated = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.centerText'));
    expect(el.nativeElement.textContent).toContain('New product');
  });
  it('Should close when close button is pressed', () => {
    component.isEditing = true;
    component.isLoading = false;
    component.authenticated = true;
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('.largeButton'));
    el[1].triggerEventHandler('click', null);
    expect(component.isEditing).toBe(false);
  });
  it('Should create a productform', () => {
    component.authenticated = true;
    component.isEditing = true;
    component.isLoading = false;
    component.addProductForm.setValue({name: 'yolo', description: 'Wee', price: 1, category: 'default'});
    component.addProduct();
    fixture.detectChanges();
    expect(component.addProductForm.value).toEqual({name: 'yolo', description: 'Wee', price: 1, category: 'default'});

  });
});
