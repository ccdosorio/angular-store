import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  FormsModule  } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"

import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImgComponent } from './components/img/img.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { VowelsPipe } from './pipes/vowels.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductsComponent,
    ProductComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelsPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
