import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from '../shared/toast/toast.component';

import { ProductDetailsComponent } from './product-details.component';
import { ReactiveFormsModule } from '@angular/forms'
import { ProductService } from '../services/product.service'
import { MessageService } from '../services/message.service'
import { HttpModule } from '@angular/http'



describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpModule],
      declarations: [ ProductDetailsComponent ],
      providers: [ProductService, MessageService, ToastComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
