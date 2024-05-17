import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './page';
import { HttpClientModule } from '@angular/common/http';
const BASE_MODULES = [HttpClientModule, CommonModule,]

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
   ...BASE_MODULES,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
