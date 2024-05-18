import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../services';
import { IOrderTable } from '../interfaces';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  orders: IOrderTable[];
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
      .getOrdersWithTotalPrice()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (orders: IOrderTable[]) => {
          if (!orders) return;
          this.orders = orders;
        },
        error: (err: Error) => console.error(err),
      });
  }
  selectOrder(order:any){
    console.log(order)
  }
}
