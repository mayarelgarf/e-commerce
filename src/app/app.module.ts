import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { HeaderComponent } from './shared/components';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,

HeaderComponent
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
SharedModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
