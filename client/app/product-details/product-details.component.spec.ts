import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from '../shared/toast/toast.component';

import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { ProductService } from '../services/product.service'
import { MessageService } from '../services/message.service'
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'
import { AuthGuardAdmin } from '../services/auth-guard-admin.service'
import { HttpModule } from '@angular/http'

import { By } from '@angular/platform-browser';


describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpModule, RouterTestingModule],
      declarations: [ ProductDetailsComponent ],
      providers: [
        ProductService,
        MessageService,
        AuthService,
        UserService,
        ToastComponent,
        AuthGuardAdmin]
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
  it('Should display product details ', () => {
     component.product = {
       _id: '1',
       name: 'Testproductname',
       description: 'Testproductdescription',
       price: '3',
       createdAt: '2017-11-15T13:29:01.332Z',
       userId: '9',
       category: 'Electronics',
       user: {_id: '1', username: 'test', email: 'test@test.com'}
     }
     fixture.detectChanges()
     const el = fixture.debugElement.queryAll(By.css('.productCardInfo div p'))
     expect(el[0].nativeElement.textContent).toContain("PRICE: 3")
     expect(el[1].nativeElement.textContent).toContain("TYPE: Electronics")
     expect(el[2].nativeElement.textContent).toContain("ADDED: 2017-11-15T13:29:01.332Z")
     expect(el[3].nativeElement.textContent).toContain("NAME: test")
     expect(el[4].nativeElement.textContent).toContain("EMAIL: test@test.com")
  })
  it('Should display editing state', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.userId = '1'
    component.authenticated = true
    spyOn(component, 'enableEditing');
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.detailsCard div i'))
    const pencil = el[0]
    pencil.triggerEventHandler('click', null)
    expect(component.enableEditing).toHaveBeenCalled()
  })
  it('Should toggle to edit a field', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.authenticated = true
    component.userId = '1'
    component.isEditing = true
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.cardContent form div input'))
    expect(el.length).toBe(3)
  })
  it('Should cancel editing', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.authenticated = true
    component.isEditing = true
    component.userId = '1'
    spyOn(component, 'cancelEditing');
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.cardContent button'))[1]
    el.triggerEventHandler('click', null)
    expect(component.cancelEditing).toHaveBeenCalled()
  })

  it('Should delete product', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.authenticated = true
    spyOn(component, 'deleteProduct');
    component.userId = '1'
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.detailsCard div i'))
    const pencil = el[1]
    pencil.triggerEventHandler('click', null)
    expect(component.deleteProduct).toHaveBeenCalled()
  })
  it('Should call remove detailscard function', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.authenticated = true
    component.userId = '1'
    spyOn(component, 'removeDetailsCard')
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.cardHeader i'))
    const close = el[2]
    close.triggerEventHandler('click', null)
    expect(component.removeDetailsCard).toHaveBeenCalled()
  })
  it('Should change editing variable', () => {
    component.product = {
      _id: '1',
      name: 'Testproductname',
      description: 'Testproductdescription',
      price: '3',
      createdAt: '2017-11-15T13:29:01.332Z',
      userId: '9',
      category: 'Electronics',
      user: {_id: '1', username: 'test', email: 'test@test.com'}
    }
    component.userId = '1'
    component.authenticated = true
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css('.detailsCard div i'))
    const pencil = el[0]
    pencil.triggerEventHandler('click', null)
    expect(component.isEditing).toBeTruthy()
  })
});
