import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdmonProductComponent } from './admon-product/admon-product.component';
import { ListBuysComponent } from './list-buys/list-buys.component';

const Routes: Routes = [
  { path: '', component: ShopComponent},
  { path: 'buys', component: ProductDetailsComponent},
  { path: 'admonProduc', component: AdmonProductComponent},
  { path: 'listBuys', component: ListBuysComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
