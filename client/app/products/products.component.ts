import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  query = "";
  product = {};
  products = [];
  filteredProducts = [];
  minPrice = 0;
  maxPrice = Infinity;
  isIncreasing = true;
  isLoading = true;
  isEditing = false;

  addProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getProducts();
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      price: this.price
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        this.filteredProducts = data
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addProduct() {
    this.productService.addProduct(this.addProductForm.value).subscribe(
      res => {
        const newProduct = res.json();
        this.products.push(newProduct);
        this.addProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
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
    // reload the cats to reset the editing
    this.getProducts();
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

  filterProducts() {
    this.filteredProducts = this.products
    .filter(product => product.name.includes(this.query))
    .filter(product => product.price > this.minPrice && product.price < this.maxPrice)
  }


  sortBy(type) {
    this.filteredProducts = this.products.sort((a,b) => {
      if(this.isIncreasing) {
        if(typeof a[type] === "number") {
          return a[type] - b[type]
        } else {
          return a[type].localeCompare(b[type])
        }
      } else {
        if(typeof a[type] === "number") {
          return b[type] - a[type]
        } else {
          return b[type].localeCompare(a[type])
        }
      }
    })
    this.isIncreasing = !this.isIncreasing
    this.filterProducts()
  }


}
