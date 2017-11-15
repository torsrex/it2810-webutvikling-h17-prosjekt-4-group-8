import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*'),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ]);
  phone = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  role = new FormControl('', [
    Validators.required,
  ]);
  latitude = new FormControl('',[
    Validators.required,
    Validators.min(57.8),
    Validators.max(71.5),
  ]);
  longitude = new FormControl('', [
    Validators.required,
    Validators.min(3.5),
    Validators.max(31.5)
  ]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role,
      latitude: this.latitude,
      longitude: this.longitude,
    });
  }

  isValid(){
    if(this.registerForm.valid && !isNaN(this.latitude.value) && !isNaN(this.longitude.value)){
      return false;
    }else{
      return true;
    }
  }

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setPhone() {
    return { 'has-danger': !this.phone.pristine && !this.phone.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }
  setClassLatitude() {
    return {'has-danger': !this.latitude.pristine && !this.latitude.valid }
  }
  setClassLongitude() {
    return {'has-danger': !this.longitude.pristine && !this.longitude.valid }
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('Some bug', 'danger')
    );
  }
}
