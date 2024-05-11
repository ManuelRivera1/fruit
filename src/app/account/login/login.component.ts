import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  form!: FormGroup;
  isNotUser: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    this.accountService.login(this.form.value).subscribe({
      next: user => {
        Toast.fire({
          icon: "success",
          title: "Se incio secion correctamente"
        });
        setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
        }, 100);
      },
      error: err => {
        Toast.fire({
          icon: "error",
          title: "No se pudo iniciar sesion, por favor intente de nuevo o registrese"
        });
        this.isNotUser = !this.isNotUser;
      }
    })
  }
}
