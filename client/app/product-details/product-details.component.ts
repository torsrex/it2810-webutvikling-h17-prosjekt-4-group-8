import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  @Input() product = {_id: '', title: '', description: '', price: '', date: '', image: '', userId: '', tlf: '', email: ''};

  setProduct(product){
    //Updates the data displayed in the productDetails window.
    this.product.title = product.name;
    this.product.description = product.description;
    this.product.price = product.price;
    this.product.date = product.createdAt;
    this.product.image = product.image;
    this.product.userId = product.userId;
  }
}
