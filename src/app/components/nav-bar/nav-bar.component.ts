import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  status = false;
  constructor(
    public accountService: AccountService
  ) { }
  dropMenu() {
    this.status = !this.status;
  }
}
