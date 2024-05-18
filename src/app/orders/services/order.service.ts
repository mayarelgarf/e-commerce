import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/assets/http';
import { IOrder, IOrderTable, IProductOrder } from '../interfaces/order.interface';
import { Observable, forkJoin, map, switchMap, take } from 'rxjs';
import { IProduct } from 'src/app/products/interfaces';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ORDER_APIS = API_URLS.orders;
  private  PRODUCT_APIS  = API_URLS.products
  private  USERS_APIS  = API_URLS.users
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

  private calculateTotalPrice(order: any, products: any[]): any {
    let totalPrice = 0;
    order.Products = order.Products.map((productOrder:any) => {
      const product = products.find(p => p.ProductId === productOrder.ProductId);
      if (product) {
        totalPrice += product.ProductPrice * productOrder.Quantity;
        return {
          ...productOrder,
          ProductName: product.ProductName,
          ProductPrice: product.ProductPrice,
          ProductImg: product.ProductImg,
          TotalPrice: product.ProductPrice * productOrder.Quantity
        };
      }
      return productOrder;
    });
    return {
      ...order,
      TotalPrice: totalPrice
    };
  }
  getOrderById(orderId: number): Observable<any> {
    return forkJoin([this.getOrders(), this.getProducts()]).pipe(
      map(([orders, products]) => {
        const order = orders.find(order => order.OrderId === orderId);
        return order ? this.calculateTotalPrice(order, products) : null;
      })
    );
  }
getUsers(): Observable<IUser[]>{
  return this._http.get<IUser[]>(this.USERS_APIS.getUsers).pipe(take(1));
}
  getUserById(userId:string): Observable<IUser> {
    return this.getUsers().pipe(
      map((users: IUser[]) => users.find((user:IUser) => user?.Id === userId)),

    );
  }
}
