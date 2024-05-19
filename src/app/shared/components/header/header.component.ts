import { Component } from '@angular/core';
import { MainAppPath } from '../../enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems:any = [
    {
        label: 'Home',

        route:MainAppPath.HOME


    },
    {
      label: 'Products',

      route:MainAppPath.PRODUCTS


  },
  {
    label: 'orders',

    route:MainAppPath.ORDERS


}]
constructor(){}

}
