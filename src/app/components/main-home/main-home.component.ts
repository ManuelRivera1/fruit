import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit{
  dataTotables: any;
  isLoading: boolean = false;
  originalData: any;
  constructor(private loginService: LoginService,) { }
  ngOnInit(): void {
    this.login()
  }
  login() {
    this.isLoading = true;
    this.loginService.findAllSubProfiles().subscribe({
      next: (data: any) =>  {
        this.dataTotables = data;
        console.log(this.dataTotables);
        this.isLoading = false;
        this.originalData = this.dataTotables.data;
      },
      error: (error: any) => {
        this.isLoading = false;
      }
  });
  }
}
