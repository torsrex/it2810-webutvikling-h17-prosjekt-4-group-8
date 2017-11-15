import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { ProductsComponent } from './products.component'
import { ProductDetailsComponent } from '../product-details/product-details.component'
import { ToastComponent } from '../shared/toast/toast.component';


import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service'
import { MessageService } from '../services/message.service'
import { AuthService } from '../services/auth.service'

import { HttpModule } from '@angular/http'
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

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
});
