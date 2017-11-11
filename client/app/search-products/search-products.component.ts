import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  foundProducts = [];
  query = "";
  isLoading = false

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  searchProducts(){
    this.isLoading = true
    this.productService.searchProduct(this.query).subscribe(
      data => {
        this.foundProducts = data
      },
      error => console.log(error),
      () => this.isLoading = false
  )
}
}
