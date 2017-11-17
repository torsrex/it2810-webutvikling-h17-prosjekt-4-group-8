import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserService } from '../services/user.service';
import { HttpModule } from '@angular/http'
import { MessageService } from '../services/message.service'
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpModule],
      declarations: [ RegisterComponent],
      providers: [ToastComponent, UserService, MessageService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Register" in h4', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Register');
  });
  it('Should display register button', () => {
    const el = fixture.debugElement.query(By.css('Button')).nativeElement
    expect(el.textContent).toContain('Register')
  })
});
