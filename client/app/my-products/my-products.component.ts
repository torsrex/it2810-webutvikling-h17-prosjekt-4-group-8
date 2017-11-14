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

  constructor(private auth: AuthService,
  private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserWithProducts();
  }


  getUserWithProducts() {
    this.userService.getUserWithProducts(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}