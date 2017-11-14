import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AccountComponent } from './account.component';
import { ToastComponent } from '../shared/toast/toast.component';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let authService: AuthService
  let authServiceStub: {
    loggedIn: boolean,
    isAdmin: boolean,
    currentUser: any
  };

  beforeEach(async(() => {
    authServiceStub = {
      loggedIn: true,
      isAdmin: true,
      currentUser: { username: 'Tester' }
    };
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ AccountComponent ],
      providers: [{provide: AuthService, useValue: authServiceStub}, UserService, ToastComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AccountComponent);
      component = fixture.componentInstance;
      authService = fixture.debugElement.injector.get(AuthService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
