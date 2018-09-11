import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, IframeSafePipe } from '../shared';
import { ApiPageRoutingModule } from './api-page-routing.module';
import { ApiPageComponent } from './api-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SharedModule, ApiPageRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ApiPageComponent, IframeSafePipe]
})
export class ApiPageModule {}
