import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { GoogleMapsComponent } from '../google-maps/google-maps.component'
import { PaginationComponent } from '../pagination/pagination.component'

import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import {MessageService} from '../services/message.service'
import { UserService } from '../services/user.service'



import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  //Observer vars
  message: any;
  subscription: Subscription;

  query = "";
  product = {};
  products = [];
  minPrice = 0
  maxPrice = Infinity;
  isLoading = true;
  isEditing = false;
  pageNum = 1; //this must be >0
  totalPageNum = 0;
  totalListings = 0;
  listingsPerPage = 10;
  authenticated = false
  userId: string
  user = {}
  searching = false
  sortingParam: string
  sortingOrder = 1
  sortQuery = "?"

  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              public productDetails: ProductDetailsComponent,
              public toast: ToastComponent,
              private auth: AuthService,
              private userService: UserService
              ) {
                //OBSERVER: Subscription function, is run when productDetails runs sendMessage();
                this.subscription = this.messageService.getMessage().subscribe(message => { this.getProducts(this.pageNum, this.sortQuery); this.message = message.text; });
              }

  ngOnInit() {
    this.getProducts(this.pageNum, this.sortQuery);
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      price: this.price
    });
    this.authenticated = this.auth.loggedIn
    this.userId = this.auth.currentUser['_id']
    this.getUser()
  }

updateDetailView(product){
  this.productDetails.setProduct(product);
}

  getProducts(pageNum, sortQuery) {
    this.productService.getProducts(pageNum+sortQuery).subscribe(
      data => {
        this.products = data.docs
        this.totalPageNum = data.pages
        this.totalListings = data.total
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct() {
    //Code to add userid to product
    let productToAdd = this.addProductForm.value
    productToAdd.user = this.userId
    //Adds product to the database
    this.productService.addProduct(productToAdd).subscribe(
      res => {
        const newProduct = res.json();
        //Code to add the new product to current listings
        this.products.push(newProduct);
        this.addProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
        //Creates a list of the current user details
        let newList = this.user
        //pushes product id onto the list
        newList['products'].push(newProduct._id)
        //sets the current user to the list
        this.user = newList
        //updates current user to this.user
        this.userService.editUser(this.user).subscribe(
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }

  enableEditing(product) {
    this.isEditing = true;
    this.product = product;
  }

  cancelEditing() {
    this.isEditing = false;
    this.product = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the products to reset the editing
    this.getProducts(this.pageNum, this.sortQuery);
  }

  editProduct(product) {
    this.productService.editProduct(product).subscribe(
      res => {
        this.isEditing = false;
        this.product = product;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteProduct(product) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.productService.deleteProduct(product).subscribe(
        res => {
          const pos = this.products.map(elem => elem._id).indexOf(product._id);
          this.products.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  sortBy(value){
    this.sortingParam = value
    if(this.sortingOrder === -1){
      this.sortingOrder = 1
    }else{
      this.sortingOrder = -1
    }
    this.sortQuery = "?sortby="+this.sortingParam+"&increasing="+this.sortingOrder
    if(this.searching){
      this.searchProducts()
    }else{
      this.getProducts(this.pageNum, this.sortQuery)
    }
  }

  //Functions called by pagination component
  goToPage(n: number): void {
      this.pageNum = n;
      if (this.searching){
        this.searchProducts()
      }else{
        this.getProducts(this.pageNum, this.sortQuery);
      }
    }

    onNext(): void {
      this.pageNum++;
      if (this.searching){
        this.searchProducts()
      }else{
        this.getProducts(this.pageNum, this.sortQuery);
      }
    }

    onPrev(): void {
      this.pageNum--;
      if (this.searching){
        this.searchProducts()
      }else{
        this.getProducts(this.pageNum, this.sortQuery);
      }
    }

  //Code used to add productId to user
  getUser(){
  this.userService.getUser(this.auth.currentUser).subscribe(
    data => this.user = data,
    error => console.log(error)
    )
  }

  //code used to handle searches
  searchFromBox(){
  this.searchProducts()
}
  searchProducts(){
    //TODO: Add sorting in backend
    if(this.query === ""){
      this.pageNum = 1
      this.getProducts(this.pageNum, this.sortQuery)
      this.searching = false
      return
    }
    this.pageNum = 1
    this.searching = true
    this.productService.searchProduct(this.query, this.pageNum,
      this.minPrice, this.maxPrice+this.sortQuery).subscribe(
      data => {
        this.products = data.docs
        this.totalPageNum = data.pages
        this.totalListings = data.total
      },
      error => console.log(error),
  )
}
}
