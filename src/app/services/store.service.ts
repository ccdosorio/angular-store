import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private _myShoppingCart: Product[] = [];
  private _myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this._myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this._myShoppingCart.push(product);
    this._myCart.next(this._myShoppingCart);
  }

  getShoppingCar(): Product[] {
    return this._myShoppingCart;
  }

  getTotal(): number {
    return this._myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
