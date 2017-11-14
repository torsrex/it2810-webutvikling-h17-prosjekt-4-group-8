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
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'


describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule, FormsModule, ReactiveFormsModule ],
      declarations: [ ProductsComponent ],
      providers: [
        UserService,
        ProductService,
        MessageService,
        AuthService,
        ProductDetailsComponent,
        ToastComponent
       ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
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












/*describe('Component: Cats', () => {
  it('should create an instance', () => {
    let component = new CatsComponent();
    expect(component).toBeTruthy();
  });
});*/
