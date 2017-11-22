import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { MyProductsComponent } from '../my-products/my-products.component';

@Component({
  selector: 'app-account',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']

})
export class MyPageComponent implements OnInit {
  isLoading = true;
  subscription: Subscription;
  init_lat = 63.428024;
  init_lng = 10.393186;
  zoom = 4;
  user = {};
  userForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern(/[a-zA-Z0-9_-\s]*/),
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
    Validators.minLength(8),
    Validators.maxLength(30)
  ]);
  latitude = new FormControl('', [
    Validators.required,
    Validators.min(57.8),
    Validators.max(71.5),
    Validators.maxLength(30)
  ]);
  longitude = new FormControl('', [
    Validators.required,
    Validators.min(3.5),
    Validators.max(31.5),
    Validators.maxLength(30)
  ]);

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService,
    private messageService: MessageService) {
    this.subscription = this.messageService.getMessage()
      .subscribe(
        msg => {
          this.init_lat = msg.text[0];
          this.init_lng = msg.text[1];
          this.zoom = 10; }
        );
  }

  ngOnInit() {
    this.getUser();
    this.userForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      phone: this.phone,
      role: this.role,
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  isValid = () => !this.userForm.valid;

  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setPhone() {
    return { 'has-danger': !this.phone.pristine && !this.phone.valid };
  }
  setClassLatitude() {
    return { 'has-danger': !this.latitude.pristine && !this.latitude.valid };
  }
  setClassLongitude() {
    return { 'has-danger': !this.longitude.pristine && !this.longitude.valid };
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => {
        this.user = data;
        Object.keys(data).forEach(userField => {
          (this[userField] && this[userField]).setValue(data[userField]);
        });
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save() {
    const updatedUser = this.user;
    Object.keys(this.userForm.value).forEach(updatedField => {
      updatedUser[updatedField] = this.userForm.value[updatedField];
    });
    this.userService.editUser(updatedUser).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  mapClick = ({ coords: { lat, lng } }) => {
    this.userForm.controls['latitude'].setValue(lat);
    this.userForm.controls['longitude'].setValue(lng);
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
