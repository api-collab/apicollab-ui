import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatIconModule, MatMenuModule,
  MatCardModule, MatChipsModule, MatInputModule,
  MatGridListModule,
  MatSidenavModule } from '@angular/material';


@NgModule({
  imports: [MatCardModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatIconModule, MatMenuModule, MatChipsModule,
    MatGridListModule,
    MatSidenavModule, MatListModule, MatInputModule],
  exports: [MatCardModule, MatButtonModule,
    MatCheckboxModule, MatToolbarModule, MatGridListModule, MatIconModule, MatChipsModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatInputModule],
})
export class MaterialModule { }
