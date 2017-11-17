import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from '../services/message.service'
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})


export class ProductDetailsComponent {
  //Needed to bind the product from the parent class to this class.
  @Input() product = {_id: '', name: '', description: '', price: '', createdAt: '', userId: '', category: '', user: {username: '', email: ''}};
  @Input() authenticated: boolean
  //Local variables
  isEditing = false;
  //Form variables
  editProductForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);




  constructor(private productService: ProductService,
              private message: MessageService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      name: "",
      description: "",
      price: null,
    });
  }

  removeDetailsCard(){
    this.sendMessage("hide product details");
  }

  //sets the current component values to the clicked product.
  setProduct(product){
    this.product = product;
    console.log(this.product)
  }
  // send message to subscribers from observable subject(this component) to (typically parent class)
  sendMessage(message): void {
    this.message.sendMessage(message);
   }

   //Start editing
   enableEditing() {
     this.editProductForm.setValue({name: this.product.name, description: this.product.description, price: this.product.price});
     this.isEditing = true;
   }
   //Discard changes
   cancelEditing() {
     this.isEditing = false;
     this.toast.setMessage('item editing cancelled.', 'warning');
   }
   //Save changes, end editing
   editProduct() {
     console.log(this.editProductForm.value);
     //In case of error, don't update product values.
     const oldName = this.product.name;
     const oldDescription = this.product.description;
     const oldPrice = this.product.price;
     //Update product values based on form fields before saving
     this.product.name = this.editProductForm.value.name;
     this.product.description = this.editProductForm.value.description;
     this.product.price = this.editProductForm.value.price;
     //Try to save to DB
     this.productService.editProduct(this.product).subscribe(
       res => {
         this.isEditing = false;
         this.sendMessage("edited");
         this.toast.setMessage('item edited successfully.', 'success');
       },
       error => {
         console.log(error)
         //Revert changes.
         this.product.name = oldName;
         this.product.description = oldDescription;
         this.product.price = oldPrice;
       }
     );
   }

   //Delete product
   deleteProduct() {
     if (window.confirm('Are you sure you want to permanently delete this item?')) {
       this.productService.deleteProduct(this.product).subscribe(
         res => {
           //const pos = this.product.map(elem => elem._id).indexOf(product._id);
           //this.product.splice(pos, 1);
           this.sendMessage("deleted");
           this.toast.setMessage('item deleted successfully.', 'success');
         },
         error => console.log(error)
       );
     }
   }

   // Send to coords to map
   sendCoords(lat, lng): void {
     this.message.sendCoords(lat, lng);
   }
}
