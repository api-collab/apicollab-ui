import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, IframeSafePipe } from '../shared';
import { ApiPageRoutingModule } from './api-page-routing.module';
import { ApiPageComponent } from './api-page.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ApiPageRoutingModule
  ],
  declarations: [
    ApiPageComponent,
    IframeSafePipe
  ]
})
export class ApiPageModule { }
