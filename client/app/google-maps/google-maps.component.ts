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
  zoom = 10;
  users = [];
  locations = [];
  isLoading = true;

  // TODO: remove this, used for testing as no data currently has location
  testUser = {
    _id: 1,
    username: "Person 1",
    location: {
      latitude: 63.42,
      longitude: 10.37
    },
    products: ["jd7464djf484y7", "7f78f9shf"]
  };
  testBruker = {
    _id: 2,
    username: "Person 2",
    location: {
      latitude: 63.44,
      longitude: 10.47
    },
    products: ["987fyd8fd7gf", "jiej9ijf9ie"]
  };
  testUsers = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    // TODO: remove these, used for testing as no data currently has locations
    this.testUsers.push(this.testUser);
    this.testUsers.push(this.testBruker);
  }

  filterByUser(id) {
    // TODO: Actually filter by user id
    console.log(id);
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
