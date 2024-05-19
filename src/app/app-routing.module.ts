import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppPath } from './shared/enums';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: MainAppPath.HOME },
  {
    path: MainAppPath.HOME,
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: MainAppPath.PRODUCTS,
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: MainAppPath.ORDERS,
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '**', redirectTo: MainAppPath.HOME },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
