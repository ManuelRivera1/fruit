import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      this.accountService.register(this.form.value).subscribe({
        next: user => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: err => {
          this.isNotUser = !this.isNotUser;
        }
      })
    }
}
