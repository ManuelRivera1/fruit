import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.services';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    returnUrl: any;
    isNotUser: boolean = false;
    data:any;
    authUser = false;
    constructor(
      private shopService: ShopService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private cartService: CartService,
      public accountService: AccountService
    ) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'account/login';
    }
    ngOnInit(): void {
      this.listProduct();
    }
    addcarrito(producto:any){
      this.authPermite()
      if(this.authUser){
        this.cartService.addToCart(producto);
      }else{
        alert("Debes iniciar sesion para agregar productos al carrito");
        this.router.navigateByUrl(this.returnUrl)
      }
    }
    authPermite(){
      this.accountService.currentUser$.subscribe(user => {
        this.authUser = true;
      });
    }
    listProduct() {
      this.shopService.getProducts().subscribe({
        next: product => {
          this.data = product;
        },
        error: err => {
          this.isNotUser = !this.isNotUser;
        }
      })
    }
}
