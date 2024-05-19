import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  isEditing: boolean;
  productList: IProduct[] = [];
  selectedProduct: IProduct;
  quantityForm: FormGroup = this._fb.group({
    quantity: ['', [Validators.required, Validators.min(0)]],
  });
  constructor(
    private _productService: ProductsService,
    private _fb: FormBuilder,
    private messageService: MessageService
  ) {}
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
          this.productList.sort((a, b) => a.AvailablePieces - b.AvailablePieces);
        },
        error: (err: Error) => console.error(err),
      });
  }

  onEditQuantity(event: any) {
    this.selectedProduct = event;
    this.isEditing = true;
  }
  onSaveQuantity() {
    if (this.quantityForm.valid) {
      const quantity = this.quantityForm.get('quantity').value;

      this._productService
        .editProductQuantity(this.selectedProduct.id, quantity)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (updatedProduct: IProduct) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${updatedProduct.ProductName} updated successfully !`,
            });
            this.isEditing = false;
            this.getProducts();
          },
          error: (err: Error) => {
            console.error(err),
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'failed to update !',
              });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
