import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    returnUrl: any;
    isNotUser: boolean = false;
    data:any;
    constructor(
      private shopService: ShopService,
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) {
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    }
    ngOnInit(): void {
      this.listProduct();
    }
    listProduct() {
      this.shopService.getProducts().subscribe({
        next: product => {
          this.data = product;
          console.log(product);
          // this.router.navigateByUrl(this.returnUrl);
        },
        error: err => {
          this.isNotUser = !this.isNotUser;
          console.log(err);
        }
      })
    }
}
