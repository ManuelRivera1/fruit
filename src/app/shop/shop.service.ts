import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from 'src/shared/interface/iproducto';


@Injectable({
  providedIn: 'root'
})
export class ShopService {
  api = environment.url;
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
};
  /**
   * # Get all products
   * ---
   * @description This method gets all products
   * @returns Obserervable<IPagination>
   */
  getProducts() {
    let params = new HttpParams();

    return this.http.get<IProducto>(`${this.api}/articulos`)
      .pipe(
        map(
          response => { return response }
        )
      );
  }

  /**
   * # Get all brands
   * ---
   * @description This method gets all brands
   * @returns Observable<IBrand[]>
   */
  // getBrands() {
  //   return this.http.get<IBrand[]>(this.url + 'product/brands');
  // }

  /**
   * # Get all Types
   * ---
   * @description This method gets all types
   * @returns Observable<IType[]>
   */
  // getTypes() {
  //   return this.http.get<IType[]>(this.url + 'product/types');
  // }

  // getProduct(id: number) {
  //   return this.http.get<IProduct>(this.url + 'product/' + id);
  // }
}
