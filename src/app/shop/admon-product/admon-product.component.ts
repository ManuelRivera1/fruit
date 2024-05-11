import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admon-product',
  templateUrl: './admon-product.component.html',
  styleUrls: ['./admon-product.component.scss']
})
export class AdmonProductComponent  implements OnInit {
  returnUrl: any;
  isNotUser: boolean = false;
  typeSolicitud: any;
  data:any;
  datas:any;
  originalData:any = [];
  validate = false;
  form!: FormGroup;
  statusData: boolean = false;
  constructor(
    private shopService: ShopService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'account/login';
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      catidadDis: new FormControl('', [Validators.required])
      })
    this.listProduct();
  }
  listProduct() {
    this.shopService.getProducts().subscribe({
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
      this.statusData = false;
      setTimeout(() => {
        this.data = this.originalData.filter((profile: any) =>
          profile.name.toLowerCase().includes(searchValue.target.value.toLowerCase())
        );
        this.statusData = true;
      }, 0);
    } else {
      this.statusData = false;
      setTimeout(() => {
        this.data = [...this.originalData];
        this.statusData = true;
      }, 0);
    }
  }
  onSubmit() {
    if(this.typeSolicitud === 'add'){
      this.shopService.register(this.form.value).subscribe({
        next: user => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Producto registrado',
            icon: 'success'
          });
          this.validate = false;
          this.listProduct();
        },
        error: err => {
          this.isNotUser = !this.isNotUser;
        }
      })
    }else{

      this.shopService.registerUpdate(this.form.value).subscribe({
        next: user => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Producto actualizado',
            icon: 'success'
          });
          this.validate = false;
          this.listProduct();
        },
        error: err => {
          Swal.fire({
            title: 'Error!',
            text: 'Error al actualizar el producto',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6'
          });
          this.isNotUser = !this.isNotUser;
        }
      })
    }
  }
  addAndEdit(type: any) {
    this.typeSolicitud = type;
    this.validate = true;
  }
  edit(type:any,datas: any) {
   this.datas = datas;
    this.typeSolicitud = type;
    this.validate = true;
    setTimeout(() => {
      this.form.get('name')?.setValue(this.datas.name);
      this.form.get('id')?.setValue(this.datas.id);
      this.form.get('descripcion')?.setValue(this.datas.descripcion);
      this.form.get('precio')?.setValue(this.datas.precio);
      this.form.get('catidadDis')?.setValue(this.datas.catidadDis);
    }, 10);
  }
  delete(id: any) {
    this.shopService.delete(id).subscribe({
      next: user => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Producto eliminado',
          icon: 'success'
        });

        this.listProduct();
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: 'Error al eliminar el producto',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        });
        this.isNotUser = !this.isNotUser;
      }
    })
  }
}
