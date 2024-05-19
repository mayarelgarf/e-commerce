export interface IOrder{
  OrderId: number,
    OrderDate:string ,
    UserId: string,
    Products: IProductOrder[],
    PaymentType: string
}

export interface IProductOrder{
  ProductId: number, Quantity: number
}
export interface IOrderTable extends IOrder{
TotalPrice:number
}
