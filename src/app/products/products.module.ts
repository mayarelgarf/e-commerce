import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './page';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
const BASE_MODULES = [
  HttpClientModule,
  CommonModule,
  DialogModule,
  ReactiveFormsModule,
  ToastModule,
  ProductsRoutingModule,
  CardModule,
  ButtonModule,
];
@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent],
  imports: [...BASE_MODULES],
})
export class ProductsModule {}
