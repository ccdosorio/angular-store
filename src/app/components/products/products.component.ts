import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
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

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Change Titulo'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe((data) => {
      console.log("updated", data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

}
