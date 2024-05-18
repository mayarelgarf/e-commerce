import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  isEditing:boolean
  productList: IProduct[] = [];
  selectedProduct:IProduct
  constructor(private _productService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
  }
  /**
   * @description function that calls api to get list of products
   * @returns void
   */
  getProducts(): void {
    this._productService
      .getProducts()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (products: IProduct[]) => {
          if (!products) return;
          this.productList = products;
        },
        error: (err: Error) => console.error(err),
      });
  }

  onEditQuantity(event:any){
this.selectedProduct=event
    this.isEditing = true
  }
  onSaveQuantity(){
this._productService.editProductQuantity(this.selectedProduct.ProductId,100).pipe(takeUntil(this._destroy$))
.subscribe((data)=>console.log(data))
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
