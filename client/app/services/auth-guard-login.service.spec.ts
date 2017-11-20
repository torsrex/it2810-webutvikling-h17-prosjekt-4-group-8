import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardLogin } from './auth-guard-login.service';
import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { HttpModule } from '@angular/http'
import { RouterTestingModule } from '@angular/router/testing';



describe('AuthGuardLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardLogin, AuthService, UserService],
      imports: [ HttpModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([AuthGuardLogin], (service: AuthGuardLogin) => {
    expect(service).toBeTruthy();
  }));
});
