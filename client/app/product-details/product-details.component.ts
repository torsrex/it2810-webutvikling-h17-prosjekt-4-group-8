/* Component for the box containing product details that show ut when
the user clicks a products in the list. The box also contains buttons for
sorting the list by user and showing user location on the map, as well as
editing and deleting. */

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { AuthGuardAdmin } from '../services/auth-guard-admin.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})


export class ProductDetailsComponent implements OnInit {
  // Needed to bind the product from the parent class to this class.
  @Input() product = {
    _id: '',
    name: '',
    description: '',
    price: '',
    createdAt: '',
    userId: '',
    category: '',
    user: { _id: '', username: '', email: '' }
  };
  @Input() authenticated: boolean;
  @Output() productDeleted = new EventEmitter();
  @Output() productEdited = new EventEmitter();
  @Output() hideProductDetails = new EventEmitter();
  // Local variables
  isEditing = false;
  // Form variables
  editProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  // Userid to handle permissions
  userId: string;
  isAdmin: boolean;

  constructor(private productService: ProductService,
    private message: MessageService,
    public toast: ToastComponent,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private authGuardAdmin: AuthGuardAdmin) { }
  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      name: '',
      description: '',
      price: null,
    });
    this.userId = this.auth.currentUser['_id'];
    this.isAdmin = this.authGuardAdmin.canActivate();
  }

  // sets the current component values to the clicked product.
  setProduct(product) {
    this.product = product;
  }

  // gets the is of the selected user to send to product component
  filterByUser(id) {
    this.message.sendID(id);
  }

  // Send to coords to map
  sendCoords(lat, lng): void {
    this.message.sendCoords(lat, lng);
  }

  // sends the user ID to product component for filtering
  sendID(id): void {
    this.message.sendID(id);
  }


  // Start editing
  enableEditing() {
    this.editProductForm.setValue({ name: this.product.name, description: this.product.description, price: this.product.price });
    this.isEditing = true;
  }
  // Discard changes
  cancelEditing() {
    this.isEditing = false;
    this.toast.setMessage('item editing cancelled.', 'warning');
  }
  // Save changes, end editing
  editProduct() {
    // In case of error, don't update product values.
    const editproduct = this.product;
    // Update product values based on form fields before saving
    editproduct.name = this.editProductForm.value.name;
    editproduct.description = this.editProductForm.value.description;
    editproduct.price = this.editProductForm.value.price;
    this.productEdited.emit(editproduct);
    this.isEditing = false;
  }

  // Delete product
  deleteProduct() {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.productDeleted.emit(this.product);
      this.hideProductDetails.emit(false);
    }
  }
  hideDetailWindow() {
    this.hideProductDetails.emit(false);
  }
}
