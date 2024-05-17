import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../services';
import { IOrder } from '../interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  orders: IOrder[];
  constructor(private _orderService: OrderService) {}
  ngOnInit(): void {
    this.getOrders()
  }
  /**
   * @description function that calls api to get list of orders
   * @returns void
   */
  getOrders(): void {
    this._orderService
      .getOrders()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (orders: IOrder[]) => {
          if (!orders) return;
          console.log(orders);
          this.orders = orders;
        },
        error: (err: Error) => console.error(err),
      });
  }
}
