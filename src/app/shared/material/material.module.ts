import { NgModule } from '@angular/core';
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
  MatGridListModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSnackBarModule
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
    MatGridListModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule
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
    MatGridListModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
