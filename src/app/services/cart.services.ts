import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  addToCart(product: any) {
    const currentCart = this.cart.getValue();
    const existingProduct = currentCart.find(p => p.id === product.id);
    if (existingProduct) {
      if (existingProduct.cantidad < existingProduct.catidadDis) {
        existingProduct.cantidad++;
        // existingProduct.valor = this.descuento(existingProduct.valor, existingProduct.cantidad)
      } else {
        Swal.fire({
          title: '¡Ups!',
          text: 'No puedes agregar más de este producto al carrito.',
          icon: 'info'
        });
        return;
      }
    } else {
      product.cantidad = 1;
      // product.total = this.descuento(product.valor, product.cantidad);
      currentCart.push(product);
    }
    this.cart.next(currentCart);
  }
  decrementQuantity(product: any) {
    const currentCart = this.cart.getValue();
    const existingProduct = currentCart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.cantidad--;
      if (existingProduct.cantidad === 0) {
        this.removeFromCart(existingProduct);
      }
    }
    this.cart.next(currentCart);
  }
  removeFromCart(product: any) {
    const currentCart = this.cart.getValue();
    const index = currentCart.findIndex(p => p.id === product.id);
    if (index > -1) {
      currentCart.splice(index, 1);
      this.cart.next(currentCart);
    }
  }
  clearCart() {
    this.cart.next([]);
  }
  descuento(valor :number, cantidad: number){
    let formula = (cantidad*(valor-(valor * 0.10)));
    return formula.toFixed(1);
  }
}
