import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

const Routes: Routes = [
  { path: '', component: ShopComponent},
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
