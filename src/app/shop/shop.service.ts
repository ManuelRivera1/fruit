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
   * # Register
   * ---
   * @description Registers, productos nuevos
   * @param {any} values
   * @returns Observable<IUser>
   */
register(values: any) {
  this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
  const sbody = {
    "name": values.name,
    "descripcion": values.descripcion,
    "precio": values.precio,
    "catidadDis": values.catidadDis
  }
  return this.http.post<IProducto>(`${this.api}/articulos`,sbody,this.httpOptions).pipe(
    map((productos) => {
      return productos;
    }),
  )
}
registerUpdate(values: any) {
  let id = values.id;
  this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');
  const sbody = {
    "name": values.name,
    "descripcion": values.descripcion,
    "precio": values.precio,
    "catidadDis": values.catidadDis
  }
  return this.http.put<IProducto>(`${this.api}/articulos/${id}`,sbody,this.httpOptions).pipe(
    map((productos) => {
      return productos;
    }),
  )
}
delete(id:any) {
  this.httpOptions.headers = this.httpOptions.headers.set('Content-Type', 'application/json');

  return this.http.delete<IProducto>(`${this.api}/articulos//${id}s`,this.httpOptions).pipe(
    map((productos) => {
      return productos;
    }),
  )
}
}
