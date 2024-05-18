import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  @Input()
  product: IProduct;
@Output() onEditProduct= new EventEmitter<IProduct>()
  constructor(){}
  onClickEdit(event:IProduct){

    this.onEditProduct.emit(event)
  }
}
