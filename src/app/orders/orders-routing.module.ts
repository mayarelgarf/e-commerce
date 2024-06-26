import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './page';
import { OrderDetailsComponent } from './components';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  {path:':id',component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
