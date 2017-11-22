/* Component for the Register page, which handles registering a new user
with the required information */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Rx';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {

  subscription: Subscription;
  init_lat = 63.428024;
  init_lng = 10.393186;
  zoom = 4;

  registerForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern(/[a-zA-Z0-9_-\s]*/),
  ]);
  password = new FormControl('', [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(30)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ]);
  role = new FormControl('', [
    Validators.required,
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern(/\d+/),
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);
  latitude = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);
  longitude = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public toast: ToastComponent,
    private userService: UserService,
    private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
      .subscribe(
        msg => {
          this.init_lat = msg.text[0];
          this.init_lng = msg.text[1];
          this.zoom = 10;
        });
  }

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

  isValid = () => !this.registerForm.valid;

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
    return { 'has-danger': !this.latitude.pristine && !this.latitude.valid };
  }
  setClassLongitude() {
    return { 'has-danger': !this.longitude.pristine && !this.longitude.valid };
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('Email already exists', 'danger')
    );
  }

  mapClick = ({ coords: { lat, lng } }) => {
    this.registerForm.controls['latitude'].setValue(lat);
    this.registerForm.controls['longitude'].setValue(lng);
  }

  // Updates the zoom level when the user zooms the map
  updateMapZoom($event) {
    this.zoom = $event;
  }

  // Updates center of map when it changes (i.e. user drags the map)
  updateMapCenter($event) {
    this.init_lat = $event.lat;
    this.init_lng = $event.lng;
  }
}
