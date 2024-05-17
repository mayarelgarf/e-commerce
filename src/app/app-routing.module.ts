import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppPath } from './shared/enums';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: MainAppPath.HOME },
      {
        path: MainAppPath.HOME,
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },{
        path: MainAppPath.PRODUCTS,
        loadChildren:()=>
          import('./products/products.module').then((m)=>m.ProductsModule)
      }
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
