import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCar: Product[] = [];
  total: number = 0;

  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCar = this.storeService.getShoppingCar();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  onAddToShoppingCar(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.showProductDetail = !this.showProductDetail;
        this.productChosen = data;
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2
    }
    this.productsService.create(product)
    .subscribe(
      (data) => {
        console.log("create: ", data);
        this.products.unshift(data);
      }
    )
  }

}
