import { Component, OnInit, NgModule } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  productList = []
  user = { _id: '', username: '', role: '', products: []};
  isLoading = true;
  searches = []
  constructor(private auth: AuthService,
  private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserWithProducts();
    this.getFromLocalStorage()
  }

  getFromLocalStorage(){
    if(JSON.parse(localStorage.getItem('searches'))){
      this.searches = JSON.parse(localStorage.getItem('searches'))
    }

  }
  getUserWithProducts() {
    this.userService.getUserWithProducts(this.auth.currentUser._id).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
