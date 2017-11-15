import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  init_lat = 63.428024;
  init_lng = 10.393186;
  zoom = 4;
  users = [];
  isLoading = true

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
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
