import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const Routes: Routes = [
  { path: '', component: ShopComponent},
  { path: 'buys', component: ProductDetailsComponent},
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
