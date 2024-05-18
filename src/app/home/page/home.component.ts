import { Component } from '@angular/core';
import { MainAppPath } from 'src/app/shared/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
mainAppPath = MainAppPath
}
