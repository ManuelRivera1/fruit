import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdmonProductComponent } from './admon-product/admon-product.component';
import { ListBuysComponent } from './list-buys/list-buys.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailsComponent,
    AdmonProductComponent,
    ListBuysComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { }
