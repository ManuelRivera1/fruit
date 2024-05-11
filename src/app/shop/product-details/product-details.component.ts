import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit{
  cart: any;
  total: any;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.totalCart();
    });
  }
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
  decrementQuantity(product: any) {
    this.cartService.decrementQuantity(product);
  }
  descuento(valor :number, cantidad: number){
    let formula = (cantidad*(valor-(valor * 0.10)));
    return formula.toFixed(1);
  }
  clearCart() {
    this.cartService.clearCart();
    this.router.navigateByUrl('/')
  }
  compra() {
    alert('Compra realizada con éxito. gracias por su compra');
    this.cartService.clearCart();
    this.router.navigateByUrl('/shop')
  }
  totalCart():number {
    return this.cart.reduce((acc:number, cart: any) => {
        return acc + (cart.cantidad * (cart.precio - (cart.precio * 0.10)));
    }, 0);

  }
}
