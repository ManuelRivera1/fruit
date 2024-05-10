import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AbstractControl, AsyncValidatorFn } from '@angular/forms'
import { Router } from '@angular/router'
import { BehaviorSubject, map, Observable, of, ReplaySubject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { IAddress, IUser } from 'src/shared/interface/iuser'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  api = environment.url
  private httpOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
};
  private currentUserSource = new ReplaySubject<IUser | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * # Login
   * ---
   * @description Logs in the user, sets the user source to the current user
   * @param {any} input
   * @returns Observable<IUser>
   */
  login(input: any) {
    console.log(input)
    return this.http.get<IUser>(`${this.api}/login/${input?.user}`).pipe(
      map((user) => {
        localStorage.setItem('token', user.token)
        this.currentUserSource.next(user)
        return user
      }),
    )
  }

  /**
   * # Register
   * ---
   * @description Registers, then logs the user in
   * @param {any} values
   * @returns Observable<IUser>
   */
  register(values: any) {
    console.log(values)
    this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
    const sbody = {
      "name": values.name
    }
    return this.http.post<IUser>(`${this.api}/login`,sbody,this.httpOptions).pipe(
      map((user) => {
        console.log(user)
        localStorage.setItem('token', user.token)
        this.currentUserSource.next(user)
        return user
      }),
    )
  }

  /**
   * # Logout
   */
  logout() {
    localStorage.removeItem('token')
    this.currentUserSource.next(null)
    this.router.navigateByUrl('/')
  }

}
