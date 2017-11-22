import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardAdmin } from './auth-guard-admin.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthGuardAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardAdmin, AuthService, UserService],
      imports: [HttpModule, RouterTestingModule]
    });
  });

  it('should be created', inject([AuthGuardAdmin], (service: AuthGuardAdmin) => {
    expect(service).toBeTruthy();
  }));
});
