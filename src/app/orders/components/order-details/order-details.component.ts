import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../services';
import { IOrder, IOrderTable, IProductOrder } from '../../interfaces';
import { IUser } from '../../interfaces/user.interface';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit,OnDestroy {
  private _destroy$ = new Subject<void>();
  customer:IUser[]
  products:IProductOrder[]
  order:IOrderTable[]
  get orderId() {
    let orderId: number;
    this._activatedRoute.params
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: Params) => {
        orderId = +params['id'];
      });
    return orderId;
  }
  constructor(private _orderService: OrderService,private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {this.getOrderDetails()}
  getOrderDetails():void{

    this._orderService
    .getOrderById(this.orderId)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (order: IOrderTable) => {
        if (!order) return;

        this.products= order.Products
        this.order = [order]
this.getUserById(order.UserId)
      },
      error: (err: Error) => console.error(err),
    });
  }

  getUserById(userId:string){
    this._orderService
    .getUserById(userId)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (user: IUser) => {
        if (!user) return;
        console.log('user',user)
        this.customer =[user]

      },
      error: (err: Error) => console.error(err),
    });
  }
  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete()
  }
}
