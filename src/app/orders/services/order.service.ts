import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/assets/http';
import { IOrder } from '../interfaces/order.interface';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ORDER_APIS = API_URLS.orders;
  constructor(private _http: HttpClient) {}
  getOrders(): Observable<IOrder[]> {
    return this._http.get<IOrder[]>(this.ORDER_APIS.getOrders).pipe(take(1));
  }
}
