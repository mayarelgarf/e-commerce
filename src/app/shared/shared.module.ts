import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';


import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [


  ],
  imports: [
    MenubarModule,
    CommonModule,
    SharedRoutingModule
  ],


})
export class SharedModule { }
