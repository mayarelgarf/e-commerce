import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URLS } from 'src/assets/http';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
 private  PRODUCT_APIS  = API_URLS.products
  constructor(private _http:HttpClient) { }

  getProducts():Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.PRODUCT_APIS.getProducts).pipe(take(1))
  }

  editProductQuantity(productId: number, quantity: number): Observable<any> {
    return this._http.put<any>(`${this.PRODUCT_APIS.getProducts}?ProductId=${productId}`, { AvailablePieces: quantity });
  }
}
