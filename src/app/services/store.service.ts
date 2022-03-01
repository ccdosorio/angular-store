import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _myShoppingCar: Product[] = [];

  constructor() { }

  addProduct(product: Product) {
    this._myShoppingCar.push(product);
  }

  getShoppingCar(): Product[] {
    return this._myShoppingCar;
  }

  getTotal(): number {
    return this._myShoppingCar.reduce((sum, item) => sum + item.price, 0);
  }
}
