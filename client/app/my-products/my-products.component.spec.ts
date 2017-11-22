import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MyProductsComponent } from './my-products.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { HttpModule } from '@angular/http';

import { By } from '@angular/platform-browser';

describe('MyProductsComponent', () => {
  let component: MyProductsComponent;
  let fixture: ComponentFixture<MyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyProductsComponent],
      imports: [HttpModule, RouterTestingModule],
      providers: [AuthService, UserService],
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
    fixture = TestBed.createComponent(MyProductsComponent);
    component = fixture.componentInstance;
    component.isLoading = false;
    component.user = {
      _id: '5a0ad886a0a7776c7403db14',
      username: 'testing',
      role: 'admin',
      products: [
        {
          _id: '5a0c378c59167960b485f315',
          name: 'wall',
          description: 'very category wall',
          price: 92929,
          category: 'Furniture',
          user: '5a0ad886a0a7776c7403db14',
          __v: 0,
          createdAt: '2017-11-15T12:48:12.155Z'
        }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should show a list of the products of the user', () => {
    const el = fixture.debugElement.queryAll(By.css('.productsColumn table tbody tr td'));
    expect(el[0].nativeElement.textContent).toContain('wall');
    expect(el[1].nativeElement.textContent).toContain('92929 NOK');
  });
  it('Should not show recent searches', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.rightColumn table tbody tr td'));
    expect(el.nativeElement.textContent).toContain('You don\'t have any searches.');
  });
});
