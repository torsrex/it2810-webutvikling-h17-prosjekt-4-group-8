import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
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
  //TODO: Add validation just like in register page
  user = {
    latitude: 0,
    longitude: 0
  };
  isLoading = true;
  subscription: Subscription;
  init_lat = 63.428024;
  init_lng = 10.393186;
  zoom = 4;

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private messageService: MessageService) {
                  this.subscription = this.messageService.getMessage().subscribe(msg => { this.init_lat = msg.text[0]; this.init_lng = msg.text[1]; this.zoom = 10; });
    }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => {
        this.user = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }

  mapClick = ({coords: {lat: latitude, lng: longitude}}) => {
    this.user = {
      ...this.user,
      latitude,
      longitude
    }
  }

  updateMap($event) {
    this.zoom = $event;
  }

}
