import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './page';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
const BASE_MODULES = [
  OrdersRoutingModule,
  HttpClientModule,
  CommonModule,
  TableModule,
  ButtonModule,
  DataViewModule,
  DialogModule,
];

@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [...BASE_MODULES],
  providers: [],
})
export class OrdersModule {}
