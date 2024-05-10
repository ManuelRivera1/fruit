import { AfterViewInit, Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {
  cart: any;
  status = false;
  constructor(
    public accountService: AccountService,
    private cartService: CartService
  ) { }
  ngAfterViewInit(): void {
    this.cartService.cart$.subscribe(cart => {  // suscribirse al BehaviorSubject
      this.cart = cart;
      
      console.log(this.cart);
      console.log(this.cart.length);
    });
  }
  dropMenu() {
    this.status = !this.status;
  }
}
