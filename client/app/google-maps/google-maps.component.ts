import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  lat = 63.428024;
  lng = 10.393186;
  zoom = 10;
  users = [];
  locations = [];
  isLoading = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data
      },
      error => console.log(error),
      () => {
        this.getLocations();
      }
    );
  }

  getLocations() {
    for (let i = 0; i < this.users.length; i++) {
      const loc = this.users[i].location
      if (loc) {
        this.locations.push(this.users[i].location)
      }
    }
    this.isLoading = false
  }

}
