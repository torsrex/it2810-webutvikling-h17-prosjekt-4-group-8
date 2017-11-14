import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MyProductsComponent } from './my-products.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { HttpModule } from '@angular/http'



describe('MyProductsComponent', () => {
  let component: MyProductsComponent;
  let fixture: ComponentFixture<MyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsComponent ],
      imports: [HttpModule, RouterTestingModule],
      providers: [ AuthService, UserService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
