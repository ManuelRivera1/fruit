import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BuyService } from '../buy.service';

@Component({
  selector: 'app-list-buys',
  templateUrl: './list-buys.component.html',
  styleUrls: ['./list-buys.component.scss']
})
export class ListBuysComponent implements OnInit{
    isNotUser: boolean = false;
    data: any;
    originalData: any =[];
    constructor(
      private buyService: BuyService,) {

    }

    ngOnInit(): void {
      this.listProduct();
    }
    listProduct() {
      this.buyService.getProductsBuy().subscribe({
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
}
