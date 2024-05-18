import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/assets/http';
import { IOrder, IOrderTable, IProductOrder } from '../interfaces/order.interface';
import { Observable, map, switchMap, take } from 'rxjs';
import { IProduct } from 'src/app/products/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ORDER_APIS = API_URLS.orders;
  private  PRODUCT_APIS  = API_URLS.products
  constructor(private _http: HttpClient) {}
  getOrders(): Observable<IOrder[]> {
    return this._http.get<IOrder[]>(this.ORDER_APIS.getOrders).pipe(take(1));
  }


  getProducts():Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.PRODUCT_APIS.getProducts).pipe(take(1))
  }

  getOrdersWithTotalPrice(): Observable<IOrderTable[]> {
    return this._http.get<IOrder[]>(this.ORDER_APIS.getOrders).pipe(
      map((orders: IOrder[]) => {
        return this._http.get<IProduct[]>(this.PRODUCT_APIS.getProducts).pipe(
          map((products: IProduct[]) => {
            return orders.map((order:IOrder) => {
              let totalPrice = 0;
              order.Products.forEach((productOrder:IProductOrder) => {
                const product = products.find((p:IProduct) => p.ProductId === productOrder.ProductId);
                if (product) {
                  totalPrice += product.ProductPrice * productOrder.Quantity;
                }
              });
              return {
                ...order,
                TotalPrice: totalPrice
              };
            });
          })
        );
      }),
      // Use switchMap to flatten the nested observables
      switchMap(ordersWithTotalPrice$ => ordersWithTotalPrice$)
    );
  }
}
