import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './page';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
const BASE_MODULES = [HttpClientModule, CommonModule,TableModule,ButtonModule]

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
