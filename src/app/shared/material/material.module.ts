import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatChipsModule,
  MatSidenavModule,
  MatTabsModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
