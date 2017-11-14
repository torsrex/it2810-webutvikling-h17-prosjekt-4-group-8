import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';
import { ToastComponent } from '../shared/toast/toast.component';

import { HttpModule } from '@angular/http'

import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service'

import { By } from '@angular/platform-browser';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
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
      imports: [HttpModule, RouterTestingModule],
      declarations: [ AdminComponent ],
      providers: [AuthService, UserService, ToastComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AdminComponent);
      component = fixture.componentInstance;
      authService = fixture.debugElement.injector.get(AuthService);
      fixture.detectChanges();
    });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should not have any users', () => {
    let el = fixture.componentInstance
    el.getUsers()
    expect(el.users.length).toBe(0)
  })
});
