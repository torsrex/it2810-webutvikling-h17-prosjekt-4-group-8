import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  subscription: Subscription;
  init_lat = 63.428024;
  init_lng = 10.393186;
  zoom = 4;
  users = [];
  isLoading = true
  msg: any;

  constructor(private userService: UserService,
              private messageService: MessageService) {
                this.subscription = this.messageService.getMessage().subscribe(msg => { this.init_lat = msg.text[0]; this.init_lng = msg.text[1]; this.zoom = 10; });
  }

  ngOnInit() {
    this.getUsers();
  }

  updateMap($event) {
    this.zoom = $event;
  }

  filterByUser(id) {
    // TODO: Actually filter by user id
    console.log(id);
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => {this.users = users},
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }
}
