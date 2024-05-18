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
  productList: IProduct[] = [];
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
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
