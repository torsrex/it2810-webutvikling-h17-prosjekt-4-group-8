import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';



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
  private userService: UserService,
  private productService: ProductService) { }

  ngOnInit() {
    this.getUser();
    this.getProducts()
  }


  getProducts(){
    this.auth.currentUser.products.map( (id,index) =>
    this.productService.getProduct(id).subscribe(
      data => {
        this.productList.push(data)
      },
      error => console.log(error),
      () => this.isLoading = false
    )
  )
  }


  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
