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
      component.users = [
        {
          _id: "5a0cb6756a60402154b7c724",
          username: "PositionTest",
          email: "positiontest@gmail.com",
          phone: "99288571",
          role: "admin",
          latitude: 60,
          longitude: 4,
          __v: 0,
          products: [ ]
        },
        {
          _id: "5a0ca7fc6a60402154b7c723",
          username: "posTest",
          email: "postest@gmail.com",
          phone: "99288571",
          role: "admin",
          latitude: 60.4344545,
          longitude: 10.456765,
          __v: 0,
          products: [ ]
        }
      ]
      fixture.detectChanges();
    });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should display number of users', () => {
    component.isLoading = false
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css("h4"))
    expect(el.nativeElement.textContent).toContain("Registered users (2)")
  })
  it('Should display user details', () => {
    component.isLoading = false
    fixture.detectChanges()
    const el = fixture.debugElement.queryAll(By.css(".horizontalScroll table tbody tr td"))
    expect(el.length).toBe(8)
    expect(el[0].nativeElement.textContent).toContain("PositionTest")
    expect(el[1].nativeElement.textContent).toContain("positiontest@gmail.com")
    expect(el[2].nativeElement.textContent).toContain("admin")
  })
  it('Should call delete user function', () => {
    component.isLoading = false
    spyOn(component, 'deleteUser')
    fixture.detectChanges()
    const el = fixture.debugElement.query(By.css("button"))
    el.triggerEventHandler('click', null)
    expect(component.deleteUser).toHaveBeenCalled()
  })
});
