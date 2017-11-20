import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getProducts(pageNum): Observable<any> {
    return this.http.get(`/api/products/getsome/${pageNum}`).map(res => res.json());
  }

  addProduct(product): Observable<any> {
    return this.http.post('/api/product', JSON.stringify(product), this.options);
  }

  getProduct(id): Observable<any> {
    return this.http.get(`/api/product/${id}`).map(res => res.json());
  }

  editProduct(product): Observable<any> {
    return this.http.put(`/api/product/${product._id}`, JSON.stringify(product), this.options);
  }

  deleteProduct(product): Observable<any> {
    return this.http.delete(`/api/product/${product._id}`, this.options);
  }

  searchProduct(query, pageNum, min, max): Observable<any> {
    if(query === ""){
      query = ".*"
    }
    return this.http.get(`/api/products/search/${query}/${pageNum}/${min}/${max}`,
      this.options).map(res => res.json());

  }

}
