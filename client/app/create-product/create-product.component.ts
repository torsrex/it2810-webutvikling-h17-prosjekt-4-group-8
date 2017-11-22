/* Component for creating a new product and adding it to the database */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


import { ToastComponent } from '../shared/toast/toast.component';

import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

import { Subscription } from "rxjs/Rx";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})

export class CreateProductComponent implements OnInit {
  // Observer vars
  message: any;
  subscription: Subscription;
  isLoading = false;
  authenticated = false; // Is the user authenticated?
  userId: string; // What is the current userid?
  user = {}; // List containing the current user's parameters
  @Input() isEditing: boolean; // Used to show or hide the form
  @Output() productAdded = new EventEmitter();

  // Creates the default formgroup for adding a new product
  addProductForm: FormGroup;
  name = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);
  description = new FormControl('', [
    Validators.required,
    Validators.maxLength(250)
  ]);
  price = new FormControl('', [
    Validators.required,
    Validators.maxLength(30)
  ]);
  category = new FormControl('', [
    Validators.required
  ]);
  categories = ['Electronics', 'Household items', 'Furniture', 'Pets', 'Sports', 'Gardening'];
  selectedCategory = 'default';

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent,
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Creates the add productform
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category
    });
    // Gets user logged in status
    this.authenticated = this.auth.loggedIn;
    // Sets the userid
    this.userId = this.auth.currentUser['_id'];
    // Gets other user paramters
    if (this.authenticated) {

      this.getUser();
    }
  }
  // Adds a new product
  addProduct() {
    // Code to add userid to product
    const productToAdd = this.addProductForm.value;
    productToAdd.user = this.userId;
    // Adds product to the database
    this.productService.addProduct(productToAdd).subscribe(
      res => {
        const newProduct = res.json();
        this.productAdded.emit(newProduct);
        // Code to add the new product to current listings
        this.addProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
        // Creates a list of the current user details
        const newList = this.user;
        // pushes product id onto the list
        newList['products'].push(newProduct._id);
        // sets the current user to the list
        this.user = newList;
        // updates current user to this.user
        this.userService.editUser(this.user).subscribe(
          error => console.log(error)
        );
      },
      error => console.log(error),
      () => this.isEditing = false
    );
  }

  // Code used to add productId to user
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }
}
