/* Component for the google map on the products page that displays user
locations, show a selected product's location, and can be used to
filter the list of products based on the selected user */

import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Subscription } from "rxjs/Rx";

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
  isLoading = true;

  constructor(private userService: UserService,
    private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().
      subscribe(msg => { this.init_lat = msg.text[0]; this.init_lng = msg.text[1]; this.zoom = 10; });
  }

  ngOnInit() {
    this.getUsers();
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

  // Used to filter products by user id, sends id to products component
  filterByUser(id) {
    this.messageService.sendID(id);
  }

  // Used to load the list of users, will then plot markers on the map
  getUsers() {
    this.userService.getUsers().subscribe(
      users => { this.users = users; },
      error => console.log(error),
      () => { this.isLoading = false; }
    );
  }
}
