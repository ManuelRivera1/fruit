import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

  private backendUrl = environment.url;
    private httpOptions = {
        headers: new HttpHeaders(),
        params: new HttpParams()
    };

  constructor(private http: HttpClient) {}

  findAllSubProfiles() {
    const sbody = {
      data:"data",
    }
    this.getHeaders('CNTCTR-SUBPROFILES-000');
    // return this.http.get(`${this.backendUrl}/login`);
    const user = 1;
    return this.http.get(`${this.backendUrl}/login/${user}`);
  }
  saveSubProfile(form: any) {
    const user = sessionStorage.getItem('macd.user');
    let username = '';
    if (user) {
      username = user.split('@')[0];
    }
    const sbody = {
        "name": form.name,
        "ico":form.ico,
        "route":form.route,
        "userCre":username
    }
    this.getHeaders('CNTCTR-SUBPROFILES-002');
    return this.http.post(`${this.backendUrl}/v1/subProfile`,sbody, this.httpOptions);
  }
  getHeaders(operationId:any) {
    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
    this.httpOptions.headers = this.httpOptions.headers.set('Accept', 'application/json');
    this.httpOptions.headers = this.httpOptions.headers.set('applicationId', '123e4567-e89b-12d3-a456-426614174000');
    this.httpOptions.headers = this.httpOptions.headers.set('require-response', 'T');
    this.httpOptions.headers = this.httpOptions.headers.set('provider', 'K');
    this.httpOptions.headers = this.httpOptions.headers.set('invoked-by', 'C');
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${sessionStorage.getItem('macd.idtoken')}`);
    this.httpOptions.headers = this.httpOptions.headers.set('consumer-id', 'PRI');
    this.httpOptions.headers = this.httpOptions.headers.set('OperationId', operationId);
  }
}
