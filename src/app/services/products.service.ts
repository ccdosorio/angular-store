import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this._apiUrl);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this._apiUrl}/${id}`);
  }
}
