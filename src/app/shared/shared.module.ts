import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    RouterModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: []
})
export class SharedModule {}
