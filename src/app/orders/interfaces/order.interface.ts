export interface IOrder{
  OrderId: number,
    OrderDate:Date |string ,
    UserId: string,
    Products: IProductOrder[],
    PaymentType: string
}

export interface IProductOrder{
  ProductId: number, Quantity: number
}
