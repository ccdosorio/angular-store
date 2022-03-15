import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { retry } from 'rxjs';

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _apiUrl: string = `${environment.API_URL}/api/products`;
  // private _apiUrl: string = 'https://young-sands-07814.herokuuuapp.com/api/products'; -> para el retry

  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this._apiUrl, { params })
    .pipe(
      retry(3) // re intentar la petición 3 veces, en este caso modificamos el endpoint a uno erróneo
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this._apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this._apiUrl}/`, {
      params: { limit, offset }
    });
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
