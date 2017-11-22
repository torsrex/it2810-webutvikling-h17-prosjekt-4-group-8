import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ToastComponent } from '../shared/toast/toast.component';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { PaginationComponent } from '../pagination/pagination.component';

import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  // Observer vars
  subscription: Subscription;

  query = ''; // Searchquery
  product = {}; // A single product, used when updating detailview and editing
  products = []; // List containing all products fetched from api
  minPrice = -Infinity; // Minprice in search filter
  maxPrice = Infinity; // Maxprice in search filter
  isLoading = true;
  authenticated = false; // Is the user authenticated?
  userId: string; // What is the current userid?
  user = {}; // List containing the current user's parameters

  // Used by pagination component
  pageNum = 1; // this must be >0, which page we are on
  totalPageNum = 0; // Total number of pages
  totalListings = 0; // Total number of productlistings
  listingsPerPage = 10; // How many to list pr. page
  hidePagination = false;

  // Used to handle search and sorting
  searching = false; // Variable to indicate if we're in search mode
  sortingParam: string; // What to sort by
  sortingOrder = true; // What order to sort by
  sortQuery = '?'; // Holds the sort query
  selectedCategory = 'default';
  ascName = false;
  ascPrice = false;
  nameSelected = false;
  priceSelected = false;
  isLoadingDynamic = false;

  lastSelected = null;
  displayProductDetails = false;

  // Creates the default formgroup for adding a new product
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  categories = ['Electronics', 'Household items', 'Furniture', 'Pets', 'Sports', 'Gardening'];

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public productDetails: ProductDetailsComponent,
    public toast: ToastComponent,
    private auth: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // OBSERVER: Subscription function, is run when productDetails runs sendMessage();
    this.subscription = this.messageService.getID()
      .subscribe(id => { this.filterByUser(id.text); });
    // Initial fetch of products
    this.getProducts(this.pageNum, this.sortQuery);
    // Gets user logged in status
    this.authenticated = this.auth.loggedIn;
    // Sets the userid
    this.userId = this.auth.currentUser['_id'];
    // Gets other user paramters
    if (this.authenticated) {
      this.getUser();
    }
  }

  // Fetches products and stores in products list
  getProducts(pageNum, sortQuery) {
    this.productService.getProducts(pageNum + sortQuery).subscribe(
      data => {
        this.products = data.docs;
        this.totalPageNum = data.pages;
        this.totalListings = data.total;
      },
      error => console.log(error),
      () => { this.isLoading = false, this.isLoadingDynamic = false; }
    );
  }
  // Code used to add productId to user
  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  updateDetailView(product) {
    this.productDetails.setProduct(product);
    this.displayProductDetails = true;
  }
  updateStyle($event) {
    if (this.lastSelected) {
      this.lastSelected.classList.remove('styleThis');
    }
    this.lastSelected = $event.target.parentNode;
    $event.target.parentNode.classList.add('styleThis');
  }

  handleProductAdded(product) {
    this.products.push(product);
    this.totalListings++;
  }
  handleHideProductDetails(param) {
    this.displayProductDetails = param;
  }

  handleProductEdited(product) {
    this.productService.editProduct(product).subscribe(
      res => {
        this.product = product;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  handleProductDeleted(product) {
    this.productService.deleteProduct(product).subscribe(
      res => {
        const pos = this.products.map(elem => elem._id).indexOf(product._id);
        this.products.splice(pos, 1);
        this.toast.setMessage('item deleted successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  // Sorting functions
  toggleNameSort() {
    this.ascName = !this.ascName;
    this.ascPrice = true;
    this.nameSelected = true;
    this.priceSelected = false;
  }
  togglePriceSort() {
    this.ascPrice = !this.ascPrice;
    this.ascName = true;
    this.nameSelected = false;
    this.priceSelected = true;
  }
  sortBy(value) {
    this.sortingParam = value;
    this.sortingOrder = !this.sortingOrder;
    this.sortQuery = `?sortby=${this.sortingParam}&increasing=${this.sortingOrder ? 1 : -1}`;
    if (this.searching) {
      this.searchProducts();
    } else {
      this.isLoadingDynamic = true;
      this.getProducts(this.pageNum, this.sortQuery);
    }
  }

  // Functions called by pagination component
  goToPage(n: number): void {
    this.pageNum = n;
    if (this.searching) {
      this.searchProducts();
    } else {
      this.getProducts(this.pageNum, this.sortQuery);
    }
  }

  onNext(): void {
    this.pageNum++;
    if (this.searching) {
      this.searchProducts();
    } else {
      this.getProducts(this.pageNum, this.sortQuery);
    }
  }

  onPrev(): void {
    this.pageNum--;
    if (this.searching) {
      this.searchProducts();
    } else {
      this.getProducts(this.pageNum, this.sortQuery);
    }
  }

  // filters the list of products based on user id, can get id from both the
  // GoogleMapsComponent and the ProductDetailsComponent
  filterByUser(id) {
    this.hidePagination = true;
    this.userService.getUserWithProducts(id).subscribe(
      data => this.products = data.products,
      error => console.log(error)
    );
  }
  // code used to handle searches
  searchProducts() {
    if (this.query === '' && this.minPrice === (-Infinity) &&
      this.maxPrice === Infinity && this.selectedCategory === 'default') {
      this.pageNum = 1;
      this.searching = false;
      this.getProducts(1, '?');
      return;
    }
    // Creates search history
    let history = [];
    const object = { query: this.query, minPrice: this.minPrice, maxPrice: this.maxPrice };
    if (JSON.parse(localStorage.getItem('searches'))) {
      history = JSON.parse(localStorage.getItem('searches'));
      history.unshift(object);
    } else {
      history.unshift(object);
    }
    history.splice(10);
    localStorage.setItem('searches', JSON.stringify(history));

    // Handles default search variables
    this.searching = true;
    this.hidePagination = false;
    this.pageNum = 1;
    // Code to fix minprice and maxPrice
    this.minPrice = !this.minPrice ? 0 : this.minPrice;
    this.maxPrice = !this.maxPrice ? Infinity : this.maxPrice;
    this.isLoadingDynamic = true;
    this.productService.searchProduct(this.query, this.pageNum,
      this.minPrice, this.maxPrice + this.sortQuery + '&category=' + this.selectedCategory).subscribe(
      data => {
        this.products = data.docs;
        this.totalPageNum = data.pages;
        this.totalListings = data.total;
      },
      error => console.log(error),
      () => this.isLoadingDynamic = false
      );
  }
  // Resets (literally) all of the components state
  clearFilter() {
    this.pageNum = 1;
    this.query = '';
    this.ascName = false;
    this.ascPrice = false;
    this.nameSelected = false;
    this.priceSelected = false;
    this.hidePagination = false;
    this.displayProductDetails = false;
    this.minPrice = -Infinity;
    this.maxPrice = Infinity;
    this.sortQuery = '?';
    this.selectedCategory = 'default';
    this.lastSelected = null;
    this.goToPage(1);
    this.getProducts(this.pageNum, this.sortQuery);
  }
}
