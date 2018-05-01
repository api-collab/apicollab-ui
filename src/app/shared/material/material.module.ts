import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatCardModule, MatChipsModule,
  MatSidenavModule } from '@angular/material';


@NgModule({
  imports: [MatCardModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatIconModule, MatMenuModule, MatChipsModule,
    MatSidenavModule, MatListModule],
  exports: [MatCardModule, MatButtonModule,
    MatCheckboxModule, MatToolbarModule, MatIconModule, MatChipsModule,
    MatMenuModule, MatSidenavModule, MatListModule],
})
export class MaterialModule { }
