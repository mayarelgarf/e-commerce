import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrderService, UserService } from '../../services';
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
   /**
   * @description getter for orderId

   * @returns {number} orderId
   */
  get orderId():number {
    let orderId: number;
    this._activatedRoute.params
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: Params) => {
        orderId = +params['id'];
      });
    return orderId;
  }
  constructor(private _userService:UserService,private _orderService: OrderService,private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {this.getOrderDetails()}
    /**
   * @description function that calls api to get the order details and calls the get user details function

   * @returns void
   */
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
 /**
   * @description function that calls api to get the user details
   * @param {string} userId
   * @returns void
   */
  getUserById(userId:string):void{
    this._userService
    .getUserById(userId)
    .pipe(takeUntil(this._destroy$))
    .subscribe({
      next: (user: IUser[]) => {
        if (!user) return;

        this.customer =user

      },
      error: (err: Error) => console.error(err),
    });
  }
  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete()
  }
}
