import { BuyService } from './../buy.service';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements AfterViewInit{
  cart: any;
  total: any;
  data: any;
  originalData: any =[];
  isNotUser: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private buyService: BuyService,
  ) { }
  ngAfterViewInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.totalCart();
    });
  }
  listProduct(value:any) {
    this.buyService.register(value).subscribe({
      next: product => {
        this.data = product;
        this.originalData = product;
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: 'Error al cargar los producto',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        });
        this.isNotUser = !this.isNotUser;
      }
    })
  }
  searchProfiles(searchValue: any) {
    if (searchValue.target.value.length > 0) {
      setTimeout(() => {
        this.data = this.originalData.filter((profile: any) =>
          profile.name.toLowerCase().includes(searchValue.target.value.toLowerCase())
        );
      }, 0);
    } else {
      setTimeout(() => {
        this.data = [...this.originalData];
      }, 0);
    }
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
    Swal.fire({
      title: '¡Éxito!',
      text: 'Compra realizada, gracias por su compra',
      icon: 'success'
    });
    this.cartService.clearCart();
    this.router.navigateByUrl('/shop')
  }
  totalCart():number {
    return this.cart.reduce((acc:number, cart: any) => {
        return acc + (cart.cantidad * (cart.precio - (cart.precio * 0.10)));
    }, 0);

  }
}
