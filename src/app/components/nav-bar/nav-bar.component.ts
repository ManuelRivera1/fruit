import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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
  statuShop = false;
  constructor(
    public accountService: AccountService,
    private cartService: CartService,
    private eRef: ElementRef,
    private router: Router
  ) { }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target) && (this.status || this.statuShop)) {
      this.status = false;
      this.statuShop = false;
    }
  }
  ngAfterViewInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }
  irAcomprar() {
    this.statuShop = false;
    this.router.navigateByUrl('/shop/buys');
  }
  dropMenu() {
    this.status = !this.status;
  }
  dropShop() {
    this.statuShop = !this.statuShop;
  }
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
  decrementQuantity(product: any) {
    this.cartService.decrementQuantity(product);
  }
  clearCart() {
    this.cartService.clearCart();
  }
}
