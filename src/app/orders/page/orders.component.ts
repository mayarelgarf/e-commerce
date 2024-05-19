import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../services';
import { IOrderTable } from '../interfaces';
import { Router } from '@angular/router';
import { MainAppPath } from 'src/app/shared/enums';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit,OnDestroy {
  private _destroy$ = new Subject<void>();
  orders: IOrderTable[];
  isAdding:boolean
  constructor(private _orderService: OrderService,private _router:Router) {}
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
   /**
   * @description function that navigates to the selected order details
   * @param {IOrderTable}order
   * @returns void
   */
  selectOrder(order:IOrderTable):void{
    this._router.navigate([`${MainAppPath.ORDERS}/${order.OrderId}`])
  }
   /**
   * @description function that calls api to add an order

   * @returns void
   */
  addOrder():void{

  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete()
}
}
