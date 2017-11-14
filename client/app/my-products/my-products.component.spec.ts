import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsComponent } from './my-products.component';
import { SharedModule } from '../shared/shared.module'
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

/*

describe('MyProductsComponent', () => {
  let component: MyProductsComponent;
  let fixture: ComponentFixture<MyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsComponent ],
      imports: [SharedModule],
      providers: [ AuthService, UserService ]
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
*/
