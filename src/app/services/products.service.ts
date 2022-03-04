import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

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

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this._apiUrl}`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this._apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this._apiUrl}/${id}`);
  }
}
