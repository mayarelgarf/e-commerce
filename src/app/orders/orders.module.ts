import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './page';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DataViewModule } from 'primeng/dataview';
const BASE_MODULES = [HttpClientModule, CommonModule,TableModule,ButtonModule,DataViewModule]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent
  ],
  imports: [
   ...BASE_MODULES,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
